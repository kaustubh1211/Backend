import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const sendMessage = async (senderId: number, receiverId: number, content: string) => {
    return await prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });
  };
  
  export const getMessages = async (user1: number, user2: number) => {
    return await prisma.message.findMany({
      where: {
        OR: [
          { senderId: user1, receiverId: user2 },
          { senderId: user2, receiverId: user1 },
        ],
      },
      orderBy: { createdAt: "asc" },
    });
  };