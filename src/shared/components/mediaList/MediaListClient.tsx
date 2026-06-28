"use client";
import { useEffect, useMemo, useState } from "react";
import { IGenre, IListMovie, IListTvShows, IResponse } from "../../interfaces";
import { useFetchData } from "../../hooks/useFetchData";
import { filterGenres } from "../../utils";
import SkeletonBanner from "@/shared/components/skeletonLoading/skeletonBanner";
import Pagination from "@/shared/components/pagination/pagination";
import { useAppContext } from "@/shared/context/context";
import Banner from "../../components/banner/banner";
import "../../../styles/home.style.scss";

type MediaItem = IListMovie | IListTvShows;

type ButtonConfig = {
    title: string;
    route: string;
};

type RequestOptions = {
    signal?: AbortSignal;
    language?: string;
};

type ApiCallConfig = {
    mediaCall: (route: string, page: number, options?: RequestOptions) => Promise<IResponse<MediaItem[]>>;
    genreCall: (options?: RequestOptions) => Promise<{ genres: IGenre[] }>;
};

type MediaListData = {
    media: IResponse<MediaItem[]>;
    genres: { genres: IGenre[] };
};

type MediaListClientProps = {
    initialData: {
        media: IResponse<MediaItem[]>;
        genres: { genres: IGenre[] };
    };
    buttons: ButtonConfig[];
    defaultRoute: string;
    searchPlaceholder: string;
    apiConfig: ApiCallConfig;
    getTitle: (item: MediaItem) => string;
};

export default function MediaListClient({
    initialData,
    buttons,
    defaultRoute,
    searchPlaceholder,
    apiConfig,
    getTitle
}: MediaListClientProps) {
    const [activeButton, setActiveButton] = useState<number>(0);
    const [activeRoute, setActiveRoute] = useState<string>(defaultRoute);
    const [items, setItems] = useState<MediaItem[]>(initialData.media.results.slice(0, 10));
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState("");
    const { language } = useAppContext();

    const apiCalls = useMemo(
        () => [
            {
                key: "media",
                call: (signal?: AbortSignal) => apiConfig.mediaCall(activeRoute, page, { signal, language })
            },
            {
                key: "genres",
                call: (signal?: AbortSignal) => apiConfig.genreCall({ signal, language })
            }
        ],
        [activeRoute, page, language, apiConfig]
    );

    const { data, loading } = useFetchData<MediaListData>(apiCalls);

    const genresResponse = data?.genres || initialData.genres;

    const filteredData =
        search?.length > 0
            ? items.filter((item) =>
                getTitle(item).toLowerCase().includes(search.toLowerCase())
            )
            : items;

    const handleSetValue = (index: number, route: string) => {
        setActiveRoute(route);
        setActiveButton(index);
        setPage(1);
    };

    useEffect(() => {
        if (!data?.media) return;
        setItems(data.media.results.slice(0, 10));
    }, [data]);

    const handleSetItems = (e: number) => {
        if (!data?.media && !initialData.media) return;
        const currentData = data?.media || initialData.media;
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
                        placeholder={searchPlaceholder}
                        className="focus:outline-none focus:shadow-outline"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {loading &&
                        Array(10)
                            .fill(0)
                            .map((_, e) => <SkeletonBanner key={e} />)}

                    {filteredData.map((item, key) => (
                        <Banner
                            prop={item}
                            key={key}
                            genre={filterGenres(
                                item.genre_ids,
                                genresResponse
                            )}
                        />
                    ))}
                </div>
            </section>

            <Pagination
                onSet={handleSetItems}
                totalItemShow={items.length}
                dataPage={data?.media || initialData.media}
                onPageChange={(value) => setPage(value)}
            />
        </div>
    );
}
