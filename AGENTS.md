# AGENTS.md

Repo-specific notes for AI agents. For long-form architecture, see `CLAUDE.md` and `README.md`.

## What this repo is

Frontend-only static portfolio: React 18 + TypeScript + Vite + Tailwind + shadcn/ui. No backend, no server, no database. Deploys to Azure Static Web Apps via `.github/workflows/azure-static-web-apps-*.yml`.

Historical note: an Express backend was removed. Do not re-introduce server code. Anything API-shaped lives in `client/src/lib/staticApi.ts` and wraps in-memory data from `client/src/data/data.ts`. The contact form persists to `localStorage`, nothing else.

## Commands

| Task          | Command                                   |
| ------------- | ----------------------------------------- |
| Dev server    | `npm run dev` (Vite, binds `0.0.0.0`)     |
| Typecheck     | `npm run check` (bare `tsc --noEmit`)     |
| Lint          | `npm run lint` / `npm run lint:fix`       |
| Format        | `npm run format` / `npm run format:check` |
| Prod build    | `npm run build` → outputs to `build/`     |
| Preview build | `npm run preview`                         |

Pre-commit verification an agent should run before handing work off: `npm run lint && npm run check && npm run build`.

There is no test framework. `npm test` does **not** exist. Do not invent tests with Jest/Vitest unless explicitly asked to add the toolchain.

Known broken: `npm run analyze` references `dist` but the build writes to `build/`.

## Vite quirks (easy to get wrong)

- `root` is `client/`, not the repo root. `index.html` lives at `client/index.html`.
- `publicDir` is `assets/` (repo root), so everything under `assets/` is served from `/`. Image paths in code/data are `/pictures/...` and `/documents/...`, **never** `/assets/pictures/...`.
- Build output is `build/` (emptied each build), not `dist/`.
- Vite generates `vite.config.ts.timestamp-*.mjs` files at the repo root; these are git-ignored and ESLint-ignored — leave them alone.
- `@replit/vite-plugin-cartographer` only loads when `REPL_ID` is set; safe to ignore locally.

## Path aliases

Defined in both `vite.config.ts` and `tsconfig.json`. Use them instead of relative climbs:

- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `assets/*`

`tsconfig.json` still lists `server/**/*` in `include` — that directory no longer exists. Leftover, harmless; do not create a `server/` directory to "fix" it.

## Code conventions

- Prettier: single quotes, semicolons, `printWidth: 100`, `trailingComma: 'all'`, `prettier-plugin-tailwindcss` sorts class names. Run `npm run format` rather than hand-sorting Tailwind classes.
- ESLint v9 flat config (`eslint.config.js`); `no-explicit-any` and unused vars are **warnings**, not errors. `_`-prefixed args are intentionally ignored.
- Data fetching uses plain `useState` + `useEffect` against `staticApi`. There is no React Query, Redux, or SWR — do not reach for them.
- Routing is Wouter, not React Router.
- i18n: i18next with locales in `client/src/i18n/locales/{en,pl}/translation.json`. Add new user-facing strings to both files.

## Editing content

Projects, books, and gallery image lists all live in `client/src/data/data.ts`. Image files must also exist under `assets/pictures/...` — the paths in `data.ts` are runtime URLs, not imports, so a typo won't fail the build.

## Husky / lint-staged

`.husky/pre-commit` and `.husky/pre-push` both just run `npx lint-staged`. Only staged `*.{js,jsx,ts,tsx}` get `eslint --fix` + Prettier; other file types get Prettier only. Nothing runs typecheck or build on commit — run those manually.

## CI

Single workflow: Azure SWA deploy on push/PR to `main`. It runs Oryx's default build (`npm run build`) and publishes `build/`. There is no separate lint/typecheck job in CI, so local verification is the only gate.

## Things not to do

- Don't add a backend, Express, or any `server/` code.
- Don't switch the build output directory away from `build/` (Azure SWA workflow and `CLAUDE.md` both depend on it).
- Don't rewrite asset URLs to include `/assets/` — they're served from root.
- Don't add React Query / Redux / a router swap without being asked.
- Don't commit `build/`, `.temp/`, `.playwright-mcp/`, or `vite.config.ts.timestamp-*.mjs`.
