import axios from "axios";
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');
      alert(error.response.data.message || "Your session has expired");
      window.location.href = import.meta.env.VITE_LOGIN_URL;
    }
    return Promise.reject(error);
  }
);
export default API;