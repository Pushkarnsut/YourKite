import Menu from "./Menu";
import { useEffect,useState } from "react";
import axios from "axios";
import API from "../Api";

export default function TopBar({user}) {
  const [indices, setIndices] = useState([]);

  useEffect(() => {
    const fetchIndices = () => {
      API.get("/api/indices").then(res => setIndices(res.data));
    };
    fetchIndices();
    const interval = setInterval(fetchIndices, 1000);
    return () => clearInterval(interval);
  }, []);

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