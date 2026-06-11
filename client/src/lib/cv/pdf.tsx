import { renderHtmlBody } from './html';
import type { CvModel } from './types';

// Languages that get a real selectable-text PDF via @react-pdf/renderer.
// The bundled Noto Sans (Latin/Greek/Cyrillic) covers their full alphabets.
// The remaining locales (ja, zh, ko, ar, hi) fall back to a rasterized PDF:
// the browser's own text engine shapes CJK/Arabic/Devanagari correctly, and
// html2pdf.js captures that rendering — visually right, just not selectable.
// Promoting a language here only requires registering a font that covers it.
const TEXT_PDF_LANGS = new Set(['en', 'pl', 'es', 'de', 'fr', 'pt', 'tr', 'id']);

// Fonts live in assets/fonts/cv/ (served from the site root) and are fetched
// only when a PDF download is actually triggered.
const FONT_FAMILY = 'Noto Sans';
let fontsRegistered = false;

export async function generatePdfBlob(model: CvModel): Promise<Blob> {
  return TEXT_PDF_LANGS.has(model.lang) ? generateTextPdf(model) : generateRasterPdf(model);
}

async function generateTextPdf(model: CvModel): Promise<Blob> {
  const [{ pdf, Font }, { CvDocument }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('./pdfDocument'),
  ]);
  if (!fontsRegistered) {
    Font.register({
      family: FONT_FAMILY,
      fonts: [
        { src: '/fonts/cv/NotoSans-Regular.ttf', fontWeight: 'normal' },
        { src: '/fonts/cv/NotoSans-Bold.ttf', fontWeight: 'bold' },
      ],
    });
    fontsRegistered = true;
  }
  return pdf(<CvDocument model={model} />).toBlob();
}

async function generateRasterPdf(model: CvModel): Promise<Blob> {
  const html2pdf = (await import('html2pdf.js')).default;

  // html2canvas needs the element laid out in the document. The off-screen
  // styles must live on a wrapper, NOT on the element handed to html2pdf —
  // html2pdf clones that element and the clone would keep the off-screen
  // positioning, producing a blank capture.
  const host = document.createElement('div');
  host.style.position = 'fixed';
  host.style.left = '-10000px';
  host.style.top = '0';
  const container = document.createElement('div');
  container.style.width = '794px'; // A4 width at ~96 dpi
  container.innerHTML = renderHtmlBody(model);
  host.appendChild(container);
  document.body.appendChild(host);

  try {
    const worker = html2pdf();
    const blob: Blob = await worker
      .set({
        margin: [10, 10, 10, 10],
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        // html2pdf supports `pagebreak` at runtime; its bundled typings omit it.
        pagebreak: { mode: ['css'] },
      } as Parameters<typeof worker.set>[0])
      .from(container)
      .outputPdf('blob');
    return blob;
  } finally {
    host.remove();
  }
}
