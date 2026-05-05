import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

interface LanguageOption {
  code: string;
  name: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English' },
  { code: 'pl', name: 'Polski' },
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentLanguage = i18n.language;

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.language-switcher')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="language-switcher relative inline-block">
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 rounded-full border border-portfolio-primary px-4 py-2 text-sm font-semibold text-portfolio-primary transition-colors duration-300 hover:bg-portfolio-lightest dark:border-portfolio-lighter dark:text-portfolio-lighter dark:hover:bg-portfolio-dark"
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
        aria-label="Select language"
      >
        <Languages className="h-4 w-4" />
        <span>{currentLanguage === 'en' ? 'English' : 'Polski'}</span>
      </button>

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden="true"
            onClick={() => setIsDropdownOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 min-w-[160px] rounded-md border border-portfolio-primary bg-white p-2 shadow-lg dark:border-portfolio-lighter dark:bg-portfolio-darker">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => changeLanguage(lang.code)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                  currentLanguage === lang.code
                    ? 'bg-portfolio-primary text-white'
                    : 'hover:bg-portfolio-lightest dark:hover:bg-portfolio-darker'
                }`}
                aria-current={currentLanguage === lang.code ? 'true' : 'false'}
              >
                <span>{lang.name}</span>
                {currentLanguage === lang.code && (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
