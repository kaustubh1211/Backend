import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const suggestFriend = async (userId: number) => {
  try {
    const mutualConnections = await prisma.user.findMany({
        where: {
          AND: [
            { followers: { some: { followingId: userId } } },  
            { following: { some: { followerId: userId } } },   
            { id: { not: userId } }                            
          ],
        },
        include: {      
          profile: {
            select: { 
              bio: true,
            },
          },
        },
        take: 5,
      });

    return  mutualConnections;
  } catch (error) {
    console.error("Error fetching suggested friends:", error);
    throw new Error("Could not fetch suggested friends.");
  }
};
