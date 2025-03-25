import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 100,
    max: 100,
    message:"to many request, please try after some time",
    headers:true,   

})

export default limiter;
