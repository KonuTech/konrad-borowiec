import { FC, useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import DarkModeToggle from './DarkModeToggle';
import LanguageSwitcher from '../i18n/LanguageSwitcher';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header: FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  const sectionTitles = [
    { id: 'home', title: t('common.home') },
    { id: 'about', title: t('common.about') },
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

  // Handle scroll event to update active section using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that is most centered in viewport
        const centeredEntries = entries.filter((entry) => entry.isIntersecting);
        if (centeredEntries.length > 0) {
          // Sort by how centered the section is (closest to 0.5 = most centered)
          centeredEntries.sort((a, b) => {
            const aCentered = Math.abs(a.intersectionRatio - 0.5);
            const bCentered = Math.abs(b.intersectionRatio - 0.5);
            return aCentered - bCentered;
          });
          const mostCentered = centeredEntries[0];
          setActiveSection(mostCentered.target.id);
        }
      },
      { rootMargin: '-50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    // Observe all sections
    const sections = ['home', 'about', 'projects', 'books', 'interests'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Clean up on unmount
    return () => observer.disconnect();
  }, [setActiveSection]);

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
        <nav className="hidden justify-self-center md:flex">
          <ul className="font-nunita flex items-center justify-center space-x-8 text-sm font-semibold text-portfolio-text dark:text-portfolio-lighter">
            <li>
              <a
                href="#home"
                className={`transition-colors duration-300 hover:text-portfolio-primary ${
                  activeSection === 'home' ? 'font-bold text-portfolio-primary' : ''
                }`}
              >
                {t('common.home')}
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={`transition-colors duration-300 hover:text-portfolio-primary ${
                  activeSection === 'about' ? 'font-bold text-portfolio-primary' : ''
                }`}
              >
                {t('common.about')}
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={`transition-colors duration-300 hover:text-portfolio-primary ${
                  activeSection === 'projects' ? 'font-bold text-portfolio-primary' : ''
                }`}
              >
                {t('common.projects')}
              </a>
            </li>
            <li>
              <a
                href="#books"
                className={`transition-colors duration-300 hover:text-portfolio-primary ${
                  activeSection === 'books' ? 'font-bold text-portfolio-primary' : ''
                }`}
              >
                {t('common.books')}
              </a>
            </li>
            <li>
              <a
                href="#interests"
                className={`transition-colors duration-300 hover:text-portfolio-primary ${
                  activeSection === 'interests' ? 'font-bold text-portfolio-primary' : ''
                }`}
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
