import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {   
  return await prisma.user.create({
    data: { name, email, password },
  });
};

export const getUser = async () => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id: Number(id) },
  });
};
