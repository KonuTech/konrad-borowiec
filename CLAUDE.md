# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Konrad Borowiec's personal portfolio website built as a full-stack TypeScript application. It's a React frontend with Express.js backend, featuring sections for projects, books, and contact functionality. The application is completely stateless and uses in-memory mock data services for API responses.

## Development Commands

### Docker Development (Recommended for WSL)
- `docker-compose up` - Start development environment
- `docker-compose down` - Stop all services
- `docker-compose up --build` - Rebuild and start services
- `docker-compose logs app` - View application logs
- `docker-compose build app` - start build after code changes
- `docker-compose up -d app` - start detached

### Docker Production
- `docker-compose --profile production up app-prod` - Start production environment

### Native Development Commands
- `npm run dev` - Start development server (runs both frontend and backend via tsx)
- `npm run build` - Build for production (builds React app and bundles server with esbuild)
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking

### Environment Setup
**Docker (Default):**
- No external dependencies required
- Environment variables are configured in docker-compose.yml
- Development server accessible at http://localhost:5000

**Native Setup:**
- Requires `SESSION_SECRET` environment variable in production
- Development server runs on port 5000 (serves both API and client)

## Architecture Overview

### Project Structure
- `client/` - React frontend application (Vite + TypeScript + Tailwind CSS)
- `server/` - Express.js backend API with mock data services
- `shared/` - Shared TypeScript types and Zod validation schemas

### Key Architectural Patterns

**Full-Stack TypeScript**: Shared types and Zod validation schemas between client and server via the `shared/types.ts` file, ensuring type safety across the entire application.

**Component Architecture**: React components organized by feature areas:
- `components/about/` - About section components (Timeline, TechStack)
- `components/books/` - Book-related components with reading list functionality
- `components/contact/` - Contact form and info components
- `components/projects/` - Project showcase components
- `components/layout/` - Header, Footer, mobile menu, dark mode toggle
- `components/ui/` - Reusable UI components (shadcn/ui based)

**API Design**: RESTful API structure with `/api` prefix:
- `/api/projects` - Project CRUD operations (returns mock data)
- `/api/books` - Book management with "read" and "to-read" status (in-memory storage)
- `/api/contact` - Contact form submissions (logged to console)

**Data Management**:
- Completely stateless with in-memory mock data services
- Mock data defined in `server/mockData.ts`
- Contact submissions stored temporarily in memory (resets on server restart)
- All data operations use the `mockDataService` for consistent API responses

**Styling System**:
- Tailwind CSS for utility-first styling
- shadcn/ui component library for consistent UI components
- Dark mode support via ThemeContext
- Custom theme configuration via `theme.json` and Replit plugin

### Important Technical Details

**Build System**: Vite for frontend bundling with React plugin, esbuild for server bundling in production. The server serves both API endpoints and static files.

**State Management**: React Query (`@tanstack/react-query`) for server state management, React Context for theme state.

**Routing**: Wouter for client-side routing (lightweight React router alternative).

**Form Handling**: React Hook Form with Zod validation using `@hookform/resolvers`.

**Data Layer**: Uses in-memory mock data services with no external dependencies or persistent storage.

## Key Dependencies to Know

**Frontend Stack**:
- React 18 + TypeScript
- Vite for bundling and development
- Tailwind CSS + shadcn/ui for styling
- Wouter for routing
- React Query for data fetching
- Framer Motion for animations

**Backend Stack**:
- Express.js with TypeScript
- Zod for validation
- Express sessions with memory store
- Static data serving (no database connectivity)

**Development Tools**:
- tsx for running TypeScript in development
- esbuild for production server bundling
- Docker for containerized development

## Development Notes

- The app serves both frontend and backend on port 5000 in all environments
- Static images are served from `/assets` route pointing to `assets/` directory
- All data is mock/in-memory - perfect for development and demonstration purposes
- All API responses are logged in development with request duration
- Session management is configured for both development and production environments
- Component library uses shadcn/ui patterns with Radix UI primitives
- Application is completely stateless with no external database dependencies
- Mock data is defined in `server/mockData.ts` and can be easily customized
- Contact form submissions are logged to console and stored temporarily in memory