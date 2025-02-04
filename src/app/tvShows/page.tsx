"use client";
import { useMemo } from "react";
import Banner from "../shared/components/banner/banner";
import { filterGenres } from "../shared/utils";
import { genreApi, tvShows } from "../shared/api/api";
import { IGenre, IResponse, IListTvShows } from "../shared/interfaces";
import { useFetchData } from "../shared/hook/useFetchData";
import "../styles/home.style.scss";

type TvShows = {
    genres: IGenre[];
    popular: IResponse<IListTvShows[]>;
    topRated: IResponse<IListTvShows[]>;
};

export default function PageTvShows() {
    const apiCalls = useMemo(
        () => [
            {
                key: "genres",
                call: () => genreApi.findAllGenre("/tv/list")
            },
            {
                key: "popular",
                call: () => tvShows.listTvShows("/popular")
            },
            {
                key: "topRated",
                call: () => tvShows.listTvShows("/top_rated")
            }
        ],
        []
    );

    const { data } = useFetchData<TvShows>(apiCalls);
    const genreResponse = data?.genres!;

    return (
        <div className="container box">
            <section className="popular">
                <h2 className="tracking-wider">séries de tv populares</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {data?.popular.results.map((tv, key) => (
                        <Banner
                            prop={tv}
                            key={key}
                            genre={filterGenres(tv.genre_ids, genreResponse)}
                        />
                    ))}
                </div>
            </section>

            <section className="now-playing">
                <h2 className="tracking-wider">top séries de tv</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {data?.topRated.results.map((movie, key) => (
                        <Banner
                            prop={movie}
                            key={key}
                            genre={filterGenres(movie.genre_ids, genreResponse)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
