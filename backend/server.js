const express = require('express');
const cors = require('cors');
const app = express();

const { createServer } = require('http');
const server = createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
});

io.on("connect", (socket) => {
  console.log("Socket is active to be connected");

  socket.on("chat", (payload) => {
    console.log("Payload received:", payload);
    io.emit("chat", payload);
  });
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
