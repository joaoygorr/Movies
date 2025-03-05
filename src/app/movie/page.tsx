"use client";
import "../../styles/home.style.scss";
import Banner from "../../shared/components/banner/banner";
import { genreApi, movieApi } from "../../shared/api/api";
import { useMemo, useState } from "react";
import { IGenre, IListMovie, IResponse } from "../../shared/interfaces";
import { useFetchData } from "../../shared/hook/useFetchData";
import { filterGenres } from "../../shared/utils";
import { SkeletonMain } from "../../shared/components/skeletonLoading";

type Movies = {
    movies: IResponse<IListMovie[]>;
    genres: { genres: IGenre[] };
};

export default function PageMovies() {
    const [activeButton, setActiveButton] = useState<number>(0);
    const [activeRoute, setActiveRoute] = useState<string>("now_playing");

    const apiCalls = useMemo(
        () => [
            {
                key: "movies",
                call: () => movieApi.listMovie(activeRoute)
            },
            {
                key: "genres",
                call: () => genreApi.findAllGenre("/movie/list")
            }
        ],
        [activeRoute]
    );

    const { data, loading } = useFetchData<Movies>(apiCalls);
    if (loading) {
        return <SkeletonMain />;
    }

    const genresResponse = data?.genres!;

    const buttons = [
        { title: "Em Cartaz", route: "now_playing" },
        { title: "Populares", route: "popular" },
        { title: "Melhores Avaliados", route: "top_rated" },
        { title: "Em breve", route: "upcoming" }
    ];

    const handleSetValue = (index: number, route: string) => {
        setActiveRoute(route);
        setActiveButton(index);
    };

    return (
        <main>
            <div className="container box">
                <section className="movies-list">
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
                        {data?.movies.results.map((movie, key) => (
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
            </div>
        </main>
    );
}
