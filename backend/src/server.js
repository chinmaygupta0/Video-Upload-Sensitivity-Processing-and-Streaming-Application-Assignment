const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const connectDB = require("./config/db");
const { initSocket } = require("./sockets/progress.socket");

require("dotenv").config();

// Connect DB
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// 🔥 INIT SOCKET BEFORE LISTEN
initSocket(io);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
