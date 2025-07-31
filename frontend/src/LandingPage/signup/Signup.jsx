import { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import API from "../../Api";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: ""
  });
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
    if (form.password !== form.repeatPassword) {
      setMessage("Passwords do not match!");
      setIsError(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await API.post("/signup", form);
      setMessage(response.data.message);
      setIsError(false);
      navigate("/login");
    } catch (error) {
      setMessage(error.response.data.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{top:0}}>
      <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%"}}>
        <h2 className="mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              id="signupName"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="signupName">
              <i className="fa fa-user me-2"></i>Name
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              id="signupUsername"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="signupUsername">
              <i className="fa fa-user-circle me-2"></i> Set Username
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              id="signupEmail"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="signupEmail">
              <i className="fa fa-envelope me-2"></i>Email
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              id="signupPassword"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="signupPassword">
              <i className="fa fa-lock me-2"></i> Set Password
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              name="repeatPassword"
              className="form-control"
              id="signupRepeatPassword"
              placeholder="Repeat Password"
              value={form.repeatPassword}
              onChange={handleChange}
              required
            />
            <label htmlFor="signupRepeatPassword">
              <i className="fa fa-lock me-2"></i>Repeat Password
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? ("Signing Up...") : ("Sign Up")}
          </button>
        </form>
        <div className="text-center mt-3">
          Already registered?{" "}
          <Link to="/login" className="text-primary text-decoration-underline">
            Login
          </Link>
        </div>
        {message && <div className={`alert mt-3 ${isError ? "alert-danger" : "alert-success"}`}>{message}</div>}
      </div>
    </div> 
  );
} 