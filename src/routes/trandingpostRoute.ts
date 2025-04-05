import express from "express"
import { getTrendingPosts } from "../services/trendingpostservice";


const trandingPost = express.Router();

trandingPost.get('/',async(req, res)=>{
      try{
        const result = await getTrendingPosts();
        res.status(200).json(result);
      }
      catch(error)
      {
        res.status(400).json({"Error":error});
      }
})

export default trandingPost;