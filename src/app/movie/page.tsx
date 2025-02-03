"use client";
import "../styles/home.style.scss";
import Banner from "../shared/components/banner/banner";
import { genreApi, movieApi } from "../shared/api/api";
import { useMemo } from "react";
import {
    IGenre,
    IGenresResponse,
    IListMovie,
    IResponse
} from "../shared/interfaces";
import { Loading } from "../shared/components/loading/loading";
import { useFetchData } from "../shared/hook/useFetchData";

type Movies = {
    popular: IResponse<IListMovie[]>;
    nowPlaying: IResponse<IListMovie[]>;
    genres: IGenresResponse;
};

export default function HomePage() {
    const apiCalls = useMemo(
        () => [
            {
                key: "popular",
                call: () => movieApi.listMovie("popular")
            },
            {
                key: "nowPlaying",
                call: () => movieApi.listMovie("now_playing")
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

    function filterGenres(genre: string[]) {
        const genreFiltered = genresResponse.genres?.filter((e: IGenre) =>
            genre?.includes(e.id)
        );
        return genreFiltered
            ?.map((value: IGenre) => {
                return value.name;
            })
            .join(", ");
    }

    return (
        <main>
            <div className="container box">
                <section className="popular-movies">
                    <h2 className="tracking-wider">filmes populares</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {data?.popular.results.map((movie, key) => (
                            <Banner
                                prop={movie}
                                key={key}
                                genre={filterGenres(movie.genre_ids)}
                            />
                        ))}
                    </div>
                </section>

                <section className="now-playing-movies">
                    <h2 className="tracking-wider">em cartaz</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {data?.nowPlaying.results.map((movie, key) => (
                            <Banner
                                prop={movie}
                                key={key}
                                genre={filterGenres(movie.genre_ids)}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
