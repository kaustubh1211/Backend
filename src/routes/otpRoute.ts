import express from "express";
import { sendOtp, verifyOtpAndResetPassword } from "../services/otpservice";

const otpRoute = express.Router();

otpRoute.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const otp = await sendOtp(email);
    res.status(200).json({ message: "otp send to email" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

otpRoute.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const resetPass = await verifyOtpAndResetPassword(email, otp, newPassword);
    res.json({ message: "password reset successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

export default otpRoute;
