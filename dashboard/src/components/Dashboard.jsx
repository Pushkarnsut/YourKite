import { Route, Routes } from "react-router-dom";
import {GeneralContextProvider} from "./GeneralContext";
import Appmain from "./Appmain";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";

export default function Dashboard({user}) {
    return(
    <div className="dashboard-container">
            <GeneralContextProvider>
                <WatchList />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Summary user={user} />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/holdings" element={<Holdings />} />
                        <Route path="/positions" element={<Positions />} />
                        <Route path="/funds" element={<Funds />} />
                        <Route path="/appmain" element={<Appmain />} />
                    </Routes>
                </div>
            </GeneralContextProvider>
        </div>
    );
}