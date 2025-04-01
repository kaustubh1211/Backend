import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserFeed = async (userId: number, page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  // Find users the logged-in user follows
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true }
  });

  // Extract the list of user IDs the logged-in user follows
  const followingIds = following.map(f => f.followingId);

  // Fetch posts from followed users
  const posts = await prisma.post.findMany({
    where: { userId: { in: followingIds } },
    include: { user: { select: { id: true, name: true } } }, // Include user info
    orderBy: { createdAt: "desc" }, // Order by newest posts first
    skip,
    take: limit
  });

  return posts;
};
