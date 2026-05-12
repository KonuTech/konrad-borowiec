import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import DarkModeToggle from './DarkModeToggle';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from '../i18n/LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const header = document.querySelector('header');
      if (!header || header.contains(event.target as Node)) return;
      setIsMobileMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 z-50 w-full bg-white/95 py-4 shadow-sm backdrop-blur-md transition-colors duration-300 dark:bg-portfolio-darker/95 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="font-nunita text-xl font-bold text-portfolio-dark dark:text-portfolio-lighter"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-2xl">👨‍💻</span> {t('footer.logo')}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="font-nunita flex items-center space-x-8 text-sm font-semibold text-portfolio-text dark:text-portfolio-lighter">
            <li>
              <a
                href="#home"
                className="transition-colors duration-300 hover:text-portfolio-primary"
              >
                {t('common.home')}
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="transition-colors duration-300 hover:text-portfolio-primary"
              >
                {t('common.about')}
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="transition-colors duration-300 hover:text-portfolio-primary"
              >
                {t('common.projects')}
              </a>
            </li>
            <li>
              <a
                href="#books"
                className="transition-colors duration-300 hover:text-portfolio-primary"
              >
                {t('common.books')}
              </a>
            </li>
            <li>
              <a
                href="#interests"
                className="transition-colors duration-300 hover:text-portfolio-primary"
              >
                {t('common.interests')}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="transition-colors duration-300 hover:text-portfolio-primary"
              >
                {t('common.contact')}
              </a>
            </li>
            <li>
              <a
                href="https://github.com/konutech"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-portfolio-primary"
                aria-label="GitHub"
              >
                <i className="fab fa-github text-lg"></i>
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/32167"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-portfolio-primary"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-lg"></i>
              </a>
            </li>
            <li>
              <a
                href="https://credly.com/users/konrad-borowiec/badges"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-portfolio-primary"
                aria-label="Credly"
              >
                <i className="fas fa-certificate text-lg"></i>
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-3">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Dark Mode Toggle */}
          <DarkModeToggle />

          {/* Mobile Menu Button */}
          <button
            className="rounded-full p-2 text-portfolio-text transition-colors duration-300 hover:bg-portfolio-lightest dark:text-portfolio-lighter dark:hover:bg-portfolio-dark md:hidden"
            aria-label="Menu"
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
