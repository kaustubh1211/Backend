import express from "express";
import { suggestFriend } from "../services/suggestFriend";

const suggestFriends = express.Router();

suggestFriends.get("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const userId = parseInt(req.params.userId);

    const friends = await suggestFriend(userId);
    res.status(200).json({ friends });
  } catch (error) {
    res.status(500).json({ error: "Error fetching suggested friends." });
  }
});

export default suggestFriends;
