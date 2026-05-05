# Konrad Borowiec - Welcome to my About Me web page

A modern, responsive portfolio website built as a frontend-only static web application using React, TypeScript, and Tailwind CSS. The site showcases professional skills, projects, books, and personal interests with a clean, interactive design.

## ✨ Features

- **🎨 Modern Design**: Clean, professional interface with dark mode support
- **📱 Fully Responsive**: Optimized for all screen sizes and devices
- **⚡ Fast Performance**: Static site generation with optimized assets
- **🎭 Interactive Animations**: Smooth transitions using Framer Motion
- **📖 Dynamic Content**: Projects showcase, reading list, and photo galleries
- **📧 Contact Form**: Functional contact form with localStorage persistence
- **🌙 Dark Mode**: System-aware theme switching
- **♿ Accessible**: Built with semantic HTML and ARIA standards

## 🚀 Live Demo

The portfolio is deployed on Azure Static Web Apps and automatically updates via GitHub Actions.

## 🛠️ Tech Stack

### **Frontend Framework**

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with enhanced tooling
- **Vite** - Fast build tool and development server

### **Styling & UI**

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible UI components
- **Radix UI** - Unstyled, accessible component primitives
- **Framer Motion** - Smooth animations and transitions

### **Routing & Forms**

- **Wouter** - Lightweight client-side routing
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### **Development Tools**

- **PostCSS** - CSS processing with Autoprefixer
- **Class Variance Authority** - Utility for creating component variants
- **Lucide React** - Beautiful, customizable icons
- **i18next** - Internationalization framework

## 📁 Project Structure

```
├── client/                    # React application source
│   ├── src/
│   │   ├── components/       # React components organized by feature
│   │   │   ├── about/       # About section (Timeline, TechStack)
│   │   │   ├── books/       # Book collection and reading list
│   │   │   ├── contact/     # Contact form and information
│   │   │   ├── home/        # Hero section and landing page
│   │   │   ├── interests/   # Photo galleries (motorcycle, cycling)
│   │   │   ├── layout/      # Header, Footer, navigation
│   │   │   ├── projects/    # Project showcase
│   │   │   └── ui/          # Reusable UI components (shadcn/ui)
│   │   ├── context/         # React context (theme management)
│   │   ├── data/            # Static data and mock services
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and configurations
│   │   └── pages/           # Page components
│   └── index.html           # HTML template
├── shared/                   # Shared TypeScript types
├── assets/                   # Static assets (images, documents)
├── .github/workflows/        # GitHub Actions for deployment
└── build/                    # Production build output (generated)
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/KonuTech/konrad-borowiec.git
   cd konrad-borowiec
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📜 Available Scripts

| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start development server with hot reload   |
| `npm run build`   | Build for production to `build/` directory |
| `npm run preview` | Preview production build locally           |
| `npm run check`   | Run TypeScript type checking               |
| `npm run analyze` | Build and analyze bundle size              |

## 🏗️ Architecture

### **Frontend-Only Static Application**

This portfolio is built as a pure frontend application with no backend dependencies. All data is managed through static data services that simulate API responses.

### **Static Data Layer**

- **`client/src/data/data.ts`** - Central data source for projects, books, and images
- **`client/src/lib/staticApi.ts`** - API compatibility layer for seamless data access
- **localStorage** - Contact form submissions persistence

### **Component Architecture**

Components are organized by feature and follow React best practices:

- Functional components with hooks
- TypeScript for type safety
- Props interfaces for clear contracts
- Consistent styling with Tailwind CSS

### **State Management**

- **React Context** - Theme state (dark/light mode)
- **useState/useEffect** - Local component state
- **React Hook Form** - Form state management
- **localStorage** - Client-side data persistence

## 🎨 Styling System

### **Design Tokens**

Custom theme configuration via `theme.json` with consistent color palette:

- Primary: `#4A90E2` (Professional blue)
- Gradient: Primary → Light → Accent variations
- Typography: Nunito and Lato font families

### **Responsive Design**

Mobile-first approach with Tailwind breakpoints:

- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up

### **Dark Mode**

System-aware dark mode with smooth transitions and optimized contrast ratios.

## 📦 Deployment

### **Azure Static Web Apps** (Primary)

Automatically deployed via GitHub Actions workflow:

- **Build Command**: `npm run build`
- **Output Directory**: `build/`
- **Workflow**: `.github/workflows/azure-static-web-apps-*.yml`

### **Alternative Hosting**

The static build works with any hosting platform:

- **Netlify**: Drop `build/` folder or connect GitHub
- **Vercel**: Import GitHub repository
- **GitHub Pages**: Upload `build/` contents
- **AWS S3**: Static website hosting

## 🔧 Development

### **Adding New Content**

**Projects**: Update `projects` array in `client/src/data/data.ts`

```typescript
{
  id: 5,
  title: "New Project",
  description: "Project description",
  imageUrl: "/pictures/projects/new-project.png",
  technologies: ["React", "TypeScript"],
  featured: true
}
```

**Books**: Update `books` array in `client/src/data/data.ts` with reading status

```typescript
{
  id: 10,
  title: "New Book",
  author: "Author Name",
  coverUrl: "/pictures/readings/book-cover.jpg",
  status: "read" | "to-read"
}
```

**Images**: Add files to `assets/pictures/` and update image arrays

### **Customization**

**Theme Colors**: Modify `theme.json` and `tailwind.config.ts`
**Components**: Follow existing patterns in `client/src/components/`
**Styling**: Use Tailwind utility classes and custom CSS variables

## 🧪 Testing Static Build

Test the production build locally with Docker:

```bash
# Build the application
npm run build

# Serve with nginx
docker run --rm -d -p 8080:80 \
  -v $(pwd)/build:/usr/share/nginx/html \
  --name portfolio-test nginx:alpine

# View at http://localhost:8080
```

## 📈 Performance

### **Optimizations**

- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Lazy loading with Vite
- **Asset Optimization**: Compressed images and fonts
- **CSS Purging**: Unused styles removed in production

### **Bundle Analysis**

```bash
npm run analyze
```

Current bundle sizes (gzipped):

- **JavaScript**: ~114 KB
- **CSS**: ~13 KB
- **Total First Load**: ~127 KB

## 🏛️ Architecture Evolution

This project was migrated from a full-stack Express.js application to a frontend-only static web app:

### **Migration Benefits**

- ✅ **Simplified Deployment**: No server management required
- ✅ **Better Performance**: CDN-optimized static assets
- ✅ **Cost Effective**: Free hosting on static platforms
- ✅ **Improved Security**: No server-side attack vectors
- ✅ **Easy Scaling**: Automatic CDN distribution

### **Backward Compatibility**

- Component interfaces preserved
- Async data patterns maintained
- Type definitions unchanged
- Development workflow consistent

## 📄 License

© 2024 Konrad Borowiec. All rights reserved.

This project is not open source. The code and design are made public for showcase purposes only. No part of this project may be used, reproduced, or distributed without express written consent from the author.

**Public Showcase**: This repository demonstrates modern web development practices and serves as an example of clean, maintainable React TypeScript architecture.

---

Built with ❤️ using React, TypeScript, and modern web technologies.
