import express, { Request, Response } from "express";
import { Server } from "socket.io";
import { sendMessage, getMessages, markMessagesAsSeen } from "../services/chatservice"; // assumes you already have this service
import { getUserWithFollowings } from "../services/getuserfollowerservice";

const Chatrouter = express.Router();

// ROUTE: Get messages between two users
Chatrouter.get("/send/:userId", async (req: Request, res: Response) => {
  const senderId = Number(req.params.userId); // assuming user ID comes from auth middleware
  const receiverId = Number(req.params.userId);

  try {
    const messages = await getMessages(senderId, receiverId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
});




// SOCKET LOGIC
export const handleChatSocket = (io: Server, socket: any) => {
  console.log("User connected:", socket.id);

  socket.on("join", async(userId: number) => {
    
    socket.join(userId.toString());
    
  const userData = await getUserWithFollowings(userId);
  socket.emit("user_data", userData)
    // join a room named by the user's ID
  });

  socket.on("send_message", async (data:any) => {
    const { senderId, receiverId, content } = data;

    try {
      const message = await sendMessage(senderId, receiverId, content);
      io.to(receiverId.toString()).emit("receive_message", message);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  });
  socket.on("message_seen", async (messageId:number, receiverId:number, senderId:number) => {
    await  markMessagesAsSeen(messageId , receiverId); // DB update
    io.to(senderId.toString()).emit("message_seen_ack", { messageId });
  });
  
};

export default Chatrouter;
