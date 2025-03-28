import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const toggleLike = async (userId: number, postId: number) => {
  try {
    // Find existing like with unique constraint
    const existingLike = await prisma.like.findUnique({
      where: {
        // Assuming you have a unique constraint combining userId and postId
        // If not, you'll need to modify your Prisma schema
        userId_postId: { userId, postId }                    
      }
    });

    if (existingLike) {
      // Delete the like if it exists
      await prisma.like.delete({
        where: {
          userId_postId: { userId, postId }
        }
      });
      return { message: "Post unliked successfully" };
    } else {
      // Create a new like
      await prisma.like.create({ 
        data: { 
          userId, 
          postId 
        } 
      });
      return { message: "Post liked successfully" };
    }
  } catch (error) {
    console.error("Like toggle error:", error);
    throw new Error("Failed to toggle like");
  }
};