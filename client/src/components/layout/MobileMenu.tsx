import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../i18n/LanguageSwitcher';
import DarkModeToggle from './DarkModeToggle';

interface MobileMenuProps {
  activeSection: string;
}

const MobileMenu: FC<MobileMenuProps> = ({ activeSection }) => {
  const { t } = useTranslation();

  const getFontSizeClass = () => {
    // Use fixed font size for consistency
    return 'text-[11px]';
  };

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
      <div className="no-scrollbar flex w-full flex-col">
        {/* Left: Section navigation buttons */}
        <div className="flex min-w-0 flex-1 px-2">
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

        {/* Right: Toggle buttons and social icons - Second line */}
        <div className="flex flex-shrink-0 items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <DarkModeToggle />
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/konutech"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-portfolio-primary"
              aria-label="GitHub"
            >
              <i className="fab fa-github text-lg"></i>
            </a>
            <a
              href="https://linkedin.com/in/32167"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-portfolio-primary"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin text-lg"></i>
            </a>
            <a
              href="https://credly.com/users/konrad-borowiec/badges"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-portfolio-primary"
              aria-label="Credly"
            >
              <i className="fas fa-certificate text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
