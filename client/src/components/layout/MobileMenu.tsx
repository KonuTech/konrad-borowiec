import { FC, useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClose();
  };

  return (
    <div className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-portfolio-darker shadow-md py-4 animate-slide-down ${isOpen ? 'block' : 'hidden'}`}>
      <ul className="flex flex-col space-y-4 px-4 font-nunito font-semibold text-sm text-portfolio-text dark:text-portfolio-lighter">
        <li>
          <a
            href="#home"
            className="block py-2 px-4 hover:bg-portfolio-lightest dark:hover:bg-portfolio-dark hover:text-portfolio-primary dark:hover:text-white rounded-lg transition-colors duration-300"
            onClick={handleLinkClick}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="block py-2 px-4 hover:bg-portfolio-lightest dark:hover:bg-portfolio-dark hover:text-portfolio-primary dark:hover:text-white rounded-lg transition-colors duration-300"
            onClick={handleLinkClick}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className="block py-2 px-4 hover:bg-portfolio-lightest dark:hover:bg-portfolio-dark hover:text-portfolio-primary dark:hover:text-white rounded-lg transition-colors duration-300"
            onClick={handleLinkClick}
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#books"
            className="block py-2 px-4 hover:bg-portfolio-lightest dark:hover:bg-portfolio-dark hover:text-portfolio-primary dark:hover:text-white rounded-lg transition-colors duration-300"
            onClick={handleLinkClick}
          >
            Books
          </a>
        </li>
        <li>
          <a
            href="#interests"
            className="block py-2 px-4 hover:bg-portfolio-lightest dark:hover:bg-portfolio-dark hover:text-portfolio-primary dark:hover:text-white rounded-lg transition-colors duration-300"
            onClick={handleLinkClick}
          >
            Interests
          </a>
        </li>
        
        {/* Dark Mode Toggle for Mobile */}
        <li className="mt-4 border-t border-portfolio-lightest dark:border-portfolio-dark pt-4">
          <button
            className="w-full flex items-center justify-between py-2 px-4 hover:bg-portfolio-lightest dark:hover:bg-portfolio-dark rounded-lg transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              toggleDarkMode();
            }}
          >
            <span>{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
            <span className="ml-2">
              {darkMode ? (
                <i className="fas fa-sun text-yellow-500"></i>
              ) : (
                <i className="fas fa-moon text-portfolio-primary"></i>
              )}
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
