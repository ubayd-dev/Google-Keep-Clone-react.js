//  import axios
import axios from "axios";

// create baseURL
const api = axios.create({
  baseURL: "http://localhost:1338",
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token automatically if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
