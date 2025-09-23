interface SystemMetrics {
  memoryUsage: NodeJS.MemoryUsage;
  uptime: number;
  timestamp: string;
  cpuUsage?: number;
}

interface ApplicationMetrics {
  requestCount: number;
  errorCount: number;
  cacheHits: number;
  cacheMisses: number;
  avgResponseTime: number;
  slowRequests: number;
}

class MetricsCollector {
  private appMetrics: ApplicationMetrics = {
    requestCount: 0,
    errorCount: 0,
    cacheHits: 0,
    cacheMisses: 0,
    avgResponseTime: 0,
    slowRequests: 0
  };

  private responseTimes: number[] = [];
  private startTime = Date.now();

  recordRequest(responseTime: number, isError: boolean = false): void {
    this.appMetrics.requestCount++;

    if (isError) {
      this.appMetrics.errorCount++;
    }

    // Track response times for moving average
    this.responseTimes.push(responseTime);
    if (this.responseTimes.length > 100) {
      this.responseTimes.shift();
    }

    this.appMetrics.avgResponseTime =
      this.responseTimes.reduce((sum, time) => sum + time, 0) / this.responseTimes.length;

    if (responseTime > 1000) {
      this.appMetrics.slowRequests++;
    }
  }

  recordCacheHit(): void {
    this.appMetrics.cacheHits++;
  }

  recordCacheMiss(): void {
    this.appMetrics.cacheMisses++;
  }

  getSystemMetrics(): SystemMetrics {
    return {
      memoryUsage: process.memoryUsage(),
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
      timestamp: new Date().toISOString()
    };
  }

  getApplicationMetrics(): ApplicationMetrics {
    return { ...this.appMetrics };
  }

  getAllMetrics() {
    return {
      system: this.getSystemMetrics(),
      application: this.getApplicationMetrics()
    };
  }

  reset(): void {
    this.appMetrics = {
      requestCount: 0,
      errorCount: 0,
      cacheHits: 0,
      cacheMisses: 0,
      avgResponseTime: 0,
      slowRequests: 0
    };
    this.responseTimes = [];
  }

  logMetrics(): void {
    const metrics = this.getAllMetrics();
    const memory = metrics.system.memoryUsage;

    console.log(`
📊 Application Metrics (${new Date().toLocaleTimeString()})
┌─ System ─────────────────────────────┐
│ Uptime: ${metrics.system.uptime}s
│ Memory: ${(memory.heapUsed / 1024 / 1024).toFixed(1)}MB / ${(memory.heapTotal / 1024 / 1024).toFixed(1)}MB
│ External: ${(memory.external / 1024 / 1024).toFixed(1)}MB
├─ Application ───────────────────────┤
│ Requests: ${metrics.application.requestCount}
│ Errors: ${metrics.application.errorCount}
│ Avg Response: ${metrics.application.avgResponseTime.toFixed(1)}ms
│ Slow Requests: ${metrics.application.slowRequests}
│ Cache Hit Rate: ${this.getCacheHitRate().toFixed(1)}%
└─────────────────────────────────────┘`);
  }

  private getCacheHitRate(): number {
    const total = this.appMetrics.cacheHits + this.appMetrics.cacheMisses;
    if (total === 0) return 0;
    return (this.appMetrics.cacheHits / total) * 100;
  }
}

export const metricsCollector = new MetricsCollector();

// Log metrics every 5 minutes in production
if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    metricsCollector.logMetrics();
  }, 5 * 60 * 1000);
}

// Log metrics every minute in development
if (process.env.NODE_ENV === 'development') {
  setInterval(() => {
    metricsCollector.logMetrics();
  }, 60 * 1000);
}