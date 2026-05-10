# i18n Full Implementation Plan

## 1. Executive Summary

This document outlines the complete implementation plan for internationalization (i18n) support in the Konrad Borowiec portfolio website. The implementation will enable content localization for English (en) and Polish (pl) languages, providing a seamless experience for international visitors.

**Goal:** Transform the static portfolio into a fully internationalized application with language switching capability.

**Scope:** Translation infrastructure, language switcher UI, component localization, TypeScript i18n types, and build pipeline integration.

---

## 2. Current State Analysis

### What Works (Existing Infrastructure)

- ✅ Vite build system with path aliases (@/_, @shared/_)
- ✅ TypeScript strict mode with full type safety
- ✅ Radix UI component library (accessible components)
- ✅ Tailwind CSS styling system
- ✅ Wouter routing with typed route parameters
- ✅ ESLint + Prettier code quality tooling
- ✅ Zod schema validation

### What Needs Implementation

- ❌ No i18n library installed (need i18next + types)
- ❌ No translation file infrastructure
- ❌ No language switcher UI component
- ❌ Components using hardcoded strings
- ❌ No i18n types for TypeScript
- ❌ Build process doesn't handle locale-specific assets

---

## 3. Implementation Plan with Phases

### Phase 1: Setup (30 min)

**Tasks:**

- Install i18next and TypeScript types
- Configure i18next in Vite build pipeline
- Set up translation file structure
- Create i18n utility functions

**Files:**

- `package.json`: Add i18next dependencies
- `client/src/i18n.ts`: i18n configuration and initialization
- `client/src/i18n/translations.ts`: Translation namespace definitions

### Phase 2: Translation Files (45 min)

**Tasks:**

- Create base translation JSON files for en and pl
- Extract all hardcoded strings from components
- Translate content for both languages
- Handle pluralization and interpolation

**Files Created:**

- `client/src/i18n/translations/en.json`
- `client/src/i18n/translations/pl.json`

**Translation Keys Structure:**

```
{
  "common": { "home": "Home", "about": "About" },
  "nav": { "portfolio": "Portfolio", "blog": "Blog" },
  "hero": { "title": "Welcome", "subtitle": "Developer Portfolio" },
  // ... all other keys
}
```

### Phase 3: Language Switcher (30 min)

**Tasks:**

- Create language switcher React component
- Add to navigation/header
- Implement language detection (browser locale, URL params, cookies)
- Persist user language preference

**Files:**

- `client/src/components/i18n/LanguageSwitcher.tsx`
- Update navigation component to include switcher

### Phase 4: Component Updates (60 min)

**Tasks:**

- Replace all hardcoded strings with i18n calls
- Update: Hero, About, Portfolio, Contact, Footer components
- Handle nested translations and dynamic content
- Add type-safe translation access

**Components to Update:**

- `Hero.tsx`, `About.tsx`, `Portfolio.tsx`, `Contact.tsx`, `Footer.tsx`
- `Navigation.tsx`, `Header.tsx`, `Layout.tsx`
- Any other components with text content

### Phase 5: TypeScript Config (15 min)

**Tasks:**

- Configure TypeScript paths for i18n types
- Set up i18n type utilities
- Ensure strict type checking for translations
- Add JSDoc for translation keys

### Phase 6: Build & Test (30 min)

**Tasks:**

- Test build with `npm run build`
- Verify all translations load correctly
- Test language switching in dev server
- Check for missing translations
- Run TypeScript check (`npm run check`)

### Phase 7: Deployment (15 min)

**Tasks:**

- Build production bundle
- Verify locale-specific assets included
- Test on staging/production
- Update documentation

---

## 4. File Changes Summary

### New Files (8)

| Path                                              | Purpose                                  |
| ------------------------------------------------- | ---------------------------------------- |
| `client/src/i18n.ts`                              | i18next configuration and initialization |
| `client/src/i18n/translations/en.json`            | English translations                     |
| `client/src/i18n/translations/pl.json`            | Polish translations                      |
| `client/src/i18n/translations/README.md`          | Translation guidelines                   |
| `client/src/components/i18n/LanguageSwitcher.tsx` | Language selection UI                    |
| `client/src/types/i18n.ts`                        | TypeScript types for translations        |
| `client/src/utils/i18n.ts`                        | i18n utility functions                   |
| `.env.example`                                    | Environment variables for i18n           |

### Modified Files (12)

| Path                                   | Changes                  |
| -------------------------------------- | ------------------------ |
| `client/src/components/Navigation.tsx` | Add language switcher    |
| `client/src/components/Header.tsx`     | Integrate i18n           |
| `client/src/components/Hero.tsx`       | Replace strings with t() |
| `client/src/components/About.tsx`      | Replace strings with t() |
| `client/src/components/Portfolio.tsx`  | Replace strings with t() |
| `client/src/components/Contact.tsx`    | Replace strings with t() |
| `client/src/components/Footer.tsx`     | Replace strings with t() |
| `client/src/App.tsx`                   | Initialize i18n provider |
| `vite.config.ts`                       | Add i18n locale loading  |
| `package.json`                         | Add i18next dependencies |
| `tsconfig.json`                        | Add i18n type paths      |
| `README.md`                            | Add i18n documentation   |

### Package Update (1)

- **i18next**: Add to dependencies (`^23.15.1`)
- **i18next-browser-languagedetector**: Add to devDependencies (`^8.0.0`)
- **@types/i18next**: Add TypeScript types (`^15.0.0`)

---

## 5. Known Issues

### HMR Error in Development

**Issue:** Hot Module Replacement may fail when i18n translations are updated, showing stale translations or errors.

**Root Cause:** i18next's resource bundle caching doesn't play well with Vite's HMR for translation files.

**Workaround:**

1. Restart the dev server when translation files change
2. Or clear i18next cache: `i18n.changeLanguage(lang, { resources: {} })`
3. Accept this as a trade-off for production-ready i18n

**Status:** Documented, workaround provided, acceptable for development workflow.

---

## 6. Timeline Estimate

| Phase             | Duration     | Dependencies      |
| ----------------- | ------------ | ----------------- |
| Setup             | 30 min       | None              |
| Translation Files | 45 min       | Setup             |
| Language Switcher | 30 min       | Setup             |
| Component Updates | 60 min       | Translation Files |
| TypeScript Config | 15 min       | Setup             |
| Build & Test      | 30 min       | All previous      |
| Deployment        | 15 min       | Build & Test      |
| **Total**         | **~3 hours** | -                 |

**Buffer:** Add 30 min for review and adjustments.

**Realistic Timeline:** 3.5 hours for full implementation.

---

## 7. Next Steps

1. **Review this plan** - Confirm scope and timeline
2. **Approve implementation** - Give go-ahead to proceed
3. **Execute Phase 1** - Setup i18n infrastructure
4. **Create translations** - Build en.json and pl.json
5. **Update components** - Replace hardcoded strings
6. **Test thoroughly** - Verify all languages work
7. **Deploy** - Publish internationalized site

**Success Criteria:**

- [ ] Language switcher visible and functional
- [ ] All content translatable (no hardcoded strings)
- [ ] Both en and pl languages work correctly
- [ ] Build succeeds without errors
- [ ] TypeScript types work for translations
- [ ] User language preference persists

---

**Notes:**

- Translation strings should use simple keys (avoid complex nesting)
- Use interpolation variables like `{{name}}` for dynamic content
- Keep translation file size manageable (< 1000 keys)
- Consider adding a translation management UI in future
