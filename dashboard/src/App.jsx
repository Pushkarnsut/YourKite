import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom"
import { useState,useEffect } from "react";
import Home from "./components/Home"
import "./App.css"
import axios from "axios";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3000/check-auth");
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
    window.location.href = "http://localhost:5173/login";
    return null;
  }

    return(
      <BrowserRouter>
        <Routes>
         <Route path="/*" element={<Home user={user} />}/>
        </Routes>
      </BrowserRouter>
    );
}