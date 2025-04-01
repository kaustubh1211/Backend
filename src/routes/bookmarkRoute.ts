import express from "express"
import { createBookMark } from "../services/bookmarkservice";

const bookMarkRoute = express.Router();

bookMarkRoute.post('/',async(req,res)=>{

    const {userId , postId}= req.body;
    try{
        const bookmark= await createBookMark(userId, postId);
        res.status(200).json(bookmark);
    }
    catch(e){
        res.status(400).json(e);
    }
})


export default bookMarkRoute;