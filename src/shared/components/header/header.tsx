import Link from "next/link";
import "./header.style.scss";

export const Header = () => {
    return (
        <header>
            <nav className="border-b border-gray-800">
                <div className="container flex flex-col md:flex-row box-nav">
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

                    <div className="flex flex-col md:flex-row box-search">
                        <div className="relative mt-3 md:mt-0">
                            <input
                                type="search"
                                placeholder="Pesquisar..."
                                className="focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
