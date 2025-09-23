import { z } from "zod";

// Basic types for the portfolio application
export const insertContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export const insertBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  coverUrl: z.string().optional(),
  genre: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  review: z.string().optional(),
  status: z.enum(["read", "to-read"]).default("read"),
});

export const insertProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  technologies: z.array(z.string()),
  featured: z.boolean().default(false),
});

// Inferred types
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertBook = z.infer<typeof insertBookSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;

// Extended types with IDs for API responses
export interface Contact extends InsertContact {
  id: number;
  createdAt: Date;
}

export interface Book extends InsertBook {
  id: number;
}

export interface Project extends InsertProject {
  id: number;
}