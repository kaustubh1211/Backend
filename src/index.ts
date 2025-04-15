import express, { Request, Response } from "express";
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
import trandingPost from "./routes/trandingpostRoute";
import emailRouter from "./routes/emailRoute";
import otpRoute from "./routes/otpRoute";
import blockRouter from "./routes/blockRoute";
import userhistory from "./routes/userhistoryRoute";
import postAnalyasis from "./routes/postAnlaysisRoute";
import mentionRoute from "./routes/mentionRoute";
import Chatrouter from "./routes/chatRoute";
import { handleChatSocket } from "./routes/chatRoute";
import messagehistoryRoute from "./routes/messageHistoryRoute";
import webhookRoute from "./routes/webhookRoute";

const app = express();

const server = createServer(app);


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
  handleChatSocket(io, socket);
});

app.use("/api", authRouter);
// app.use("/api/register" , authRouther);

app.use("/api/profile", profileRouter);

app.use("/api/posts", postRoute);

app.use("/api/like", likeRoute);

app.use("/api/follow", followRoute);

app.use("/api/comment", commentRoute);

app.use("/api/feed", feedRoute);

app.use("/api/uploads", uploads);

app.use("/api/bookmark", bookMarkRoute);

app.use("/api/search", userSearchRoute);

app.use("/api/suggested-friends" , suggestFriends);

app.use("/api/tranding-post", trandingPost );

app.use("/api/send-email", emailRouter);

app.use("/api/auth",  otpRoute); 

app.use("/api/block" , blockRouter);

app.use("/api/history", userhistory);

app.use("/api/post/analysis" , postAnalyasis);

app.use("/api/mention/search" , mentionRoute);

app.use("/api/chat" ,Chatrouter);

// app.use("/api/chat/message" , messagehistoryRoute)

app.use("/api/webhook", webhookRoute);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/data", cacheMiddleware, async (req: Request, res: Response) => {
  // Simulating data fetch (replace with real DB/API call)
  const data = { message: "Hello, this is cached data!" };

  // Save the response in cache
  cache.set(res.locals.cacheKey, data);

  res.json(data);
});

server.listen(5000, () => {
  console.log(`WebSocket & API server running on http://localhost:5000`);
});

// export {io , server}
