import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const blockUser = async (blockerId: number, blockedId: number) => {
  if (blockerId === blockedId) {
    throw new Error("You can't block yourself");
  }

  const alreadyBlocked = await prisma.block.findFirst({
    where: { blockerId, blockedId },
  });

  if (alreadyBlocked) {
    throw new Error("User already blocked");
  }

  return await prisma.block.create({
    data: { blockerId, blockedId },
  });
};

export const unblockUser = async (blockerId: number, blockedId: number) => {
  return await prisma.block.deleteMany({
    where: { blockerId, blockedId },
  });
};

export const getBlockedUsers = async (blockerId: number) => {
  return await prisma.block.findMany({
    where: { blockerId },
    include: {
      blocked: {
        select: {
          id: true,
          name: true,
          email: true,
          profile: true,
        },
      },
    },
  });
};
