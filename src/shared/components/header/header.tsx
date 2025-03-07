"use client";
import Link from "next/link";
import "./header.style.scss";
import { useAppContext } from "@/shared/context/context";

export const Header = () => {
    const { language, handleSetLanguage } = useAppContext();
    const handleToggle = () => {
        const newLanguage = language === "en-US" ? "pt-BR" : "en-US";

        handleSetLanguage(newLanguage);
    };

    return (
        <header>
            <nav className="border-b border-gray-800">
                <div className="container flex flex-col md:flex-row box-nav gap-3">
                    <ul className="flex flex-col md:flex-row">
                        <li className="md:ml-6 md:mt-0 mt-3 logo">
                            <Link href={"/"}>
                                <i className="pi pi-video" />
                                <span className="hover:text-gray-300">
                                    The Movie
                                </span>
                            </Link>
                        </li>
                        <li className="md:ml-6 md:mt-0 mt-3">
                            <Link href={"/"} className="hover:text-gray-300">
                                Filmes
                            </Link>
                        </li>
                        <li className="md:ml-6 md:mt-0 mt-3">
                            <Link
                                href={"/tvShows"}
                                className="hover:text-gray-300"
                            >
                                TV Shows
                            </Link>
                        </li>
                    </ul>

                    <div className="language">
                        <div
                            className="selected-languages"
                            onClick={handleToggle}
                        >
                            <img
                                src={`https://flagsapi.com/${
                                    language === "en-US" ? "US" : "BR"
                                }/flat/32.png`}
                            />
                            <span className="hover:text-gray-300">
                                {language === "en-US" ? "English" : "Português"}
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
