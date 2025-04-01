import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBookMark = async (userId: number, postId: number) => {
  const checkPostId = await prisma.bookmark.findFirst({
    where: { userId, postId },
  });

  if (checkPostId) {
    throw new Error("post already save");
  }

  return await prisma.bookmark.create({
    data: { userId, postId }, 
  });
};
