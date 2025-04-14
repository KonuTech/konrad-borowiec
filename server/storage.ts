import {
  users,
  type User,
  type InsertUser,
  books,
  type Book,
  type InsertBook,
  projects,
  type Project,
  type InsertProject,
  contacts,
  type Contact,
  type InsertContact,
} from "@shared/schema";
import { ensureImageDirectories } from "./imageUtils";
import path from "path";
import fs from "fs";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Book methods
  getBooks(): Promise<Book[]>;
  getBook(id: number): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  updateBook(id: number, book: Partial<InsertBook>): Promise<Book | undefined>;
  deleteBook(id: number): Promise<boolean>;

  // Project methods
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(
    id: number,
    project: Partial<InsertProject>,
  ): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private books: Map<number, Book>;
  private projects: Map<number, Project>;
  private contacts: Map<number, Contact>;

  private userIdCounter: number;
  private bookIdCounter: number;
  private projectIdCounter: number;
  private contactIdCounter: number;

  constructor() {
    this.users = new Map();
    this.books = new Map();
    this.projects = new Map();
    this.contacts = new Map();

    this.userIdCounter = 1;
    this.bookIdCounter = 1;
    this.projectIdCounter = 1;
    this.contactIdCounter = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Real GitHub projects
    const sampleProjects: InsertProject[] = [
      {
        title: "Data Engineering Zoomcamp Capstone",
        description:
          "A dockerized 5 min. mini-batch data pipeline. Spark Structured Streaming: reading from Kafka to PostgreSQL as a sink DB.",
        imageUrl: "/images/projects/Data-Engineering-Zoomcamp-Capstone.png",
        liveUrl: null,
        githubUrl:
          "https://github.com/KonuTech/data-engineering-zoomcamp-capstone-01",
        technologies: [
          "Airflow",
          "Kafka",
          "PySpark",
          "PostgreSQL",
          "Streamlit",
          "Docker",
        ],
        featured: false,
        userId: null,
      },
      {
        title: "LLM Zoomcamp Capstone",
        description:
          "A dockerized RAG application based on PC game reviews pulled from the Steam store. Featuring a Flask app running on Elasticsearch vector database.",
        imageUrl: "/images/projects/LLM-Zoomcamp-Capstone.png",
        liveUrl: null,
        githubUrl: "https://github.com/KonuTech/llm-zoomcamp-capstone-01",
        technologies: [
          "Flask",
          "Elasticsearch",
          "PostgreSQL",
          "Grafana",
          "Docker",
          "Python",
        ],
        featured: false,
        userId: null,
      },
      {
        title: "MLOps Zoomcamp Project",
        description:
          "End-to-end MLOps on GCP - An implementation of MLOps best practices for machine learning workflows on Google Cloud Platform.",
        imageUrl: "/images/projects/MLOps-Zoomcamp-Project.jfif",
        liveUrl: null,
        githubUrl: "https://github.com/KonuTech/mlops-zoomcamp-project",
        technologies: [
          "PySpark",
          "Scikit-learn",
          "XGBoost",
          "Prefect",
          "MLflow",
          "FastAPI",
          "Evidently AI",
        ],
        featured: false,
        userId: null,
      },
      {
        title: "Machine Learning Zoomcamp Capstone 01",
        description:
          "Dockerized Flask service for scoring if a customer will default on payments, implementing various machine learning algorithms.",
        imageUrl: "/images/projects/Machine-Learning-Zoomcamp-Capstone-01.jfif",
        liveUrl: null,
        githubUrl:
          "https://github.com/KonuTech/machine-learning-zoomcamp-capstone-01",
        technologies: ["Pandas", "Scikit-learn", "XGBoost", "Flask", "Docker"],
        featured: false,
        userId: null,
      },
      {
        title: "Machine Learning Zoomcamp Capstone 02",
        description:
          "Image classifier using transfer learning with TensorFlow and deployment with Docker and Kubernetes.",
        imageUrl: "/images/projects/Machine-Learning-Zoomcamp-Capstone-02.png",
        liveUrl: null,
        githubUrl:
          "https://github.com/KonuTech/machine-learning-zoomcamp-capstone-02",
        technologies: [
          "TensorFlow",
          "Transfer Learning",
          "Docker",
          "Kubernetes",
          "Kind Cluster",
        ],
        featured: false,
        userId: null,
      },
      {
        title: "Delta Table Streaming Databricks",
        description:
          "Implementation of streaming data processing with Delta tables in Databricks, demonstrating efficient data pipeline patterns.",
        imageUrl: "/images/projects/Delta-Table-Streaming-Databricks.jfif",
        liveUrl: null,
        githubUrl:
          "https://github.com/KonuTech/delta-table-streaming-databricks",
        technologies: [
          "Databricks",
          "PySpark",
          "Delta Tables",
          "Streaming",
          "JSON",
        ],
        featured: false,
        userId: null,
      },
      {
        title: "Personal Portfolio Website",
        description:
          "A modern, professional portfolio website built with React, TypeScript, and Tailwind CSS. Features responsive design, dark mode support, and interactive components.",
        imageUrl: "/images/projects/about-me-webpage.png",
        liveUrl: null,
        githubUrl: "https://github.com/KonuTech/konrad-borowiec",
        technologies: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Node.js",
          "Express",
          "Vite",
        ],
        featured: false,
        userId: null,
      },
    ];

    // Sample books
    const sampleBooks: InsertBook[] = [
      // Books read or currently reading
      {
        title: "Data Engineering with Databricks Cookbook",
        author: "Pulkit Chadha",
        coverUrl:
          "/images/projects/Data-Engineering-with-Databricks-Cookbook.jfif",
        genre: "Programming",
        rating: 5,
        review:
          "Excellent practical guide for implementing data engineering solutions with Databricks. Provides clear examples and best practices.",
        userId: null,
        status: "read",
      },
      {
        title: "Fundamentals of Data Engineering",
        author: "Joe Reis & Matt Housley",
        coverUrl: "/images/projects/Fundamentals-of-Data-Engineering.jfif",
        genre: "Programming",
        rating: 5,
        review:
          "Comprehensive overview of data engineering principles and practices. Essential reading for anyone in the field.",
        userId: null,
        status: "read",
      },
      {
        title: "Data Engineering with dbt",
        author: "Roberto Zagni",
        coverUrl: "/images/projects/Data-Engineering-with-dbt.jfif",
        genre: "Programming",
        rating: 4,
        review:
          "A thorough guide to implementing data transformation workflows using dbt. Very practical for modern data stack implementation.",
        userId: null,
        status: "read",
      },

      // Books to read
      {
        title:
          "Databricks Certified Associate Developer for Apache Spark Using Python",
        author: "Moshiur Bhuiyan",
        coverUrl:
          "https://m.media-amazon.com/images/I/61aZPkx4hJL._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read",
      },
      {
        title: "Data Modeling with Snowflake",
        author: "Serge Gershkovich",
        coverUrl:
          "https://m.media-amazon.com/images/I/71pFDwAAy4L._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read",
      },
      {
        title: "Data Engineering Best Practices",
        author: "Richard J. Schiller & David Larochelle",
        coverUrl:
          "https://m.media-amazon.com/images/I/61achhPNuzL._SL1360_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read",
      },
      {
        title: "Data Engineering with Google Cloud Platform",
        author: "Adi Wijaya",
        coverUrl:
          "https://m.media-amazon.com/images/I/710JKsGxkKL._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read",
      },
      {
        title: "Data Engineering with Scala and Spark",
        author: "Eric Tome, Rupam Bhattacharajee & David Radford",
        coverUrl:
          "https://m.media-amazon.com/images/I/71QMF1jQ7ZL._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read",
      },
      {
        title: "Data Observability for Data Engineering",
        author: "Michele Pinto & Sammy El Khammal",
        coverUrl:
          "https://m.media-amazon.com/images/I/71vC1Oq0ILL._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read",
      },
      {
        title: "The Definitive Guide to Data Integration",
        author:
          "Pierre-Yves Bonnefoy, Emeric Chaize, Raphael Mansuy & Mehdi Tazi",
        coverUrl:
          "https://m.media-amazon.com/images/I/61q5jxqzQYL._SL1254_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read",
      },
      {
        title: "Getting Started with DuckDB",
        author: "Simon Aubury & Net Letcher",
        coverUrl:
          "https://m.media-amazon.com/images/I/71yZuGCvT6L._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read",
      },
      {
        title: "Polars Cookbook",
        author: "Yuki Kakegawa",
        coverUrl:
          "https://m.media-amazon.com/images/I/71iAiY70UDL._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read",
      },
      {
        title: "Practical Data Quality",
        author: "Robert Hawker",
        coverUrl:
          "https://m.media-amazon.com/images/I/71mV0sqF+YL._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read",
      },
      {
        title: "Python Algorithmic Trading Cookbook",
        author: "Pushpak Dagade",
        coverUrl:
          "https://m.media-amazon.com/images/I/61zN+-0wd1L._SL1360_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read",
      },
      {
        title: "Python Object-oriented Programming",
        author: "Steven F. Lott & Dusty Phillips",
        coverUrl:
          "https://m.media-amazon.com/images/I/61zw5vV5AnL._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read",
      },
    ];

    // Add sample data to storage
    sampleProjects.forEach((project) => this.createProject(project));
    sampleBooks.forEach((book) => this.createBook(book));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Book methods
  async getBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async getBook(id: number): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = this.bookIdCounter++;
    const book: Book = {
      id,
      title: insertBook.title,
      author: insertBook.author,
      coverUrl: insertBook.coverUrl ?? null,
      genre: insertBook.genre ?? null,
      rating: insertBook.rating ?? null,
      review: insertBook.review ?? null,
      userId: insertBook.userId ?? null,
      status: insertBook.status ?? "read",
    };
    this.books.set(id, book);
    return book;
  }

  async updateBook(
    id: number,
    bookUpdate: Partial<InsertBook>,
  ): Promise<Book | undefined> {
    const book = this.books.get(id);
    if (!book) return undefined;

    const updatedBook = { ...book, ...bookUpdate };
    this.books.set(id, updatedBook);
    return updatedBook;
  }

  async deleteBook(id: number): Promise<boolean> {
    return this.books.delete(id);
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectIdCounter++;
    const project: Project = {
      id,
      title: insertProject.title,
      description: insertProject.description,
      userId: insertProject.userId ?? null,
      imageUrl: insertProject.imageUrl ?? null,
      liveUrl: insertProject.liveUrl ?? null,
      githubUrl: insertProject.githubUrl ?? null,
      technologies: insertProject.technologies ?? null,
      featured: insertProject.featured ?? null,
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(
    id: number,
    projectUpdate: Partial<InsertProject>,
  ): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;

    const updatedProject = { ...project, ...projectUpdate };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactIdCounter++;
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
