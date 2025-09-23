import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { mockDataService } from "./mockData";
import { insertContactSchema, insertBookSchema } from "@shared/types";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import express from "express";
import path from "path";
import fs from "fs";
// Only need basic directory functions for static image serving
import { ensureImageDirectories } from "./imageUtils";

// Reuse optimized directory structure from imageUtils
export async function registerRoutes(app: Express): Promise<Server> {
  // Ensure public directories exist - this is now optimized with caching
  await ensureImageDirectories();
  
  // Serve static files from assets directory
  app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
  
  // API routes prefix
  const apiRouter = "/api";

  // Get all projects
  app.get(`${apiRouter}/projects`, async (req: Request, res: Response) => {
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

  // Get all books
  app.get(`${apiRouter}/books`, async (req: Request, res: Response) => {
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

  // Submit contact form
  app.post(`${apiRouter}/contact`, async (req: Request, res: Response) => {
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

  // Get motorcycle gallery images
  app.get(`${apiRouter}/images/motorcycle`, async (req: Request, res: Response) => {
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

  // Get cycling gallery images
  app.get(`${apiRouter}/images/cycling`, async (req: Request, res: Response) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
