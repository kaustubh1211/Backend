import express from "express";
import { toggleFollow } from "../services/followservice";

const followRoute= express.Router();


followRoute.post("/", async(req, res)=>{
    const{followerId , followingId}= req.body;
    try{
        const follow= await toggleFollow(followerId, followingId);
        res.status(200).json(follow);
    }
     catch(err){
        res.status(400).json("error"+err);
     }
});

export default followRoute;