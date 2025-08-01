// import { Link } from "react-router-dom";
// import { useState,useEffect,useRef } from "react";
// import axios from "axios";
// import API from "../Api";

// export default function Orders() {

//   const[allOrders,setAllOrders]=useState([]);
//     useEffect(()=>{
//       API.get("/allOrders").then((res)=>{
//         setAllOrders(res.data);
//       })
//     },[]);


//   return (
//     <>
//     <h3 className="title">Orders ({allOrders.length})</h3>

//       <div className="order-table">
//         <table>
//           <thead>
//             <tr>
//             <th>Name</th>
//             <th>Qty.</th>
//             <th>Price</th>
//             <th>Mode</th>
//           </tr>
//           </thead>
//           <tbody>
//           {allOrders.map((stock, index) => {
//             return (
//               <tr key={index}>
//                 <td>{stock.name}</td>
//                 <td>{stock.qty}</td>
//                 <td>{stock.price.toFixed(2)}</td>
//                 <td>{stock.mode}</td>
//               </tr>
//             );
//           })}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };
import React, { useContext } from "react";
import StockDataContext from "../context/StockDataContext";

export default function Orders() {
  const { orders: allOrders } = useContext(StockDataContext);

  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((stock, index) => {
              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{stock.mode}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}