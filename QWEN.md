# QWEN.md - Instructional Context for Konrad Borowiec Portfolio

## Project Overview

This is a **frontend-only static portfolio website** built with React 18, TypeScript, Vite, and Tailwind CSS. It serves as a professional portfolio showcasing data engineering skills, projects, books, and personal interests. The site is fully internationalized with English and Polish translations.

**Migration History:** Originally a full-stack Express.js application, it was migrated to a pure static build for simpler deployment, better performance, and cost savings.

---

## Tech Stack

### Core Framework

- **React 18** with hooks and functional components
- **TypeScript** for type-safe development
- **Vite** as the build tool and dev server

### Styling & UI

- **Tailwind CSS** with custom theme configuration
- **shadcn/ui** components (Radix UI primitives)
- **Framer Motion** for animations
- **Font Awesome** for icons (loaded via CDN)

### State & Routing

- **Wouter** for client-side routing
- **React Hook Form** + **Zod** for form validation
- **React Context** for theme management
- **localStorage** for client-side persistence

### Internationalization

- **i18next** + **react-i18next** for translations
- Locales: `src/i18n/locales/{en,pl}/translation.json`

---

## Project Structure

```
konrad-borowiec/
├── client/                          # React application
│   ├── src/
│   │   ├── components/             # Feature-organized components
│   │   │   ├── about/              # About section (Timeline, TechStack)
│   │   │   ├── books/              # Book collection
│   │   │   ├── contact/            # Contact form & info
│   │   │   ├── home/               # Hero section
│   │   │   ├── interests/          # Photo galleries
│   │   │   ├── layout/             # Header, Footer, MobileMenu
│   │   │   ├── projects/           # Project showcase
│   │   │   ├── ui/                 # Reusable UI components
│   │   │   └── i18n/               # LanguageSwitcher
│   │   ├── context/                # ThemeContext
│   │   ├── data/                   # Static data (projects, books, images)
│   │   ├── hooks/                  # Custom hooks (use-toast)
│   │   ├── i18n/                  # Internationalization
│   │   │   └── locales/{en,pl}/    # Translation files
│   │   ├── lib/                   # Utilities
│   │   │   ├── staticApi.ts       # API compatibility layer
│   │   │   ├── constants.ts       # External URLs, contacts
│   │   │   └── utils.ts
│   │   ├── lib/                   # Utilities
│   │   ├── pages/                 # Page components
│   │   ├── App.tsx                # Main app component
│   │   ├── main.tsx               # Entry point
│   │   └── index.css              # Global styles
│   ├── index.html                 # HTML template
│   └── favicon.svg
├── assets/                         # Static assets
│   └── pictures/                  # Images for galleries
│       ├── cycling/
│       ├── motorcycling/
│       ├── photos/
│       ├── projects/
│       └── readings/
├── shared/                         # Shared TypeScript types
│   └── types.ts
├── .github/workflows/              # CI/CD (Azure Static Web Apps)
├── build/                         # Production output (generated)
├── theme.json                      # Design tokens
├── tailwind.config.ts              # Tailwind configuration
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript config
├── postcss.config.js              # PostCSS config
├── package.json                   # Dependencies & scripts
├── eslint.config.js               # ESLint configuration
├── .gitignore                     # Git ignore rules
├── .prettierrc                    # Prettier config
└── README.md                      # Project documentation
```

---

## Building & Running

### Commands

| Command                | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `npm run dev`          | Start dev server on `http://localhost:5173` (binds to `0.0.0.0`)  |
| `npm run build`        | Build for production → outputs to `build/`                        |
| `npm run preview`      | Preview production build locally                                  |
| `npm run check`        | Run TypeScript type checking (`tsc --noEmit`)                     |
| `npm run lint`         | Run ESLint                                                        |
| `npm run lint:fix`     | Run ESLint with auto-fix                                          |
| `npm run format`       | Format code with Prettier                                         |
| `npm run format:check` | Check formatting                                                  |
| `npm run analyze`      | Build + analyze bundle size (note: references deprecated `dist/`) |

### Pre-commit Hooks

- **Husky** + **lint-staged** configured
- Staged `*.{js,jsx,ts,tsx}`: ESLint fix + Prettier
- Other files: Prettier only

### Verification Checklist

Before committing or handing off work:

```bash
npm run lint && npm run check && npm run build
```

---

## Key Files & Conventions

### Data Layer

- **`client/src/data/data.ts`**: Central data source for projects, books, images
  - Projects: `projects: Project[]`
  - Books: `books: Book[]` with `status: 'read' | 'to-read'` (literal strings!)
  - Motorcycle/Cycling galleries
  - Contact form submissions → `localStorage`

- **`client/src/data/timelineData.ts`**: Timeline entries (if exists)

- **`client/src/lib/staticApi.ts`**: API compatibility layer wrapping `dataService`

### Type Definitions

- **`shared/types.ts`**: Shared TypeScript types (Project, Book, Contact, etc.)

### Translation Files

- **English**: `client/src/i18n/locales/en/translation.json`
- **Polish**: `client/src/i18n/locales/pl/translation.json`

