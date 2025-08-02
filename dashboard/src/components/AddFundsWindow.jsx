import { useState,useContext } from "react";
import axios from "axios";
import API from "../Api";
import StockDataContext from "../context/StockDataContext";

export default function AddFundsWindow({ close }) {
  const { funds: allFunds } = useContext(StockDataContext);
  const [newamount, setNewAmount] = useState(100);
  const handleAddClick = () => {
      API.post("/addfunds", {
        amount: newamount
      });
      close();
      window.location.reload();
    };
  
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
          <div style={{ marginTop: "1rem", fontSize: "14px", color: "#666" }}>
            Current Available: ₹{allFunds.available}
          </div>
        </div>
      </div>

      <div className="buttons">
        <div>
          <button className="btn btn-blue" onClick={handleAddClick} disabled={newamount<=0} >
            Add Funds
          </button>
          <button className="btn btn-grey" onClick={close} >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
