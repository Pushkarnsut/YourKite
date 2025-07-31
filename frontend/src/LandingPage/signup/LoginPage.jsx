import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../Api";
const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL;
const LANDING_PAGE_URL = import.meta.env.VITE_LANDING_PAGE_URL;

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setIsLoading(true);
  
    try {
      const response = await API.post("/login", form);
      setMessage(response.data.message);
      setIsError(false);
      window.location.href = DASHBOARD_URL;

    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              id="loginusername"
              placeholder="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="loginusername">
              <i className="fa fa-user me-2"></i>Username
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              id="loginPassword"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="loginPassword">
              <i className="fa fa-lock me-2"></i>Password
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="d-flex justify-content-between mt-3">
          <Link to="/signup" className="text-primary text-decoration-underline">
            Sign up
          </Link>
          <Link to="/forgot-password" className="text-primary text-decoration-underline">
            Forgot Password?
          </Link>
        </div>
        {message && <div className={`alert mt-3 ${isError ?
        "alert-danger" : "alert-success"}`}>{message}</div>}
      </div>
    </div>
  );
}