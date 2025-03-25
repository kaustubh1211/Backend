import express, { Request, Response } from "express";
import upload from "../middleware/uploadMiddleware";

const uploads = express.Router();

// Upload a single file
uploads.post(
  "/upload",    
  upload.single("image"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      res.status(200).json({
        message: "File uploaded successfully!",
        filePath: `/uploads/${req.file.filename}`,
      });
    } catch (error) {
      res.status(500).json({ error: "File upload failed" });
    }
  }
);

export default uploads;