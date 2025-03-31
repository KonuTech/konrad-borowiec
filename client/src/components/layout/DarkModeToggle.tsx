import { useContext, useEffect } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  // Debug the current state - useful for troubleshooting
  useEffect(() => {
    console.log('Dark mode state:', darkMode);
    console.log('Dark mode class on HTML:', document.documentElement.classList.contains('dark'));
  }, [darkMode]);

  return (
    <button
      className="rounded-full p-2 bg-portfolio-lightest dark:bg-portfolio-dark text-portfolio-primary dark:text-portfolio-lighter hover:bg-portfolio-lighter dark:hover:bg-portfolio-darker transition-colors duration-300 border border-portfolio-primary/30 shadow-sm"
      aria-label="Toggle dark mode"
      onClick={toggleDarkMode}
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
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
