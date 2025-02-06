"use client";
import "../styles/home.style.scss";
import Banner from "../shared/components/banner/banner";
import { genreApi, movieApi } from "../shared/api/api";
import { useMemo } from "react";
import { IGenre, IListMovie, IResponse } from "../shared/interfaces";
import { Loading } from "../shared/components/loading/loading";
import { useFetchData } from "../shared/hook/useFetchData";
import { filterGenres } from "../shared/utils";

type Movies = {
    popular: IResponse<IListMovie[]>;
    nowPlaying: IResponse<IListMovie[]>;
    genres: { genres: IGenre[] };
};

export default function PageMovies() {
    const apiCalls = useMemo(
        () => [
            {
                key: "popular",
                call: () => movieApi.listMovie("popular")
            },
            {
                key: "nowPlaying",
                call: () => movieApi.listMovie("top_rated")
            },
            {
                key: "genres",
                call: () => genreApi.findAllGenre("/movie/list")
            }
        ],
        []
    );

    const { data, loading } = useFetchData<Movies>(apiCalls);
    if (loading) {
        return <Loading />;
    }

    const genresResponse = data?.genres!;

    return (
        <main>
            <div className="container box">
                <section className="popular">
                    <h2 className="tracking-wider">filmes populares</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {data?.popular.results.map((movie, key) => (
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

                <section className="now-playing">
                    <h2 className="tracking-wider">
                        top filmes - mais bem avaliados
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {data?.nowPlaying.results.map((movie, key) => (
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
