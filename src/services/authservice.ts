import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/genratedToken";
import { comparePassword } from "../utils/hashPassword";
import { hashPassword } from "../utils/hashPassword";

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

  return { user, token: generateToken(user.id) };
};
