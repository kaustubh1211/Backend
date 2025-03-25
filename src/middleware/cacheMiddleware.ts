import NodeCache from "node-cache";
import { Request, Response, NextFunction } from "express";

const cache = new NodeCache({ stdTTL: 60 * 5 }); // Cache TTL: 5 minutes

const cacheMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const key = req.originalUrl; // Use the request URL as the cache key
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    console.log("Cache Hit ✅");
    res.json(cachedResponse); // Send response and return early
    return;
  }

  console.log("Cache Miss ❌");
  res.locals.cacheKey = key; // Store cache key for later use
  next(); // Move to the next middleware
};

export { cache, cacheMiddleware };
