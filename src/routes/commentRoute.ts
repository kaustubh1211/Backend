import express from "express";
import { addComment, getCommentsForPost } from "../services/commentservice";

const commentRoute = express.Router();

commentRoute.post("/", async (req, res) => {
  const { content, userId, postId } = req.body;

  try {
    const comment = await addComment(content, userId, postId);
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
});

commentRoute.get("/:postId", async (req, res) => {
    try {
      const { postId } = req.params;
      const comments = await getCommentsForPost(Number(postId));
      res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong." });
    }
  });
export default commentRoute;


