# Copilot instructions for Konrad Borowiec portfolio

Purpose

- Short guide for Copilot/AI assistants to work effectively in this repository.

Quick commands (run from repo root)

- Install: npm install
- Dev: npm run dev # Vite dev server (binds 0.0.0.0)
- Build: npm run build # production output -> build/
- Preview production build locally: npm run preview
- Typecheck: npm run check # tsc --noEmit
- Lint: npm run lint
- Lint (auto-fix): npm run lint:fix
- Format: npm run format
- Format (check): npm run format:check
- Analyze bundle: npm run analyze # Note: script references `dist`; use `npx vite-bundle-analyzer build` if needed
- Pre-merge verification (recommended): npm run lint && npm run check && npm run build
- Tests: No test framework configured (no npm test). If tests are added, prefer Vitest + Testing Library.

High-level architecture (essential facts)

- Frontend-only static site: React 18 + TypeScript + Vite + Tailwind + shadcn/ui. No backend.
- Vite "root" is client/ (client/index.html). Build output directory is `build/` (not `dist/`).
- Static data layer: client/src/data/data.ts contains in-memory data (projects, books, images). client/src/lib/staticApi.ts provides an API-compatible wrapper exposing async methods.
- Assets: assets/ at repo root is the Vite publicDir. Runtime image paths use `/pictures/...` and `/documents/...` (not `/assets/...`). Add new images to assets/pictures/ and reference them from data.ts.
- Routing: wouter. Do not assume React Router.
- Theme: ThemeContext manages dark/light mode and persists to localStorage.

Key conventions and project-specific rules

- No backend: Do NOT add Express/server code or reintroduce server folders. All API-shaped functionality must be implemented via staticApi + data.ts.
- Data edits: To add projects/books/images, modify client/src/data/data.ts and add matching files under assets/pictures/ (paths are runtime URLs).
- Image URLs: Always reference images as `/pictures/<...>` or `/documents/<...>`; the build copies assets/ into the site root.
- Path aliases: use `@/*` → client/src/_, `@shared/_`→ shared/*,`@assets/_` → assets/_.
- Vite quirks to respect:
  - root is client/
  - publicDir is assets/
  - output is build/
  - vite generates `vite.config.ts.timestamp-*.mjs` at repo root (gitignored) — leave them alone
- Pre-commit: Husky + lint-staged run only staged eslint + prettier on JS/TS and prettier on other files. Pre-commit does NOT run typecheck or build.
- CI / Deployment: Azure Static Web Apps uses `npm run build` and publishes `build/`. Do not change build output dir.
- Do not commit: build/, .temp/, .playwright-mcp/, vite.config.ts.timestamp-\*.mjs

Coding & UX conventions (brief)

- Styling: Tailwind + shadcn/ui. Use Prettier + prettier-plugin-tailwindcss conventions (single quotes, semicolons, printWidth: 100, trailingComma: 'all'). Run npm run format to apply.
- Data fetching: prefer the staticApi + useState/useEffect pattern used throughout. There is intentionally no React Query/Redux.
- i18n: i18next, update both locales files in client/src/i18n/locales/en and /pl when adding user-visible strings.
- Icons: prefer lucide-react (already in dependencies). Avoid mixing CDN Font Awesome usage.

Known repository notes (important to surface)

- There is currently no test framework; do not invent tests unless asked. If adding tests, document the approach (Vitest recommended).
- `npm run analyze` references `dist` in some docs; actual build goes to `build/`.
- Static data often uses async wrappers for compatibility; when changing data flows, preserve API-compatible signatures unless migrating deliberately.

Analytics

- Microsoft Clarity behind a provider-agnostic wrapper (client/src/lib/analytics.ts), initialised in main.tsx. No-op unless VITE_CLARITY_ID is set at build time (GitHub Actions secret) and always off in dev/test. Section tracking reuses the existing Header.tsx IntersectionObserver via client/src/lib/useSectionTracking.ts — do not add another. Events carry no PII. Traffic-source attribution and the konutech.github.io redirect snippet are documented in docs/ANALYTICS.md.

Where to look for more context

- README.md, CLAUDE.md and AGENTS.md contain further repository context and developer notes. AGENTS.md contains several "do not" rules that must be respected by automation.

If unsure

- When asked to make changes touching data, assets, or build config: run `npm run lint && npm run check && npm run build` locally (or in CI) before opening a PR.

(End of file)
