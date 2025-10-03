import api from "./axios.js";

export const signup = (userData) => api.post("/user", userData);
export const login = (userData) => api.post("/user/login", userData);
