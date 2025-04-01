import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userSearch = async (name: string) => {

    try{

        const user = await prisma.user.findMany({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive",
                },
            },
            include:{
                profile:true,
            }
        });
        
        return user
    }
    catch(error){
        console.error("Error in user search:", error);
        throw new Error("Error searching users.");
    }
};


