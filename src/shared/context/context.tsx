"use client";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react";
import { castApi, genreApi, imageApi, movieApi, tvShows } from "../api/api";

type Props = {
    language: string;
    handleSetLanguage: (value: string) => void;
};

const AppContext = createContext<Props>({} as Props);

export function AppProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<string>("pt-BR");

    useEffect(() => {
        const savedLanguage = sessionStorage.getItem("language");

        if (!savedLanguage) {
            sessionStorage.setItem("language", "pt-BR");
        }
    }, []);

    const handleSetLanguage = (value: string) => {
        sessionStorage.setItem("language", value);
        setLanguage(value);
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

export function useAppContext(): Props {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error(
            "useAppContext deve ser usado dentro de um AppProvider"
        );
    }

    return context;
}
