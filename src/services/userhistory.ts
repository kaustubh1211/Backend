import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addToHistory = async (userId: number, postId: number) => {
  const existing = await prisma.history.findFirst({
    where: { userId, postId }
  });

  if (existing) {
    return await prisma.history.update({
      where: { id: existing.id },
      data: { viewedAt: new Date() }
    });
  }

  return await prisma.history.create({
    data: { userId, postId }
  });
};

export const getUserHistory = async (userId: number) => {
  return await prisma.history.findMany({
    where: { userId },
    orderBy: { viewedAt: 'desc' },
    include: {
      post: {
        select: {
          id: true,
          
          createdAt: true,
          user: {
            select: { id: true, name: true }
          }
        }
      }
    }
  });
};

export const clearHistory = async (userId: number) => {
  return await prisma.history.deleteMany({
    where: { userId }
  });
};
