"use client";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react";
import { castApi, genreApi, imageApi, movieApi, tvShows } from "../api/api";
import { useTranslation } from 'next-i18next';

type Props = {
    language: string;
    handleSetLanguage: (value: string) => void;
};

const AppContext = createContext<Props>({} as Props);

export function AppProvider({ children }: { children: ReactNode }) {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState<string>("pt-BR");

    useEffect(() => {
        // Initialize language from i18n or sessionStorage
        const savedLanguage = sessionStorage.getItem("language") || i18n.language || "pt-BR";
        setLanguage(savedLanguage);
        i18n.changeLanguage(savedLanguage);
    }, [i18n]);

    const handleSetLanguage = (value: string) => {
        sessionStorage.setItem("language", value);
        setLanguage(value);
        i18n.changeLanguage(value);

        // Update API instances with new language
        movieApi.setLanguage(value);
        genreApi.setLanguage(value);
        castApi.setLanguage(value);
        imageApi.setLanguage(value);
        tvShows.setLanguage(value);
    };

    return (
        <AppContext.Provider value={{ language, handleSetLanguage }}>
            {children}
        </AppContext.Provider>
    );
}

return (
    <AppContext.Provider value={{ language, handleSetLanguage }}>
        {children}
    </AppContext.Provider>
);
}

export function useAppContext(): Props {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error(
            "useAppContext deve ser usado dentro de um AppProvider"
        );
    }

    return context;
}
