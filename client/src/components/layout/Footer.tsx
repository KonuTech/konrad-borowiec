import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-portfolio-lightest py-2 dark:bg-portfolio-darker md:py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="font-nunito text-xl font-bold text-portfolio-dark dark:text-portfolio-lighter"
            >
              <span className="text-2xl">👨‍💻</span> {t('footer.logo')}
            </Link>
            <p className="mt-2 text-sm text-portfolio-muted">{t('footer.description')}</p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-portfolio-text dark:text-portfolio-lighter">
              {t('footer.copyright', { year: currentYear })}
            </p>
            <p className="mt-2 text-xs text-portfolio-muted">{t('footer.tagline')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
