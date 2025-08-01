require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const bodyParser=require("body-parser");
const NodeCache = require('node-cache');
const session=require("express-session");
const MongoStore = require('connect-mongo');
const passport=require("passport");
const localStrategy=require("passport-local");


const {HoldingsModel}=require("./model/HoldingsModel");
const {PositionsModel}=require("./model/PositionsModel");
const {OrdersModel}=require("./model/OrdersModel");
const {FundsModel}=require("./model/FundsModel");
const {UsersModel}=require("./model/UsersModel");

const port=process.env.PORT || 3000;
const url=process.env.MONGO_URL;

const app=express();
app.set("trust proxy", 1);
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ["https://your-kite.vercel.app",
            "https://your-kite.vercel.app/",
            "https://yourkite-dashboard.vercel.app",
            "https://yourkite-dashboard.vercel.app/"]
        : ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const sessionOptions={
    secret:process.env.SESSION_SECRET || "your-complex-secret-key-here", 
    resave:false,
    saveUninitialized:true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL, 
        collectionName: 'sessions',      
        ttl: 7 * 24 * 60 * 60 
    }),
    cookie:{
        expires:new Date(Date.now() + 7*24*60*60*1000),
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/'
    }
}
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(UsersModel.authenticate()));
passport.serializeUser(UsersModel.serializeUser());
passport.deserializeUser(UsersModel.deserializeUser());

const activeSessions = new Map();

// const isAuthenticated = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     return res.status(401).json({ message: "You need to login first" });
//   }
//   next();
// };
app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        const userId = req.user._id.toString();
        const sessionId = req.session.sessionId;
        
        const currentSessionId = activeSessions.get(userId);
        
        if (!currentSessionId || currentSessionId !== sessionId) {
            req.logout(function(err) {
                if (err) {
                    console.error("Error logging out:", err);
                }
                res.clearCookie('connect.sid');
                return res.status(401).json({
                    isAuthenticated: false,
                    message: "You have been logged in from another device or browser. Please login again."
                });
            });
            return;
        }
    }
    next();
});

async function createInitialFundsForUser(userId) {
    try {
        const initialFunds = new FundsModel({
            available: 2000, 
            used: 0,
            payin: 2000,
            user: userId
        });
        await initialFunds.save();
        console.log(`Initial funds (₹2,000) created for user: ${userId}`);
    } catch (error) {
        console.error("Error creating initial funds:", error);
    }
}
//data migaration
// app.get("/migrate-to-jay", async (req, res) => {
//     try {
//         const jayUser = await UsersModel.findOne({ username: "Jay" });
//         if (!jayUser) {
//             return res.status(404).json({ message: "Jay user not found" });
//         }
//         await HoldingsModel.updateMany(
//             { user: { $exists: false } },
//             { user: jayUser._id }
//         );
//         await OrdersModel.updateMany(
//             { user: { $exists: false } },
//             { user: jayUser._id }
//         );
//         await PositionsModel.updateMany(
//             { user: { $exists: false } },
//             { user: jayUser._id }
//         );
//         await FundsModel.updateMany(
//             { user: { $exists: false } },
//             { user: jayUser._id }
//         );
//         res.json({ message: "Migration to Jay completed!" });
//     } catch (error) {
//         res.status(500).json({ message: "Migration error", error });
//     }
// });

app.post("/signup",async (req,res)=>{
    const{name,username,email,password}=req.body;
    try{
        const existingEmail=await UsersModel.findOne({email});
        if(existingEmail){
            return res.status(400).json({message :"Email already exists"});
        }
        const newUser=new UsersModel({name,email,username});
        const registeredUser=await UsersModel.register(newUser,password);
        await createInitialFundsForUser(registeredUser._id);
        return res.status(201).json({ 
            message: "Signup successful", 
            user: {
                id: registeredUser._id,
                username: registeredUser.username,
                name: registeredUser.name,
                email: registeredUser.email
            }
        });
    }
    catch(error){
        if(error.name==="UserExistsError"){
            return res.status(400).json({message:"User already exists"});
        }
        return res.status(500).json({message:"Internal server error while signing up"});
    }
})

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ message: "Login error" });
            }
            const sessionId = Date.now().toString();
            activeSessions.set(user._id.toString(), sessionId);
            req.session.sessionId = sessionId;

            return res.status(200).json({
                message: "Login successful",
                user: {
                    id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email
                }
            });
        });
    })(req, res, next);
});
// app.post("/login",passport.authenticate("local",{failureRedirect:"/login"}),(req,res)=>{
//     const sessionId = Date.now().toString();
//     activeSessions.set(req.user._id.toString(),sessionId);
//     req.session.sessionId = sessionId;

