"use client";
import "../styles/home.style.scss";
import Banner from "../shared/components/banner/banner";
import { movieApi } from "../shared/api/api";
import { useMemo } from "react";
import { IListMovie, IResponse } from "../shared/interfaces";
import { Loading } from "../shared/components/loading/loading";
import { useFetchData } from "../shared/hook/useFetchData";

type Movies = {
    popular: IResponse<IListMovie[]>;
    nowPlaying: IResponse<IListMovie[]>;
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
            }
        ],
        []
    );

    const { data, loading } = useFetchData<Movies>(apiCalls);

    if (loading) {
        return <Loading />;
    }

    return (
        <main>
            <div className="container box">
                <section className="popular-movies">
                    <h2 className="tracking-wider">filmes populares</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        <Banner movies={data?.popular} />
                    </div>
                </section>

                <section className="now-playing-movies">
                    <h2 className="tracking-wider">em cartaz</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        <Banner movies={data?.nowPlaying} />
                    </div>
                </section>
            </div>
        </main>
    );
}
