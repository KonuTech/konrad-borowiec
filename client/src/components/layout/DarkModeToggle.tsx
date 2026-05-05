import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@/context/ThemeContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();

  // Debug the current state - useful for troubleshooting
  useEffect(() => {
    console.log('Dark mode state:', darkMode);
    console.log('Dark mode class on HTML:', document.documentElement.classList.contains('dark'));
  }, [darkMode]);

  return (
    <button
      className="rounded-full border border-portfolio-primary/30 bg-portfolio-lightest p-2 text-portfolio-primary shadow-sm transition-colors duration-300 hover:bg-portfolio-lighter dark:bg-portfolio-dark dark:text-portfolio-lighter dark:hover:bg-portfolio-darker"
      aria-label="Toggle dark mode"
      onClick={toggleDarkMode}
      title={darkMode ? t('ui.lightMode') : t('ui.darkMode')}
    >
      {darkMode ? (
        <i className="fas fa-sun text-yellow-500"></i>
      ) : (
        <i className="fas fa-moon text-portfolio-primary"></i>
      )}
    </button>
  );
};

export default DarkModeToggle;
