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

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
