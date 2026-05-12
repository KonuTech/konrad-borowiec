import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageModal from './LanguageModal';

interface LanguageOption {
  code: string;
  label: string;
  fullName: string;
}

const languages: LanguageOption[] = [
  { code: 'en', label: 'EN', fullName: 'English' },
  { code: 'pl', label: 'PL', fullName: 'Polski' },
  { code: 'de', label: 'DE', fullName: 'Deutsch' },
  { code: 'fr', label: 'FR', fullName: 'Français' },
  { code: 'es', label: 'ES', fullName: 'Español' },
  { code: 'pt', label: 'PT', fullName: 'Português' },
  { code: 'ja', label: 'JA', fullName: '日本語' },
  { code: 'zh', label: 'ZH', fullName: '中文' },
  { code: 'ko', label: 'KO', fullName: '한국어' },
  { code: 'id', label: 'ID', fullName: 'Bahasa Indonesia' },
  { code: 'tr', label: 'TR', fullName: 'Türkçe' },
  { code: 'hi', label: 'HI', fullName: 'हिंदी' },
  { code: 'ar', label: 'AR', fullName: 'العربية' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const current = i18n.language?.toLowerCase().startsWith('pl')
    ? 'pl'
    : i18n.language?.toLowerCase().startsWith('de')
      ? 'de'
      : i18n.language?.toLowerCase().startsWith('fr')
        ? 'fr'
        : i18n.language?.toLowerCase().startsWith('es')
          ? 'es'
          : i18n.language?.toLowerCase().startsWith('pt')
            ? 'pt'
            : i18n.language?.toLowerCase().startsWith('ja')
              ? 'ja'
              : i18n.language?.toLowerCase().startsWith('zh')
                ? 'zh'
                : i18n.language?.toLowerCase().startsWith('ko')
                  ? 'ko'
                  : i18n.language?.toLowerCase().startsWith('id')
                    ? 'id'
                    : i18n.language?.toLowerCase().startsWith('tr')
                      ? 'tr'
                      : i18n.language?.toLowerCase().startsWith('hi')
                        ? 'hi'
                        : i18n.language?.toLowerCase().startsWith('ar')
                          ? 'ar'
                          : 'en';

  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      triggerRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      const handler = (e: MouseEvent) => {
        const target = e.target as Node;
        if (!containerRef.current || containerRef.current.contains(target)) return;
        setOpen(false);
      };
      document.addEventListener('click', handler);
      return () => document.removeEventListener('click', handler);
    }
  }, [open]);

  const currentLabel = languages.find((l) => l.code === current)?.label ?? 'EN';

  return (
    <div ref={containerRef} className="relative inline-flex">
      {/* Mobile: compact button */}
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full border border-portfolio-primary/30 bg-portfolio-lightest px-2 py-1 text-[11px] font-semibold text-portfolio-primary shadow-sm dark:border-portfolio-lighter/30 dark:bg-portfolio-dark md:hidden"
        aria-label="Open language selector"
        title="Select language"
      >
        {currentLabel}
      </button>

      {/* Desktop / tablet: full inline list - no outside click handler needed for inline buttons */}
      <div
        role="group"
        aria-label="Select language"
        className="hidden overflow-hidden rounded-full border border-portfolio-primary/30 bg-portfolio-lightest text-[11px] font-semibold shadow-sm dark:border-portfolio-lighter/30 dark:bg-portfolio-dark md:inline-flex md:text-xs"
      >
        {languages.map((lang) => {
          const active = current === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setOpen(false);
              }}
              aria-pressed={active}
              aria-label={lang.fullName}
              title={lang.fullName}
              className={`px-2 py-1 leading-none tracking-tight transition-colors duration-200 md:text-xs ${
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

      <LanguageModal
        open={open}
        onClose={() => setOpen(false)}
        languages={languages}
        current={current}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default LanguageSwitcher;
