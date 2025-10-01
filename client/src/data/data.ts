import type { Project, Book, Contact } from "../../../shared/types";

// Portfolio projects data
export const projects: Project[] = [
  {
    id: 1,
    title: "Data Engineering Zoomcamp Capstone",
    description: "A dockerized 5 min. mini-batch data pipeline. Spark Structured Streaming: reading from Kafka to PostgreSQL as a sink DB. Airflow, Kafka, PySpark, PostgreSQL, Streamlit",
    imageUrl: "/pictures/projects/Data-Engineering-Zoomcamp-Capstone.png",
    // liveUrl: "https://github.com/KonuTech/data-engineering-zoomcamp-capstone-01",
    githubUrl: "https://github.com/KonuTech/data-engineering-zoomcamp-capstone-01",
    technologies: ["Python", "Docker", "Apache Airflow", "Kafka", "PySpark", "PostgreSQL", "Streamlit"],
    featured: true,
  },
  {
    id: 2,
    title: "LLM Zoomcamp Capstone",
    description: "A dockerized RAG application based on PC game reviews pulled from the Steam store. Featuring a Flask app running on Elasticsearch vector database. As an addition PostgreSQL for logging and Grafana for monitoring",
    imageUrl: "/pictures/projects/LLM-Zoomcamp-Capstone.png",
    // liveUrl: "https://github.com/KonuTech/llm-zoomcamp-capstone-01",
    githubUrl: "https://github.com/KonuTech/llm-zoomcamp-capstone-01",
    technologies: ["Python", "Elasticsearch", "PostgreSQL", "Flask", "Docker", "Grafana"],
    featured: true,
  },
  {
    id: 3,
    title: "MLOps Zoomcamp Project",
    description: "Machine Learning Operations project demonstrating model deployment, monitoring, and CI/CD practices.",
    imageUrl: "/pictures/projects/MLOps-Zoomcamp-Project.jfif",
    // liveUrl: "https://github.com/KonuTech/mlops-zoomcamp-project",
    githubUrl: "https://github.com/KonuTech/mlops-zoomcamp-project",
    technologies: ["Python", "PySpark", "Sciki-learn", "MLflow", "XGBoost", "Kubernetes", "Grafana", "GitHub Actions"],
    featured: true,
  },
  {
    id: 4,
    title: "Machine Learning Zoomcamp Capstone",
    description: "Dockerized Flask service - scoring if a customer will default. Pandas, Sciki-learn, XGBoost, Flask, Docker",
    imageUrl: "/pictures/projects/Machine-Learning-Zoomcamp-Capstone-01.jfif",
    // liveUrl: "https://github.com/KonuTech/machine-learning-zoomcamp-capstone-01",
    githubUrl: "https://github.com/KonuTech/machine-learning-zoomcamp-capstone-01",
    technologies: ["Python", "scikit-learn", "XGBoost", "Flask", "AWS"],
    featured: false,
  },
  {
    id: 5,
    title: "Machine Learning Zoomcamp Capstone",
    description: "TensorFlow, image classifier, transfer-learning, model serving, Docker, Kubernetes, Kind cluster",
    imageUrl: "/pictures/projects/Machine-Learning-Zoomcamp-Capstone-01.jfif",
    // liveUrl: "https://github.com/KonuTech/machine-learning-zoomcamp-capstone-02",
    githubUrl: "https://github.com/KonuTech/machine-learning-zoomcamp-capstone-02",
    technologies: ["Python", "scikit-learn", "XGBoost", "Flask", "AWS"],
    featured: false,
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "Personal portfolio website built with React and TypeScript, featuring modern design and responsive layout.",
    imageUrl: "/pictures/projects/fe646730-a205-4591-822d-9f718b1aba8c.png",
    // liveUrl: "https://github.com/KonuTech/konrad-borowiec",
    githubUrl: "https://github.com/KonuTech/konrad-borowiec",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    featured: false,
  },
];

