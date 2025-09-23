import { createContext, useState, useEffect, ReactNode, FC } from 'react';

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Apply the dark mode class to the document
  const applyDarkMode = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return isDark;
  };

  // Initial setup
  useEffect(() => {
    // Prevent double initialization
    if (initialized) return;

    // Check localStorage first
    const storedPreference = localStorage.getItem('darkMode');
    
    // If we have a stored preference, use it
    if (storedPreference !== null) {
      const isDarkMode = storedPreference === 'true';
      setDarkMode(applyDarkMode(isDarkMode));
    } else {
      // No stored preference, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(applyDarkMode(prefersDark));
    }
    
    setInitialized(true);
    
    // Debug
    console.log('Dark mode initialized');
  }, [initialized]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only apply system preference if user hasn't set a preference
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(applyDarkMode(e.matches));
        console.log('System dark mode preference changed:', e.matches);
      }
    };
    
    // Modern browsers
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle function with forced update
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    
    // Set state
    setDarkMode(newDarkMode);
    
    // Update DOM
    applyDarkMode(newDarkMode);
    
    // Save preference
    localStorage.setItem('darkMode', String(newDarkMode));
    
    // Debug
    console.log('Dark mode toggled:', newDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
