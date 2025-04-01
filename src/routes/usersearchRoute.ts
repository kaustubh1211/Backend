import express from "express";

import { userSearch } from "../services/usersearch";

const userSearchRoute = express.Router();

userSearchRoute.get("/", async (req, res) => {
  const { userName } = req.query;

  try {
    const getUser = await userSearch(userName as string);
    
    res.status(200).json(getUser);
  } catch (e) {
    res.status(400).json({ "error on messgae ": e });
  }
});


export default userSearchRoute;