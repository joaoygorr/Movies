"use client";
import { useEffect, useMemo, useState } from "react";
import Banner from "../../shared/components/banner/banner";
import { filterGenres } from "../../shared/utils";
import { genreApi, tvShows } from "../../shared/api/api";
import { IGenre, IResponse, IListTvShows } from "../../shared/interfaces";
import { useFetchData } from "../../shared/hook/useFetchData";
import "../../styles/home.style.scss";
import SkeletonBanner from "@/shared/components/skeletonLoading/skeletonBanner";
import Pagination from "@/shared/components/pagination/pagination";
import { useAppContext } from "@/shared/context/context";

type TvShows = {
    genres: { genres: IGenre[] };
    series: IResponse<IListTvShows[]>;
};

export default function PageTvShows() {
    const [activeButton, setActiveButton] = useState<number>(0);
    const [activeRoute, setActiveRoute] = useState<string>("/airing_today");
    const [items, setItems] = useState<IListTvShows[]>([]);
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState("");
    const { language } = useAppContext();

    const apiCalls = useMemo(
        () => [
            {
                key: "genres",
                call: () => genreApi.findAllGenre("/tv/list")
            },
            {
                key: "series",
                call: () => tvShows.listTvShows(`${activeRoute}?page=${page}`)
            }
        ],
        [activeRoute, page, language]
    );

    const { data, loading } = useFetchData<TvShows>(apiCalls);

    useEffect(() => {
        if (!data?.series) return;
        setItems(data?.series.results.slice(0, 10));
    }, [data]);

    const genreResponse = data?.genres!;

    const filteredData =
        search?.length > 0
            ? items.filter((serie) =>
                  serie.name.toLowerCase().includes(search.toLowerCase())
              )
            : items;

    const buttons = [
        {
            title: language === "en-US" ? "Airing Today" : "No Ar Hoje",
            route: "/airing_today"
        },
        {
            title: language === "en-US" ? "Popular" : "Populares",
            route: "/popular"
        },
        {
            title: language === "en-US" ? "Top Rated" : "Melhores Avaliados",
            route: "/top_rated"
        }
    ];

    const handleSetValue = (index: number, route: string) => {
        setActiveRoute(route);
        setActiveButton(index);
    };

    const handleSetItems = (e: number) => {
        if (!data?.series) return;
        setItems(data?.series.results.slice(0, e));
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
                <div className="box-search">
                    <input
                        type="search"
                        placeholder={
                            language === "en-US" ? "Search..." : "Pesquisar..."
                        }
                        className="focus:outline-none focus:shadow-outline"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {loading &&
                        Array(10)
                            .fill(0)
                            .map((_, e) => <SkeletonBanner key={e} />)}

                    {filteredData.map((tv, key) => (
                        <Banner
                            prop={tv}
                            key={key}
                            genre={filterGenres(tv.genre_ids, genreResponse)}
                        />
                    ))}
                </div>
            </section>

            <Pagination
                onSet={handleSetItems}
                totalItemShow={items.length}
                dataPage={data?.series}
                onPageChange={(value) => setPage(value)}
            />
        </div>
    );
}
