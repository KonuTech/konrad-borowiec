import type { Project, Book, Contact } from "@shared/types";

// Mock data for projects
export const mockProjects: Project[] = [
  {
    id: 1,
    title: "Data Engineering Zoomcamp Capstone",
    description: "End-to-end data engineering project showcasing modern data pipeline architecture with cloud technologies.",
    imageUrl: "/assets/pictures/projects/Data-Engineering-Zoomcamp-Capstone.png",
    liveUrl: "https://github.com/example/data-engineering-capstone",
    githubUrl: "https://github.com/example/data-engineering-capstone",
    technologies: ["Python", "Apache Airflow", "BigQuery", "Docker", "Terraform"],
    featured: true,
  },
  {
    id: 2,
    title: "LLM Zoomcamp Capstone",
    description: "Large Language Model application implementing RAG architecture with vector databases and modern ML stack.",
    imageUrl: "/assets/pictures/projects/LLM-Zoomcamp-Capstone.png",
    liveUrl: "https://github.com/example/llm-capstone",
    githubUrl: "https://github.com/example/llm-capstone",
    technologies: ["Python", "LangChain", "Vector DB", "FastAPI", "Docker"],
    featured: true,
  },
  {
    id: 3,
    title: "MLOps Zoomcamp Project",
    description: "Machine Learning Operations project demonstrating model deployment, monitoring, and CI/CD practices.",
    imageUrl: "/assets/pictures/projects/MLOps-Zoomcamp-Project.jfif",
    liveUrl: "https://github.com/example/mlops-project",
    githubUrl: "https://github.com/example/mlops-project",
    technologies: ["Python", "MLflow", "Kubernetes", "Grafana", "GitHub Actions"],
    featured: true,
  },
  {
    id: 4,
    title: "Machine Learning Zoomcamp Capstone",
    description: "Comprehensive machine learning project covering the full ML lifecycle from data preparation to deployment.",
    imageUrl: "/assets/pictures/projects/Machine-Learning-Zoomcamp-Capstone-01.jfif",
    githubUrl: "https://github.com/example/ml-zoomcamp-capstone",
    technologies: ["Python", "scikit-learn", "XGBoost", "Flask", "AWS"],
    featured: false,
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Personal portfolio website built with React and TypeScript, featuring modern design and responsive layout.",
    imageUrl: "/assets/pictures/projects/fe646730-a205-4591-822d-9f718b1aba8c.png",
    liveUrl: "https://portfolio.example.com",
    githubUrl: "https://github.com/example/portfolio",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    featured: false,
  },
];

// Mock data for books
export const mockBooks: Book[] = [
  {
    id: 1,
    title: "Fundamentals of Data Engineering",
    author: "Joe Reis & Matt Housley",
    coverUrl: "/assets/pictures/readings/Fundamentals-of-Data-Engineering.jfif",
    genre: "Data Engineering",
    rating: 5,
    review: "Essential guide to modern data engineering practices and architectures.",
    status: "read",
  },
  {
    id: 2,
    title: "Data Engineering with dbt",
    author: "Roberto Zagni",
    coverUrl: "/assets/pictures/readings/Data-Engineering-with-dbt.jfif",
    genre: "Data Engineering",
    rating: 4,
    review: "Comprehensive guide to using dbt for data transformation and modeling.",
    status: "read",
  },
  {
    id: 3,
    title: "Data Engineering with Databricks Cookbook",
    author: "Navdeep Ghai",
    coverUrl: "/assets/pictures/readings/Data-Engineering-with-Databricks-Cookbook.jfif",
    genre: "Data Engineering",
    rating: 4,
    review: "Practical recipes for building data pipelines with Databricks.",
    status: "read",
  },
  {
    id: 4,
    title: "Delta Table Streaming with Databricks",
    author: "Various Authors",
    coverUrl: "/assets/pictures/readings/Delta-Table-Streaming-Databricks.jfif",
    genre: "Data Engineering",
    status: "to-read",
  },
];

// In-memory storage for contacts (resets on server restart)
let mockContacts: Contact[] = [];
let contactIdCounter = 1;

// Mock service functions
export const mockDataService = {
  // Projects
  async getProjects(): Promise<Project[]> {
    return Promise.resolve(mockProjects);
  },

  async getProject(id: number): Promise<Project | null> {
    const project = mockProjects.find(p => p.id === id);
    return Promise.resolve(project || null);
  },

  // Books
  async getBooks(): Promise<Book[]> {
    return Promise.resolve(mockBooks);
  },

  async getBook(id: number): Promise<Book | null> {
    const book = mockBooks.find(b => b.id === id);
    return Promise.resolve(book || null);
  },

  async createBook(bookData: Omit<Book, 'id'>): Promise<Book> {
    const newBook: Book = {
      ...bookData,
      id: Math.max(...mockBooks.map(b => b.id), 0) + 1,
    };
    mockBooks.push(newBook);
    return Promise.resolve(newBook);
  },

  async updateBook(id: number, bookData: Partial<Omit<Book, 'id'>>): Promise<Book | null> {
    const index = mockBooks.findIndex(b => b.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }
    mockBooks[index] = { ...mockBooks[index], ...bookData };
    return Promise.resolve(mockBooks[index]);
  },

  async deleteBook(id: number): Promise<boolean> {
    const index = mockBooks.findIndex(b => b.id === id);
    if (index === -1) {
      return Promise.resolve(false);
    }
    mockBooks.splice(index, 1);
    return Promise.resolve(true);
  },

  // Contacts
  async createContact(contactData: Omit<Contact, 'id' | 'createdAt'>): Promise<Contact> {
    const newContact: Contact = {
      ...contactData,
      id: contactIdCounter++,
      createdAt: new Date(),
    };
    mockContacts.push(newContact);
    return Promise.resolve(newContact);
  },

  async getContacts(): Promise<Contact[]> {
    return Promise.resolve(mockContacts);
  },
};