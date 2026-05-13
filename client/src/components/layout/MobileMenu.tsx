import { FC, useEffect, useRef, useState } from 'react';
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
  const [fontSize, setFontSize] = useState<'xs' | 'sm' | 'base' | 'lg'>('sm');

  // Adjust font size based on available width
  useEffect(() => {
    const updateFontSize = () => {
      if (menuRef.current) {
        const width = menuRef.current.offsetWidth;
        // Approximate widths: section buttons (~160px) + toggles (~80px)
        const contentWidth = 240;
        const available = width - contentWidth;

        if (available < 50) {
          setFontSize('xs'); // 8px
        } else if (available < 100) {
          setFontSize('sm'); // 9px
        } else if (available < 150) {
          setFontSize('base'); // 10px
        } else {
          setFontSize('lg'); // 11px
        }
      }
    };

    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'xs':
        return 'text-[8px]';
      case 'sm':
        return 'text-[9px]';
      case 'base':
        return 'text-[10px]';
      case 'lg':
        return 'text-[11px]';
    }
  };

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
      <div className="no-scrollbar flex w-full items-center">
        {/* Left: Section navigation buttons */}
        <div className="flex min-w-0 flex-1">
          {sectionTitles.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`font-nunita whitespace-nowrap rounded-full px-2 py-0.5 font-semibold tracking-tight transition-colors ${
                activeSection === section.id
                  ? 'bg-portfolio-primary text-white shadow-sm'
                  : 'text-portfolio-text hover:bg-portfolio-lightest dark:text-portfolio-lighter dark:hover:bg-portfolio-darker'
              } ${getFontSizeClass()}`}
              aria-current={activeSection === section.id ? 'page' : undefined}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Right: Toggle buttons */}
        <div className="flex flex-shrink-0 items-center gap-2 px-2">
          <LanguageSwitcher />
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
