import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addComment = async (
  content: string,
  userId: number,
  postId: number
) => {
  const userCheck = await prisma.user.findUnique({ where: { id: userId } });
  const postCheck = await prisma.post.findUnique({ where: { id: postId } });

  if (!userCheck) {
    return { message: "user not found" };
  }

  if (!postCheck) {
    return { message: "post not found" };
  }

  const comment = await prisma.comment.create({
    data: { content, userId, postId },
  });
  return { message: "comment added successfully", comment };
};

// Get all comments for a post
export const getCommentsForPost = async (postId: number) => {
  const userCheck = await prisma.post.findUnique({ where: { id: postId } });
  if (!userCheck) {
    return { messagae: "post not found" };
  }
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: { user: { select: { id:true, name:true } } },
    orderBy: { createAt: "asc" as const },
  });

  return comments;
};
