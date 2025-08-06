// import "./BuyWindow.css";
// import React, { useState,useEffect } from "react";
// import { Link } from "react-router-dom";

// import axios from "axios";
// import API from "../Api";

// import GeneralContext from "./GeneralContext";
// import { useContext } from "react";

// const BuyActionWindow = ({ uid }) => {
//   const generalContext = useContext(GeneralContext);
//   const [stockQuantity, setStockQuantity] = useState(1);
//   const [stockPrice, setStockPrice] = useState(0);

//   const[allFunds,setAllFunds]=useState([]);

//     useEffect(() => {
//     const fetchPrice = () => {
//       API.get("/api/watchlist").then((res) => {
//         const stock = res.data.find((s) => s.name === uid);
//         if (stock) setStockPrice(stock.price);
//       });
//     };
//     fetchPrice();
//     const interval = setInterval(fetchPrice, 1000);
//     return () => clearInterval(interval);
//   }, [uid]);  

//     useEffect(()=>{
//       API.get("/Funds").then((res)=>{
//         setAllFunds(res.data);
//        })
//     },[]);
//   const canBuy=stockQuantity*stockPrice <= allFunds.available && stockQuantity > 0;

//   const handleBuyClick = () => {
//     API.post("/newOrder", {
//       name: uid,
//       qty: stockQuantity,
//       price: stockPrice,
//       mode: "BUY",
//     });

//     generalContext.closeBuyWindow();
//     window.location.reload();
//   };

//   const handleCancelClick = () => {
//     generalContext.closeBuyWindow();
//   };

//   return (
//     <div className="container" id="buy-window" draggable="true">
//       <div className="regular-order">
//         <div className="inputs">
//           <fieldset>
//             <legend>Qty.</legend>
//             <input
//               type="number"
//               name="qty"
//               id="qty"
//               onChange={(e) => setStockQuantity(e.target.value)}
//               value={stockQuantity}
//             />
//           </fieldset>
//           <fieldset>
//             <legend>Price</legend>
//             <input
//               type="number"
//               name="price"
//               id="price"
//               step="0.05"
//               // onChange={(e) => setStockPrice(e.target.value)}
//               value={stockPrice}
//               readOnly
//             />
//           </fieldset>
//         </div>
//       </div>

//       <div className="buttons">
//         <span>Margin required {(stockPrice*stockQuantity).toFixed(2)} </span>
//         <span>Margin available {allFunds.available} </span>
//         <div>
//           <button className="btn btn-blue" onClick={handleBuyClick} disabled={!canBuy}>
//             Buy
//           </button>
//           <button className="btn btn-grey" onClick={handleCancelClick}>
//             Cancel
//           </button>
//         </div>
//       </div>
//       <div style={{paddingTop:"3rem",paddingLeft:"1.2rem"}}>
//         {!canBuy && (<span style={{ color: "red", marginRight: "1rem" }}>You don't have enough margin</span>)}
//       </div>
//     </div>
//   );
// };

// export default BuyActionWindow;
import "./BuyWindow.css";
import React, { useState, useContext } from "react";
import API from "../Api";
import GeneralContext from "./GeneralContext";
import StockDataContext from "../context/StockDataContext";

const BuyActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext);
  const { livePrices, funds: allFunds, refetchData } = useContext(StockDataContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const currentStock = livePrices.find((s) => s.name === uid);
  const stockPrice = currentStock?.price || 0;

  const canBuy = stockQuantity * stockPrice <= allFunds.available && stockQuantity > 0;

  const handleBuyClick = async () => {
    try{
      console.log("Buy button clicked");
    await API.post("/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "BUY",
    });
    await refetchData(); 
    generalContext.closeBuyWindow();
    }catch (error) {
      console.error("Failed to place buy order:", error);
      alert("Could not place order. Please try again.");
    }
    
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              value={stockPrice}
              readOnly
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required {(stockPrice * stockQuantity).toFixed(2)} </span>
        <span>Margin available {allFunds.available} </span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick} disabled={!canBuy}>
            Buy
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
      <div style={{paddingTop:"3rem",paddingLeft:"1.2rem"}}>
        {!canBuy && (<span style={{ color: "red", marginRight: "1rem" }}>You don't have enough margin</span>)}
      </div>
    </div>
  );
};

export default BuyActionWindow;