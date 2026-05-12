import { FC } from 'react';
import html2pdf from 'html2pdf.js';

interface PdfButtonsProps {
  cvContent: string;
}

const PdfButtons: FC<PdfButtonsProps> = ({ cvContent }) => {
  const generateDownload = (format: 'html' | 'pdf') => {
    // Create a div with the CV content
    const element = document.createElement('div');
    element.innerHTML = cvContent;

    const opt = {
      margin: [10, 10, 10, 10], // top, left, bottom, right (mm)
      filename: 'cv-konrad-borowiec',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={() => generateDownload('html')}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-colors duration-300 hover:bg-portfolio-primary/10 dark:bg-portfolio-dark dark:hover:bg-portfolio-primary/30"
        aria-label="Download as HTML"
      >
        <i className="fas fa-file-code text-xl text-portfolio-primary dark:text-portfolio-lighter"></i>
      </button>

      <button
        onClick={() => generateDownload('pdf')}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-colors duration-300 hover:bg-portfolio-primary/10 dark:bg-portfolio-dark dark:hover:bg-portfolio-primary/30"
        aria-label="Download as PDF"
      >
        <i className="fas fa-file-pdf text-xl text-portfolio-primary dark:text-portfolio-lighter"></i>
      </button>
    </div>
  );
};

export default PdfButtons;
