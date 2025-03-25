import { Request, Response, NextFunction } from "express";


const loggerMiddleWare =(req:Request , res:Response , next:NextFunction)=>{
    console.log(`Method: ${req.method}, Path: ${req.path}`);
    next();
};

export default loggerMiddleWare;    