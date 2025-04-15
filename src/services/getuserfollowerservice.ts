import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getUserWithFollowings = async (userId: number) => {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        following: {
          select: {
            following: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        followers: {
          select: {
            follower: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  };
  