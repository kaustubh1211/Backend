import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addProfile = async (bio: string, userId: number) => {
  return await prisma.profile.create({
    data: { bio, userId },
  });
};

export const showProfile = async () => {
  return await prisma.profile.findMany();
};

export const updateProfile = async (id: number, bio: string) => {
  return await prisma.profile.update({
    where: {
      id,
    },
    data: {
      bio,
    },
  });
};
