import { useTranslation as useReactTranslation } from 'react-i18next';

export const useTranslation = (ns?: string) => {
    return useReactTranslation(ns);
};