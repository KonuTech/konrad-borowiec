import { useTranslation } from 'react-i18next';

interface LanguageOption {
  code: string;
  label: string;
  fullName: string;
}

const languages: LanguageOption[] = [
  { code: 'en', label: 'EN', fullName: 'English' },
  { code: 'pl', label: 'PL', fullName: 'Polski' },
  { code: 'es', label: 'ES', fullName: 'Español' },
  { code: 'de', label: 'DE', fullName: 'Deutsch' },
  { code: 'fr', label: 'FR', fullName: 'Français' },
  { code: 'ja', label: 'JA', fullName: '日本語' },
  { code: 'pt', label: 'PT', fullName: 'Português' },
  { code: 'zh', label: 'ZH', fullName: '中文' },
  { code: 'ar', label: 'AR', fullName: 'العربية' },
  { code: 'tr', label: 'TR', fullName: 'Türkçe' },
  { code: 'ko', label: 'KO', fullName: '한국어' },
  { code: 'hi', label: 'HI', fullName: 'हिंदी' },
  { code: 'id', label: 'ID', fullName: 'Bahasa Indonesia' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const current = i18n.language?.toLowerCase().startsWith('pl')
    ? 'pl'
    : i18n.language?.toLowerCase().startsWith('es')
      ? 'es'
      : i18n.language?.toLowerCase().startsWith('de')
        ? 'de'
        : i18n.language?.toLowerCase().startsWith('fr')
          ? 'fr'
          : i18n.language?.toLowerCase().startsWith('ja')
            ? 'ja'
            : i18n.language?.toLowerCase().startsWith('pt')
              ? 'pt'
              : i18n.language?.toLowerCase().startsWith('zh')
                ? 'zh'
                : i18n.language?.toLowerCase().startsWith('ar')
                  ? 'ar'
                  : i18n.language?.toLowerCase().startsWith('tr')
                    ? 'tr'
                    : i18n.language?.toLowerCase().startsWith('ko')
                      ? 'ko'
                      : i18n.language?.toLowerCase().startsWith('hi')
                        ? 'hi'
                        : i18n.language?.toLowerCase().startsWith('id')
                          ? 'id'
                          : 'en';

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
