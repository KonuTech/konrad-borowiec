import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const buildId =
    (import.meta as any).env?.VITE_BUILD_ID || (import.meta as any).env?.VITE_COMMIT || 'local';

  return (
    <footer className="bg-portfolio-lightest py-1 dark:bg-portfolio-darker">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-1 md:flex-row md:gap-4">
          <div className="text-center md:text-start">
            <Link
              href="/"
              className="font-nunito text-xl font-bold text-portfolio-dark dark:text-portfolio-lighter"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="text-2xl">👨‍💻</span> {t('footer.logo')}
            </Link>
            <p className="text-sm text-portfolio-muted">{t('footer.description')}</p>
          </div>

          <div className="text-center md:text-end">
            <p className="text-sm text-portfolio-text dark:text-portfolio-lighter">
              {t('footer.copyright', { year: currentYear })}
            </p>
            <p className="text-xs text-portfolio-muted">
              {t('footer.tagline')}
              <span className="ml-2 opacity-70">{`· build: ${buildId}`}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
