import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const toggleFollow = async (followerId: number, followingId: number) => {
 
 
    const follower = await prisma.user.findUnique({ where: { id: followerId } });
    const following = await prisma.user.findUnique({ where: { id: followingId } });
    
    if (!follower || !following) {
      return { message: "Follower or following user does not exist." };
    }
    if (followerId === followingId) {
    throw new Error("You cannot follow yourself.");
  }

  const existingFollow = await prisma.follow.findFirst({
    where: { followerId, followingId },
  });

  if (existingFollow) {
    await prisma.follow.delete({ where: { id: existingFollow.id } });
    return { message: "Unfollowed successfully" };
  } else {
    await prisma.follow.create({ data: { followerId, followingId } });
    return { message: "Followed successfully" };
  }
};
