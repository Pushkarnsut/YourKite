import Menu from "./Menu";
import {useContext } from "react";
import StockDataContext from "../context/StockDataContext";

export default function TopBar({user}) {
  const { indices } = useContext(StockDataContext);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className={indices[0]?.netChange < 0 ? "down" : "up"}>{indices[0]?.price} </p>
          <p className="percent"> </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className={indices[1]?.netChange < 0 ? "down" : "up"}>{indices[1]?.price}</p>
          <p className="percent"></p>
        </div>
      </div>

      <Menu user={user} />
    </div>
  );
};