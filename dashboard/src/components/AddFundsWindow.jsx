import { useState } from "react";
// import "./BuyWindow.css";
import axios from "axios";

export default function AddFundsWindow({ close }) {
  const [newamount, setNewAmount] = useState(100);
  const handleAddClick = () => {
      axios.post("http://localhost:3000/addfunds", {
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
