"use client";
import "../../styles/home.style.scss";
import Banner from "../../shared/components/banner/banner";
import { genreApi, movieApi } from "../../shared/api/api";
import { useEffect, useMemo, useState } from "react";
import { IGenre, IListMovie, IResponse } from "../../shared/interfaces";
import { useFetchData } from "../../shared/hook/useFetchData";
import { filterGenres } from "../../shared/utils";
import SkeletonBanner from "@/shared/components/skeletonLoading/skeletonBanner";
import Pagination from "@/shared/components/pagination/pagination";

type Movies = {
    movies: IResponse<IListMovie[]>;
    genres: { genres: IGenre[] };
};

export default function PageMovies() {
    const [activeButton, setActiveButton] = useState<number>(0);
    const [activeRoute, setActiveRoute] = useState<string>("/now_playing");
    const [items, setItems] = useState<IListMovie[]>([]);
    const [page, setPage] = useState<number>(1);

    const apiCalls = useMemo(
        () => [
            {
                key: "movies",
                call: () => movieApi.listMovie(`${activeRoute}?page=${page}`)
            },
            {
                key: "genres",
                call: () => genreApi.findAllGenre("/movie/list")
            }
        ],
        [activeRoute, page]
    );

    const { data, loading } = useFetchData<Movies>(apiCalls);

    const genresResponse = data?.genres!;

    const buttons = [
        { title: "Em Cartaz", route: "/now_playing" },
        { title: "Populares", route: "/popular" },
        { title: "Melhores Avaliados", route: "/top_rated" },
        { title: "Em breve", route: "/upcoming" }
    ];

    const handleSetValue = (index: number, route: string) => {
        setActiveRoute(route);
        setActiveButton(index);
    };

    useEffect(() => {
        if (!data?.movies) return;
        setItems(data?.movies.results.slice(0, 10));
    }, [data]);

    const handleSetItems = (e: number) => {
        if (!data?.movies) return;
        setItems(data?.movies.results.slice(0, e));
    };

    return (
        <main>
            <div className="container box">
                <section className="content-list">
                    <div className="box-select">
                        {buttons.map((button, index) => (
                            <button
                                key={index}
                                className={`${
                                    activeButton === index ? "active" : ""
                                }`}
                                onClick={() =>
                                    handleSetValue(index, button.route)
                                }
                            >
                                {button.title}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {loading &&
                            Array(10)
                                .fill(0)
                                .map((_, e) => <SkeletonBanner key={e} />)}

                        {items.map((movie, key) => (
                            <Banner
                                prop={movie}
                                key={key}
                                genre={filterGenres(
                                    movie.genre_ids,
                                    genresResponse
                                )}
                            />
                        ))}
                    </div>
                </section>

                <Pagination
                    onSet={handleSetItems}
                    totalItemShow={items.length}
                    dataPage={data?.movies}
                    onPageChange={(value) => setPage(value)}
                />
            </div>
        </main>
    );
}
