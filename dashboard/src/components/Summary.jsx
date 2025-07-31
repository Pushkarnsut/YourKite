import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../Api";
import millify from "millify";

import DoughnutChart from "./DoughnutChart";

export default function Summary({ user }) {
  const[allFunds,setAllFunds]=useState({available: 0, used: 0, payin: 0});
  useEffect(()=>{
    API.get("/Funds").then((res)=>{
      setAllFunds(res.data);
     })
  },[]);


  const[allHoldings,setAllHoldings]=useState([]);
    useEffect(()=>{
      API.get("/allHoldings").then((res)=>{
        setAllHoldings(res.data);
      })
    },[]);

  const [livePrices, setLivePrices] = useState([]);
  useEffect(() => {
    const fetchPrices = () => {
      API.get("/api/watchlist").then((res) => {
        setLivePrices(res.data);
      }).catch((err)=>{
        setLivePrices([]);
      });
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 1000);
    return () => clearInterval(interval);
  }, []);
    
   const mergedHoldings = allHoldings.map((holding) => {
    const live = livePrices.find((s) => s.name === holding.name);
    return live
      ? { ...holding, price: live.price }
      : holding;
  });
  
    const totalInvestment = ()=>{
      return mergedHoldings.reduce((res,stock)=>{
        return res+(stock.avg*stock.qty);
      },0);
    }
    const totalCurrInvestment = ()=>{
      return mergedHoldings.reduce((res,stock)=>{
        return res+(stock.price*stock.qty);
      },0);
    }
    const totalProfit = ()=>{
      return totalCurrInvestment()-totalInvestment();
    }
    const istotalprofit=totalProfit() >= 0.0
    const totalprofclass=istotalprofit?"profit":"loss";

  return (
    <>
      <div className="username">
        <h6>Hi, {user.name}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{millify(allFunds?.available || 0, {precision:2})}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{millify(allFunds?.used || 0, {precision:2})}</span>{" "}
            </p>
            <p>
              Opening balance <span>{millify(allFunds?.available || 0, {precision:2})}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({mergedHoldings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={totalprofclass}>
              {millify(totalProfit(),{precision:2})}<small>({totalInvestment() > 0 ? ((totalProfit()/totalInvestment())*100).toFixed(2) : '0.00'}%)</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{millify(totalCurrInvestment(),{precision:2})}</span>{" "}
            </p>
            <p>
              Investment <span>{millify(totalInvestment(),{precision:2})}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <DoughnutChart holdings={mergedHoldings}></DoughnutChart>
    </>
  );
};