//     res.status(200).json({
//         message:"Login successful",
//         user:{
//             id:req.user._id,
//             username:req.user.username,
//             name:req.user.name,
//             email:req.user.email
//         }
//     });
// });

app.post("/logout", (req, res) => {

    if (req.isAuthenticated()) {
        const userId = req.user._id.toString();
        activeSessions.delete(userId);
    }
    req.session.sessionId = null;
    req.logout(function(err) {
        if (err) {
            return res.status(500).json({ message: "Error logging out" });
        }
        res.status(200).json({ message: "Logged out successfully" });
    });
});

app.get("/check-auth", (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.user._id.toString();
        const sessionId = req.session.sessionId;
        const currentSessionId = activeSessions.get(userId);
        if (!currentSessionId || currentSessionId !== sessionId) {
            req.logout(function(err) {
                if (err) {
                    console.error("Error logging out:", err);
                }
                return res.status(401).json({
                    isAuthenticated: false,
                    message: "You have been logged in from another device or browser"
                });
            });
            return;
        }

        return res.status(200).json({
            isAuthenticated: true,
            message: "User is authenticated",
            user: {
                id: req.user._id,
                username: req.user.username,
                name: req.user.name,
                email: req.user.email
            }
        });
    }
    res.status(401).json({ 
        isAuthenticated: false,
        message: "User is not Logged In"
        
    });
});
// app.get("/demouser",async (req,res)=>{
//     let fakeuser=new UsersModel({
//         email:"demo@gmail.com",
//         username:"demo",
//     })
//     let registereduser= await UsersModel.register(fakeuser,"demopassword");
//     res.send(registereduser);
// })

// app.get("/addHoldings" ,async(req,res)=>{
//     let tempHoldings=[{
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   }];

//   tempHoldings.forEach((item)=>{
//     let newHolding=new HoldingsModel({
//         name: item.name,
//         qty: Number(item.qty),
//         avg: Number(item.avg),
//         price: Number(item.price),
//         net: String(item.net),
//         day: String(item.day),
//     });
//     newHolding.save();
//   });
//   res.send("holdings added");
// });
// app.get("/addPositions",async(req,res)=>{
//     let tempPositions=[
//         {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   }
//     ];
//     tempPositions.forEach((item)=>{
//         let newPosition=new PositionsModel({
//             product: item.product,
//             name: item.name,
//             qty: Number(item.qty),
//             avg: Number(item.avg),
//             price: Number(item.price),
//             net: String(item.net),
//             day: String(item.day),
//             isLoss: item.isLoss || false
//         });
//         newPosition.save();
//     });
// });

const priceUpdateInterval = 1 * 1000; //  every 1 seconds
const simulatedDayInterval = 5 * 60 * 1000; // day ends every 5 minutes
const stockCache = new NodeCache();

const indicesData = [
    { name: "NIFTY 50", price: 25355.25, openingPrice: 25355.25, prevDayClose: 25355.25 },
    { name: "SENSEX", price: 83190.28, openingPrice: 83190.28, prevDayClose: 83190.28 }
];
const initialStocksData = [
    { name: "INFY", price: 1618.80, openingPrice: 1618.80, prevDayClose: 1618.80 },
    { name: "ONGC", price: 243.09, openingPrice: 243.09, prevDayClose: 243.09 },
    { name: "TCS", price: 3382.00, openingPrice: 3382.00, prevDayClose: 3382.00 },
    { name: "KPITTECH", price: 1253.20, openingPrice: 1253.20, prevDayClose: 1253.20 },
    { name: "QUICKHEAL", price: 376.15, openingPrice: 376.15, prevDayClose: 376.15 },
    { name: "WIPRO", price: 265.05, openingPrice: 265.05, prevDayClose: 265.05 },
    { name: "M&M", price: 267.60, openingPrice: 267.60, prevDayClose: 267.60 },
    { name: "RELIANCE", price: 1517.20, openingPrice: 1517.20, prevDayClose: 1517.20 },
    { name: "HAL", price: 4915.60, openingPrice: 4915.60, prevDayClose: 4915.60 },
    { name: 'HDFCBANK', price: 2006.20, openingPrice: 2006.20, prevDayClose: 2006.20 },
    { name: 'ICICIBANK', price: 1424.10, openingPrice: 1424.10, prevDayClose: 1424.10 },
    { name: 'SBIN', price: 808.00, openingPrice: 808.00, prevDayClose: 808.00 },
    { name: 'BHARTIARTL', price: 1964.50, openingPrice: 1964.50, prevDayClose: 1964.50 },
    { name: 'KOTAKBANK', price: 2203.80, openingPrice: 2203.80, prevDayClose: 2203.80 },
    { name: 'L&T', price: 3574.70, openingPrice: 3574.70, prevDayClose: 3574.70 },
    { name: 'ASIANPAINT', price: 2451.20, openingPrice: 2451.20, prevDayClose: 2451.20 },
    { name: 'MARUTI', price: 12650.00, openingPrice: 12650.00, prevDayClose: 12650.00 },
    { name: 'ITC', price: 416.85, openingPrice: 416.85, prevDayClose: 416.85 },
    { name: 'BAJFINANCE', price: 947.65, openingPrice: 947.65, prevDayClose: 947.65 },
    { name: 'AXISBANK', price: 1164.30, openingPrice: 1164.30, prevDayClose: 1164.30 },
    { name: 'TATAPOWER', price: 395.60, openingPrice: 395.60, prevDayClose: 395.60 },
    { name: 'HINDUNILVR', price: 2520.00, openingPrice: 2520.00, prevDayClose: 2520.00 }
];

