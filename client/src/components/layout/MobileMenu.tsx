import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../i18n/LanguageSwitcher';
import DarkModeToggle from './DarkModeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose, activeSection }) => {
  const { t, i18n } = useTranslation();
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const sectionTitles = [
    { id: 'home', title: t('common.home') },
    { id: 'about', title: t('common.about') },
    { id: 'contact', title: t('common.contact') },
    { id: 'projects', title: t('common.projects') },
    { id: 'books', title: t('common.books') },
    { id: 'interests', title: t('common.interests') },
  ];

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className={`animate-slide-down fixed left-0 top-0 z-50 flex w-full border-b border-portfolio-lightest bg-white py-2 shadow-sm dark:border-portfolio-dark dark:bg-portfolio-darker md:hidden`}
    >
      <div className="no-scrollbar flex min-w-max gap-0 overflow-x-auto px-1">
        {sectionTitles.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`font-nunita whitespace-nowrap rounded-full px-2 py-0.5 text-sm font-semibold tracking-tight transition-colors ${
              activeSection === section.id
                ? 'bg-portfolio-primary text-white shadow-sm'
                : 'text-portfolio-text hover:bg-portfolio-lightest dark:text-portfolio-lighter dark:hover:bg-portfolio-darker'
            }`}
            aria-current={activeSection === section.id ? 'page' : undefined}
          >
            {section.title}
          </button>
        ))}
        <LanguageSwitcher />
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default MobileMenu;
