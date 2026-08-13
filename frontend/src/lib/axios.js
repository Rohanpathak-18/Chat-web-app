import axios from "axios";

export const API_BASE_URL =
  "https://chatsphere-amse.onrender.com/api";

export const SOCKET_URL =
  "https://chatsphere-amse.onrender.com";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});