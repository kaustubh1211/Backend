import express from "express";
import { toggleLike } from "../services/likeservice";

const likeRoute = express.Router();

likeRoute.post("/", async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const post = await toggleLike(userId, postId);
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json(`error` + e);
  }
});

export default likeRoute;
