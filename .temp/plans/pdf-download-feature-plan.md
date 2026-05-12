# Plan: PDF Download Feature for Portfolio Website

## Overview

Add a client-side PDF download feature to the portfolio website that generates a CV/resume snapshot based on markdown CV content (`.temp/plans/cv-en.md` and `.temp/plans/cv-pl.md`). The feature will be added to the "Connect With Me" section in the About Me section, positioned on the left side next to the Timeline.

## Technology Stack

- **HTML Export**: `html2pdf.js` or direct `<a>` tag download (client-side)
- **PDF Generation**: `html2pdf.js` (client-side library that converts HTML to PDF)
- **No backend required** - Pure client-side solution compatible with the static app architecture
- **PDF Content Source**: Markdown CV files converted to HTML, then to PDF
- **No new API endpoints** - All processing happens in the browser

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

- Exports CV PDF and HTML with content from markdown CV files
- Respects current language selection (EN/PL) via i18next
- Uses markdown CV content as the source (plain text based on markdown)
- Generates two download options:
  - **HTML**: Rich formatting with styling, colors, and layout
  - **PDF**: Plain text based markdown content
- Generates PDF with proper formatting and styling
- No new endpoints - pure client-side processing

### 3. Update Translation Files

Add new translation keys to all 13 language files:

- `about.contact.pdf.download`: "Download CV PDF" (EN) / "Pobierz CV PDF" (PL) / etc.
- `about.contact.pdf.title`: "Konrad Borowiec - CV" (EN) / "Konrad Borowiec - CV" (PL) / etc.
- `about.contact.pdf.description`: Dynamic description including current language

### 4. Update ContactInfo Component

Modify `client/src/components/about/ContactInfo.tsx` (in AboutSection):

- Add PDF export button alongside existing contact info (email, phone, social links)
- Position: Under the social icons in the "Connect With Me" section
- Use Font Awesome icon (e.g., `fas fa-file-pdf`)
- Maintain consistent styling with existing contact info elements
- **Do not add new sections** - only the button

### 5. Update Translation JSON Files

Add keys to all locale files:

- `client/src/i18n/locales/{en,pl,de,fr,es,pt,ja,zh,tr,ko,hi,ar,id}/translation.json`

### 6. Configuration

Create `client/src/lib/pdfConfig.ts`:

- Define PDF options (margin, layout, pagebreak, etc.)
- Define content from markdown CV files
- Handle plain text formatting for PDF
- No image optimization needed (plain text PDF)

## Files to Modify/Create

| File                                                    | Action | Description                      |
| ------------------------------------------------------- | ------ | -------------------------------- |
| `package.json`                                          | Modify | Add `html2pdf.js` dependency     |
| `client/src/components/contact/PdfExport.tsx`           | Create | PDF export logic component       |
| `client/src/components/about/ContactInfo.tsx`           | Modify | Add PDF download button          |
| `client/src/lib/pdfConfig.ts`                           | Create | PDF configuration options        |
| `client/src/i18n/locales/*/translation.json` (12 files) | Modify | Add PDF-related translation keys |

## Translation Keys to Add (per language file)

```json
{
  "about": {
    ...
    "contact": {
      "pdf": {
        "download": "Download CV",
        "downloadHtml": "Download HTML",
        "downloadPdf": "Download PDF",
        "title": "Konrad Borowiec - CV",
        "description": "Professional data solutions specialist based in Warsaw, Poland."
      }
    }
  }
}
```

## PDF Content Scope

The PDF will include CV content from markdown files:

- ✅ Contact information (email, phone, location, social links)
- ✅ About Me section (bio and skills)
- ✅ Experience & Education (job history, education, technologies)
- ✅ Side Projects (project descriptions and technologies)
- ✅ Interests (hobbies and passion areas)
- ✅ Footer (copyright notice)

**Note**: PDF is plain text based on markdown CV content. No images or complex formatting.

## HTML Content Scope

The HTML export will include:

- ✅ Contact information (email, phone, location, social links)
- ✅ About Me section (bio and skills with styling)
- ✅ Experience & Education (job history, education, technologies with styling)
- ✅ Side Projects (project descriptions and technologies with styling)
- ✅ Interests (hobbies and passion areas with styling)
- ✅ Footer (copyright notice with styling)

**Note**: HTML export supports rich formatting with colors, layout, and styling.

## PDF Configuration Options

- **Orientation**: Portrait (fits all CV content better)
- **Margins**: Custom margins (e.g., 10mm)
- **Page Break**: Between major sections (experience, projects, interests)
- **Images**: None (plain text PDF)
- **Fonts**: System fonts (Times New Roman/Arial fallback)
- **Max Pages**: No hard limit, but optimize for readability

## User Experience

- Two buttons appear in "Connect With Me" section (under social icons):
  - **Download HTML**: Downloads styled HTML file with rich formatting
  - **Download PDF**: Downloads plain text PDF
- Tooltip or title on hover: "Download CV" / "Download HTML" / "Download PDF"
- Click triggers file generation and download
- Loading indicator while generating files
- HTML filename: `konrad-borowiec-cv-html-YYYY-MM-DD-HH-MM-SS.html`
- PDF filename: `konrad-borowiec-cv-pdf-YYYY-MM-DD-HH-MM-SS.pdf`
- No new sections added - only the download buttons

## Verification Steps

1. Run `npm install` after adding dependency
2. Run `npm run check` to verify types
3. Run `npm run dev` and test both HTML and PDF downloads in both languages (EN/PL)
4. Verify HTML PDF content matches markdown CV source with rich formatting
5. Verify PDF content matches markdown CV source (plain text)
6. Test download functionality for both formats
7. Check PDF metadata (title, author)
8. Check HTML rendering and styling

## Estimated Complexity

- **Difficulty**: Medium
- **Lines of Code**: ~150-200 (new component + config)
- **Translation Keys**: 3 keys × 12 languages = 36 additions
- **Build Impact**: Minimal (~15KB gzipped for html2pdf.js)

## Dependencies to Install

```bash
npm install html2pdf.js
```

## Important Notes

- **No new endpoints** - All PDF generation happens client-side in the browser
- **No new sections** - Only adding the download button to existing "Connect With Me" section
- **Plain text PDF** - Based on markdown CV content, no complex formatting or images
- **Markdown source** - Uses `.temp/plans/cv-en.md` and `.temp/plans/cv-pl.md` as content source

---

**Date Created**: 2026-05-11
**Branch**: change-03
**Status**: Ready for implementation
