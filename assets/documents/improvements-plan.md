# Improvements & Fixes Plan

**Project:** Konrad Borowiec Portfolio Website
**Plan Date:** April 29, 2026
**Based On:** Codebase Analysis (April 28, 2026)
**Tech Stack:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Wouter

---

## Table of Contents

1. [Phase 1: Quick Wins](#phase-1-quick-wins)
2. [Phase 2: Core Fixes](#phase-2-core-fixes)
3. [Phase 3: Enhancements](#phase-3-enhancements)
4. [Dependency Matrix](#dependency-matrix)
5. [Progress Tracking](#progress-tracking)

---

## Phase 1: Quick Wins

> High priority, low effort — tackle these first for immediate impact.

### 1.1 Remove Unused Dependencies

| Detail | Value |
|--------|-------|
| **Priority** | 🔴 High |
| **Effort** | Low |
| **Impact** | High (bundle size reduction) |
| **Files Affected** | `package.json`, `package-lock.json`, `node_modules/` |

**Description:**
The `package.json` includes 20+ Radix UI packages and numerous UI utilities (`cmdk`, `vaul`, `input-otp`, `react-resizable-panels`, `recharts`, `react-day-picker`) that may not all be used. Replit plugins may also be incorrectly placed outside `devDependencies`.

**Actions:**
1. Scan all files in `client/src/` for actual imports of each Radix UI package
2. Audit usage of `cmdk`, `vaul`, `input-otp`, `react-resizable-panels`, `recharts`, `react-day-picker`
3. Verify all Replit plugins are in `devDependencies`
4. Remove confirmed-unused packages with `npm uninstall`
5. Run `npm install` to clean up

**Acceptance Criteria:**
- Every package in `package.json` is imported at least once in the codebase
- Bundle size is measurably reduced
- No broken imports after removal

> **Exemplary Prompt:**
> *"Audit all dependencies in package.json for this React portfolio project. Check which Radix UI components, UI utilities (cmdk, vaul, recharts, react-day-picker, input-otp, react-resizable-panels), and other packages are actually imported and used in the client/src codebase. Generate a report of unused packages, then remove them from package.json and run npm install to clean up node_modules."*

---

### 1.2 Fix `analyze` Script (Wrong Output Directory)

| Detail | Value |
|--------|-------|
| **Priority** | 🔴 High |
| **Effort** | Trivial |
| **Impact** | Medium |
| **Files Affected** | `package.json` |

**Description:**
The npm `analyze` script runs `npx vite-bundle-analyzer dist` but Vite is configured to output to the `build/` directory.

**Actions:**
1. Update the script to reference `build` instead of `dist`
2. Alternatively, replace with Vite's built-in `rollupPluginVisualizer`

**Acceptance Criteria:**
- Running `npm run analyze` executes without error
- Bundle analyzer reads from the correct output directory

> **Exemplary Prompt:**
> *"The npm `analyze` script in package.json runs `npx vite-bundle-analyzer dist` but Vite is configured to output to the `build/` directory. Update the script to reference the correct output directory, or replace it with Vite's built-in rollupPluginVisualizer approach."*

---

### 1.3 Consolidate Duplicate CSS

| Detail | Value |
|--------|-------|
| **Priority** | 🔴 High |
| **Effort** | Low |
| **Impact** | Medium |
| **Files Affected** | `client/index.html`, `client/src/index.css` |

**Description:**
CSS classes are defined in both `client/src/index.css` and the inline `<style>` block in `client/index.html` with conflicting values:
- `.book-card`, `.book-card-inner`, `.book-card-front`, `.book-card-back`
- `.cloud-bg`, `.cloud-mask`
- `.timeline-dot:before`
- `.animate-spin-slow`, `.animate-float`

Notably, `.cloud-bg` uses an SVG data URI in `index.css` but an Unsplash URL in `index.html`.

**Actions:**
1. Compare both CSS sources and determine the authoritative version of each class
2. Move all styles into `client/src/index.css` (Tailwind-processed)
3. Remove the `<style>` block from `client/index.html`
4. Verify visual rendering is unchanged

**Acceptance Criteria:**
- No `<style>` block remains in `client/index.html`
- All styles are defined in `client/src/index.css`
- Visual appearance is identical before and after

> **Exemplary Prompt:**
> *"There are duplicate CSS class definitions between `client/src/index.css` and the inline `<style>` block in `client/index.html` (book-card, cloud-bg, timeline-dot, animate-spin-slow, animate-float). Consolidate all styles into `client/src/index.css` so they're processed by Tailwind's purge, and remove the `<style>` block from `client/index.html`."*

---

## Phase 2: Core Fixes

> Medium priority, medium impact — address bugs and developer experience.

### 2.1 Fix ThemeContext Double-Initialization Bug

| Detail | Value |
|--------|-------|
| **Priority** | 🟡 Medium |
| **Effort** | Low |
| **Impact** | Medium |
| **Files Affected** | `client/src/context/ThemeContext.tsx` |

**Description:**
The initialization `useEffect` includes `initialized` in its dependency array, while `setInitialized(true)` is called inside the effect guarded by `if (initialized) return`. This causes the effect to execute twice (once when `initialized=false`, once when `initialized=true`).

**Actions:**
1. Refactor the useEffect to use an empty dependency array `[]`
2. Ensure theme initialization (localStorage read + system preference detection + apply) runs exactly once on mount

**Acceptance Criteria:**
- Theme initialization runs exactly once on component mount
- No double-flashing of theme on page load
- localStorage and system preference detection still work correctly

> **Exemplary Prompt:**
> *"In `client/src/context/ThemeContext.tsx`, the initialization useEffect has `initialized` in its dependency array while also calling `setInitialized(true)` inside, causing the effect to run twice. Refactor to use an empty dependency array `[]` so it runs only once on mount, properly initializing the theme from localStorage or system preference."*

---

### 2.2 Replace Font Awesome with lucide-react

| Detail | Value |
|--------|-------|
| **Priority** | 🟡 Medium |
| **Effort** | Medium |
| **Impact** | Medium |
| **Files Affected** | `client/index.html`, all components using `<i className="fa...">` |

**Description:**
Font Awesome is loaded via CDN (`cdnjs.cloudflare.com`) while `lucide-react` is already installed. Icon usage is inconsistent and Font Awesome adds an external dependency.

**Actions:**
1. Find all Font Awesome icon usages (e.g., `<i className="fab fa-github">`) across components
2. Replace each with the equivalent lucide-react component
3. Remove the Font Awesome CDN `<link>` tag from `client/index.html`
4. Verify all icons render correctly

**Acceptance Criteria:**
- No Font Awesome CDN references remain
- All icons are rendered via lucide-react components
- Visual appearance of icons is acceptable

> **Exemplary Prompt:**
> *"The project loads Font Awesome via CDN in `client/index.html` but already has `lucide-react` installed. Find all Font Awesome icon usages (e.g., `<i className='fab fa-github'>`) in the components and replace them with equivalent lucide-react components. Then remove the Font Awesome CDN link from `client/index.html`."*

---

### 2.3 Add ESLint + Prettier

| Detail | Value |
|--------|-------|
| **Priority** | 🟡 Medium |
| **Effort** | Medium |
| **Impact** | High (developer experience) |
| **Files Affected** | New: `eslint.config.js`, `.prettierrc`, `.prettierignore`, `.eslintignore` |

**Description:**
No linting or formatting enforcement is configured. Code style relies on manual discipline.

**Actions:**
1. Create `eslint.config.js` with:
   - `@typescript-eslint/parser` + rules
   - `eslint-plugin-react-hooks` (Rules of Hooks)
   - `eslint-plugin-jsx-a11y` (accessibility)
2. Create `.prettierrc` with `prettier-plugin-tailwindcss` for automatic class ordering
3. Add npm scripts: `lint`, `lint:fix`, `format`, `format:check`
4. Configure ignore files for `node_modules`, `build/`, `dist/`

**Acceptance Criteria:**
- `npm run lint` runs without errors on the current codebase (or reports fixable issues)
- `npm run format` formats all files consistently
- Tailwind classes are auto-sorted by Prettier plugin

> **Exemplary Prompt:**
> *"Set up ESLint and Prettier for this TypeScript + React + Vite + Tailwind project. Create `eslint.config.js` with @typescript-eslint, eslint-plugin-react-hooks, and eslint-plugin-jsx-a11y. Create `.prettierrc` with prettier-plugin-tailwindcss for automatic class ordering. Add npm scripts for lint and format. Configure appropriate ignore files."*

---

### 2.4 Fix `createdAt` Date/String Mismatch in localStorage

| Detail | Value |
|--------|-------|
| **Priority** | 🟡 Medium |
| **Effort** | Low |
| **Impact** | Medium |
| **Files Affected** | `client/src/data/data.ts` (or contact service), `shared/types.ts` |

**Description:**
The `Contact` type defines `createdAt: Date`, but localStorage stores JSON where Dates serialize to ISO strings. When read back, `createdAt` becomes a string, creating a type mismatch.

**Actions:**
1. Choose an approach:
   - **Option A:** Store ISO strings, convert back to `Date` on load: `new Date(storedString)`
   - **Option B:** Change the type to `createdAt: string` and parse when displaying
2. Apply the fix to both the storage and retrieval paths
3. Ensure type consistency in components that display the date

**Acceptance Criteria:**
- Contacts loaded from localStorage have properly typed `createdAt` fields
- No TypeScript errors related to Date/string mismatch
- Date display in UI works correctly

> **Exemplary Prompt:**
> *"In the contact data service, `Contact` type defines `createdAt: Date`, but when contacts are serialized to localStorage and read back, the Date becomes a string. Fix by either: converting stored strings back to Date objects on load, or changing the type to store ISO strings. Ensure type consistency throughout the contact form and display components."*

---

## Phase 3: Enhancements

> Lower priority, higher effort — long-term quality improvements.

### 3.1 Add Test Infrastructure

| Detail | Value |
|--------|-------|
| **Priority** | 🟢 Low |
| **Effort** | High |
| **Impact** | High |
| **Files Affected** | New: `vitest.config.ts`, `**/*.test.ts`/`**/*.test.tsx` |

**Description:**
The project has zero tests. The tsconfig explicitly excludes `**/*.test.ts`, suggesting tests were considered but never implemented.

**Actions:**
1. Install and configure Vitest (native Vite integration)
2. Install `@testing-library/react` for component tests
3. Add npm scripts: `test`, `test:watch`, `test:coverage`
4. Write initial tests for:
   - `lib/utils.ts` — pure functions, easiest to test
   - `ContactForm` — form validation and submission flow
   - `ThemeContext` — theme toggling and localStorage persistence

**Acceptance Criteria:**
- `npm test` runs and all initial tests pass
- Coverage report is generated
- CI-ready test configuration

> **Exemplary Prompt:**
> *"Set up Vitest and @testing-library/react for this Vite + React project. Configure vitest.config.ts, add npm test scripts, and write initial tests for: 1) utility functions in `lib/utils.ts`, 2) ContactForm validation and submission logic, 3) ThemeContext theme toggling and localStorage persistence."*

---

### 3.2 Improve SEO Meta Tags

| Detail | Value |
|--------|-------|
| **Priority** | 🟢 Low |
| **Effort** | Low |
| **Impact** | Medium |
| **Files Affected** | `client/index.html` |

**Description:**
- Open Graph `og:url` is set to `https://portfolio.example.com` (placeholder)
- Missing: Twitter Card tags, canonical URL, favicon link, theme-color meta

**Actions:**
1. Replace placeholder `og:url` with the actual deployed URL
2. Add Twitter Card meta tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
3. Add `<link rel="icon">` for favicon
4. Add `<meta name="theme-color">` for mobile browsers
5. Add `<link rel="canonical">`

**Acceptance Criteria:**
- All meta tags contain real values (no placeholders)
- Page validates with Google's Rich Results Test
- Favicon displays correctly in browser tabs

> **Exemplary Prompt:**
> *"In `client/index.html`, replace the placeholder Open Graph URL with the actual deployed URL. Add missing meta tags: Twitter Card tags (summary_large_image), canonical URL, favicon link, and theme-color meta for mobile browsers. Verify all OG tags have correct values."*

---

### 3.3 Add Skip Navigation + ARIA Landmarks

| Detail | Value |
|--------|-------|
| **Priority** | 🟢 Low |
| **Effort** | Low |
| **Impact** | Medium (accessibility) |
| **Files Affected** | `client/src/App.tsx`, `client/src/components/layout/` |

**Description:**
- No "Skip to main content" link for keyboard users
- Missing ARIA landmarks on semantic sections
- Sections lack proper semantic HTML elements

**Actions:**
1. Add a skip navigation link as the first focusable element
2. Wrap header content in `<header>` with proper role
3. Ensure `<main>` has `role="main"` and `id="main-content"`
4. Add `<footer role="contentinfo">` for the footer
5. Verify with a screen reader or Lighthouse accessibility audit

**Acceptance Criteria:**
- Skip link is visible on focus and jumps to main content
- All major sections have appropriate ARIA landmarks
- Lighthouse accessibility score improves

> **Exemplary Prompt:**
> *"Improve accessibility by: 1) Adding a 'Skip to main content' link as the first focusable element in the app, 2) Adding proper ARIA landmarks (role='main', role='contentinfo') to header, main, and footer sections in App.tsx, 3) Ensuring all page sections have appropriate semantic HTML elements."*

---

### 3.4 Separate Data Definitions from Service Layer

| Detail | Value |
|--------|-------|
| **Priority** | 🟢 Low |
| **Effort** | Medium |
| **Impact** | Medium (code quality) |
| **Files Affected** | `client/src/data/data.ts` → split into multiple files |

**Description:**
`client/src/data/data.ts` mixes static data definitions with service functions and localStorage persistence, violating the Single Responsibility Principle.

**Actions:**
1. Split into:
   - `data.ts` — static data arrays only (projects, books, images)
   - `services.ts` — async data service methods
   - `storage.ts` — localStorage helpers for contacts
2. Update all imports across the codebase
3. Verify no functionality is broken

**Acceptance Criteria:**
- Each file has a single, clear responsibility
- All imports resolve correctly
- Application builds and runs without errors

> **Exemplary Prompt:**
> *"Refactor `client/src/data/data.ts` which currently mixes static data arrays with service functions and localStorage persistence. Split into: `data.ts` (static data only), `services.ts` (async data service methods), and `storage.ts` (localStorage helpers). Update all imports throughout the codebase."*

---

### 3.5 Remove Static Async Wrappers

| Detail | Value |
|--------|-------|
| **Priority** | 🟢 Low |
| **Effort** | Medium |
| **Impact** | Low (since data is already fast) |
| **Files Affected** | All components using `api.*.getAll()` pattern |

**Description:**
All data loading goes through `useEffect` + async `api.*.getAll()` calls despite data being immediately available in memory, causing unnecessary loading states and extra render cycles.

**Actions:**
1. In each component, replace the async loading pattern with direct imports:
   ```tsx
   // Before:
   const [projects, setProjects] = useState([]);
   useEffect(() => { api.projects.getAll().then(setProjects) }, []);

   // After:
   import { projects } from '@/data/data';
   ```
2. Remove unnecessary loading states
3. Simplify component logic

**Acceptance Criteria:**
- Components render data immediately without loading flash
- No `useEffect` blocks for static data loading remain
- Application behavior is unchanged from the user's perspective

> **Exemplary Prompt:**
> *"Since all data is static and immediately available in memory, replace the async loading pattern (useState + useEffect + api.*.getAll()) in components with direct imports from the data module. Remove unnecessary loading states and simplify component logic."*

---

### 3.6 Add CSP Headers for Deployment

| Detail | Value |
|--------|-------|
| **Priority** | 🟢 Low |
| **Effort** | Low |
| **Impact** | Medium (security) |
| **Files Affected** | Deployment configuration (Azure Static Web Apps) |

**Description:**
No Content Security Policy is configured. Static sites benefit from CSP headers to prevent XSS attacks.

**Actions:**
1. Research Azure Static Web Apps custom header configuration
2. Draft a CSP policy that allows:
   - Google Fonts (required for typography)
   - Required inline styles and scripts (for React hydration)
   - Analytics (if used)
3. Block all unauthorized sources
4. Document the CSP configuration

**Acceptance Criteria:**
- CSP headers are configured for the deployment platform
- All legitimate resources load without CSP violations
- Browser console shows no CSP errors

> **Exemplary Prompt:**
> *"Research and document Content Security Policy configuration for this static portfolio site deployed on Azure Static Web Apps. Create a recommended CSP header configuration that allows Google Fonts, analytics, and inline styles/scripts needed by the app while blocking unauthorized sources."*

---

## Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1.1 Remove Unused Dependencies | — | — |
| 1.2 Fix `analyze` Script | — | — |
| 1.3 Consolidate Duplicate CSS | — | 2.2 (Font Awesome removal) |
| 2.1 Fix ThemeContext Bug | — | — |
| 2.2 Replace Font Awesome | 1.3 (CSS consolidated first) | — |
| 2.3 Add ESLint + Prettier | — | 3.1 (test infrastructure) |
| 2.4 Fix Date/String Mismatch | — | — |
| 3.1 Add Test Infrastructure | 2.3 (ESLint configured first) | — |
| 3.2 Improve SEO Meta Tags | — | — |
| 3.3 Add Skip Nav + ARIA | — | — |
| 3.4 Separate Data Layer | — | 3.5 |
| 3.5 Remove Async Wrappers | 3.4 (data layer split first) | — |
| 3.6 Add CSP Headers | — | — |

---

## Progress Tracking

### Phase 1: Quick Wins
- [x] 1.1 Remove Unused Dependencies
- [x] 1.2 Fix `analyze` Script
- [x] 1.3 Consolidate Duplicate CSS
 
### Phase 2: Core Fixes
- [x] 2.1 Fix ThemeContext Double-Initialization Bug
- [ ] 2.2 Replace Font Awesome with lucide-react
- [ ] 2.3 Add ESLint + Prettier
- [ ] 2.4 Fix `createdAt` Date/String Mismatch

### Phase 3: Enhancements
- [ ] 3.1 Add Test Infrastructure
- [ ] 3.2 Improve SEO Meta Tags
- [ ] 3.3 Add Skip Navigation + ARIA Landmarks
- [ ] 3.4 Separate Data Definitions from Service Layer
- [ ] 3.5 Remove Static Async Wrappers
- [ ] 3.6 Add CSP Headers for Deployment

---

*This plan is derived from the codebase analysis in `assets/documents/codebase-analysis.md`. Use the exemplary prompts to delegate individual tasks to an AI coding assistant.*