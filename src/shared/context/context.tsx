"use client";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react";
import { castApi, genreApi, imageApi, movieApi, tvShows } from "../api/api";
import { useTranslation } from '../hooks/useTranslation';
import i18n from '../../i18n';

type Props = {
    language: string;
    handleSetLanguage: (value: string) => void;
};

const AppContext = createContext<Props>({} as Props);

export function AppProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<string>("pt-BR");
    const [isI18nReady, setIsI18nReady] = useState(false);

    useEffect(() => {
        // Wait for i18n to be ready
        const checkI18nReady = () => {
            if (i18n.isInitialized) {
                const savedLanguage = sessionStorage.getItem("language") || i18n.language || "pt-BR";
                setLanguage(savedLanguage);
                setIsI18nReady(true);
            } else {
                // Retry after a short delay
                setTimeout(checkI18nReady, 50);
            }
        };

        checkI18nReady();
    }, []);

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

    // Don't render children until i18n is ready to prevent hydration mismatches
    if (!isI18nReady) {
        return null;
    }

    return (
        <AppContext.Provider value={{ language, handleSetLanguage }}>
            {children}
        </AppContext.Provider>
    );

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
