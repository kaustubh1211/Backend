import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getPostAnalytics = async (postId: number) => {
    const [views, likes, comments, shares] = await Promise.all([
      prisma.postView.count({ where: { postId } }),
      prisma.like.count({ where: { postId } }),
      prisma.comment.count({ where: { postId } }),
      prisma.share.count({ where: { postId } }), 
    ]);
  
    const engagementScore = views + likes * 2 + comments * 3 + shares * 4;
  
    return {
      views,
      likes,
      comments,
      shares,
      engagementScore,
    };
  };