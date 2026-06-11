import { buildCvModel } from './buildCvModel';
import { renderHtmlDocument } from './html';
import { renderMarkdown } from './markdown';
import type { CvFormat } from './types';

export function cvFilename(lang: string, ext: string): string {
  const date = new Date().toISOString().slice(0, 10);
  return `cv-konrad-borowiec-${lang}-${date}.${ext}`;
}

function saveBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Give the browser time to start the download before releasing the URL.
  setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

export async function downloadCv(format: CvFormat, lang: string): Promise<void> {
  const model = buildCvModel(lang);
  if (format === 'md') {
    const blob = new Blob([renderMarkdown(model)], { type: 'text/markdown;charset=utf-8' });
    saveBlob(blob, cvFilename(model.lang, 'md'));
    return;
  }
  if (format === 'html') {
    const blob = new Blob([renderHtmlDocument(model)], { type: 'text/html;charset=utf-8' });
    saveBlob(blob, cvFilename(model.lang, 'html'));
    return;
  }
  // PDF generation is heavy — both libraries load lazily inside ./pdf.
  const { generatePdfBlob } = await import('./pdf');
  saveBlob(await generatePdfBlob(model), cvFilename(model.lang, 'pdf'));
}
