// import {Tooltip,Grow} from "@mui/material";
// import { BarChartOutlined,MoreHoriz,KeyboardArrowDown,KeyboardArrowUp} from "@mui/icons-material";
// import { useState,useEffect,useContext } from "react";
// import GeneralContext from "./GeneralContext";
// import axios from "axios";
// import API from "../Api";

// export default function WatchList() {
//   const [watchlist, setWatchlist] = useState([]);

//   useEffect(() => {
//     const fetchData = () => {
//       API.get("/api/watchlist").then(res => setWatchlist(res.data)).catch((err)=>{
//         setWatchlist([]);
//       });
//     };
//     fetchData();
//     const interval = setInterval(fetchData, 1000);
//     return () => clearInterval(interval);
//   }, []);


//   return (
//     <div className="watchlist-container">
//       <div className="search-container">
//         <input
//           type="text"
//           name="search"
//           id="search"
//           placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
//           className="search"
//         />
//         <span className="counts"> {watchlist.length} / 50</span>
//       </div>

//       <ul className="list">
//         {watchlist.map((stock,index) => {
//           return(
//             <WatchListItem stock={stock} key={index}/>
//           )
//         })}
//       </ul>
//     </div>
//   );
// };
// const WatchListItem =({stock})=>{
//   const[watchListAction,setWatchListAction]=useState(false);
//   const watchListItemEnter =(evt)=>{
//     setWatchListAction(true);
//   }
//   const watchListItemLeave =(evt)=>{
//     setWatchListAction(false);
//   }

//   const percent =
//     (stock.netChange >= 0 ? "+" : "") +
//     (stock.percentageChange).toFixed(2) +
//     "%";
//   return(
//     <li onMouseEnter={watchListItemEnter} onMouseLeave={watchListItemLeave} >
//       <div className="item">
//         <p style={{fontWeight:"500"}} className={stock.netChange < 0 ? "down" : "up"}>{stock.name} </p>
//         <div className="itemInfo">
//           <span className="percent">{percent}</span>
//           {stock.netChange < 0 ? (<KeyboardArrowDown className="down"/>) : (<KeyboardArrowUp className="up"/>)}
//           <span className="price">{stock.price}</span>
//         </div>
//       </div>
//       {watchListAction && watchListItemAction({uid:stock.name,price:stock.price})}
//     </li>
//   )
// }

// const watchListItemAction =({uid,price})=>{
//   const generalContext = useContext(GeneralContext);

//   const handleBuyClick = () => {
//     generalContext.openBuyWindow(uid,price);
//   };
//   const handleSellClick = ()=>{
//     generalContext.openSellWindow(uid,price);
//   }
//   return(
//     <span className="actions">
//       <span>
//         <Tooltip title="Buy (B)" placement="top" TransitionComponent={Grow} arrow onClick={handleBuyClick}>
//           <button className="buy">Buy</button>
//         </Tooltip>
//         <Tooltip title="Sell (S)" placement="top" TransitionComponent={Grow} arrow onClick={handleSellClick}>
//           <button className="sell">Sell</button>
//         </Tooltip>
//         <Tooltip title="Analysis (A)" placement="top" TransitionComponent={Grow} arrow>
//           <button className="action"><BarChartOutlined className="icon"/></button>
//         </Tooltip>
//         <Tooltip title="More" placement="top" TransitionComponent={Grow} arrow>
//           <button className="action"><MoreHoriz className="icon"/></button>
//         </Tooltip>
//       </span>
//     </span>
//   )
// }
import {Tooltip,Grow} from "@mui/material";
import { BarChartOutlined,MoreHoriz,KeyboardArrowDown,KeyboardArrowUp} from "@mui/icons-material";
import { useState,useContext } from "react";
import GeneralContext from "./GeneralContext";
import StockDataContext from "../context/StockDataContext";

export default function WatchList() {
  const { livePrices: watchlist } = useContext(StockDataContext);

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock,index) => {
          return(
            <WatchListItem stock={stock} key={index}/>
          )
        })}
      </ul>
    </div>
  );
}

const WatchListItem =({stock})=>{
  const[watchListAction,setWatchListAction]=useState(false);
  const watchListItemEnter =(evt)=>{
    setWatchListAction(true);
  }
  const watchListItemLeave =(evt)=>{
    setWatchListAction(false);
  }

  const percent =
    (stock.netChange >= 0 ? "+" : "") +
    (stock.percentageChange).toFixed(2) +
    "%";
  return(
    <li onMouseEnter={watchListItemEnter} onMouseLeave={watchListItemLeave} >
      <div className="item">
        <p style={{fontWeight:"500"}} className={stock.netChange < 0 ? "down" : "up"}>{stock.name} </p>
        <div className="itemInfo">
          <span className="percent">{percent}</span>
          {stock.netChange < 0 ? (<KeyboardArrowDown className="down"/>) : (<KeyboardArrowUp className="up"/>)}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {watchListAction && watchListItemAction({uid:stock.name,price:stock.price})}
    </li>
  )
}

const watchListItemAction =({uid,price})=>{
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid,price);
  };
  const handleSellClick = ()=>{
    generalContext.openSellWindow(uid,price);
  }
  return(
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" placement="top" TransitionComponent={Grow} arrow onClick={handleBuyClick}>
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip title="Sell (S)" placement="top" TransitionComponent={Grow} arrow onClick={handleSellClick}>
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip title="Analysis (A)" placement="top" TransitionComponent={Grow} arrow>
          <button className="action"><BarChartOutlined className="icon"/></button>
        </Tooltip>
        <Tooltip title="More" placement="top" TransitionComponent={Grow} arrow>
          <button className="action"><MoreHoriz className="icon"/></button>
        </Tooltip>
      </span>
    </span>
  )
}