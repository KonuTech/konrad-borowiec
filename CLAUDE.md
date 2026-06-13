# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Konrad Borowiec's personal portfolio: a **frontend-only static web app** (React 18 + TypeScript + Vite + Tailwind + shadcn/ui). It was migrated from a full-stack Express app — the backend is gone and must not be reintroduced. Anything API-shaped lives in `client/src/lib/staticApi.ts` wrapping in-memory data in `client/src/data/data.ts`. Deploys to Azure Static Web Apps.

> Companion docs `AGENTS.md` and `.github/copilot-instructions.md` cover the same conventions and a list of "do not" rules — keep all three in sync when changing process/architecture.

## Commands

| Task           | Command                                   | Notes                                          |
| -------------- | ----------------------------------------- | ---------------------------------------------- |
| Dev server     | `npm run dev`                             | Vite, binds `0.0.0.0`, port 5173               |
| Typecheck      | `npm run check`                           | bare `tsc` (no emit)                           |
| Lint / fix     | `npm run lint` / `npm run lint:fix`       | ESLint v9 flat config                          |
| Format / check | `npm run format` / `npm run format:check` | Prettier                                       |
| Prod build     | `npm run build`                           | outputs to `build/` (emptied each build)       |
| Preview build  | `npm run preview`                         |                                                |
| E2E tests      | `npm run test:e2e`                        | Playwright; `:headed` and `:ci` variants exist |

**Pre-handoff verification:** `npm run lint && npm run check && npm run build`. CI only runs the Azure build — local verification is the only real gate.

- Run a single Playwright test: `npx playwright test e2e/i18n.spec.ts` (or add `-g "<test name>"`).
- `npm run analyze` is **known-broken** — it references `dist` but the build writes to `build/`. Use `npx vite-bundle-analyzer build` instead.

## Architecture

### Vite layout (easy to get wrong — see `vite.config.ts`)

- `root` is `client/`, **not** the repo root. `index.html` is `client/index.html`.
- `publicDir` is `assets/` (repo root), so everything under `assets/` is served from `/`. Reference images as `/pictures/...` and `/documents/...` — **never** `/assets/pictures/...`.
- Build output is `build/`, not `dist/`. Don't change this — the Azure SWA workflow depends on it.
- `import.meta.env.VITE_BUILD_ID` is injected at build time from the git short SHA.
- Replit plugins (`cartographer`) only load when `REPL_ID` is set; ignore locally. Git-ignored `vite.config.ts.timestamp-*.mjs` files are generated at the repo root — leave them alone.

### Path aliases (defined in both `vite.config.ts` and `tsconfig.json`)

- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `assets/*`

Note: `tsconfig.json` still lists `server/**/*` in `include` — leftover and harmless. Don't create a `server/` dir to "fix" it.

### Static data layer

- `client/src/data/data.ts` — central in-memory source for projects, books, and gallery image arrays (`motorcycleImages`, `cyclingImages`).
- `client/src/lib/staticApi.ts` — async wrapper preserving the original API shape (`api.projects.getAll()`, etc.). Components fetch via plain `useState` + `useEffect` against this. **No React Query / Redux / SWR** — do not add them.
- Contact form (`components/contact/ContactForm.tsx`) persists submissions to `localStorage` only.
- Image paths in `data.ts` are runtime URLs, not imports — a typo won't fail the build. Add files under `assets/pictures/...` and reference `/pictures/...`.

### Internationalization

- i18next + react-i18next. `client/src/i18n/index.ts` registers **13 locales** under `client/src/i18n/locales/<lng>/translation.json` (en, pl, es, de, fr, ja, pt, zh, ar, tr, ko, hi, id). en is the fallback.
- Selected language persists to `localStorage` under `selectedLanguage`.
- When adding user-facing strings, add the key to **all** locale `translation.json` files (`client/update_locales.sh` helps scaffold).

### CV downloads (PDF / HTML / Markdown)

