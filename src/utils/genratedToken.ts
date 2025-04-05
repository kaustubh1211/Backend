import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const REFRESH_TOKEN_SECRET= process.env.REFRESH_TOKEN_SECRET as string;

export const generateToken = (id: number) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined!");
  }

  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  } as jwt.SignOptions);
};
 
export const generateRefreshToken = (id: number) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined!");
  }
  return jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE || "7d",
  } as jwt.SignOptions) ;
};
