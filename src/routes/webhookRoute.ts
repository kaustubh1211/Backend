import express from "express";
import crypto from 'crypto';
import { WEBHOOK_SECRET } from "../utils/config";
import bodyParser from 'body-parser';

const webhookRoute = express.Router();

// Create a specific middleware for this route only
// Don't use express.json() here at all
webhookRoute.post("/test", 
  bodyParser.raw({ type: 'application/json' }), // This captures the raw body as a Buffer
  (req: any, res: any) => {
    const receivedSignature = req.headers["x-signature"];
    const rawBody = req.body; // This should now be a Buffer of the raw request body
    
    console.log("Raw body type:", typeof rawBody, rawBody instanceof Buffer);
    
    // Safety check
    if (!Buffer.isBuffer(rawBody)) {
      return res.status(400).json({ error: "Request body not properly captured" });
    }

    try {
      const expectedSignature = crypto
        .createHmac("sha256", WEBHOOK_SECRET)
        .update(rawBody)
        .digest("hex");

      console.log("Expected signature:", expectedSignature);
      console.log("Received signature:", receivedSignature);

      if (receivedSignature !== expectedSignature) {
        return res.status(403).json({ error: "Invalid signature" });
      }

      // Parse the JSON body for use in our response
      const jsonBody = JSON.parse(rawBody.toString());
      console.log("✅ Verified webhook:", jsonBody);
      res.status(200).json({ message: "Webhook received securely" });
    } catch (error) {
      console.error("Error processing webhook:", error);
      res.status(500).json({ error: "Failed to process webhook" });
    }
  }
);

export default webhookRoute;