import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import plTranslation from './locales/pl/translation.json';
import esTranslation from './locales/es/translation.json';
import deTranslation from './locales/de/translation.json';
import frTranslation from './locales/fr/translation.json';
import jaTranslation from './locales/ja/translation.json';
import ptTranslation from './locales/pt/translation.json';
import zhTranslation from './locales/zh/translation.json';
import arTranslation from './locales/ar/translation.json';
import trTranslation from './locales/tr/translation.json';
import koTranslation from './locales/ko/translation.json';
import hiTranslation from './locales/hi/translation.json';
import idTranslation from './locales/id/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  pl: {
    translation: plTranslation,
  },
  es: {
    translation: esTranslation,
  },
  de: {
    translation: deTranslation,
  },
  fr: {
    translation: frTranslation,
  },
  ja: {
    translation: jaTranslation,
  },
  pt: {
    translation: ptTranslation,
  },
  zh: {
    translation: zhTranslation,
  },
  ar: {
    translation: arTranslation,
  },
  tr: {
    translation: trTranslation,
  },
  ko: {
    translation: koTranslation,
  },
  hi: {
    translation: hiTranslation,
  },
  id: {
    translation: idTranslation,
  },
};

const saved =
  typeof window !== 'undefined'
    ? (() => {
        try {
          return localStorage.getItem('selectedLanguage');
        } catch {
          return null;
        }
      })()
    : null;

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  lng: saved || undefined,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// Languages written right-to-left. Used to set the document direction so RTL
// locales (e.g. Arabic) render with correct text flow and alignment.
// Exported so other consumers (e.g. the CV generator) share the same list.
export const RTL_LANGS = ['ar'];

// Sync <html lang> and <html dir> with the active language. Keeping this in one
// place means both the initial load and every in-app language switch stay correct.
const applyDocumentLanguage = (lng: string | undefined) => {
  if (typeof document === 'undefined') return;
  const base = (lng || 'en').toLowerCase().split('-')[0];
  document.documentElement.lang = base;
  document.documentElement.dir = RTL_LANGS.includes(base) ? 'rtl' : 'ltr';
};

// Apply once for the initial language (saved selection or English fallback).
applyDocumentLanguage(saved || 'en');

i18n.on('languageChanged', (lng) => {
  applyDocumentLanguage(lng);
  // persist language selection to localStorage (graceful fallback if unavailable)
  try {
    localStorage.setItem('selectedLanguage', lng);
  } catch {
    /* localStorage may be unavailable in some environments; ignore */
  }
});

export default i18n;
