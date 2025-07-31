import { useState,useEffect } from "react";
// import "./BuyWindow.css";
import axios from "axios";
import API from "../Api";

export default function WithdrawFundsWindow({ close }) {
  const [newamount, setNewAmount] = useState(1);
  const [allFunds, setAllFunds] = useState([]);

  useEffect(()=>{
        API.get("/Funds").then((res)=>{
          setAllFunds(res.data);
         })
  },[]);
  const handleAddClick = () => {
      API.post("/withdrawfunds", {
        amount: newamount
      });
      close();
      window.location.reload();
    };
  const canadd= newamount > 0 && newamount <= allFunds.available;


  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Amount</legend>
            <input
              type="number"
              name="amount"
              id="amount"
              step="0.05"
              onChange={(e) => setNewAmount(e.target.value)}
              value={newamount}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <div>
          <button className="btn btn-blue" onClick={handleAddClick} disabled={!canadd} >
            Withdraw
          </button>
          <button className="btn btn-grey" onClick={close} >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
