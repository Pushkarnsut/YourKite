import React, { createContext, useState, useContext, useEffect,useCallback } from 'react';
import API from "../Api"
const StockDataContext = createContext();

export function StockDataProvider({ children }) {
  const [allHoldings, setAllHoldings] = useState([]);
  const [livePrices, setLivePrices] = useState([]);
  const [allFunds, setAllFunds] = useState({available: 0, used: 0, payin: 0});
  const [allOrders, setAllOrders] = useState([]);
  const [allPositions, setAllPositions] = useState([]);
  const [indices, setIndices] = useState([]);

  const refetchData = useCallback(async () => {
    try {
      const fundsRes = await API.get("/Funds");
      setAllFunds(fundsRes.data);

      const holdingsRes = await API.get("/allHoldings");
      setAllHoldings(holdingsRes.data);

      const ordersRes = await API.get("/allOrders");
      setAllOrders(ordersRes.data);

      const positionsRes = await API.get("/allPositions");
      setAllPositions(positionsRes.data);

      console.log("Data refetched successfully!");
    } catch (err) {
      console.error("Error refetching data:", err);
    }
  }, []);

  // useEffect(() => {
  //   refetchData();
  // }, [refetchData]); 

  useEffect(() => {
    API.get("/allHoldings")
      .then((res) => {
        setAllHoldings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching holdings:", err);
      });
  }, []); 

  useEffect(() => {
    API.get("/Funds")
      .then((res) => {
        setAllFunds(res.data);
      })
      .catch((err) => {
        console.error("Error fetching funds:", err);
      });
  }, []); 

  useEffect(() => {
    API.get("/allOrders")
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []); 

  useEffect(() => {
    API.get("/allPositions")
      .then((res) => {
        setAllPositions(res.data);
      })
      .catch((err) => {
        console.error("Error fetching positions:", err);
      });
  }, []); 

  useEffect(() => {
    const fetchPrices = () => {
      API.get("/api/watchlist")
        .then((res) => {
          setLivePrices(res.data);
        })
        .catch((err) => {
          console.error("Error fetching prices:", err);
        });
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 1000);
    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    const fetchLiveData = () => {
      API.get("/api/indices")
        .then((res) => setIndices(res.data))
        .catch((err) => console.error("Error fetching indices:", err));
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 1000);
    return () => clearInterval(interval); 
  }, []);

  const mergedHoldings = allHoldings.map((holding) => {
    const live = livePrices.find((s) => s.name === holding.name);
    return live ? { ...holding, price: live.price, day: live.percentageChange } : holding;
  });

  const totalInvestment = mergedHoldings.reduce((res, stock) => {
    const avg = Number(stock.avg) || 0;
    const qty = Number(stock.qty) || 0;
    return res + (avg * qty);
  }, 0);

  const totalCurrInvestment = mergedHoldings.reduce((res, stock) => {
    const price = Number(stock.price) || 0;
    const qty = Number(stock.qty) || 0;
    return res + (price * qty);
  }, 0);

  const totalProfit = totalCurrInvestment - totalInvestment;

  return (
    <StockDataContext.Provider value={{
      holdings: mergedHoldings,
      rawHoldings: allHoldings,
      funds: allFunds,
      orders: allOrders,
      positions: allPositions,
      livePrices,
      indices,
      totalInvestment,
      totalCurrInvestment,
      totalProfit,
      refetchData,
    }}>
      {children}
    </StockDataContext.Provider>
  );
}

export default StockDataContext;