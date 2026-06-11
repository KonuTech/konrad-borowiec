import { expect, test } from '@playwright/test';
import type { Download, Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';

// CV downloads must follow the selected site language. Per language we check
// all three formats: Markdown and HTML carry translated real-text content;
// PDF is either real text (Latin locales, @react-pdf/renderer) or a raster
// capture (ja/zh/ko/ar/hi, html2pdf.js) — both must be non-trivial PDFs.
const CASES = [
  { lng: 'en', summaryHeader: 'Summary' },
  { lng: 'pl', summaryHeader: 'Podsumowanie' },
  { lng: 'ja', summaryHeader: '概要' },
  { lng: 'ar', summaryHeader: 'نبذة مهنية' },
];

const FILENAME = (lng: string, ext: string) =>
  new RegExp(`^cv-konrad-borowiec-${lng}-\\d{4}-\\d{2}-\\d{2}\\.${ext}$`);

async function downloadCv(page: Page, format: 'HTML' | 'Markdown' | 'PDF'): Promise<Download> {
  const downloadPromise = page.waitForEvent('download', { timeout: 60_000 });
  await page.getByRole('button', { name: `Download CV as ${format}` }).click();
  return downloadPromise;
}

for (const { lng, summaryHeader } of CASES) {
  test(`CV downloads follow the selected language (${lng})`, async ({ page }) => {
    // Three downloads per test; PDF generation (lazy chunks, fonts, raster
    // capture) can take a while in slower browsers.
    test.slow();
    await page.addInitScript((language) => {
      localStorage.setItem('selectedLanguage', language);
    }, lng);
    await page.goto('/');
    await page.locator('#contact-info').scrollIntoViewIfNeeded();

    // Markdown — translated content, all roles present, proper structure
    const md = await downloadCv(page, 'Markdown');
    expect(md.suggestedFilename()).toMatch(FILENAME(lng, 'md'));
    const mdText = await readFile((await md.path())!, 'utf-8');
    expect(mdText).toContain(`## ${summaryHeader}`);
    expect(mdText).toContain('NatWest Markets');
    expect(mdText).toContain('# Konrad Borowiec');

    // HTML — standalone document with correct language and direction
    const html = await downloadCv(page, 'HTML');
    expect(html.suggestedFilename()).toMatch(FILENAME(lng, 'html'));
    const htmlText = await readFile((await html.path())!, 'utf-8');
    expect(htmlText).toContain(`<html lang="${lng}" dir="${lng === 'ar' ? 'rtl' : 'ltr'}">`);
    expect(htmlText).toContain(summaryHeader);
    expect(htmlText).toContain('NatWest Markets');

    // PDF — valid, non-trivial document (lazy chunk + font fetch can be slow)
    const pdf = await downloadCv(page, 'PDF');
    expect(pdf.suggestedFilename()).toMatch(FILENAME(lng, 'pdf'));
    const pdfBytes = await readFile((await pdf.path())!);
    expect(pdfBytes.subarray(0, 5).toString('latin1')).toBe('%PDF-');
    expect(pdfBytes.length).toBeGreaterThan(20_000);
  });
}
