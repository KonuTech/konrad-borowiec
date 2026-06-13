import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { downloadCv } from '@/lib/cv/download';
import type { CvFormat } from '@/lib/cv/types';
import { trackEvent } from '@/lib/analytics';

// CV download buttons. All content assembly and rendering lives in
// client/src/lib/cv/ — the CV follows the currently selected language.

const FORMATS: { format: CvFormat; icon: string; label: string }[] = [
  { format: 'html', icon: 'fa-file-code', label: 'HTML' },
  { format: 'md', icon: 'fa-file-alt', label: 'Markdown' },
  { format: 'pdf', icon: 'fa-file-pdf', label: 'PDF' },
];

const PdfButtons: FC = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [generating, setGenerating] = useState<CvFormat | null>(null);

  const handleDownload = async (format: CvFormat) => {
    if (generating) return;
    setGenerating(format);
    try {
      await downloadCv(format, i18n.language);
      trackEvent('cv_downloaded', { format, lang: i18n.language });
    } catch (error) {
      console.error('CV download failed', error);
      toast({
        title: t('toast.error'),
        description: t('cv.downloadFailed'),
        variant: 'destructive',
      });
    } finally {
      setGenerating(null);
    }
  };

  return (
    <div className="flex justify-center gap-4">
      {FORMATS.map(({ format, icon, label }) => (
        <button
          key={format}
          onClick={() => handleDownload(format)}
          disabled={generating !== null}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-colors duration-300 hover:bg-portfolio-primary/10 disabled:cursor-wait disabled:opacity-60 dark:bg-portfolio-dark dark:hover:bg-portfolio-primary/30"
          aria-label={`Download CV as ${label}`}
          title={`Download CV as ${label}`}
        >
          <i
            className={`fas ${
              generating === format ? 'fa-spinner fa-spin' : icon
            } text-xl text-portfolio-primary dark:text-portfolio-lighter`}
          ></i>
        </button>
      ))}
    </div>
  );
};

export default PdfButtons;
