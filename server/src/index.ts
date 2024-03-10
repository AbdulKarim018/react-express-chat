import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;

let connectedClients = 0;

const app = express();
const httpServer = createServer(app);
app.get("/health", (req, res) => {
  res.json({ message: "Hello, World!" });
});
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  allowUpgrades: true,
});

setInterval(() => {
  console.log("Connected Clients: ", connectedClients);
}, 5000);

io.on("connection", (socket) => {
  console.log(`user <${socket.id}> connected`);
  io.emit("chat:message", {
    message: `user <${socket.id}> connected`,
    sender: "Server",
  });
  connectedClients++;

  socket.on("chat:message", (msg) => {
    console.log("Message Received: ", msg);
    io.emit("chat:message", { message: msg, sender: socket.id });
  });
  socket.on("disconnect", () => {
    console.log(`user <${socket.id}> disconnected`);
    io.emit("chat:message", {
      message: `user <${socket.id}> disconnected`,
      sender: "Server",
    });
    connectedClients--;
  });
});

httpServer.listen(PORT, () => console.log(`server running on port ${PORT}`));
