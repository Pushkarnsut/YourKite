import { useState,useContext } from "react";
import API from "../Api";
import StockDataContext from "../context/StockDataContext";

export default function WithdrawFundsWindow({ close }) {
  const { funds: allFunds, refetchData } = useContext(StockDataContext);
  const [newamount, setNewAmount] = useState(1);

  const handleWithdrawClick = async () => {
    try {
      await API.post("/withdrawfunds", {
        amount: newamount
      });
      close();
      await refetchData();
    } catch (error) {
      console.error("Failed to withdraw funds:", error);
      alert("Could not withdraw funds. Please try again.");
    }
  };
  const canWithdraw = newamount > 0 && newamount <= allFunds.available;


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
            Available for Withdrawal: ₹{allFunds.available}
          </div>
        </div>
      </div>

      <div className="buttons">
        <div>
          <button className="btn btn-blue" onClick={handleWithdrawClick} disabled={!canWithdraw} >
            Withdraw
          </button>
          <button className="btn btn-grey" onClick={close} >
            Cancel
          </button>
        </div>
      </div>
      <div style={{paddingTop:"1rem",paddingLeft:"1.2rem"}}>
        {!canWithdraw && newamount > allFunds.available && (
          <span style={{ color: "red" }}>
            Insufficient funds. Available: ₹{allFunds.available}
          </span>
        )}
      </div>
    </div>
  );
}
