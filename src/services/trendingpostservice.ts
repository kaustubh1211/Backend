import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getTrendingPosts = async () => {
    const trendingPosts = await prisma.post.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 1)), 
        },
      },
      include: {
        user: { select: { name: true } },
        like: true,
        comment: true,
      },
      orderBy: { like: { _count: "desc" } }, 
      take: 10,
    });
  
    return trendingPosts;
  };
  