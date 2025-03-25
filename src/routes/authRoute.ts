import express, { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authservice";
import loggerMiddleWare from "../middleware/authMiddleware";
import { PrismaClient } from "@prisma/client";

const authRouter = express.Router();

const prisma = new PrismaClient();
authRouter.use(loggerMiddleWare);

authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await registerUser(name, email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ "error:": error });
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});


 
// pagination route 
authRouter.get("/", async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit; // Calculate how many records to skip
  
      const users = await prisma.user.findMany({
        skip,
        take: limit,
      });

      
  
      // Get total count of users
      const totalUsers = await prisma.user.count();
  
      res.json({
        page,
        limit,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        users,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const result = await loginUser(email, password);
//     res.json(result);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
export default authRouter;
