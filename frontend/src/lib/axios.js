import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://chatsphere-amse.onrender.com";

export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "https://chatsphere-amse.onrender.com";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`🚀 [REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
    console.log("📦 Request data:", config.data);
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ [RESPONSE] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ [RESPONSE ERROR] ${error.config?.url}`, error.message);
    return Promise.reject(error);
  }
);