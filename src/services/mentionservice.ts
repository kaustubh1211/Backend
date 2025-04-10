import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const mentionUser =async(query:string)=>{
        if(!query) return [];

        const user =await prisma.user.findMany({
            where:{
                name:{
                    mode:"insensitive",
                    contains:query,
                }
            },
            take:10,
            select:{
                id:true,
                name:true,

            }
        })
        return user;
}