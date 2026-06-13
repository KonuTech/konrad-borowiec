import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n/index';
import { ThemeProvider } from './context/ThemeContext';
import { initAnalytics } from './lib/analytics';

initAnalytics();

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
