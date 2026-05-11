# Plan: PDF Download Feature for Portfolio Website

## Overview

Add a client-side PDF download feature to the portfolio website that generates a snapshot of the current page content in the user's selected language. The feature will be added to the "Connect With Me" section in the Contact page.

## Technology Stack

- **PDF Generation**: `html2pdf.js` (client-side library that converts HTML to PDF)
- **No backend required** - Pure client-side solution compatible with the static app architecture

## Implementation Plan

### 1. Install Dependencies

Add `html2pdf.js` package to `package.json`:

```json
"dependencies": {
  ...
  "html2pdf.js": "^0.10.3"
}
```

### 2. Create PDF Export Component

New file: `client/src/components/contact/PdfExport.tsx`

- Exports PDF with current page content
- Respects current language selection (via i18next)
- Uses window title and meta data for PDF metadata
- Includes all visible content: header, hero, projects, books, interests, contact info

### 3. Update Translation Files

Add new translation keys to all 13 language files:

- `contact.pdf.download`: "Download PDF" (EN) / "Pobierz PDF" (PL) / etc.
- `contact.pdf.title`: "Konrad Borowiec - Portfolio" (EN) / "Konrad Borowiec - Portfolio" (PL) / etc.
- `contact.pdf.description`: Dynamic description including current language

### 4. Update ContactInfo Component

Modify `client/src/components/contact/ContactInfo.tsx`:

- Add PDF export button/icon alongside existing social icons
- Use Font Awesome icon (e.g., `fas fa-file-pdf`)
- Maintain consistent styling with existing icons

### 5. Update Translation JSON Files

Add keys to all locale files:

- `client/src/i18n/locales/{en,pl,de,fr,es,pt,ja,zh,tr,ko,hi,ar,id}/translation.json`

### 6. Configuration

Create `client/src/lib/pdfConfig.ts`:

- Define PDF options (margin, layout, pagebreak, etc.)
- Define content selectors to include in PDF
- Handle image optimization for PDF

## Files to Modify/Create

| File                                                    | Action | Description                      |
| ------------------------------------------------------- | ------ | -------------------------------- |
| `package.json`                                          | Modify | Add `html2pdf.js` dependency     |
| `client/src/components/contact/PdfExport.tsx`           | Create | PDF export logic component       |
| `client/src/components/contact/ContactInfo.tsx`         | Modify | Add PDF export button            |
| `client/src/lib/pdfConfig.ts`                           | Create | PDF configuration options        |
| `client/src/i18n/locales/*/translation.json` (12 files) | Modify | Add PDF-related translation keys |

## Translation Keys to Add (per language file)

```json
{
  "contact": {
    ...
    "pdf": {
      "download": "Download PDF",
      "title": "Konrad Borowiec - Portfolio",
      "description": "Professional data solutions specialist based in Warsaw, Poland."
    }
  }
}
```

## PDF Content Scope

The PDF will include:

- ✅ Header (logo, navigation)
- ✅ Hero section (intro, description, CTAs)
- ✅ Projects section (all projects with images, descriptions, tech stacks)
- ✅ Books section (reading list with status)
- ✅ Interests section (all categories with descriptions)
- ✅ Contact info (email, phone, location, social links)
- ✅ Footer (copyright, build info)

## PDF Configuration Options

- **Orientation**: Portrait (fits all content better)
- **Margins**: Custom margins (e.g., 10mm)
- **Page Break**: Between sections (projects, books, interests)
- **Images**: Include project images (optimized for PDF)
- **Fonts**: Use web fonts that convert to PDF (system fonts fallback)
- **Max Pages**: No hard limit, but optimize for readability

## User Experience

- Button appears as an icon in "Connect With Me" row
- Tooltip or title on hover: "Download PDF"
- Click triggers PDF generation and download
- Loading indicator while generating PDF
- PDF filename: `konrad-borowiec-portfolio-YYYY-MM-DD-HH-MM-SS.pdf`

## Verification Steps

1. Run `npm install` after adding dependency
2. Run `npm run check` to verify types
3. Run `npm run dev` and test PDF download in all languages
4. Verify PDF content matches current page state
5. Test image rendering and optimization
6. Check PDF metadata (title, author)

## Estimated Complexity

- **Difficulty**: Medium
- **Lines of Code**: ~150-200 (new component + config)
- **Translation Keys**: 3 keys × 12 languages = 36 additions
- **Build Impact**: Minimal (~15KB gzipped for html2pdf.js)

## Dependencies to Install

```bash
npm install html2pdf.js
```

---

**Date Created**: 2026-05-11
**Branch**: change-03
**Status**: Ready for implementation
