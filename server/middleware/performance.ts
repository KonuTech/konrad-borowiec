import type { Request, Response, NextFunction } from 'express';
import { performance } from 'perf_hooks';
import { metricsCollector } from '../monitoring';

export const performanceMonitoring = (req: Request, res: Response, next: NextFunction) => {
  const start = performance.now();

  // Add performance headers before response is sent
  const originalEnd = res.end;
  res.end = function(chunk?: any, encoding?: any) {
    const duration = performance.now() - start;
    const formattedDuration = duration.toFixed(2);
    const isError = res.statusCode >= 400;

    // Record metrics
    metricsCollector.recordRequest(duration, isError);

    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${formattedDuration}ms`);

    // Alert on slow requests
    if (duration > 1000) {
      console.warn(`⚠️  Slow request detected: ${req.path} took ${formattedDuration}ms`);
    }

    // Only set headers if they haven't been sent yet
    if (!res.headersSent) {
      res.set('X-Response-Time', `${formattedDuration}ms`);
    }

    return originalEnd.call(this, chunk, encoding);
  };

  next();
};

export const compressionMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Set compression headers early if not already sent
    if (!res.headersSent) {
      res.set('Vary', 'Accept-Encoding');
    }
    next();
  };
};