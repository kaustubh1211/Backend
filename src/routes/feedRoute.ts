import express from "express";
import { getUserFeed } from "../services/userfeedservice";

const feedRoute = express.Router();

feedRoute.get("/", async (req, res) => {
  try {
    const userId = Number(req.query.userId);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;


    const feed = await getUserFeed(userId, page, limit);
    res.status(200).json(feed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

export default feedRoute;
