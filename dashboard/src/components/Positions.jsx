import { useState,useEffect } from "react";
import axios from "axios";
// import { positions } from "../dataset/data";
export default function Positions() {
  const[allPositions,setAllPositions]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3000/allPositions").then((res)=>{
      setAllPositions(res.data);
    })
  },[]);
  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>
          </thead>
          <tbody>
          {allPositions.map((stock, index) => {
            const currValue = stock.price * stock.qty;
            const isprofit = currValue - stock.avg * stock.qty >= 0.0;
            const profclass = isprofit ? "profit" : "loss";
            const dayclass = stock.isLoss ? "loss" : "profit";
            return (
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td className={profclass}>
                  {(currValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={dayclass}>{stock.day}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </>
  );
}
