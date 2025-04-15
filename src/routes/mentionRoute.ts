import express from "express";
import { mentionUser } from "../services/mentionservice";

const mentionRoute = express.Router();

mentionRoute.get("/:query", async (req, res) => {
  try {
    const { query } = req.query;
    const user = await mentionUser(query as string);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error searching users" });
  }
});

export default mentionRoute;
