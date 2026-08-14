import axios from "axios";
export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});