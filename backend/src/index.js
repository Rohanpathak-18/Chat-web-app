import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

// =========================
// CORS
// =========================

app.use(
  cors({
    origin: "https://chatsphere-web.onrender.com",
    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// =========================
// MIDDLEWARE
// =========================

app.use(express.json());

app.use(cookieParser());

// =========================
// ROUTES
// =========================

app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.status(200).json({
    message: "ChatSphere backend is running",
  });
});

// =========================
// SERVER
// =========================

server.listen(PORT, () => {
  console.log(
    `Server is running on PORT: ${PORT}`
  );

  connectDB();
});