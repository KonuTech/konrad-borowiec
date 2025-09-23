import type { Request, Response, NextFunction } from 'express';
import { metricsCollector } from '../monitoring';

class MemoryCache {
  private cache = new Map<string, { data: any; expiry: number }>();

  set(key: string, data: any, ttlSeconds: number = 3600): void {
    const expiry = Date.now() + (ttlSeconds * 1000);
    this.cache.set(key, { data, expiry });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

const cache = new MemoryCache();

// Cleanup expired entries every 10 minutes
setInterval(() => {
  cache.cleanup();
}, 10 * 60 * 1000);

export const cacheMiddleware = (duration: number = 3600) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = req.originalUrl;
    const cached = cache.get(key);

    if (cached) {
      console.log(`Cache hit: ${key}`);
      metricsCollector.recordCacheHit();
      res.set('X-Cache', 'HIT');
      return res.json(cached);
    }

    metricsCollector.recordCacheMiss();
    res.set('X-Cache', 'MISS');

    // Override res.json to cache the response
    const originalJson = res.json;
    res.json = function(data: any) {
      cache.set(key, data, duration);
      console.log(`Cached response: ${key} (TTL: ${duration}s)`);
      return originalJson.call(this, data);
    };

    next();
  };
};

export const invalidateCache = (pattern?: string) => {
  if (pattern) {
    // Clear cache entries matching pattern
    for (const key of cache['cache'].keys()) {
      if (key.includes(pattern)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
};

export { cache };