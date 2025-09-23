import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { mockDataService } from "./mockData";
import { insertContactSchema, insertBookSchema } from "@shared/types";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import express from "express";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { cacheMiddleware } from "./middleware/cache";
import { performanceMonitoring, compressionMiddleware } from "./middleware/performance";
import { rateLimitMiddleware, securityHeaders, requestValidation } from "./middleware/security";
import { metricsCollector } from "./monitoring";

async function optimizeImage(imagePath: string, width?: number, format: 'webp' | 'jpeg' = 'webp', quality: number = 85) {
  const image = sharp(imagePath);

  if (width) {
    image.resize(width, null, { withoutEnlargement: true });
  }

  if (format === 'webp') {
    return image.webp({ quality });
  }

  return image.jpeg({ quality, progressive: true });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Security middleware (applied first)
  app.use(securityHeaders);
  app.use(requestValidation);

  // Global middleware
  app.use(performanceMonitoring);
  app.use(compressionMiddleware());

  // Enhanced static serving with caching
  app.use('/assets', express.static(path.join(process.cwd(), 'assets'), {
    maxAge: '30d',
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      if (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png') || path.endsWith('.webp')) {
        res.set('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }));

  // Dynamic image optimization endpoint
  app.get('/assets/pictures/:category/:filename', async (req: Request, res: Response) => {
    const { category, filename } = req.params;
    const { w, format, q } = req.query;
    const imagePath = path.join(process.cwd(), 'assets', 'pictures', category, filename);

    try {
      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ message: 'Image not found' });
      }

      // Serve optimized images
      if (w || format || q) {
        const width = w ? parseInt(w as string) : undefined;
        const imageFormat = (format as 'webp' | 'jpeg') || 'webp';
        const quality = q ? parseInt(q as string) : 85;

        const optimized = await optimizeImage(imagePath, width, imageFormat, quality);

        res.set('Content-Type', `image/${imageFormat}`);
        res.set('Cache-Control', 'public, max-age=31536000, immutable');
        return optimized.pipe(res);
      }

      // Serve original with caching
      res.set('Cache-Control', 'public, max-age=2592000');
      res.sendFile(imagePath);
    } catch (error) {
      console.error('Image optimization error:', error);
      res.status(500).json({ message: 'Image processing failed' });
    }
  });
  
  // API routes prefix with rate limiting
  const apiRouter = "/api";
  app.use(apiRouter, rateLimitMiddleware());

  // Get all projects with caching
  app.get(`${apiRouter}/projects`, cacheMiddleware(3600), async (req: Request, res: Response) => {
    try {
      const projects = await mockDataService.getProjects();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get a specific project
  app.get(`${apiRouter}/projects/:id`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const project = await mockDataService.getProject(id);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Get all books with caching
  app.get(`${apiRouter}/books`, cacheMiddleware(1800), async (req: Request, res: Response) => {
    try {
      const books = await mockDataService.getBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  // Get a specific book
  app.get(`${apiRouter}/books/:id`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const book = await mockDataService.getBook(id);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch book" });
    }
  });

  // Create a new book
  app.post(`${apiRouter}/books`, async (req: Request, res: Response) => {
    try {
      const bookData = insertBookSchema.parse(req.body);
      const newBook = await mockDataService.createBook(bookData);
      res.status(201).json(newBook);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to create book" });
      }
    }
  });

  // Update a book
  app.patch(`${apiRouter}/books/:id`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const bookData = insertBookSchema.partial().parse(req.body);
      const updatedBook = await mockDataService.updateBook(id, bookData);

      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json(updatedBook);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to update book" });
      }
    }
  });

  // Delete a book
  app.delete(`${apiRouter}/books/:id`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await mockDataService.deleteBook(id);

      if (!deleted) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete book" });
    }
  });

  // Submit contact form with strict rate limiting
  app.post(`${apiRouter}/contact`, rateLimitMiddleware(true), async (req: Request, res: Response) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const newContact = await mockDataService.createContact(contactData);

      // Log the contact submission - this would normally send an email
      console.log('Contact form submission:', {
        id: newContact.id,
        name: contactData.name,
        email: contactData.email,
        message: contactData.message,
        date: newContact.createdAt.toISOString()
      });

      res.status(201).json({
        success: true,
        message: "Your message has been sent successfully!"
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  // Get motorcycle gallery images with caching
  app.get(`${apiRouter}/images/motorcycle`, cacheMiddleware(7200), async (req: Request, res: Response) => {
    try {
      const motorcycleDir = path.join(process.cwd(), 'assets', 'pictures', 'motorcycling');

      if (!fs.existsSync(motorcycleDir)) {
        return res.status(404).json({ message: "Motorcycle images directory not found" });
      }

      const files = fs.readdirSync(motorcycleDir);
      const imageFiles = files
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map(file => `/assets/pictures/motorcycling/${file}`);

      res.status(200).json({ images: imageFiles });
    } catch (error) {
      console.error('Error reading motorcycle images:', error);
      res.status(500).json({ message: "Failed to fetch motorcycle images" });
    }
  });

  // Get cycling gallery images with caching
  app.get(`${apiRouter}/images/cycling`, cacheMiddleware(7200), async (req: Request, res: Response) => {
    try {
      const cyclingDir = path.join(process.cwd(), 'assets', 'pictures', 'cycling');

      if (!fs.existsSync(cyclingDir)) {
        return res.status(404).json({ message: "Cycling images directory not found" });
      }

      const files = fs.readdirSync(cyclingDir);
      const imageFiles = files
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map(file => `/assets/pictures/cycling/${file}`);

      res.status(200).json({ images: imageFiles });
    } catch (error) {
      console.error('Error reading cycling images:', error);
      res.status(500).json({ message: "Failed to fetch cycling images" });
    }
  });

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // Metrics endpoint (development only)
  if (process.env.NODE_ENV === 'development') {
    app.get(`${apiRouter}/metrics`, (req: Request, res: Response) => {
      res.status(200).json(metricsCollector.getAllMetrics());
    });
  }

  const httpServer = createServer(app);
  return httpServer;
}
