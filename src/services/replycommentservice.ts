import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPostCommentsWithReplies = async (postId: number) => {
    return await prisma.comment.findMany({
      where: {
        postId,
        parentId: null, // top-level comments
      },
      include: {
        user: {
          select: { id: true, name: true },
        },
        replies: {
          include: {
            user: {
              select: { id: true, name: true },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    })
  }
  