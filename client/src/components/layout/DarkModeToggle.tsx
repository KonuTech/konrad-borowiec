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
      className="transition-colors duration-300 hover:text-portfolio-primary dark:hover:text-portfolio-darker"
      aria-label="Toggle dark mode"
      onClick={toggleDarkMode}
      title={darkMode ? t('ui.lightMode') : t('ui.darkMode')}
    >
      {darkMode ? (
        <i className="fas fa-sun text-lg text-yellow-500"></i>
      ) : (
        <i className="fas fa-moon text-lg text-portfolio-primary"></i>
      )}
    </button>
  );
};

export default DarkModeToggle;
