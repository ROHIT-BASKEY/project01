import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
// ❌ Incorrect: `import { Socket } from "dgram";`
// ⛔️ Not needed — REMOVE this line
dotenv.config();

// ✅ create express app and http server
const app = express();
const server = http.createServer(app);

// ✅ initiate socket.io server
export const io = new Server(server, {
  cors: { origin: "*" },
});

// ✅ store online users
export const userSocketMap = {}; // {userId: socketId}

// ✅ Socket.io connection handler
io.on("connection", (socket) => {
  // ❌ Incorrect: `Socket.handshake.query.userid`
  // ✅ Correct:
  const userId = socket.handshake.query.userid;

  console.log("user connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  // ✅ emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// ✅ middleware setup
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

// ✅ routes setup
app.use("/api/status", (req, res) => res.send("server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// ✅ connect MongoDB
await connectDB();

// ✅ server listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
});