### Theme Configuration

- **`theme.json`**: Design tokens (colors, radius, appearance)
- **`tailwind.config.ts`**: Tailwind theme extending from `theme.json`

---

## Component Patterns

### Translation Usage

All components use `useTranslation()` from `react-i18next`:

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return <h1>{t('common.title')}</h1>;
};
```

### Data Fetching Pattern

No React Query/SWR. Plain `useState` + `useEffect` against `staticApi`:

```tsx
import { useState, useEffect } from 'react';
import { api } from '@/lib/staticApi';

const MyComponent = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await api.projects.getAll();
      setProjects(data);
    };
    loadProjects();
  }, []);

  // ...
};
```

### Form Pattern

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ...
};
```

---

## Data Constraints

### Book Status Fields

**IMPORTANT:** In `client/src/data/data.ts`, book status fields must use **literal strings**:

- `'read'` - Book has been read
- `'to-read'` - Book planned to be read

**DO NOT** use translation keys or other values here. These are filter criteria in the UI.

---

## Deployment

### Azure Static Web Apps (Primary)

- **Build command**: `npm run build`
- **Output directory**: `build/`
- **Workflow**: `.github/workflows/azure-static-web-apps-*.yml`
- **Auto-deploys** on push/PR to `main`

### Alternative Hosting

The `build/` folder works with:

- Netlify
- Vercel
- GitHub Pages
- AWS S3

---

## Styling System

### Design Tokens (`theme.json`)

```json
{
  "primary": "#4A90E2",
  "appearance": "system",
  "radius": 0.5,
  "colors": {
    "portfolio": {
      "primary": "#4A90E2",
      "light": "#5DA9E9",
      "accent": "#3F72AF",
      "background": "#F5F9FF",
      "text": "#333F4D",
      "muted": "#64748B"
    }
  }
}
```

### Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Dark Mode

System-aware with smooth transitions. Toggle persists in `localStorage`.

---

## Common Tasks

### Adding a New Project

1. Update `client/src/data/data.ts`:

```typescript
{
  id: 9,
  title: "New Project",
  description: "Description...",
  imageUrl: "/pictures/projects/new-project.png",
  githubUrl: "https://github.com/...",
  technologies: ["React", "TypeScript"],
  featured: true
}
```

2. Add image to `assets/pictures/projects/`

3. Update image array in `motorcycleImages` or `cyclingImages` if needed

### Adding Translations

1. Add key to `client/src/i18n/locales/en/translation.json`
2. Add Polish translation to `client/src/i18n/locales/pl/translation.json`
3. Update components using `t('your.key')`

### Updating Theme Colors

1. Modify `theme.json`
2. Update `tailwind.config.ts` portfolio colors
3. Restart dev server

---

## Known Issues & Quirks

### Vite

- Build output is `build/`, not `dist/`
- Timestamp files (`vite.config.ts.timestamp-*.mjs`) are generated and should be ignored
- `root` is `client/`, not repo root
- `publicDir` is `assets/` (repo root)

### ESLint

- `@typescript-eslint/no-explicit-any` and `@typescript-eslint/no-unused-vars` are **warnings**, not errors
- `_`-prefixed args are intentionally ignored

### Build Analysis

- `npm run analyze` references deprecated `dist/` directory

---

## Security Notes

- No backend → no server-side attack vectors
- Contact form persists only in `localStorage`
- All data is static/mock

---

## Accessibility

- Semantic HTML with ARIA standards
- Radix UI for accessible primitives
- Focus management in components
- Color contrast meets WCAG guidelines

---

## Performance

### Optimizations

- Tree shaking (unused code elimination)
- Code splitting (lazy loading)
- Asset optimization
- CSS purging in production

### Bundle Sizes (gzipped)

- JavaScript: ~114 KB
- CSS: ~13 KB
- Total First Load: ~127 KB

---

## Code Quality

- Prettier: single quotes, semicolons, `printWidth: 100`, `trailingComma: 'all'`
- ESLint v9 with React hooks, JSX a11y, and Prettier plugins
- Husky hooks for pre-commit linting

---

## Migration Notes

From Express.js backend to static-only:

- ✅ Component interfaces preserved
- ✅ Async data patterns maintained
- ✅ Type definitions unchanged
- ✅ Development workflow consistent

**DO NOT:**

- Re-introduce server code
- Switch build output away from `build/`
- Rewrite asset URLs to include `/assets/`
- Add React Query / Redux / additional routers
- Commit `build/`, `.temp/`, `.playwright-mcp/`, or timestamp files

---

## Contact Information

From `client/src/lib/constants.ts`:

- Email: `borowiec.k@gmail.com`
- Phone: `+48 570 223 108`
- Location: `Poland`
- GitHub: `https://github.com/konutech`
- LinkedIn: `https://linkedin.com/in/32167`
- Credly: `https://credly.com/users/konrad-borowiec/badges`

---

## License

© 2024 Konrad Borowiec. All rights reserved.

This project is not open source. Code and design are public for showcase purposes only. No part may be used, reproduced, or distributed without express written consent.

---

_Built with ❤️ using React, TypeScript, and modern web technologies._
