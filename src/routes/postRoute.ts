import express from "express";
import { createPost, getAllPost, getUserPost } from "../services/postservice";

const postRoute = express.Router();

postRoute.post("/", async (req, res) => {
  try {
    const { userId, caption, image } = req.body;
    const post = await createPost(userId, caption, image);
    res.status(200).json(post);
  } catch (e) {
     res.status(400).json(`error` + e);
  }
});

postRoute.get("/", async (req, res) => {
  try {
    const post = await getAllPost();
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json(`Error :` + e);
  }
});


postRoute.get("/user", async(req , res)=>{
    try{
        const {userId}= req.body;
        const post = await getUserPost(userId);
        res.status(200).json(post);
    }
    catch(e){
        res.status(400).json(`Error`+e);
    }
})
export default postRoute;
