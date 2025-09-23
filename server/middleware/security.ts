import type { Request, Response, NextFunction } from 'express';

// Simple rate limiting implementation
class RateLimiter {
  private clients = new Map<string, { count: number; resetTime: number }>();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 15 * 60 * 1000, maxRequests: number = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;

    // Cleanup expired entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  private cleanup() {
    const now = Date.now();
    for (const [ip, data] of this.clients.entries()) {
      if (now > data.resetTime) {
        this.clients.delete(ip);
      }
    }
  }

  isAllowed(ip: string): boolean {
    const now = Date.now();
    const client = this.clients.get(ip);

    if (!client || now > client.resetTime) {
      this.clients.set(ip, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return true;
    }

    if (client.count >= this.maxRequests) {
      return false;
    }

    client.count++;
    return true;
  }

  getRemainingRequests(ip: string): number {
    const client = this.clients.get(ip);
    if (!client || Date.now() > client.resetTime) {
      return this.maxRequests;
    }
    return Math.max(0, this.maxRequests - client.count);
  }

  getResetTime(ip: string): number {
    const client = this.clients.get(ip);
    if (!client || Date.now() > client.resetTime) {
      return Date.now() + this.windowMs;
    }
    return client.resetTime;
  }
}

const apiLimiter = new RateLimiter(15 * 60 * 1000, 100); // 100 requests per 15 minutes
const strictLimiter = new RateLimiter(60 * 1000, 5); // 5 requests per minute for contact form

export const rateLimitMiddleware = (strict: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const limiter = strict ? strictLimiter : apiLimiter;

    if (!limiter.isAllowed(ip)) {
      const resetTime = limiter.getResetTime(ip);
      const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);

      res.set({
        'X-RateLimit-Limit': strict ? '5' : '100',
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': resetTime.toString(),
        'Retry-After': retryAfter.toString()
      });

      return res.status(429).json({
        message: 'Too many requests. Please try again later.',
        retryAfter
      });
    }

    const remaining = limiter.getRemainingRequests(ip);
    res.set({
      'X-RateLimit-Limit': strict ? '5' : '100',
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': limiter.getResetTime(ip).toString()
    });

    next();
  };
};

export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Only set headers if not already sent
  if (!res.headersSent) {
    // Basic security headers
    res.set({
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    });

    // Only set HSTS in production
    if (process.env.NODE_ENV === 'production') {
      res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }

    // Content Security Policy (relaxed for development)
    const csp = [
      "default-src 'self'",
      "img-src 'self' data: https:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
      "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
      "connect-src 'self' ws: wss:",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');

    res.set('Content-Security-Policy', csp);
  }

  next();
};

export const requestValidation = (req: Request, res: Response, next: NextFunction) => {
  // Basic request validation
  const userAgent = req.get('User-Agent');

  // Block requests without user agent (likely bots)
  if (!userAgent) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  // Block obviously malicious patterns
  const maliciousPatterns = [
    /sqlmap/i,
    /nikto/i,
    /nessus/i,
    /openvas/i,
    /nmap/i,
    /<script/i,
    /javascript:/i,
    /vbscript:/i
  ];

  const url = req.originalUrl;
  const referer = req.get('Referer') || '';

  for (const pattern of maliciousPatterns) {
    if (pattern.test(userAgent) || pattern.test(url) || pattern.test(referer)) {
      console.warn(`Blocked malicious request from ${req.ip}: ${userAgent}`);
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  next();
};