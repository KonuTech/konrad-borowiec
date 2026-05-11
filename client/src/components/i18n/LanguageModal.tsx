import React, { useEffect, useRef } from 'react';

interface LanguageOption {
  code: string;
  label: string;
  fullName: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  languages: LanguageOption[];
  current: string;
  onSelect: (code: string) => void;
}

const LanguageModal: React.FC<Props> = ({ open, onClose, languages, current, onSelect }) => {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const firstButton = panelRef.current?.querySelector('button');
    (firstButton as HTMLButtonElement | undefined)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div
        ref={panelRef}
        className="relative z-10 w-[94%] max-w-md rounded-lg bg-white p-4 shadow-lg dark:bg-portfolio-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-2 text-sm font-semibold">Select language</h3>
        <div className="max-h-60 overflow-auto">
          {languages.map((lang) => {
            const active = current === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => onSelect(lang.code)}
                className={`w-full px-2 py-2 text-left text-sm transition-colors duration-150 ${
                  active
                    ? 'bg-portfolio-primary text-white'
                    : 'hover:bg-portfolio-lighter dark:hover:bg-portfolio-darker'
                }`}
                aria-pressed={active}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{lang.fullName}</span>
                  <span className="ml-2 font-mono text-xs">{lang.label}</span>
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex justify-end">
          <button type="button" onClick={onClose} className="px-3 py-1 text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
