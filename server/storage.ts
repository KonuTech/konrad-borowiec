import { 
  users, type User, type InsertUser,
  books, type Book, type InsertBook,
  projects, type Project, type InsertProject,
  contacts, type Contact, type InsertContact
} from "@shared/schema";
import { getReadmeFromGitHub, generateProjectImage } from "./openai";
import { processAndSaveImage, processAttachedAsset, ensureImageDirectories } from "./imageUtils";
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
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Utility methods for image processing
  generateProjectImages(): Promise<void>;
  processMotorcycleImages(): Promise<string[]>;
  processCyclingImages(): Promise<string[]>;
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
        description: "A dockerized 5 min. mini-batch data pipeline. Spark Structured Streaming: reading from Kafka to PostgreSQL as a sink DB.",
        imageUrl: "/images/projects/Data-Engineering-Zoomcamp-Capstone.png",
        liveUrl: null,
        githubUrl: "https://github.com/KonuTech/data-engineering-zoomcamp-capstone-01",
        technologies: ["Airflow", "Kafka", "PySpark", "PostgreSQL", "Streamlit", "Docker"],
        featured: true,
        userId: null
      },
      {
        title: "LLM Zoomcamp Capstone",
        description: "A dockerized RAG application based on PC game reviews pulled from the Steam store. Featuring a Flask app running on Elasticsearch vector database.",
        imageUrl: "/images/projects/LLM-Zoomcamp-Capstone.png",
        liveUrl: null,
        githubUrl: "https://github.com/KonuTech/llm-zoomcamp-capstone-01",
        technologies: ["Flask", "Elasticsearch", "PostgreSQL", "Grafana", "Docker", "Python"],
        featured: true,
        userId: null
      },
      {
        title: "MLOps Zoomcamp Project",
        description: "End-to-end MLOps on GCP - An implementation of MLOps best practices for machine learning workflows on Google Cloud Platform.",
        imageUrl: "/images/projects/MLOps-Zoomcamp-Project.jfif",
        liveUrl: null,
        githubUrl: "https://github.com/KonuTech/mlops-zoomcamp-project",
        technologies: ["PySpark", "Scikit-learn", "XGBoost", "Prefect", "MLflow", "FastAPI", "Evidently AI"],
        featured: false,
        userId: null
      },
      {
        title: "Machine Learning Zoomcamp Capstone 01",
        description: "Dockerized Flask service for scoring if a customer will default on payments, implementing various machine learning algorithms.",
        imageUrl: "/images/projects/Machine-Learning-Zoomcamp-Capstone-01.jfif",
        liveUrl: null,
        githubUrl: "https://github.com/KonuTech/machine-learning-zoomcamp-capstone-01",
        technologies: ["Pandas", "Scikit-learn", "XGBoost", "Flask", "Docker"],
        featured: false,
        userId: null
      },
      {
        title: "Machine Learning Zoomcamp Capstone 02",
        description: "Image classifier using transfer learning with TensorFlow and deployment with Docker and Kubernetes.",
        imageUrl: "/images/projects/Machine-Learning-Zoomcamp-Capstone-02.png",
        liveUrl: null,
        githubUrl: "https://github.com/KonuTech/machine-learning-zoomcamp-capstone-02",
        technologies: ["TensorFlow", "Transfer Learning", "Docker", "Kubernetes", "Kind Cluster"],
        featured: false,
        userId: null
      },
      {
        title: "Delta Table Streaming Databricks",
        description: "Implementation of streaming data processing with Delta tables in Databricks, demonstrating efficient data pipeline patterns.",
        imageUrl: "/images/projects/Delta-Table-Streaming-Databricks.jfif",
        liveUrl: null,
        githubUrl: "https://github.com/KonuTech/delta-table-streaming-databricks",
        technologies: ["Databricks", "PySpark", "Delta Tables", "Streaming", "JSON"],
        featured: false,
        userId: null
      }
    ];

    // Sample books
    const sampleBooks: InsertBook[] = [
      // Books read or currently reading
      {
        title: "Data Engineering with Databricks Cookbook",
        author: "Pulkit Chadha",
        coverUrl: "/images/projects/Data-Engineering-with-Databricks-Cookbook.jfif",
        genre: "Programming",
        rating: 5,
        review: "Excellent practical guide for implementing data engineering solutions with Databricks. Provides clear examples and best practices.",
        userId: null,
        status: "read"
      },
      {
        title: "Fundamentals of Data Engineering",
        author: "Joe Reis & Matt Housley",
        coverUrl: "/images/projects/Fundamentals-of-Data-Engineering.jfif",
        genre: "Programming",
        rating: 5,
        review: "Comprehensive overview of data engineering principles and practices. Essential reading for anyone in the field.",
        userId: null,
        status: "read"
      },
      {
        title: "Data Engineering with dbt",
        author: "Roberto Zagni",
        coverUrl: "/images/projects/Data-Engineering-with-dbt.jfif",
        genre: "Programming",
        rating: 4,
        review: "A thorough guide to implementing data transformation workflows using dbt. Very practical for modern data stack implementation.",
        userId: null,
        status: "read"
      },

      
      // Books to read
      {
        title: "Databricks Certified Associate Developer for Apache Spark Using Python",
        author: "Moshiur Bhuiyan",
        coverUrl: "https://m.media-amazon.com/images/I/61aZPkx4hJL._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read"
      },
      {
        title: "Data Modeling with Snowflake",
        author: "Serge Gershkovich",
        coverUrl: "https://m.media-amazon.com/images/I/71pFDwAAy4L._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read"
      },
      {
        title: "Data Engineering Best Practices",
        author: "Richard J. Schiller & David Larochelle",
        coverUrl: "https://m.media-amazon.com/images/I/61achhPNuzL._SL1360_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read"
      },
      {
        title: "Data Engineering with Google Cloud Platform",
        author: "Adi Wijaya",
        coverUrl: "https://m.media-amazon.com/images/I/710JKsGxkKL._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read"
      },
      {
        title: "Data Engineering with Scala and Spark",
        author: "Eric Tome, Rupam Bhattacharajee & David Radford",
        coverUrl: "https://m.media-amazon.com/images/I/71QMF1jQ7ZL._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read"
      },
      {
        title: "Data Observability for Data Engineering",
        author: "Michele Pinto & Sammy El Khammal",
        coverUrl: "https://m.media-amazon.com/images/I/71vC1Oq0ILL._SL1500_.jpg", 
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read"
      },
      {
        title: "The Definitive Guide to Data Integration",
        author: "Pierre-Yves Bonnefoy, Emeric Chaize, Raphael Mansuy & Mehdi Tazi",
        coverUrl: "https://m.media-amazon.com/images/I/61q5jxqzQYL._SL1254_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read"
      },
      {
        title: "Getting Started with DuckDB",
        author: "Simon Aubury & Net Letcher",
        coverUrl: "https://m.media-amazon.com/images/I/71yZuGCvT6L._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read"
      },
      {
        title: "Polars Cookbook",
        author: "Yuki Kakegawa",
        coverUrl: "https://m.media-amazon.com/images/I/71iAiY70UDL._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read"
      },
      {
        title: "Practical Data Quality",
        author: "Robert Hawker",
        coverUrl: "https://m.media-amazon.com/images/I/71mV0sqF+YL._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read"
      },
      {
        title: "Python Algorithmic Trading Cookbook",
        author: "Pushpak Dagade",
        coverUrl: "https://m.media-amazon.com/images/I/61zN+-0wd1L._SL1360_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read"
      },
      {
        title: "Python Object-oriented Programming",
        author: "Steven F. Lott & Dusty Phillips",
        coverUrl: "https://m.media-amazon.com/images/I/61zw5vV5AnL._SL1500_.jpg",
        genre: "Programming",
        rating: null,
        review: null,
        userId: null,
        status: "to-read"
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
    const book: Book = { 
      id,
      title: insertBook.title,
      author: insertBook.author,
      coverUrl: insertBook.coverUrl ?? null,
      genre: insertBook.genre ?? null,
      rating: insertBook.rating ?? null, 
      review: insertBook.review ?? null,
      userId: insertBook.userId ?? null,
      status: insertBook.status ?? 'read'
    };
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
    const project: Project = { 
      id,
      title: insertProject.title,
      description: insertProject.description,
      userId: insertProject.userId ?? null,
      imageUrl: insertProject.imageUrl ?? null,
      liveUrl: insertProject.liveUrl ?? null,
      githubUrl: insertProject.githubUrl ?? null,
      technologies: insertProject.technologies ?? null,
      featured: insertProject.featured ?? null
    };
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
  
  // Image processing methods
  // Cache to track project images that have been processed
  private projectImageCache = new Map<number, boolean>();
  
  async generateProjectImages(): Promise<void> {
    try {
      await ensureImageDirectories();
      const projects = await this.getProjects();
      const projectsDir = path.join(process.cwd(), 'public', 'images', 'projects');
      
      // Filter projects that need image generation
      const projectsToProcess = projects.filter(project => {
        // Skip projects without GitHub URLs
        if (!project.githubUrl) return false;
        
        // Skip projects we've already checked in this session
        if (this.projectImageCache.has(project.id)) return false;
        
        // Generate expected filename
        const filename = `${project.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
        const outputPath = path.join(projectsDir, filename);
        
        // If image exists, mark as processed and skip
        if (fs.existsSync(outputPath)) {
          this.projectImageCache.set(project.id, true);
          return false;
        }
        
        return true;
      });
      
      // If no projects need processing, return early
      if (projectsToProcess.length === 0) return;
      
      // Process projects one at a time (because OpenAI API calls can be expensive)
      for (const project of projectsToProcess) {
        // Generate filename for the project image
        const filename = `${project.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
        const outputPath = path.join(projectsDir, filename);
        
        try {
          // Get README content from GitHub - handle null case
          if (!project.githubUrl) continue; // Safety check
          const readmeContent = await getReadmeFromGitHub(project.githubUrl as string);
          
          // Generate an image using OpenAI
          const imageUrl = await generateProjectImage(readmeContent || '', project.title);
          
          // Process and save the image with enhanced optimization
          await processAndSaveImage(imageUrl, outputPath, { 
            width: 800, 
            quality: 85, 
            optimizationLevel: 'medium' 
          });
          
          // Update the project with the new image URL
          await this.updateProject(project.id, {
            imageUrl: `/images/projects/${filename}`
          });
          
          // Mark as processed in our cache
          this.projectImageCache.set(project.id, true);
          
          console.log(`Generated image for project: ${project.title}`);
        } catch (error) {
          console.error(`Error generating image for project ${project.title}:`, error);
          // Mark as attempted but failed so we don't retry endlessly
          this.projectImageCache.set(project.id, false);
        }
      }
    } catch (error) {
      console.error('Error generating project images:', error);
    }
  }
  
  // Cache to avoid repetitive file system checks
  private processedImages = new Set<string>();
  private readonly imageConfig = {
    width: 800,
    quality: 80,
    optimizationLevel: 'high' as const
  };

  async processMotorcycleImages(): Promise<string[]> {
    try {
      await ensureImageDirectories();
      const motorcycleImages: string[] = [];
      const motorcycleImagesDir = path.join(process.cwd(), 'public', 'images', 'motorcycles');
      
      // Remove problematic auto-generated images - only once at startup
      if (!this.processedImages.has('cleanup_done')) {
        const imagesToRemove = [
          path.join(motorcycleImagesDir, 'coastal-cliff-flowers.jpg'),
          path.join(motorcycleImagesDir, 'auto-.jpg')
        ];
        
        for (const imageToRemove of imagesToRemove) {
          if (fs.existsSync(imageToRemove)) {
            try {
              fs.unlinkSync(imageToRemove);
            } catch (err) {
              console.error(`Error removing image ${path.basename(imageToRemove)}:`, err);
            }
          }
        }
        this.processedImages.add('cleanup_done');
      }
      
      // Static image list - pre-defined motorcycle images with proper names
      const staticImageMap = new Map([
        ['IMG-570721fa7df047b4f0df66466fee8748-V.jpg', 'motorcycle-mountain-road.jpg'],
        ['IMG-6b55f60ce602d46a3842fd0e58f770d0-V.jpg', 'motorcycle-camping.jpg'],
        ['IMG-a35578be50de37328eef647cfb3109eb-V.jpg', 'mountain-fjord-view.jpg'],
        ['IMG-130f1d41030b51238c944acf3c325879-V.jpg', 'beach-sunset.jpg'],
        ['IMG-23b0a9c0ecf622c381aca22631f78879-V.jpg', 'mountain-valley-river.jpg'],
        ['IMG-1b27076fdf9a09515e29c0798b19e001-V.jpg', 'castle-lake-view.jpg'],
        ['IMG-1750ba11ef604ba4734c21d9f74f7f45-V.jpg', 'cruise-ship-fjord.jpg'],
        ['IMG-b7a2c39f6950786f4b1011b8059d436e-V.jpg', 'mountain-fjord-overlook.jpg'],
        ['IMG-da6c7cede400c5b2ec479bb45a8909f8-V.jpg', 'highland-lake-view.jpg'],
        ['IMG-58b18ba2cb9319afa1d0bab50987b4b8-V.jpg', 'highland-valley.jpg'],
        ['IMG-96efb09bbb67f6e15100d37888cd2b45-V.jpg', 'highland-plain.jpg'],
        ['IMG_20220708_163911.jpg', 'mountain-cliff-road.jpg'],
        ['IMG_20240505_155448.jpg', 'coastal-road-view.jpg'],
        ['IMG_20240502_103331.jpg', 'ferry-motorcycles.jpg'],
        ['IMG_20220707_140811.jpg', 'alpine-mountain-view.jpg'],
        ['IMG_20220707_131955.jpg', 'mountain-restaurant.jpg'],
        ['IMG_20220713_202507.jpg', 'sunset-coastal-ride.jpg'],
        ['IMG_20240429_091530.jpg', 'venice-canal.jpg'],
        ['IMG_20220713_185946.jpg', 'blue-motorcycle-mountains.jpg'],
        ['IMG_20220708_111440.jpg', 'alpine-valley-view.jpg'],
        ['IMG-6434312588d418a02ffc2beaa625ad22-V.jpg', 'camping-with-motorcycle.jpg'],
        ['IMG_20240503_094308.jpg', 'ferry-motorcycle-deck.jpg'],
        ['IMG-e6a667848be5413d552f5a837334ae43-V.jpg', 'motorcycle-by-lake.jpg'],
        ['IMG_20220708_105145.jpg', 'col-de-iseran-sign.jpg'],
        ['IMG_20220707_144004.jpg', 'blue-motorcycle-mountain-pass.jpg'],
        ['IMG_20220716_192956.jpg', 'coastal-mountain-view.jpg'],
        ['IMG_20220715_111003.jpg', 'blue-motorcycles-parked.jpg'],
        ['IMG_20240427_152749.jpg', 'motorcycle-by-river.jpg'],
        ['IMG_20240515_182324.jpg', 'mountain-valley-clouds.jpg'],
        ['IMG_20240515_172646.jpg', 'collada-de-toses-sign.jpg'],
        ['IMG_20240428_145935.jpg', 'castle-mountain-cliff.jpg'],
        ['IMG_20240506_102443.jpg', 'alto-de-velefique-sign.jpg'],
        ['IMG_20240511_110111.jpg', 'cabo-da-roca-sign.jpg'],
        ['IMG_20240506_123347.jpg', 'desert-mountain-road.jpg'],
        ['IMG_20240508_122308.jpg', 'canyon-walkway-bridge.jpg'],
        ['IMG_20220708_111416.jpg', 'motorcycles-mountain-road-signs.jpg'],
        ['IMG_20220711_142702.jpg', 'golden-fields-landscape.jpg'],
        ['IMG_20220712_073610.jpg', 'motorcycle-ferry-port.jpg'],
        ['IMG_20220711_210735.jpg', 'ocean-sunset-waves.jpg'],
        ['IMG_20240504_090511.jpg', 'valencia-city-of-arts.jpg'],
        ['IMG_20220713_171341.jpg', 'mountain-coastal-view.jpg'],
        ['IMG_20220715_182856.jpg', 'motorcycle-country-road.jpg']
      ]);
      
      // Build a processing queue (files that need processing)
      const processingQueue = [];
      
      // Process static named images first - convert to array to avoid TS iteration issue
      for (const [sourceFile, targetName] of Array.from(staticImageMap.entries())) {
        const sourcePath = `attached_assets/${sourceFile}`;
        const outputPath = path.join(motorcycleImagesDir, targetName);
        
        // Cache check to avoid redundant file system operations
        const cacheKey = `motor:${targetName}`;
        
        // Skip if already processed or exists in file system
        if (this.processedImages.has(cacheKey) || fs.existsSync(outputPath)) {
          if (!this.processedImages.has(cacheKey)) {
            this.processedImages.add(cacheKey);
          }
          continue;
        }
        
        // Add to processing queue if file exists
        if (fs.existsSync(sourcePath)) {
          processingQueue.push({
            sourcePath,
            outputDir: motorcycleImagesDir,
            targetName,
            cacheKey
          });
        }
      }
      
      // Dynamically discover other motorcycle images
      const attachedAssetsDir = path.join(process.cwd(), 'attached_assets');
      if (fs.existsSync(attachedAssetsDir)) {
        try {
          const files = fs.readdirSync(attachedAssetsDir);
          
          // Process only IMG_*.jpg files that aren't already known or cycling-related
          for (const file of files) {
            if (file.match(/^IMG_.*\.jpg$/) && !file.match(/cycling/i) && !staticImageMap.has(file)) {
              const sourcePath = path.join(attachedAssetsDir, file);
              const outputPath = path.join(motorcycleImagesDir, file);
              const cacheKey = `motor:${file}`;
              
              // Skip if already processed or exists in file system
              if (this.processedImages.has(cacheKey) || fs.existsSync(outputPath)) {
                if (!this.processedImages.has(cacheKey)) {
                  this.processedImages.add(cacheKey);
                }
                continue;
              }
              
              // Only log new discoveries (not ones we've seen before)
              console.log(`Discovered new motorcycle image: ${file}`);
              
              processingQueue.push({
                sourcePath,
                outputDir: motorcycleImagesDir,
                targetName: file,
                cacheKey
              });
            }
          }
        } catch (error) {
          console.error('Error scanning attached_assets directory:', error);
        }
      }
      
      // Process images in batch (up to 5 at once for better performance)
      const batchSize = 5;
      for (let i = 0; i < processingQueue.length; i += batchSize) {
        const batch = processingQueue.slice(i, i + batchSize);
        await Promise.all(batch.map(async (item) => {
          try {
            await processAttachedAsset(
              item.sourcePath,
              item.outputDir,
              item.targetName,
              this.imageConfig
            );
            
            // Mark as processed in cache
            this.processedImages.add(item.cacheKey);
            console.log(`Processed motorcycle image: ${item.targetName}`);
          } catch (error) {
            console.error(`Error processing image ${item.sourcePath}:`, error);
          }
        }));
      }
      
      // Efficiently gather all processed images
      if (fs.existsSync(motorcycleImagesDir)) {
        const files = fs.readdirSync(motorcycleImagesDir);
        
        // Filter for image files
        for (const file of files) {
          if (/\.(jpg|jpeg|png)$/i.test(file)) {
            motorcycleImages.push(`/images/motorcycles/${file}`);
          }
        }
      }
      
      console.log(`Found ${motorcycleImages.length} motorcycle images in total`);
      return motorcycleImages;
    } catch (error) {
      console.error('Error processing motorcycle images:', error);
      return [];
    }
  }
  
  async processCyclingImages(): Promise<string[]> {
    try {
      await ensureImageDirectories();
      
      const cyclingImages: string[] = [];
      const cyclingImagesDir = path.join(process.cwd(), 'public', 'images', 'cycling');
      
      // Process the specific cycling image
      const filename = 'IMG_20220713_171341.jpg';
      const outputPath = path.join(cyclingImagesDir, filename);
      const cacheKey = `cycling:${filename}`;
      
      // Skip if already processed (use in-memory cache to avoid file check)
      if (this.processedImages.has(cacheKey) || fs.existsSync(outputPath)) {
        if (!this.processedImages.has(cacheKey)) {
          this.processedImages.add(cacheKey);
        }
        
        cyclingImages.push(`/images/cycling/${filename}`);
        return cyclingImages;
      }
      
      try {
        // Process the image
        await processAttachedAsset(
          `attached_assets/${filename}`,
          cyclingImagesDir,
          filename,
          this.imageConfig
        );
        
        // Mark as processed in cache
        this.processedImages.add(cacheKey);
        cyclingImages.push(`/images/cycling/${filename}`);
        console.log(`Processed cycling image: ${filename}`);
      } catch (error) {
        console.error(`Error processing cycling image ${filename}:`, error);
      }
      
      return cyclingImages;
    } catch (error) {
      console.error('Error processing cycling images:', error);
      return [];
    }
  }
}

export const storage = new MemStorage();
