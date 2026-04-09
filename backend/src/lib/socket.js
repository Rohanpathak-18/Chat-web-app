import { Server } from "socket.io";  // correct import
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app); // HTTP server

const io = new Server(server, {       // use Server (capital S)
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

export function getRecieverSocketId(userId) {
  return userSocketMap[userId];
}

 const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);  

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id; // Map userId to socket.id
  }

  io.emit("getOnlineUsers",Object.keys(userSocketMap)); // Emit online users to all clients

  socket.on("disconnect", () => { 
    console.log("A user disconnected: " + socket.id);
    delete userSocketMap[userId]; // Remove user from map on disconnect
    io.emit("getOnlineUsers",Object.keys(userSocketMap)); // Update online users for all clients  
  });
});

export { io, app, server };