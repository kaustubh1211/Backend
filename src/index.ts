import express, { Request, Response } from "express";
import router from "./routes/userRoute";
import profileRouter from "./routes/profileRoute";
import authRouter from "./routes/authRoute";
import uploads from "./routes/uploadRoute";
import { cache, cacheMiddleware } from "./middleware/cacheMiddleware";
import limiter from "./middleware/ratelimitMiddleware";
import postRoute from "./routes/postRoute";
import likeRoute from "./routes/likeRoute";
import followRoute from "./routes/followRoute";
import commentRoute from "./routes/commentRoute";
import feedRoute from "./routes/feedRoute";
import bookMarkRoute from "./routes/bookmarkRoute";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import userSearchRoute from "./routes/usersearchRoute";
import suggestFriends from "./routes/suggestfriendRoute";

const app = express();

const server = createServer(app);
const PORT = 5000;

const path = require("path");
app.use(express.json());

app.use(limiter);
app.get("/", (req: Request, res: Response) => {
  res.send("hwllw");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Received message:", data);
    socket.emit("response", { message: "Message received!" });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.use("/api", authRouter);
// app.use("/api/register" , authRouther);

app.use("/api/profile", profileRouter);

app.use("/api/posts", postRoute);

app.use("/api/like", likeRoute);

app.use("/api/follow", followRoute);

app.use("/api/comment", commentRoute);

app.use("/api /feed", feedRoute);

app.use("/api/uploads", uploads);

app.use("/api/bookmark", bookMarkRoute);

app.use("/api/search", userSearchRoute);

app.use("/api/suggested-friends" , suggestFriends)

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/data", cacheMiddleware, async (req: Request, res: Response) => {
  // Simulating data fetch (replace with real DB/API call)
  const data = { message: "Hello, this is cached data!" };

  // Save the response in cache
  cache.set(res.locals.cacheKey, data);

  res.json(data);
});

server.listen(PORT, () => {
  console.log(`WebSocket & API server running on http://localhost:${PORT}`);
});

// export {io , server}
