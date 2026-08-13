import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const app = express();

const server = http.createServer(app);

// =========================
// MIDDLEWARE
// =========================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chatsphere-web.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// =========================
// SOCKET.IO
// =========================

export const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chatsphere-web.onrender.com",
    ],

    credentials: true,

    methods: ["GET", "POST"],
  },
});

// =========================
// SOCKET USERS
// =========================

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit(
    "getOnlineUsers",
    Object.keys(userSocketMap)
  );

  socket.on("disconnect", () => {
    console.log(
      "A user disconnected:",
      socket.id
    );

    if (userId) {
      delete userSocketMap[userId];
    }

    io.emit(
      "getOnlineUsers",
      Object.keys(userSocketMap)
    );
  });
});

// =========================
// ROUTES
// =========================

app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);

// =========================
// HEALTH CHECK
// =========================

app.get("/", (req, res) => {
  res.status(200).json({
    message: "ChatSphere backend is running",
  });
});

// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(
    `Server is running on PORT: ${PORT}`
  );

  connectDB();
});