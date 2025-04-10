import express from "express";
import { getPostAnalytics } from "../services/postAnalysis";

const postAnalyasis = express.Router();


postAnalyasis.get('/:id', async(req , res)=>{
    
    try {
        const postId = parseInt(req.params.id);
        const analytics = await getPostAnalytics(postId);
        res.status(200).json(analytics);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    
});


export default postAnalyasis;