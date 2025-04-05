import { PrismaClient } from "@prisma/client";
import { generateRefreshToken, generateToken } from "../utils/genratedToken";
import { comparePassword } from "../utils/hashPassword";
import { hashPassword } from "../utils/hashPassword";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return { user, token: generateToken(user.id) };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("invalid email");

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) throw new Error("Invalid credentials");

  const refreshToken = generateRefreshToken(user.id);
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return {
    user,
    accesToken: generateToken(user.id),
    refreshToken: refreshToken,
  };
};

export const refresh = async (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as any;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user || user.refreshToken !== token) throw new Error("Unauthorized");

    const newAccessToken = generateToken(user.id);
    return { accessToken: newAccessToken };
  } catch (err) {
    throw new Error("Invalid refresh token");
  }
};
