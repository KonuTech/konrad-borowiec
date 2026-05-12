import { FC, useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import DarkModeToggle from './DarkModeToggle';
import LanguageSwitcher from '../i18n/LanguageSwitcher';

interface HeaderProps {
  activeSection: string;
}

const Header: FC<HeaderProps> = ({ activeSection }) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Detect which section is in view
      const sections = ['home', 'about', 'contact', 'projects', 'books', 'interests'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleScrollThrottled = throttle(handleScroll, 100);
    window.addEventListener('scroll', handleScrollThrottled);
    return () => window.removeEventListener('scroll', handleScrollThrottled);
  }, []);

  // Throttle function to prevent excessive scroll events
  function throttle<T>(func: T, limit: number): T {
    let inThrottle: boolean;
    return function (this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    } as T;
  }

  const sectionTitles = [
    { id: 'home', title: t('common.home') },
    { id: 'about', title: t('about.title') },
    { id: 'contact', title: t('common.contact') },
    { id: 'projects', title: t('projects.title') },
    { id: 'books', title: t('books.title') },
    { id: 'interests', title: t('interests.title') },
  ];

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky-section-header sticky top-0 z-50 w-full">
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
                href="#contact"
                className="transition-colors duration-300 hover:text-portfolio-primary"
              >
                {t('common.contact')}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
