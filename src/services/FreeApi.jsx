import axios from "axios";
const VITE_BACKEND_ENDPOINT_URL = import.meta.env.VITE_BACKEND_ENDPOINT_URL;

const FreeAPI = axios.create({
  baseURL: VITE_BACKEND_ENDPOINT_URL,
});

// Attach token to headers if available
FreeAPI.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default FreeAPI;

