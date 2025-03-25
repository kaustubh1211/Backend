import express from "express";

import {
  addProfile,
  showProfile,
  updateProfile,
} from "../services/postservice";
const profileRouter = express.Router();

profileRouter.post("/", async (req, res) => {
  const { bio, userId } = req.body;
  try {
    const profile = await addProfile(bio, userId);
    res.status(200).json(profile);
  } catch (ex) {
    res.status(400).json(`error: something is wrong $ex` + ex);
  }
});

profileRouter.get("/", async (req, res) => {
  const profile = await showProfile();
  res.status(200).json(profile);
});



profileRouter.put("/update", async (req, res) => {
  try {
    const { id, bio } = req.body;
    const result = await updateProfile(id, bio);
    res.status(200).json({ message: "updated succesfully" , result });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});



profileRouter.delete("/");
export default profileRouter;
