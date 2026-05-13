'use client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt-BR',

    supportedLngs: ['pt-BR', 'en-US'],
    load: 'currentOnly',

    debug: false,

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath:
        typeof window === 'undefined'
          ? 'http://localhost:3000/locales/{{lng}}/{{ns}}.json'
          : '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],

      convertDetectedLanguage: (lng: string) => {
        if (lng?.startsWith('pt')) return 'pt-BR';
        if (lng?.startsWith('en')) return 'en-US';
        return 'pt-BR';
      },
    },

    ns: ['common', 'header', 'movie', 'tvshow', 'cast'],
    defaultNS: 'common',
  });

export default i18n;