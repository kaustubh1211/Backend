import express from 'express';
import { sendEmail } from '../utils/mailer';

const emailRouter = express.Router();

emailRouter.post('/',async(req,res)=>{
    const {to ,subject, contain}= req.body;

    try {
        await sendEmail(to, subject, `<p>${contain}</p>`);
        res.status(200).json({ success: true, message: "Email sent successfully" });
      } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ success: false, message: "Failed to send email" });
      }
})


export default emailRouter;