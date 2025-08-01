import { Link } from "react-router-dom";
import {useState,useEffect,useRef} from "react";
import AddFundsWindow from "./AddFundsWindow";
import WithdrawFundsWindow from "./WithdrawFundsWindow";
import axios from "axios";
import API from "../Api";

export default function Funds() {
  const fundsRef = useRef([]);

  const[allFunds,setAllFunds]=useState([]);
    useEffect(()=>{
      if (fundsRef.current.length > 0) {
        setAllFunds(fundsRef.current);
      }
      API.get("/Funds").then((res)=>{
        fundsRef.current = res.data;
        setAllFunds(res.data);
      })
    },[]);

  const [isAddFundsOpen,setAddFundsOpen]=useState(false);
  const openAddFundsWindow = () => {
    setAddFundsOpen(true);
  };
  const closeAddFundsWindow = () => {
    setAddFundsOpen(false);
  };

  const [isWithdrawFundsOpen, setWithdrawFundsOpen] = useState(false);
  const openWithdrawFundsWindow = () => {
    setWithdrawFundsOpen(true);
  };
  const closeWithdrawFundsWindow = () => {
    setWithdrawFundsOpen(false);
  };


  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <button className="btn btn-green" onClick={openAddFundsWindow}>Add funds</button>
        <button className="btn btn-blue" onClick={openWithdrawFundsWindow}>Withdraw</button>
        {isAddFundsOpen && <AddFundsWindow close={closeAddFundsWindow} />}
        {isWithdrawFundsOpen && <WithdrawFundsWindow close={closeWithdrawFundsWindow} />}
      </div>

      <div className="row-funds">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table-funds">
            <div className="data">
              <p>Available margin</p>
              <p className="imp-colored">{allFunds.available}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{allFunds.used}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{allFunds.available}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>{allFunds.available}</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>{allFunds.payin}</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        {/* <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div> */}
      </div>
    </>
  );
};

