import { create } from "zustand";
import {
  axiosInstance,
  SOCKET_URL,
} from "../lib/axios.js";

import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  // =========================
  // STATE
  // =========================

  authUser: null,

  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  onlineUsers: [],
  socket: null,

  // =========================
  // CHECK AUTH
  // =========================

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get(
        "/auth/check"
      );

      console.log(
        "Auth check successful:",
        res.data
      );

      set({
        authUser: res.data,
      });

      get().connectSocket();
    } catch (error) {
      console.log(
        "Error in checkAuth:",
        error?.response?.status,
        error?.response?.data
      );

      set({
        authUser: null,
      });
    } finally {
      set({
        isCheckingAuth: false,
      });
    }
  },

  // =========================
  // SIGN UP
  // =========================

  signup: async (data) => {
    set({
      isSigningUp: true,
    });

    try {
      const res =
        await axiosInstance.post(
          "/auth/signup",
          data
        );

      console.log(
        "Signup response:",
        res.data
      );

      set({
        authUser: res.data,
      });

      toast.success(
        "Account created successfully"
      );

      get().connectSocket();
    } catch (error) {
      console.log(
        "Error in signup:",
        error?.response?.status,
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          "Signup failed"
      );
    } finally {
      set({
        isSigningUp: false,
      });
    }
  },

  // =========================
  // LOGIN
  // =========================

login: async (data) => {
  console.log("🔐 [LOGIN] Starting login process");
  console.log("🔐 [LOGIN] Login data:", { 
    email: data?.email || data?.username || "unknown",
    hasPassword: !!data?.password 
  });
  
  set({ isLoggingIn: true });

  try {
    console.log("🔐 [LOGIN] Sending POST request to /auth/login");
    
    // ✅ FIXED: No trailing slash
    const res = await axiosInstance.post("/auth/login", data);
    
    console.log("🔐 [LOGIN] ✅ Response received");
    console.log("🔐 [LOGIN] Response status:", res.status);
    console.log("🔐 [LOGIN] Response data:", res.data);
    
    if (!res.data) {
      throw new Error("No user data received");
    }
    
    if (!res.data._id) {
      console.error("❌ User ID missing:", res.data);
      throw new Error("Invalid user data: missing _id");
    }

    set({ authUser: res.data });
    toast.success("Logged in successfully");
    
    // Connect socket
    get().connectSocket();
    
    console.log("🔐 [LOGIN] ✅ Login complete");
    
  } catch (error) {
    console.error("🔐 [LOGIN] ❌ Error:", error.message);
    
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      console.error("No response from server - CORS or network issue");
    }
    
    const errorMessage = error?.response?.data?.message || 
                        error?.message || 
                        "Login failed";
    
    toast.error(errorMessage);
    
  } finally {
    set({ isLoggingIn: false });
    console.log("🔐 [LOGIN] 🏁 Login process completed");
  }
},

  // =========================
  // LOGOUT
  // =========================

  logout: async () => {
    try {
      await axiosInstance.post(
        "/auth/logout"
      );

      get().disconnectSocket();

      set({
        authUser: null,
        onlineUsers: [],
      });

      toast.success(
        "Logged out successfully"
      );
    } catch (error) {
      console.log(
        "Logout status:",
        error?.response?.status
      );

      console.log(
        "Logout error:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          "Logout failed"
      );
    }
  },

  // =========================
  // UPDATE PROFILE
  // =========================

  updateProfile: async (data) => {
    set({
      isUpdatingProfile: true,
    });

    try {
      const res =
        await axiosInstance.put(
          "/auth/update-profile",
          data
        );

      set({
        authUser: res.data,
      });

      toast.success(
        "Profile updated successfully"
      );
    } catch (error) {
      console.log(
        "Update profile status:",
        error?.response?.status
      );

      console.log(
        "Update profile error:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          "Profile update failed"
      );
    } finally {
      set({
        isUpdatingProfile: false,
      });
    }
  },

  // =========================
  // CONNECT SOCKET
  // =========================

  connectSocket: () => {
    const {
      authUser,
      socket,
    } = get();

    if (!authUser) {
      console.log(
        "Socket not connected: no authenticated user"
      );
      return;
    }

    if (socket?.connected) {
      return;
    }

    console.log(
      "Connecting socket to:",
      SOCKET_URL
    );

    const newSocket = io(
      SOCKET_URL,
      {
        withCredentials: true,

        query: {
          userId: authUser._id,
        },

        transports: [
          "websocket",
          "polling",
        ],
      }
    );

    set({
      socket: newSocket,
    });

    newSocket.on(
      "connect",
      () => {
        console.log(
          "Socket connected:",
          newSocket.id
        );
      }
    );

    newSocket.on(
      "connect_error",
      (error) => {
        console.error(
          "Socket connection error:",
          error.message
        );
      }
    );

    newSocket.on(
      "disconnect",
      (reason) => {
        console.log(
          "Socket disconnected:",
          reason
        );
      }
    );

    newSocket.on(
      "getOnlineUsers",
      (userIds) => {
        set({
          onlineUsers: userIds,
        });
      }
    );
  },

  // =========================
  // DISCONNECT SOCKET
  // =========================

  disconnectSocket: () => {
    const socket = get().socket;

    if (socket) {
      socket.disconnect();
    }

    set({
      socket: null,
      onlineUsers: [],
    });
  },
}));