// Reading list data
export const books: Book[] = [
  {
    id: 1,
    title: "Fundamentals of Data Engineering",
    author: "Joe Reis & Matt Housley",
    coverUrl: "/pictures/readings/Fundamentals-of-Data-Engineering.jfif",
    genre: "Data Engineering",
    rating: 5,
    review: "Essential guide to modern data engineering practices and architectures.",
    status: "read",
  },
  {
    id: 2,
    title: "Data Engineering with dbt",
    author: "Roberto Zagni",
    coverUrl: "/pictures/readings/Data-Engineering-with-dbt.jfif",
    genre: "Data Engineering",
    rating: 4,
    review: "Comprehensive guide to using dbt for data transformation and modeling.",
    status: "read",
  },
  {
    id: 3,
    title: "Data Engineering with Databricks Cookbook",
    author: "Navdeep Ghai",
    coverUrl: "/pictures/readings/Data-Engineering-with-Databricks-Cookbook.jfif",
    genre: "Data Engineering",
    rating: 4,
    review: "Practical recipes for building data pipelines with Databricks.",
    status: "read",
  },
  {
    id: 4,
    title: "Delta Table Streaming with Databricks",
    author: "Various Authors",
    coverUrl: "/pictures/readings/Delta-Table-Streaming-Databricks.jfif",
    genre: "Data Engineering",
    status: "to-read",
  },
];

// Motorcycle gallery images
export const motorcycleImages = [
  "/pictures/motorcycling/IMG-1750ba11ef604ba4734c21d9f74f7f45-V.jpg",
  "/pictures/motorcycling/IMG-1b27076fdf9a09515e29c0798b19e001-V.jpg",
  "/pictures/motorcycling/IMG-23b0a9c0ecf622c381aca22631f78879-V.jpg",
  "/pictures/motorcycling/IMG-570721fa7df047b4f0df66466fee8748-V.jpg",
  "/pictures/motorcycling/IMG-58b18ba2cb9319afa1d0bab50987b4b8-V.jpg",
  "/pictures/motorcycling/IMG-6434312588d418a02ffc2beaa625ad22-V.jpg",
  "/pictures/motorcycling/IMG-6b55f60ce602d46a3842fd0e58f770d0-V.jpg",
  "/pictures/motorcycling/IMG-96efb09bbb67f6e15100d37888cd2b45-V.jpg",
  "/pictures/motorcycling/IMG-a35578be50de37328eef647cfb3109eb-V.jpg",
  "/pictures/motorcycling/IMG-b7a2c39f6950786f4b1011b8059d436e-V.jpg",
  "/pictures/motorcycling/IMG-d0f401134078845aa20baec6803a0eb9-V.jpg",
  "/pictures/motorcycling/IMG-da6c7cede400c5b2ec479bb45a8909f8-V.jpg",
  // "/pictures/motorcycling/IMG-e6a667848be5413d552f5a837334ae43-V.jpg",
  "/pictures/motorcycling/IMG-eeb8ddbd10fd888a6ea26afba5fbb138-V.jpg",
  "/pictures/motorcycling/IMG_20220707_131955.jpg",
  "/pictures/motorcycling/IMG_20220707_140811.jpg",
  // "/pictures/motorcycling/IMG_20220707_144004.jpg",
  "/pictures/motorcycling/IMG_20220708_094645.jpg",
  "/pictures/motorcycling/IMG_20220708_105145.jpg",
  "/pictures/motorcycling/IMG_20220708_111416.jpg",
  "/pictures/motorcycling/IMG_20220708_111440.jpg",
  "/pictures/motorcycling/IMG_20220708_162848.jpg",
  "/pictures/motorcycling/IMG_20220708_163911.jpg",
  // "/pictures/motorcycling/IMG_20220711_142702.jpg",
  "/pictures/motorcycling/IMG_20220711_210735.jpg",
  // "/pictures/motorcycling/IMG_20220712_073610.jpg",
  "/pictures/motorcycling/IMG_20220713_171341.jpg",
  "/pictures/motorcycling/IMG_20220713_172632.jpg",
  "/pictures/motorcycling/IMG_20220713_180355.jpg",
  "/pictures/motorcycling/IMG_20220713_185946.jpg",
  "/pictures/motorcycling/IMG_20220713_202507.jpg",
  // "/pictures/motorcycling/IMG_20220715_101945.jpg",
  "/pictures/motorcycling/IMG_20220715_111003.jpg",
  "/pictures/motorcycling/IMG_20220715_182856.jpg",
  // "/pictures/motorcycling/IMG_20220716_192956.jpg",
  "/pictures/motorcycling/IMG_20220717_144202.jpg",
  // "/pictures/motorcycling/IMG_20240427_152749.jpg",
  "/pictures/motorcycling/IMG_20240428_145935.jpg",
  "/pictures/motorcycling/IMG_20240429_091530.jpg",
  "/pictures/motorcycling/IMG_20240502_103331.jpg",
  "/pictures/motorcycling/IMG_20240503_094308.jpg",
  "/pictures/motorcycling/IMG_20240504_090511.jpg",
  "/pictures/motorcycling/IMG_20240504_154451.jpg",
  "/pictures/motorcycling/IMG_20240505_155448.jpg",
  // "/pictures/motorcycling/IMG_20240506_101431.jpg",
  "/pictures/motorcycling/IMG_20240506_102354.jpg",
  "/pictures/motorcycling/IMG_20240506_102443.jpg",
  // "/pictures/motorcycling/IMG_20240506_123347.jpg",
  "/pictures/motorcycling/IMG_20240506_143240.jpg",
  // "/pictures/motorcycling/IMG_20240506_164230.jpg",
  "/pictures/motorcycling/IMG_20240506_182721.jpg",
  "/pictures/motorcycling/IMG_20240508_122308.jpg",
  "/pictures/motorcycling/IMG_20240509_131509.jpg",
  "/pictures/motorcycling/IMG_20240509_191420.jpg",
  "/pictures/motorcycling/IMG_20240511_110111.jpg",
  "/pictures/motorcycling/IMG_20240511_113014.jpg",
  "/pictures/motorcycling/IMG_20240515_171651.jpg",
  // "/pictures/motorcycling/IMG_20240515_172646.jpg",
  "/pictures/motorcycling/IMG_20240515_182324.jpg",
  // "/pictures/cycling/IMG-130f1d41030b51238c944acf3c325879-V.jpg",
];

