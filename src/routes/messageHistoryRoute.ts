import express from "express";
import { getPaginatedMessages } from "../services/messageHistoryservice";

const messagehistoryRoute = express.Router();

messagehistoryRoute.get("/:userId", async (req, res) => {
  const currentUserId = Number(req.header("x-user-id") || "");
  const targetUserId = Number(req.params.userId);
  const page = Number(req.query.page as string) || 1;

  if (!currentUserId || !targetUserId) {
    return res.status(400).json({ error: "Missing user ID(s)" });
  }

  try {
    const messages = await getPaginatedMessages(
      currentUserId,
      targetUserId,
      page
    );
    return res.json({ messages });
  } catch (error) {
    console.error("Fetch messages failed:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});



export default messagehistoryRoute;