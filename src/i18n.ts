import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

// Conditionally import browser detector only on client
let LanguageDetector;
if (typeof window !== 'undefined') {
  LanguageDetector = require('i18next-browser-languagedetector').default;
}

i18n
  .use(Backend)
  .use(LanguageDetector || { type: 'languageDetector', init: () => { }, detect: () => 'pt-BR', cacheUserLanguage: () => { } })
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt-BR',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: typeof window !== 'undefined' ? {
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
      lookupCookie: 'next-i18next',
      lookupLocalStorage: 'i18nextLng',
    } : {},

    ns: ['common', 'header', 'movie', 'tvshow', 'cast'],
    defaultNS: 'common',
  });

export default i18n;