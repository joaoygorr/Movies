"use client";
import "../styles/home.style.scss";
import Banner from "../shared/components/banner/banner";
import { movieApi } from "../shared/api/api";
import { useEffect, useState } from "react";
import { IListMovie } from "../shared/interfaces";
import { Loading } from "../shared/components/loading/loading";

type Movies = {
    popular: IListMovie[],
    nowPlaying: IListMovie[]
}

export default function HomePage() {
    const [movies, setMovies] = useState<Movies>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const [popularMovie, nowPlaingMovie] = await Promise.all([movieApi.listPopularMovie('popular'), movieApi.listNowPlayingMovie('now_playing')]);
                setMovies({
                    popular: popularMovie.results,
                    nowPlaying: nowPlaingMovie.results
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <main>
            <div className="container box">
                <section className="popular-movies">
                    <h2 className="tracking-wider">filmes populares</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        <Banner movies={movies?.popular} />
                    </div>
                </section>

                <section className="now-playing-movies">
                    <h2 className="tracking-wider">em cartaz</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        <Banner movies={movies?.nowPlaying} />
                    </div>
                </section>
            </div>
        </main>
    )
}