indicesData.forEach(index => {
    stockCache.set(index.name, {
        name: index.name,
        price: index.price,
        openingPrice: index.openingPrice,
        prevDayClose: index.prevDayClose,
        netChange: 0.00,
        percentageChange: 0.00
    });
});
initialStocksData.forEach(stock => {
    stockCache.set(stock.name, {
        name: stock.name,
        price: stock.price,
        openingPrice: stock.openingPrice, 
        prevDayClose: stock.prevDayClose, 
        netChange: 0.00, 
        percentageChange: 0.00 
    });
});

function generateRandomPriceChange(currentPrice, volatility, trend) {
    const randomFactor = (Math.random() * 2 - 1) * volatility;
    const changeAmount = currentPrice * (randomFactor + trend);
    let newPrice = currentPrice + changeAmount;
    if (newPrice < 1.00) {
        newPrice = 1.00;
    }
    return parseFloat(newPrice.toFixed(2));
}

function updatePrices() {
    initialStocksData.forEach(stockConfig => {
        const stockName = stockConfig.name;
        const currentStockData = stockCache.get(stockName);

        if (currentStockData) {
            const newPrice = generateRandomPriceChange(currentStockData.price,0.004, 0.00005);
            const netChange = newPrice - currentStockData.prevDayClose;
            const percentageChange = (currentStockData.prevDayClose !== 0) ? (netChange / currentStockData.prevDayClose) * 100 : 0;

            stockCache.set(stockName, {
                name: currentStockData.name,
                price: newPrice,
                openingPrice: currentStockData.openingPrice,
                prevDayClose: currentStockData.prevDayClose,
                netChange: parseFloat(netChange.toFixed(2)),
                percentageChange: parseFloat(percentageChange.toFixed(2))
            });
        }
    });

    indicesData.forEach(indexConfig => {
        const indexName = indexConfig.name;
        const currentIndexData = stockCache.get(indexName);

        if (currentIndexData) {
            const newPrice = generateRandomPriceChange(currentIndexData.price, 0.0002, 0.00001);
            const netChange = newPrice - currentIndexData.prevDayClose;
            const percentageChange = (currentIndexData.prevDayClose !== 0) ? (netChange / currentIndexData.prevDayClose) * 100 : 0;

            stockCache.set(indexName, {
                name: currentIndexData.name,
                price: newPrice,
                openingPrice: currentIndexData.openingPrice,
                prevDayClose: currentIndexData.prevDayClose,
                netChange: parseFloat(netChange.toFixed(2)),
                percentageChange: parseFloat(percentageChange.toFixed(2))
            });
        }
    });
}
function simulateEndOfDay() {
    initialStocksData.forEach(stockConfig => {
        const stockName = stockConfig.name;
        const currentStockData = stockCache.get(stockName);

        if (currentStockData) {
            const newPrevDayClose = currentStockData.price;
            const newOpeningPrice = newPrevDayClose; 
            
            stockCache.set(stockName, {
                name: currentStockData.name,
                price: currentStockData.price,
                openingPrice: newOpeningPrice,
                prevDayClose: newPrevDayClose,
                netChange: 0.00,
                percentageChange: 0.00
            });
        }
    });
}

setInterval(updatePrices, priceUpdateInterval); 
setInterval(simulateEndOfDay, simulatedDayInterval);

