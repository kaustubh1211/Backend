import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPost = async (
  userId: number,
  caption: string,
  image?: string
) => {
  if (!userId) {
    throw new Error("User ID is required to create a post");
  }

  // Check if user exists
  const userExists = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userExists) {
    throw new Error("User not found");
  }
  return await prisma.post.create({
    data: { caption, image, userId },
  });
};

export const getAllPost = async () => {
  return await prisma.post.findMany({
    include: { user: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });
};

export const getUserPost = async (userId: number) => {
  const userExists = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userExists) {
    throw new Error("user not found");
  }

  return await prisma.post.findMany({
    where: { userId },
  });
};
