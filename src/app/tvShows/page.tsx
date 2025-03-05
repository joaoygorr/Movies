"use client";
import { useMemo, useState } from "react";
import Banner from "../../shared/components/banner/banner";
import { filterGenres } from "../../shared/utils";
import { genreApi, tvShows } from "../../shared/api/api";
import { IGenre, IResponse, IListTvShows } from "../../shared/interfaces";
import { useFetchData } from "../../shared/hook/useFetchData";
import "../../styles/home.style.scss";
import SkeletonBanner from "@/shared/components/skeletonLoading/skeletonBanner";

type TvShows = {
    genres: { genres: IGenre[] };
    series: IResponse<IListTvShows[]>;
};

export default function PageTvShows() {
    const [activeButton, setActiveButton] = useState<number>(0);
    const [activeRoute, setActiveRoute] = useState<string>("/airing_today");

    const apiCalls = useMemo(
        () => [
            {
                key: "genres",
                call: () => genreApi.findAllGenre("/tv/list")
            },
            {
                key: "series",
                call: () => tvShows.listTvShows(activeRoute)
            }
        ],
        [activeRoute]
    );

    const { data, loading } = useFetchData<TvShows>(apiCalls);

    const genreResponse = data?.genres!;

    const buttons = [
        { title: "No Ar Hoje", route: "/airing_today" },
        { title: "Populares", route: "/popular" },
        { title: "Melhores Avaliados", route: "/top_rated" }
    ];

    const handleSetValue = (index: number, route: string) => {
        setActiveRoute(route);
        setActiveButton(index);
    };

    return (
        <div className="container box">
            <section className="content-list">
                <div className="box-select">
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            className={`${
                                activeButton === index ? "active" : ""
                            }`}
                            onClick={() => handleSetValue(index, button.route)}
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

                    {data?.series.results.map((tv, key) => (
                        <Banner
                            prop={tv}
                            key={key}
                            genre={filterGenres(tv.genre_ids, genreResponse)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
