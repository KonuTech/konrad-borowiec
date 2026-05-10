import { useTranslation } from 'react-i18next';

interface LanguageOption {
  code: string;
  label: string;
  fullName: string;
}

const languages: LanguageOption[] = [
  { code: 'en', label: 'EN', fullName: 'English' },
  { code: 'pl', label: 'PL', fullName: 'Polski' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const current = i18n.language?.toLowerCase().startsWith('pl') ? 'pl' : 'en';

  return (
    <div
      role="group"
      aria-label="Select language"
      className="inline-flex overflow-hidden rounded-full border border-portfolio-primary/30 bg-portfolio-lightest text-xs font-semibold shadow-sm dark:border-portfolio-lighter/30 dark:bg-portfolio-dark"
    >
      {languages.map((lang) => {
        const active = current === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => i18n.changeLanguage(lang.code)}
            aria-pressed={active}
            aria-label={lang.fullName}
            title={lang.fullName}
            className={`px-3 py-1.5 transition-colors duration-200 ${
              active
                ? 'bg-portfolio-primary text-white'
                : 'text-portfolio-primary hover:bg-portfolio-lighter dark:text-portfolio-lighter dark:hover:bg-portfolio-darker'
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
