import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import cookieParser from "cookie-parser";
import cors from "cors";

import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;



const allowedOrigins = [
  "http://localhost:5173",
  "https://chatsphere-web.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);



app.use(
  express.json({
    limit: "5mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "5mb",
  })
);



app.use(cookieParser());



app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);



app.get("/", (req, res) => {
  res.status(200).json({
    message: "ChatSphere backend is running",
  });
});



server.listen(PORT, () => {
  console.log(
    `Server is running on PORT: ${PORT}`
  );

  connectDB();
});