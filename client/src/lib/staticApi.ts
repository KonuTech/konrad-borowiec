import { dataService } from '../data/data';
import type { Project, Book, Contact } from '../../../shared/types';

// Static API service that replaces backend API calls
export const api = {
  // Projects
  projects: {
    getAll: (): Promise<Project[]> => dataService.getProjects(),
    getById: (id: number): Promise<Project | null> => dataService.getProject(id),
  },

  // Books
  books: {
    getAll: (): Promise<Book[]> => dataService.getBooks(),
    getById: (id: number): Promise<Book | null> => dataService.getBook(id),
  },

  // Images
  images: {
    getMotorcycle: (): Promise<string[]> => dataService.getMotorcycleImages(),
    getCycling: (): Promise<string[]> => dataService.getCyclingImages(),
  },

  // Contact
  contact: {
    create: (contactData: Omit<Contact, 'id' | 'createdAt'>): Promise<Contact> =>
      dataService.createContact(contactData),
    getAll: (): Promise<Contact[]> => dataService.getContacts(),
  },
};

// Legacy fetch wrapper for easier migration from API calls
export const fetchApi = {
  get: async (url: string) => {
    // Map API URLs to static data methods
    switch (url) {
      case '/api/projects':
        const projects = await api.projects.getAll();
        return { json: () => Promise.resolve(projects) };

      case '/api/books':
        const books = await api.books.getAll();
        return { json: () => Promise.resolve(books) };

      case '/api/images/motorcycle':
        const motorcycleImages = await api.images.getMotorcycle();
        return { json: () => Promise.resolve({ images: motorcycleImages }) };

      case '/api/images/cycling':
        const cyclingImages = await api.images.getCycling();
        return { json: () => Promise.resolve({ images: cyclingImages }) };

      default:
        throw new Error(`Static API: Unsupported URL: ${url}`);
    }
  },

  post: async (url: string, data: any) => {
    switch (url) {
      case '/api/contact':
        const contact = await api.contact.create(data);
        return {
          ok: true,
          json: () => Promise.resolve({
            message: 'Contact form submitted successfully! (stored locally)',
            contact
          })
        };

      default:
        throw new Error(`Static API: Unsupported POST URL: ${url}`);
    }
  },
};