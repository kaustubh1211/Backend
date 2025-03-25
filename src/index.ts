import express, { Request, Response } from "express";
import router from "./routes/userRoute";
import profileRouter from "./routes/profileRoute";
import authRouter from "./routes/authRoute";
import uploads from "./routes/uploadRoute";
import { cache , cacheMiddleware } from "./middleware/cacheMiddleware";
import limiter from "./middleware/ratelimitMiddleware";

const app = express();
const PORT = 5000;

const path = require("path");
app.use(express.json());


app.use(limiter);
  app.get("/", (req: Request, res: Response) => {
  res.send("hwllw");
});

app.use("/api", authRouter);
// app.use("/api/register" , authRouther);

app.use("/api/profile", profileRouter);

app.use("/api/uploads", uploads);

// ✅ Serve Uploaded Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.get("/data", cacheMiddleware, async (req: Request, res: Response) => {
  // Simulating data fetch (replace with real DB/API call)
  const data = { message: "Hello, this is cached data!" };

  // Save the response in cache
  cache.set(res.locals.cacheKey, data);

  res.json(data);
});


app.listen(PORT, () => {
  console.log("on the port 5000");
});
