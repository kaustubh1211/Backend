import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../utils/mailer";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const sendOtp = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("user not found");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.user.update({
    where: { email },
    data: { resetOtp: otp, otpExpire: expiry },
  });

  const html = `<p>Your OTP is <strong>${otp}</strong>. It will expire in 10 minutes.</p>`;

  await sendEmail(email, "Password reset otp", html);
};

export const verifyOtpAndResetPassword = async (
  email: string,
  otp: string,
  newPassword: string
) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.resetOtp !== otp || new Date() > user.otpExpire!) {
    throw new Error("Invalid or expired OTP");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      resetOtp: null,
      otpExpire: null,
    },
  });
};
