// import "./BuyWindow.css";
// import React, { useState,useEffect } from "react";
// import axios from "axios";
// import API from "../Api";

// import GeneralContext from "./GeneralContext";
// import { useContext } from "react";


// const SellActionWindow = ({ uid }) => {
//   const[allHoldings,setAllHoldings]=useState([]);
//   useEffect(()=>{
//     API.get("/allHoldings").then((res)=>{
//       setAllHoldings(res.data);
//     })
//   },[]);
//   const hasStock=allHoldings.find((h)=> h.name === uid);
//   let hasStockQty;
//   if(hasStock){
//     hasStockQty=hasStock.qty;
//   }

//   const generalContext = useContext(GeneralContext);
//   const [stockQuantity, setStockQuantity] = useState(1);
//   const [stockPrice, setStockPrice] = useState(0);

//   useEffect(() => {
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

//   const canSell=stockQuantity <= hasStockQty && stockQuantity>0;
//   const handleSellClick = () => {
//     API.post("/newOrder", {
//       name: uid,
//       qty: stockQuantity,
//       price: stockPrice,
//       mode: "SELL",
//     });

//     generalContext.closeSellWindow();
//     window.location.reload();
//   };

//   const handleCancelClick = () => {
//     generalContext.closeSellWindow();
//   };

//   return (
//     <div className="container" id="buy-window" >
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
//               disabled={!hasStock}
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
//               disabled={!hasStock}
//             />
//           </fieldset>
//         </div>
//       </div>

//       <div className="buttons">
//         {!hasStock && (<span style={{ color: "red", marginRight: "1rem" }}>You don't have this stock in your holdings</span>)}
//         <span>Value {(stockPrice*stockQuantity).toFixed(2)}</span>
//         <div>
//           <button className="btn btn-blue" onClick={handleSellClick} disabled={!hasStock || !canSell}>
//             Sell
//           </button>
//           <button className="btn btn-grey" onClick={handleCancelClick}>
//             Cancel
//           </button>
//         </div>
//       </div>
//       <div style={{paddingTop:"3rem",paddingLeft:"1.2rem"}}>
//         {!canSell && hasStock && (<span style={{ color: "red", marginRight: "1rem" }}>You don't have enough quantity</span>)}
//       </div>
//     </div>
//   );
// };

// export default SellActionWindow;
import "./BuyWindow.css";
import React, { useState, useContext } from "react";
import API from "../Api";
import GeneralContext from "./GeneralContext";
import StockDataContext from "../context/StockDataContext";

const SellActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext);
  const { livePrices, holdings: allHoldings, refetchData } = useContext(StockDataContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const currentStock = livePrices.find((s) => s.name === uid);
  const stockPrice = currentStock?.price || 0;
  const hasStock = allHoldings.find((h) => h.name === uid);
  const hasStockQty = hasStock ? hasStock.qty : 0;

  const canSell = stockQuantity <= hasStockQty && stockQuantity > 0;

  const handleSellClick = async () => {
    try {
      await API.post("/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
      });
      await refetchData();
      generalContext.closeSellWindow();
    } catch (error) {
      console.error("Failed to place sell order:", error);
      alert("Could not place order. Please try again.");
    }
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
    <div className="container" id="buy-window">
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
              disabled={!hasStock}
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
              disabled={!hasStock}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        {!hasStock && (
          <span style={{ color: "red", marginRight: "1rem" }}>
            You don't have this stock in your holdings
          </span>
        )}
        <span>Value {(stockPrice * stockQuantity).toFixed(2)}</span>
        <div>
          <button className="btn btn-blue" onClick={handleSellClick} disabled={!hasStock || !canSell}>
            Sell
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
      <div style={{paddingTop:"3rem",paddingLeft:"1.2rem"}}>
        {!canSell && hasStock && (
          <span style={{ color: "red", marginRight: "1rem" }}>
            You don't have enough quantity
          </span>
        )}
      </div>
    </div>
  );
};

export default SellActionWindow;