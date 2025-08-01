import { Link } from "react-router-dom";
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import API from "../Api";

export default function Orders() {
  const ordersRef = useRef([]);

  const[allOrders,setAllOrders]=useState([]);
    useEffect(()=>{
      if (ordersRef.current.available > 0) {
        setAllOrders(ordersRef.current);
      }
      API.get("/allOrders").then((res)=>{
        ordersRef.current = res.data;
        setAllOrders(res.data);
      })
    },[]);


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
};
