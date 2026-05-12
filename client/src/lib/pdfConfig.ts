import html2pdf from 'html2pdf.js';

export interface PdfOptions {
  margin: number;
  filename: string;
  image: {
    type: string;
    quality: number;
  };
  html2canvas: {
    scale: number;
    useCORS: boolean;
    logging: boolean;
  };
  jsPDF: {
    orientation: 'portrait' | 'landscape';
    unit: string;
    format: string;
  };
}

export const pdfOptions: PdfOptions = {
  margin: 10,
  filename: 'konrad-borowiec-cv-pdf-YYYY-MM-DD-HH-MM-SS.pdf',
  image: {
    type: 'jpeg',
    quality: 0.98,
  },
  html2canvas: {
    scale: 2,
    useCORS: true,
    logging: false,
  },
  jsPDF: {
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  },
};

export const htmlOptions: PdfOptions = {
  margin: 10,
  filename: 'konrad-borowiec-cv-html-YYYY-MM-DD-HH-MM-SS.html',
  image: {
    type: 'jpeg',
    quality: 0.98,
  },
  html2canvas: {
    scale: 2,
    useCORS: true,
    logging: false,
  },
  jsPDF: {
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  },
};

export const generatePdf = async (element: HTMLElement, options: PdfOptions): Promise<void> => {
  const opt = {
    margin: options.margin,
    filename: options.filename,
    image: {
      type: options.image.type,
      quality: options.image.quality,
    },
    html2canvas: options.html2canvas,
    jsPDF: options.jsPDF,
  };

  return html2pdf().set(opt).from(element).save();
};

export default pdfOptions;
