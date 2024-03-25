const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const path = require("path");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

const PORT = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("send-message", (payload, room) => {
    if (room === "") {
      socket.broadcast.emit("receive-msg", payload);
    } else {
      socket.to(room).emit("receive-msg", payload);
    }
  });

  socket.on("join-room", (payload) => {
    socket.join(payload);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Runing port ${PORT}`);
});
