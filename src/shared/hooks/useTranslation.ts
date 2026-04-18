import { useTranslation as useNextTranslation } from 'next-i18next';

export const useTranslation = (ns?: string) => {
    return useNextTranslation(ns);
};