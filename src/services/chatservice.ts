import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const sendMessage = async (
  senderId: number,
  receiverId: number,
  content: string
) => {
  const message = await prisma.message.create({
    data: {
      senderId,
      receiverId,
      content,
    },
    include: {
      sender: true,
      receiver: true,
    },
  });

  return {
    id: message.id,
    content: message.content,
    sender: {
      id: message.sender.id,
      name: message.sender.name,
    },
    receiverId: message.receiverId,
    createdAt: message.createdAt,
  };
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

// services/chatService.ts
// services/chatService.ts
export const markMessagesAsSeen = async (
  senderId: number,
  receiverId: number
) => {
  return prisma.message.updateMany({
    where: {
      senderId: senderId,
      receiverId: receiverId,
      seen: false,
    },
    data: {
      seen: true,
    },
  });
};

