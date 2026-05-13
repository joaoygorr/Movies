import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'pt-BR',
    fallbackLng: 'pt-BR',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: typeof window !== 'undefined'
        ? `${window.location.origin}/locales/{{lng}}/{{ns}}.json`
        : '/locales/{{lng}}/{{ns}}.json',
    },

    supportedLngs: ['pt-BR', 'en-US', 'cimode'],
    nonExplicitSupportedLngs: false,

    detection: {
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
      lookupCookie: 'next-i18next',
      lookupLocalStorage: 'i18nextLng',
      convertDetectedLanguage: (lng) => {
        if (lng.startsWith('pt')) return 'pt-BR';
        if (lng.startsWith('en')) return 'en-US';
        return lng;
      },
    },

    ns: ['common', 'header', 'movie', 'tvshow', 'cast'],
    defaultNS: 'common',
  });

export default i18n;