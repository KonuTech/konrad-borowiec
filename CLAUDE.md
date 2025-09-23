# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Konrad Borowiec's personal portfolio website built as a frontend-only static web application. Originally a full-stack TypeScript application with Express.js backend, it has been refactored to be a pure React frontend that uses static data services for deployment to static hosting platforms like Azure Static Web Apps.

## Development Commands

### Static App Development
- `npm run dev` - Start Vite development server on host 0.0.0.0 (accessible externally)
- `npm run build` - Build static application for production to `build/` directory
- `npm run preview` - Preview production build locally
- `npm run check` - Run TypeScript type checking
- `npm run analyze` - Build and analyze bundle size with vite-bundle-analyzer

### Docker Development (Legacy - for testing static build)
- `docker run --rm -v $(pwd):/app -w /app node:18-alpine npm run build` - Build with Docker
- `docker run --rm -d -p 8080:80 -v $(pwd)/build:/usr/share/nginx/html --name portfolio-preview nginx:alpine` - Serve static build with nginx

### Environment Setup
- No external dependencies or backend services required
- Development server runs on port specified by Vite (default 5173)
- Production build outputs to `build/` directory
- All assets are served statically from the build output

## Architecture Overview

### Project Structure
- `client/` - React frontend application (Vite + TypeScript + Tailwind CSS)
- `shared/` - Shared TypeScript types and Zod validation schemas
- `assets/` - Static assets (images, documents) copied to build output
- `build/` - Production build output directory

### Key Architectural Patterns

**Frontend-Only Static App**: No backend server required. All data is provided through static data services that simulate API responses using in-memory data.

**Component Architecture**: React components organized by feature areas:
- `components/about/` - About section components (Timeline, TechStack)
- `components/books/` - Book-related components with reading list functionality
- `components/contact/` - Contact form (saves to localStorage for demo purposes)
- `components/projects/` - Project showcase components
- `components/layout/` - Header, Footer, mobile menu, dark mode toggle
- `components/ui/` - Reusable UI components (shadcn/ui based)

**Static Data Layer**: Replaces backend API with static data services:
- `client/src/data/mockData.ts` - Central data source with mock projects, books, and images
- `client/src/lib/staticApi.ts` - API compatibility layer that maps old API calls to static data
- All data operations return Promises to maintain async API compatibility

**Styling System**:
- Tailwind CSS for utility-first styling
- shadcn/ui component library for consistent UI components
- Dark mode support via ThemeContext
- Custom theme configuration via `theme.json` and Replit plugin

### Important Technical Details

**Build System**: Vite for frontend bundling with React plugin. Static assets from `assets/` directory are copied to build output and served from root paths (e.g., `/pictures/projects/image.png`).

**State Management**: Standard React state with useState/useEffect patterns. React Context for theme state. No external state management libraries required.

**Routing**: Wouter for client-side routing (lightweight React router alternative).

**Form Handling**: React Hook Form with Zod validation. Contact form submissions are stored in localStorage for demonstration purposes.

**Data Layer**: Uses static data services that simulate API responses with no external dependencies or persistent storage.

## Key Dependencies to Know

**Frontend Stack**:
- React 18 + TypeScript
- Vite for bundling and development
- Tailwind CSS + shadcn/ui for styling
- Wouter for routing
- Framer Motion for animations
- React Hook Form + Zod for form validation

**Development Tools**:
- Vite for bundling and hot reloading
- TypeScript for type checking
- PostCSS + Autoprefixer for CSS processing

## Development Notes

- Application is completely frontend-only with no backend dependencies
- Static images are served from build output at `/pictures/`, `/documents/` paths
- All data is static/in-memory - perfect for static hosting and demonstration purposes
- Contact form submissions are stored in localStorage (client-side only)
- Component library uses shadcn/ui patterns with Radix UI primitives
- Asset paths in code reference `/pictures/` instead of `/assets/pictures/` for static build compatibility
- Mock data includes actual file references that exist in the `assets/` directory

## Static Data Architecture

### Data Sources
- **Projects**: Defined in `mockProjects` array with project details and cover images
- **Books**: Reading list with covers, status (read/to-read), and reviews in `mockBooks` array
- **Images**: Static arrays of image paths for motorcycle and cycling galleries
- **Contacts**: Stored in localStorage via `staticDataService.createContact()`

### API Compatibility Layer
The `staticApi.ts` provides backward compatibility with the original API structure:
```typescript
// Original API calls still work
await api.projects.getAll()
await api.books.getAll()
await api.contact.create(contactData)
```

### Asset Management
- Source assets in `assets/` directory are copied to build output
- Image paths in mock data use `/pictures/` prefix for static serving
- All asset references are validated against actual files in `assets/` directory

## Deployment for Static Hosting

### Build Output Structure
```
build/
├── index.html          # Main HTML file
├── assets/             # Bundled JS/CSS with hashed filenames
├── pictures/           # Static images from assets/pictures/
├── documents/          # Static documents from assets/documents/
└── vite.svg           # Other static assets
```

### Deployment Platforms
- **Azure Static Web Apps**: Primary deployment target
- **Netlify**: Alternative static hosting
- **Vercel**: Alternative static hosting
- **GitHub Pages**: Alternative static hosting

### Azure Static Web Apps Configuration
- Build command: `npm run build`
- Build output directory: `build`
- No API or backend configuration required
- All routing handled client-side by React Router

## Migration Notes

This application was migrated from a full-stack Express.js + React application to a frontend-only static app:

### Changes Made
1. **Removed Express.js backend** and all server-side dependencies
2. **Created static data services** to replace API calls
3. **Updated package.json** to remove server scripts and dependencies
4. **Modified Vite configuration** for static build output
5. **Fixed asset paths** to work with static serving
6. **Updated contact form** to use localStorage instead of backend storage

### Backward Compatibility
- Component interfaces remain unchanged
- Async patterns preserved with Promise-based static data services
- Type definitions maintained via shared types

## Important File Locations

### Core Static Architecture
- `client/src/data/mockData.ts` - Central static data source and service layer
- `client/src/lib/staticApi.ts` - API compatibility layer for static data
- `client/src/components/contact/ContactForm.tsx` - Updated to use localStorage
- `vite.config.ts` - Static build configuration

### Component Updates
- `client/src/components/projects/ProjectsSection.tsx` - Uses useState/useEffect instead of React Query
- `client/src/components/books/BooksSection.tsx` - Uses useState/useEffect instead of React Query
- `client/src/components/interests/InterestsSection.tsx` - Uses static image arrays
- `client/src/App.tsx` - Removed QueryClientProvider wrapper

### Build Configuration
- `package.json` - Updated scripts for static development
- `vite.config.ts` - Configured for static build output to `build/` directory
- `tsconfig.json` - TypeScript configuration for client-only build