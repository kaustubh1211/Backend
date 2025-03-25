import {z} from "zod"

export const registerAuth =  z.object({
    name:z.string().min(2,"Name must be at least 2 charcters"),
    email:z.string().email("Invalid email"),
    password:z.string()
})