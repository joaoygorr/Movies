"use client";
import Link from "next/link";
import "./header.style.scss";
import { useAppContext } from "@/context/context";
import { memo } from "react";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import i18n from "@/lib/i18n";

export const Header = memo(() => {
    const { language, handleSetLanguage } = useAppContext();
    const { t } = useTranslation('header');

    const handleToggle = () => {
        const newLanguage = language === "en-US" ? "pt-BR" : "en-US";
        handleSetLanguage(newLanguage);
    };

    if (!i18n.isInitialized) {
        return null;
    }

    return (
        <header>
            <nav className="border-b border-gray-800" aria-label="Navegação principal">
                <div className="container box-nav">
                    <div className="nav-left">
                        <Link href={"/movie"} className="logo">
                            <i className="pi pi-video" />
                            <span>CineScope</span>
                        </Link>
                        <Link href={"/movie"} className="nav-link hover:text-gray-300">
                            {t('movies')}
                        </Link>
                        <Link href={"/tv-shows"} className="nav-link hover:text-gray-300">
                            {t('tvShows')}
                        </Link>
                    </div>

                    <button
                        className="language-toggle"
                        onClick={handleToggle}
                        aria-label="Trocar idioma"
                        type="button"
                    >
                        <Image
                            src={`https://flagsapi.com/${language === "en-US" ? "US" : "BR"}/flat/24.png`}
                            alt="Language flag"
                            width={24}
                            height={24}
                            priority
                        />
                        <span className="language-label">
                            {language === "en-US" ? "EN" : "PT"}
                        </span>
                    </button>
                </div>
            </nav>
        </header>
    );
});
