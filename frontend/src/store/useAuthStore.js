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
    set({
      isLoggingIn: true,
    });

    try {
      const res =
        await axiosInstance.post(
          "/auth/login",
          data
        );

      console.log(
        "Login response:",
        res.data
      );

      set({
        authUser: res.data,
      });

      toast.success(
        "Logged in successfully"
      );

      // Socket connection
      get().connectSocket();

    } catch (error) {
      console.log(
        "Login status:",
        error?.response?.status
      );

      console.log(
        "Login error:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          "Login failed"
      );
    } finally {
      set({
        isLoggingIn: false,
      });
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