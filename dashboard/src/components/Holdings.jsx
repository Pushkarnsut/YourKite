import { useState,useEffect,useRef } from "react";
import axios from "axios";
import API from "../Api";
// import { holdings } from "../dataset/data";

export default function Holdings() {
  const holdingsRef = useRef([]);
  const pricesRef = useRef([]);

  const[allHoldings,setAllHoldings]=useState([]);
  useEffect(()=>{
    if (holdingsRef.current.length > 0) {
      setAllHoldings(holdingsRef.current);
    }
    API.get("/allHoldings").then((res)=>{
      holdingsRef.current = res.data;
      setAllHoldings(res.data);
    })
  },[]);

  const [livePrices, setLivePrices] = useState([]);
  useEffect(() => {
    if (pricesRef.current.length > 0) {
      setLivePrices(pricesRef.current);
    }

    const fetchPrices = () => {
      API.get("/api/watchlist").then((res) => {
        pricesRef.current = res.data;
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
      ? { ...holding, price: live.price ,day: live.percentageChange}
      : holding;
  });

  const totalInvestment = ()=>{
  return mergedHoldings.reduce((res,stock)=>{
    const avg = Number(stock.avg) || 0;
    const qty = Number(stock.qty) || 0;
    return res + (avg * qty);
  },0);
}
  const totalCurrInvestment = ()=>{
    return mergedHoldings.reduce((res,stock)=>{
    const price = Number(stock.price) || 0;
    const qty = Number(stock.qty) || 0;
    return res + (price * qty);
    },0);
  }
  const totalProfit = ()=>{
    return totalCurrInvestment()-totalInvestment();
  }
  const istotalprofit=totalProfit() >= 0.0
  const totalprofclass=istotalprofit?"profit":"loss";

  return (
    <>
      <h3 className="title">Holdings ({mergedHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
            </tr>
          </thead>  
          <tbody>
            {mergedHoldings.map((stock,index) => {
            const currValue=stock.price*stock.qty
            const isprofit=currValue - stock.avg * stock.qty >= 0.0
            const profclass=isprofit?"profit":"loss";
            const dayclass=stock.day>0 ?"profit":"loss";
            return(
              <tr key={index}>
                <td >{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{currValue.toFixed(2)}</td>
                <td className={profclass}>{(currValue - stock.avg * stock.qty).toFixed(2)}</td>
                <td className={profclass}>{stock.avg > 0 ? (((stock.price - stock.avg) / stock.avg) * 100).toFixed(2) + "%" : "0.00%"}</td>
                <td className={dayclass}>{typeof stock.day === "number" ? (stock.day >= 0 ? "+" : "") + stock.day.toFixed(2) + "%" : "+0.00%"}</td>
              </tr>
            ) 
          })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {totalInvestment().toFixed(2)}
          </h5>
          <p className="bold-text">Total investment</p>
        </div>
        <div className="col">
          <h5>
            {totalCurrInvestment().toFixed(2)}
          </h5>
          <p className="bold-text">Current value</p>
        </div>
        <div className="col">
          <h5 className={totalprofclass}>{totalProfit().toFixed(2)} ({totalInvestment() > 0 ? ((totalProfit()/totalInvestment())*100).toFixed(2) : '0.00'}%)</h5>
          <p className="bold-text">P&L</p>
        </div>
      </div>
    </>
  );
};
