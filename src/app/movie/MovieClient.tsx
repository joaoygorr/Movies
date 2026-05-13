"use client";
import { useEffect, useMemo, useState } from "react";
import { IGenre, IListMovie, IResponse } from "../../shared/interfaces";
import { useFetchData } from "../../shared/hook/useFetchData";
import { filterGenres } from "../../shared/utils";
import SkeletonBanner from "@/shared/components/skeletonLoading/skeletonBanner";
import Pagination from "@/shared/components/pagination/pagination";
import { useAppContext } from "@/shared/context/context";
import Banner from "../../shared/components/banner/banner";
import { movieApi, genreApi } from "../../shared/api/api";
import { useTranslation } from "@/shared/hooks/useTranslation";

type Movies = {
    movies: IResponse<IListMovie[]>;
    genres: { genres: IGenre[] };
};

type MovieClientProps = {
    initialData: Movies;
};

export default function MovieClient({ initialData }: MovieClientProps) {
    const [activeButton, setActiveButton] = useState<number>(0);
    const [activeRoute, setActiveRoute] = useState<string>("/now_playing");
    const [items, setItems] = useState<IListMovie[]>(initialData.movies.results.slice(0, 10));
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState("");
    const { language } = useAppContext();
    const { t } = useTranslation('movie');

    const apiCalls = useMemo(
        () => [
            {
                key: "movies",
                call: (signal?: AbortSignal) => movieApi.listMovie(`${activeRoute}?page=${page}`, signal)
            },
            {
                key: "genres",
                call: (signal?: AbortSignal) => genreApi.findAllGenre("/movie/list", signal)
            }
        ],
        [activeRoute, page, language]
    );

    const { data, loading } = useFetchData<Movies>(apiCalls);

    const genresResponse = data?.genres || initialData.genres;

    const filteredData =
        search?.length > 0
            ? items.filter((movie) =>
                movie.title.toLowerCase().includes(search.toLowerCase())
            )
            : items;

    const buttons = [
        {
            title: t('nowPlaying'),
            route: "/now_playing"
        },
        {
            title: t('popular'),
            route: "/popular"
        },
        {
            title: t('topRated'),
            route: "/top_rated"
        },
        {
            title: t('upcoming'),
            route: "/upcoming"
        }
    ];

    const handleSetValue = (index: number, route: string) => {
        setActiveRoute(route);
        setActiveButton(index);
        setPage(1);
    };

    useEffect(() => {
        if (!data?.movies) return;
        setItems(data.movies.results.slice(0, 10));
    }, [data]);

    const handleSetItems = (e: number) => {
        if (!data?.movies && !initialData.movies) return;
        const currentData = data?.movies || initialData.movies;
        setItems(currentData.results.slice(0, e));
    };

    return (
        <div className="container box">
            <section className="content-list">
                <div className="box-select">
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            className={`${activeButton === index ? "active" : ""}`}
                            onClick={() => handleSetValue(index, button.route)}
                        >
                            {button.title}
                        </button>
                    ))}
                </div>
                <div className="box-search">
                    <input
                        type="search"
                        placeholder={t('searchMovies')}
                        className="focus:outline-none focus:shadow-outline"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {loading &&
                        Array(10)
                            .fill(0)
                            .map((_, e) => <SkeletonBanner key={e} />)}

                    {filteredData.map((movie, key) => (
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
                dataPage={data?.movies || initialData.movies}
                onPageChange={(value) => setPage(value)}
            />
        </div>
    );
}