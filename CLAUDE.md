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

### Optimization Commands
- `npm run analyze` - Analyze bundle size with vite-bundle-analyzer
- `npm run optimize-images` - Optimize images using Sharp compression
- `npm run audit-deps` - Check for unused dependencies with depcheck

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
- `/api/images/motorcycle` - Dynamic motorcycle gallery image listing
- `/api/images/cycling` - Dynamic cycling gallery image listing
- `/health` - Health check endpoint for monitoring
- `/api/metrics` - Development-only metrics endpoint

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

**Performance & Security Optimizations**:
- Multi-level caching system (API responses cached in memory with TTL)
- Rate limiting (100 requests/15min for API, 5/min for contact form)
- Security headers (CSP, XSS protection, HSTS in production)
- Request validation and malicious pattern detection
- Image optimization with Sharp (dynamic resizing, format conversion, quality control)
- Performance monitoring with metrics collection and slow request alerts
- Graceful shutdown handling and health checks

**Asset Management**:
- Dynamic image serving from `/assets/pictures/` with optimization parameters
- Support for on-the-fly image optimization via query params (?w=300&format=webp&q=85)
- HTTP caching for static assets (30 days) and optimized images (1 year)
- Motorcycle gallery with 58 images loaded dynamically from filesystem

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
- Sharp for image optimization
- In-memory caching and rate limiting
- Security middleware stack

**Development Tools**:
- tsx for running TypeScript in development
- esbuild for production server bundling
- Docker for containerized development
- Sharp for image processing and optimization
- Bundle analyzer for size monitoring

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

## Performance & Optimization Features

### Middleware Stack (Applied in Order)
1. **Security Headers** - CSP, XSS protection, frame options (relaxed for development)
2. **Request Validation** - User agent validation and malicious pattern detection
3. **Performance Monitoring** - Request duration tracking and slow request alerts
4. **Compression** - Vary headers for response compression
5. **Rate Limiting** - Applied per API route with different limits
6. **Caching** - In-memory response caching with configurable TTL

### Caching Strategy
- **API Responses**: In-memory caching with different TTLs per endpoint
  - Projects: 1 hour (3600s)
  - Books: 30 minutes (1800s)
  - Images: 2 hours (7200s)
- **Static Assets**: HTTP caching with ETags and proper cache headers
- **Optimized Images**: 1-year cache for processed images with immutable flag

### Image Optimization
- **Dynamic Processing**: URL query parameters for width, format, and quality
- **Format Support**: WebP and JPEG with quality control
- **Sharp Integration**: Server-side image processing with resize and optimization
- **Fallback Strategy**: Original images served if optimization fails

### Security Features
- **Rate Limiting**: Custom implementation with IP-based tracking and cleanup
- **Request Validation**: Pattern matching for common attack vectors
- **Security Headers**: Comprehensive security header stack
- **Production Hardening**: HSTS only in production, relaxed CSP for development

### Monitoring & Metrics
- **Performance Tracking**: Response time monitoring with alerts for >1000ms requests
- **Cache Analytics**: Hit/miss ratio tracking and reporting
- **System Metrics**: Memory usage, uptime, and request statistics
- **Health Checks**: Docker health check endpoint for container orchestration
- **Graceful Shutdown**: Proper signal handling and connection cleanup

## Important File Locations

### Core Server Architecture
- `server/index.ts` - Main server entry point with graceful shutdown
- `server/routes.ts` - API routes with middleware integration
- `server/mockData.ts` - Stateless mock data service
- `server/monitoring.ts` - Metrics collection and logging system

### Middleware Modules
- `server/middleware/cache.ts` - In-memory caching with TTL management
- `server/middleware/performance.ts` - Request timing and monitoring
- `server/middleware/security.ts` - Rate limiting and security headers

### Frontend Hooks & Utilities
- `client/src/hooks/useOptimizedImage.ts` - Image optimization React hook
- `client/src/components/interests/InterestsSection.tsx` - Dynamic gallery implementation

### Build & Optimization
- `scripts/optimize-assets.js` - Image compression automation
- `Dockerfile` - Multi-stage build with health checks and non-root user
- `docker-compose.yml` - Development and production configurations

### Azure Deployment Infrastructure
- `azure-deployment/deploy.sh` - One-click Azure Container Apps deployment script
- `azure-deployment/deploy-bicep.sh` - Infrastructure as Code deployment using Bicep
- `azure-deployment/bicep/main.bicep` - Bicep template for complete Azure infrastructure
- `azure-deployment/containerapp.yaml` - Kubernetes-style Container App configuration
- `.github/workflows/deploy-azure.yml` - GitHub Actions CI/CD pipeline

## Deployment Options

### Azure Container Apps (Free Tier) - Recommended
The application is optimized for Azure Container Apps free tier deployment with:
- **Resources**: 0.25 vCPU, 0.5GB RAM per container
- **Scaling**: 0-10 replicas (can scale to zero for cost savings)
- **Free Allowance**: 2M requests, 400,000 GB-s execution time per month

**Quick Deployment:**
```bash
cd azure-deployment
chmod +x deploy.sh
# Update SUBSCRIPTION_ID and REGISTRY_NAME in script
./deploy.sh
```

**CI/CD Deployment:**
1. Set GitHub repository secrets: `AZURE_CREDENTIALS`, `SESSION_SECRET`
2. Push to main branch for automatic deployment via GitHub Actions

**Manual Azure CLI:**
```bash
# Build and deploy with Azure CLI
az containerapp up --name konrad-portfolio --source . --ingress external --target-port 5000
```

### Deployment Architecture
- **Azure Container Registry**: Stores optimized Docker images
- **Container Apps Environment**: Managed Kubernetes environment
- **Log Analytics Workspace**: For monitoring and observability
- **Health Checks**: Built-in container health monitoring at `/health`
- **Auto-scaling**: HTTP-based scaling rules with scale-to-zero capability

### Production Features
- **HTTPS**: Automatic SSL certificate provisioning
- **Custom Domains**: Support for custom domain mapping
- **Blue/Green Deployments**: Zero-downtime deployments via revisions
- **Monitoring**: Integrated Azure Monitor and Application Insights
- **Security**: Production-hardened with rate limiting and security headers