app.get("/api/indices", (req, res) => {
    const indicesForResponse = [];
    indicesData.forEach(indexConfig => {
        const indexData = stockCache.get(indexConfig.name);
        if (indexData) {
            indicesForResponse.push({
                name: indexData.name,
                price: indexData.price,
                netChange: indexData.netChange,
                percentageChange: indexData.percentageChange
            });
        }
    });
    res.json(indicesForResponse);
});
app.get("/api/watchlist", (req, res) => {
    const allStocksForResponse = [];
    initialStocksData.forEach(stockConfig => {
        const stockData = stockCache.get(stockConfig.name);
        if (stockData) {
            allStocksForResponse.push({
                name: stockData.name,
                price: stockData.price,
                openingPrice: stockData.openingPrice,
                netChange: stockData.netChange,
                percentageChange: stockData.percentageChange
            });
        }
    });
    res.json(allStocksForResponse);
});


// crud
app.get("/Funds", async(req,res)=>{
    let funds=await FundsModel.findOne({user: req.user._id});
    if(!funds){
        let newFunds=new FundsModel({
            available: 0,
            used: 0,
            payin: 0,
            user: req.user._id
        });
        await newFunds.save();
        funds=newFunds;
    }
    res.json(funds);
})
app.post("/addfunds", async(req,res)=>{
    const {amount}=req.body;
    let funds=await FundsModel.findOne({user: req.user._id});
    if(!funds){
        let newFunds=new FundsModel({
            available: Number(amount),
            used: 0,
            payin: Number(amount),
            user: req.user._id
        });
        await newFunds.save();
    }
    else{
        const newamount=funds.available+Number(amount);
        const newpayin=funds.payin+Number(amount);
        funds.available=Number((newamount).toFixed(2));
        funds.payin= Number((newpayin).toFixed(2));
        await funds.save();
    }
    res.status(200).json({ message: "Funds added successfully" });
})

app.post("/withdrawfunds", async(req,res)=>{
    const {amount}=req.body;
    let funds=await FundsModel.findOne({user: req.user._id});
    if(!funds){
        return res.status(400).json({ message: "No funds available to withdraw" });
    }
    const newavailable=funds.available-Number(amount);
    const newpayin=funds.payin-Number(amount);
    funds.available=Number((newavailable).toFixed(2));
    funds.payin= Number((newpayin).toFixed(2));
    await funds.save();
    res.status(200).json({ message: "Funds withdrawn successfully" });
});
app.get("/allHoldings", async(req,res)=>{
    let allHoldings=await HoldingsModel.find({user: req.user._id});
    res.json(allHoldings);
})
app.get("/allOrders", async(req,res)=>{
    let allOrders=await OrdersModel.find({user: req.user._id});
    res.json(allOrders);
})
app.get("/allPositions", async(req,res)=>{
    let allPositions=await PositionsModel.find({user: req.user._id});
    res.json(allPositions);
})
app.post("/newOrder", async(req,res)=>{
    const {name,qty,price,mode}=req.body;
    let newOrder=new OrdersModel({
        name:req.body.name,
        qty: Number(req.body.qty),
        price: Number(req.body.price),
        mode: String(req.body.mode),
        user: req.user._id
    })
    await newOrder.save();
    if(mode==="BUY"){
        let funds=await FundsModel.findOne({user: req.user._id});
        if(funds){
            const newavailable=funds.available-Number(price)*Number(qty);
            const newused=funds.used+Number(price)*Number(qty);
            funds.available=Number((newavailable).toFixed(2));
            funds.used= Number((newused).toFixed(2));
            await funds.save();
        }
        let holding=await HoldingsModel.findOne({name, user: req.user._id});
        if(holding){
            const totalQty=holding.qty+Number(qty);
            const totalcost=holding.avg * holding.qty + Number(price) * Number(qty);
            holding.qty=totalQty;
            holding.avg=totalcost/totalQty;
            await holding.save();
        }
        else{
            let newHolding=new HoldingsModel({
                name: name,
                qty: Number(qty),
                avg: Number(price),
                price: Number(price),
                net: "+0.00%",
                day: "+0.00%",
                user: req.user._id
            });
            await newHolding.save();
        }
    }
    if(mode==="SELL"){
        let funds=await FundsModel.findOne({user: req.user._id});
        if(funds){
            const newavailable=funds.available+Number(price)*Number(qty);
            const newused=funds.used-Number(price)*Number(qty);
            funds.available=Number((newavailable).toFixed(2));
            funds.used= Number((newused).toFixed(2));
            await funds.save();
        }

        let holding=await HoldingsModel.findOne({name, user: req.user._id});
        if(holding){
            const totalQty=holding.qty-Number(qty);
            holding.qty=totalQty;
            if(totalQty<=0){
                await HoldingsModel.deleteOne({name, user: req.user._id});
            }
            else{
                await holding.save();
            }
        }
    }
    res.status(200).json({ message: "Order placed and holdings updated" });
})

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
    mongoose.connect(url);
    console.log("DB connected");
})