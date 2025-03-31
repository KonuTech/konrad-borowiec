import { FC } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClose();
  };

  return (
    <div className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-md py-4 animate-slide-down ${isOpen ? 'block' : 'hidden'}`}>
      <ul className="flex flex-col space-y-4 px-4 font-nunito font-semibold text-sm">
        <li>
          <a
            href="#home"
            className="block py-2 px-4 hover:bg-ghibli-lightBlue dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
            onClick={handleLinkClick}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="block py-2 px-4 hover:bg-ghibli-lightBlue dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
            onClick={handleLinkClick}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className="block py-2 px-4 hover:bg-ghibli-lightBlue dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
            onClick={handleLinkClick}
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#books"
            className="block py-2 px-4 hover:bg-ghibli-lightBlue dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
            onClick={handleLinkClick}
          >
            Books
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="block py-2 px-4 hover:bg-ghibli-lightBlue dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
            onClick={handleLinkClick}
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
