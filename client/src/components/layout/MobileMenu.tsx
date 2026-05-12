import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
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

  const handleLinkClick = (_e: React.MouseEvent<HTMLAnchorElement>) => {
    onClose();
  };

  const sectionTitles = [
    { id: 'home', title: t('common.home') },
    { id: 'about', title: t('about.title') },
    { id: 'projects', title: t('projects.title') },
    { id: 'books', title: t('books.title') },
    { id: 'interests', title: t('interests.title') },
    { id: 'contact', title: t('common.contact') },
  ];

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className={`animate-slide-down absolute left-0 top-full w-full border-b border-portfolio-lightest bg-white py-3 shadow-sm dark:border-portfolio-dark dark:bg-portfolio-darker md:hidden`}
    >
      <div className="no-scrollbar flex min-w-max gap-2 overflow-x-auto px-4">
        {sectionTitles.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'bg-portfolio-primary text-white shadow-sm'
                : 'text-portfolio-text hover:bg-portfolio-lightest dark:text-portfolio-lighter dark:hover:bg-portfolio-darker'
            }`}
            aria-current={activeSection === section.id ? 'page' : undefined}
          >
            {section.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
