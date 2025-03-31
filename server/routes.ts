import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertBookSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import express from "express";
import path from "path";
import fs from "fs";

// Ensure public directories exist
function ensurePublicDirectories() {
  const dirs = [
    path.join(process.cwd(), 'public'),
    path.join(process.cwd(), 'public', 'images'),
    path.join(process.cwd(), 'public', 'images', 'projects'),
    path.join(process.cwd(), 'public', 'images', 'motorcycles')
  ];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Ensure public directories exist
  ensurePublicDirectories();
  
  // Serve static files from public directory
  app.use('/images', express.static(path.join(process.cwd(), 'public', 'images')));
  
  // API routes prefix
  const apiRouter = "/api";

  // Get all projects
  app.get(`${apiRouter}/projects`, async (req: Request, res: Response) => {
    try {
      const projects = await storage.getProjects();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get a specific project
  app.get(`${apiRouter}/projects/:id`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      
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
      const books = await storage.getBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  // Get a specific book
  app.get(`${apiRouter}/books/:id`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const book = await storage.getBook(id);
      
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
      const newBook = await storage.createBook(bookData);
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
      const updatedBook = await storage.updateBook(id, bookData);
      
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
      const deleted = await storage.deleteBook(id);
      
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
      const newContact = await storage.createContact(contactData);
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

  // Generate project images
  app.post(`${apiRouter}/generate-project-images`, async (req: Request, res: Response) => {
    try {
      await storage.generateProjectImages();
      res.status(200).json({ 
        success: true, 
        message: "Project images generated successfully!" 
      });
    } catch (error) {
      console.error("Error generating project images:", error);
      res.status(500).json({ message: "Failed to generate project images" });
    }
  });

  // Process motorcycle images
  app.post(`${apiRouter}/process-motorcycle-images`, async (req: Request, res: Response) => {
    try {
      const images = await storage.processMotorcycleImages();
      res.status(200).json({
        success: true, 
        message: "Motorcycle images processed successfully!",
        images
      });
    } catch (error) {
      console.error("Error processing motorcycle images:", error);
      res.status(500).json({ message: "Failed to process motorcycle images" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
