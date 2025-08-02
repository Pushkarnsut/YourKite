import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom"
import { useState,useEffect } from "react";
import Home from "./components/Home"
import "./App.css"
import "./DarkTheme.css"
import { StockDataProvider } from "./context/StockDataContext";
import { ThemeProvider } from "./context/ThemeContext";
import axios from "axios";
import API from "./Api";

axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');
      sessionStorage.clear();
      window.location.href = import.meta.env.VITE_LOGIN_URL;
    }
    return Promise.reject(error);
  }
);

export default function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await API.get("/check-auth");
        setIsAuthenticated(response.data.isAuthenticated);
        setUser(response.data.user);
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }
  if (!isAuthenticated) {
    window.location.href = LOGIN_URL;
    return null;
  }

    return(
    <ThemeProvider>
      <StockDataProvider>
        <BrowserRouter>
          <Routes>
           <Route path="/*" element={<Home user={user} />}/>
          </Routes>
        </BrowserRouter>
      </StockDataProvider>
    </ThemeProvider>
  );
}