import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button
      className="rounded-full p-2 bg-portfolio-lightest dark:bg-portfolio-dark text-portfolio-primary dark:text-portfolio-lighter hover:bg-portfolio-lighter dark:hover:bg-portfolio-darker transition-colors duration-300"
      aria-label="Toggle dark mode"
      onClick={toggleDarkMode}
    >
      {darkMode ? (
        <i className="fas fa-sun"></i>
      ) : (
        <i className="fas fa-moon"></i>
      )}
    </button>
  );
};

export default DarkModeToggle;