- `components/contact/PdfButtons.tsx` is UI-only; all CV logic lives in `client/src/lib/cv/` (`buildCvModel.ts` assembles a `CvModel`, `markdown.ts` / `html.ts` / `pdfDocument.tsx` render it, `download.ts` is the entry point).
- The CV is **data-driven, not hardcoded**: content comes from `data/roles.ts`, `data/technologies.ts`, `data/data.ts` plus the i18n keys `timeline.items.<n>`, `projects.items.<n>.description`, `about.bio1/2`, and `cv.*` — so it follows the selected language in all 13 locales. Editing CV text means editing those sources, never a template.
- Job titles, organization names, and tech labels intentionally stay in English in every language (matches the site).
- PDF is hybrid: Latin-script locales (en, pl, es, de, fr, pt, tr, id) get a real-text PDF via `@react-pdf/renderer` + Noto Sans from `assets/fonts/cv/`; ja/zh/ko/ar/hi fall back to a rasterized capture via `html2pdf.js`. Both libraries load lazily on click — keep them out of the main bundle. The split is the `TEXT_PDF_LANGS` set in `lib/cv/pdf.tsx`.
- E2E coverage: `e2e/cv-download.spec.ts` (en/pl/ja/ar, all three formats).

### Analytics

- **Microsoft Clarity**, behind a provider-agnostic wrapper in `client/src/lib/analytics.ts` (`initAnalytics` / `trackEvent` / `trackPageview`) — the only file that knows the provider. Init happens in `main.tsx`.
- **Disabled by default**: a total no-op (no network) unless `VITE_CLARITY_ID` is set at build time, and always off in dev (`import.meta.env.DEV`) and under Do-Not-Track. The id is a GitHub Actions secret injected by the Azure workflow.
- Section engagement reuses the IntersectionObserver already in `Header.tsx` via `client/src/lib/useSectionTracking.ts` — **don't add a second observer**. Events carry **no PII** (contact-form contents are never sent).
- LinkedIn-vs-direct attribution depends on a redirect fix + UTM tags in the **separate** `KonuTech/konutech.github.io` repo. Full setup, event list, and the redirect snippet live in `docs/ANALYTICS.md`.

### Other conventions

- Routing: **Wouter**, not React Router.
- Theme: `context/ThemeContext.tsx` manages dark/light mode, persisted to `localStorage`.
- Icons: prefer `lucide-react` (already a dependency).
- UI primitives follow shadcn/ui patterns in `components/ui/` over Radix.
- Shared types/Zod schemas live in `shared/types.ts`.

## Code Style & Git Hooks

- Prettier: single quotes, semicolons, `printWidth: 100`, `trailingComma: 'all'`, with `prettier-plugin-tailwindcss` sorting class names. Run `npm run format` rather than hand-sorting Tailwind classes.
- ESLint v9 flat config (`eslint.config.js`): `no-explicit-any` and unused vars are **warnings**, not errors; `_`-prefixed args are intentionally ignored.
- Husky `.husky/pre-commit` and `.husky/pre-push` both run `npx lint-staged` — staged `*.{js,jsx,ts,tsx}` get `eslint --fix` + Prettier, other files get Prettier only. **Neither typecheck nor build runs on commit** — run those manually.

## Testing

- Playwright e2e tests live in `e2e/` (`home.spec.ts`, `i18n.spec.ts`); config in `playwright.config.ts` (testDir `e2e`, projects: chromium/webkit/firefox).
- `webServer` runs `npm run dev` locally; in CI it builds and serves the preview. Local runs reuse an existing server on port 5173.
- Some `*.spec.ts` files exist under `client/` (e.g. `client/tests/`, `client/playwright-mobile-nav.spec.ts`) but the configured `testDir` is `e2e/` only — those are not picked up by `npm run test:e2e`.

## Deployment

- Azure Static Web Apps via `.github/workflows/azure-static-web-apps-gentle-bush-092d4010f.yml`. Build command `npm run build`, output `build/`, no API/backend config. Routing is client-side (Wouter).
- Alternative static hosts (Netlify, Vercel, GitHub Pages) work from the same `build/` output.

## Do Not

- Don't add a backend, Express, or any `server/` code.
- Don't change the build output away from `build/`.
- Don't rewrite asset URLs to include `/assets/` — they're served from root.
- Don't add React Query / Redux or swap the router without being asked.
- Don't commit `build/`, `.temp/`, `.playwright-mcp/`, `test-results/`, or `vite.config.ts.timestamp-*.mjs`.
