import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



const PAGE_SIZE = 20;

export const getPaginatedMessages = async (
  currentUserId: number,
  targetUserId: number,
  page: number
) => {
  const skip = (page - 1) * PAGE_SIZE;

  return prisma.message.findMany({
    where: {
      OR: [
        { senderId: currentUserId, receiverId: targetUserId },
        { senderId: targetUserId, receiverId: currentUserId },
      ],
    },
    orderBy: { createdAt: "desc" },
    skip,
    take: PAGE_SIZE,
    include: {
      sender: { select: { id: true, name: true } },
    },
  });
};