// Cycling gallery images
export const cyclingImages = [
  "/pictures/cycling/IMG-130f1d41030b51238c944acf3c325879-V.jpg",
];

// Contact form submissions storage
let contacts: Contact[] = [];
let contactIdCounter = 1;

// Data service for portfolio content
export const dataService = {
  // Projects
  async getProjects(): Promise<Project[]> {
    return Promise.resolve(projects);
  },

  async getProject(id: number): Promise<Project | null> {
    const project = projects.find(p => p.id === id);
    return Promise.resolve(project || null);
  },

  // Books
  async getBooks(): Promise<Book[]> {
    return Promise.resolve(books);
  },

  async getBook(id: number): Promise<Book | null> {
    const book = books.find(b => b.id === id);
    return Promise.resolve(book || null);
  },

  // Images
  async getMotorcycleImages(): Promise<string[]> {
    return Promise.resolve(motorcycleImages);
  },

  async getCyclingImages(): Promise<string[]> {
    return Promise.resolve(cyclingImages);
  },

  // Contact form
  async createContact(contactData: Omit<Contact, 'id' | 'createdAt'>): Promise<Contact> {
    const newContact: Contact = {
      ...contactData,
      id: contactIdCounter++,
      createdAt: new Date(),
    };
    contacts.push(newContact);

    // Store in localStorage for persistence
    localStorage.setItem('portfolio-contacts', JSON.stringify(contacts));

    return Promise.resolve(newContact);
  },

  async getContacts(): Promise<Contact[]> {
    // Load from localStorage
    const stored = localStorage.getItem('portfolio-contacts');
    if (stored) {
      contacts = JSON.parse(stored);
    }
    return Promise.resolve(contacts);
  },
};