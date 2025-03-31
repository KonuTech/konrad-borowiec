import { 
  users, type User, type InsertUser,
  books, type Book, type InsertBook,
  projects, type Project, type InsertProject,
  contacts, type Contact, type InsertContact
} from "@shared/schema";

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
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
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
    // Sample projects
    const sampleProjects: InsertProject[] = [
      {
        title: "E-commerce Dashboard",
        description: "A comprehensive dashboard for managing online stores, featuring real-time analytics, inventory management, and order processing.",
        imageUrl: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        liveUrl: "https://example.com/ecommerce",
        githubUrl: "https://github.com/example/ecommerce",
        technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
        featured: true,
        userId: null
      },
      {
        title: "Financial Planning App",
        description: "A personal finance application that helps users track expenses, set savings goals, and visualize spending patterns with interactive charts.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80",
        liveUrl: "https://example.com/finance",
        githubUrl: "https://github.com/example/finance",
        technologies: ["React", "Redux", "Express", "D3.js"],
        featured: false,
        userId: null
      },
      {
        title: "Travel Journey App",
        description: "A mobile-first application for travelers to document their journeys, share photos, and create interactive maps of their adventures.",
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        liveUrl: "https://example.com/travel",
        githubUrl: "https://github.com/example/travel",
        technologies: ["React Native", "Firebase", "MapBox", "Expo"],
        featured: false,
        userId: null
      }
    ];

    // Sample books
    const sampleBooks: InsertBook[] = [
      {
        title: "Atomic Habits",
        author: "James Clear",
        coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        genre: "Self-Improvement",
        rating: 5,
        review: "A comprehensive guide on how to build good habits and break bad ones. The book focuses on small, incremental changes that lead to remarkable results over time.",
        userId: null
      },
      {
        title: "Dune",
        author: "Frank Herbert",
        coverUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
        genre: "Sci-Fi",
        rating: 5,
        review: "A masterpiece of science fiction that tells the story of Paul Atreides, whose family accepts stewardship of the desert planet Arrakis, the only source of the most valuable substance in the universe.",
        userId: null
      },
      {
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        coverUrl: "https://images.unsplash.com/photo-1587387119725-9d6bac0f22fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        genre: "Programming",
        rating: 4,
        review: "A modern introduction to programming, teaching essential concepts of JavaScript along with the principles of programming and software design.",
        userId: null
      },
      {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        genre: "History",
        rating: 5,
        review: "A brief history of humankind that explores how Homo sapiens came to dominate the Earth through our ability to create and believe in shared myths and stories.",
        userId: null
      }
    ];

    // Add sample data to storage
    sampleProjects.forEach(project => this.createProject(project));
    sampleBooks.forEach(book => this.createBook(book));
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
    const book: Book = { ...insertBook, id };
    this.books.set(id, book);
    return book;
  }

  async updateBook(id: number, bookUpdate: Partial<InsertBook>): Promise<Book | undefined> {
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
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, projectUpdate: Partial<InsertProject>): Promise<Project | undefined> {
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
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
