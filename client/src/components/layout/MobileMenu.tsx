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

  return (
    <div
      className={`animate-slide-down absolute left-0 top-full w-full bg-white py-4 shadow-md dark:bg-portfolio-darker md:hidden ${isOpen ? 'block' : 'hidden'}`}
    >
      <ul className="font-nunito flex flex-col space-y-4 px-4 text-sm font-semibold text-portfolio-text dark:text-portfolio-lighter">
        <li>
          <a
            href="#home"
            className="block rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-portfolio-lightest hover:text-portfolio-primary dark:hover:bg-portfolio-dark dark:hover:text-white"
            onClick={handleLinkClick}
          >
            {t('menu.home')}
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="block rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-portfolio-lightest hover:text-portfolio-primary dark:hover:bg-portfolio-dark dark:hover:text-white"
            onClick={handleLinkClick}
          >
            {t('menu.about')}
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className="block rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-portfolio-lightest hover:text-portfolio-primary dark:hover:bg-portfolio-dark dark:hover:text-white"
            onClick={handleLinkClick}
          >
            {t('menu.projects')}
          </a>
        </li>
        <li>
          <a
            href="#books"
            className="block rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-portfolio-lightest hover:text-portfolio-primary dark:hover:bg-portfolio-dark dark:hover:text-white"
            onClick={handleLinkClick}
          >
            {t('menu.books')}
          </a>
        </li>
        <li>
          <a
            href="#interests"
            className="block rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-portfolio-lightest hover:text-portfolio-primary dark:hover:bg-portfolio-dark dark:hover:text-white"
            onClick={handleLinkClick}
          >
            {t('menu.interests')}
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="block rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-portfolio-lightest hover:text-portfolio-primary dark:hover:bg-portfolio-dark dark:hover:text-white"
            onClick={handleLinkClick}
          >
            {t('menu.contact')}
          </a>
        </li>
        <li className="flex space-x-4 px-4 pt-2">
          <a
            href="https://github.com/konutech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg transition-colors duration-300 hover:text-portfolio-primary"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://linkedin.com/in/32167"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg transition-colors duration-300 hover:text-portfolio-primary"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://credly.com/users/konrad-borowiec/badges"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg transition-colors duration-300 hover:text-portfolio-primary"
            aria-label="Credly"
          >
            <i className="fas fa-certificate"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
