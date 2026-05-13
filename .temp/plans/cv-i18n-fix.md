# CV Download Internationalization Fix Plan

## Problem Statement
When downloading CV in Polish (PL) language, the generated HTML/PDF/Markdown files contain mostly English text instead of Polish. Only headers/labels are translated, but content (education, experience, projects) remains in English.

## Root Cause
The `PdfButtons.tsx` component uses hardcoded arrays with `lang === 'en' ? 'EN text' : 'PL text'` ternaries instead of using the `t()` i18next translation function.

## Solution Overview

### Phase 1: Add CV Translation Keys to All Language JSON Files

**Goal:** Structure all translation keys in `src/i18n/locales/{lang}/translation.json` for all 12+ languages.

**Keys to add:**
- `cv.header.subtitle` - Professional title
- `cv.about.paragraphs.0` & `cv.about.paragraphs.1` - About me bio paragraphs
- `cv.education.0-6.degree` - 7 education degrees
- `cv.education.0-6.institution` - 7 institutions
- `cv.education.0-6.description` - 7 descriptions
- `cv.experience.0-18.title` - 19 job titles
- `cv.experience.0-18.company` - 19 companies
- `cv.experience.0-18.period` - 19 time periods
- `cv.experience.0-18.tech` - 19 tech stacks
- `cv.experience.0-18.description` - 19 descriptions
- `cv.experience.0-18.bullets.0-N` - Job bullet points (variable count per job)
- `cv.projects.0-7.title` - 8 project titles
- `cv.projects.0-7.tech` - 8 tech stacks
- `cv.projects.0-7.description` - 8 descriptions
- `cv.contact.info.0-5` - Contact labels (Email, Phone, Location, etc.)
- `cv.footer.text` - Footer text

**Content per language:**
- **EN (English)**: Full English content from existing hardcoded arrays
- **PL (Polish)**: Full Polish content from existing hardcoded arrays
- **Other 10 languages**: English content as fallback (to be translated later)

### Phase 2: Update PdfButtons.tsx Component

**Changes:**
1. Add `const { t } = useTranslation()` hook
2. Replace all `lang === 'en' ? '...' : '...'` patterns with `t('cv.key')`
3. Remove hardcoded `getCVContent()` and `getMarkdownContent()` functions
4. Simplify `generateDownload()` to just use `t()` for all content
5. Support any language code (not just 'en'/'pl')

**Example transformation:**
```tsx
// Before:
const headerSubtitle = lang === 'en'
  ? 'Data Engineer | Financial Services Specialist'
  : 'Inżynier danych | Specjalista usług finansowych';

// After:
const headerSubtitle = t('cv.header.subtitle');
```

### Phase 3: Translation Key Structure

**Example key structure in JSON files:**
```json
{
  "cv": {
    "header": {
      "subtitle": "Data Engineer | Financial Services Specialist"
    },
    "about": {
      "paragraphs": [
        "I'm a Data Guy with a strong background...",
        "My journey began in finance and analytics..."
      ]
    },
    "education": [
      {
        "0": {
          "degree": "Big Data Engineering",
          "institution": "Polish-Japanese Academy of Information Technology",
          "description": "Postgraduate studies in Large Data Sets Engineering..."
        }
      }
    ],
    ...
  }
}
```

## Implementation Steps

1. **Read all existing translation JSON files** (en, pl, de, fr, es, pt, ja, zh, ko, tr, hi, ar, id)
2. **Add `cv.*` section** to each file with appropriate content:
   - EN: English content
   - PL: Polish content
   - Others: English fallback content
3. **Update `PdfButtons.tsx`** to use `t()` calls
4. **Test** with each language selector to verify correct content
5. **Verify** HTML, Markdown, and PDF downloads work correctly

## Files to Modify

1. `src/i18n/locales/en/translation.json` - Add `cv.*` section
2. `src/i18n/locales/pl/translation.json` - Add `cv.*` section with Polish content
3. `src/i18n/locales/{de,fr,es,pt,ja,zh,ko,tr,hi,ar,id}/translation.json` - Add `cv.*` section with English fallback
4. `client/src/components/contact/PdfButtons.tsx` - Add translation hook, update content generation

## Success Criteria

- ✅ Downloading CV in PL shows Polish text throughout
- ✅ Downloading CV in EN shows English text
- ✅ Downloading CV in any other language shows English fallback (ready for translation)
- ✅ All 3 download formats (HTML, Markdown, PDF) work correctly
- ✅ No TypeScript errors
- ✅ Build passes without errors

## Notes

- This follows the DRY principle by using existing JSON translation files
- English fallback ensures CV downloads work immediately for all languages
- Future translations can be added to each language file independently
- No code changes needed for new languages - just add translations to JSON
