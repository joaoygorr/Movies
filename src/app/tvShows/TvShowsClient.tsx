"use client";
import { useMemo } from "react";
import { IGenre, IResponse, IListTvShows } from "../../shared/interfaces";
import { genreApi, tvShowsApi } from "../../shared/api/api";
import { useTranslation } from "@/shared/hooks/useTranslation";
import MediaListClient from "@/shared/components/mediaList/MediaListClient";

type TvShows = {
    genres: { genres: IGenre[] };
    series: IResponse<IListTvShows[]>;
};

type TvShowsClientProps = {
    initialData: TvShows;
};

export default function TvShowsClient({ initialData }: TvShowsClientProps) {
    const { t } = useTranslation('tvshow');

    const buttons = useMemo(() => [
        { title: t('airingToday'), route: "/airing_today" },
        { title: t('popular'), route: "/popular" },
        { title: t('topRated'), route: "/top_rated" }
    ], [t]);

    const apiConfig = useMemo(() => ({
        mediaCall: (route: string, page: number, options?: { signal?: AbortSignal; language?: string }) =>
            tvShowsApi.listTvShows(`${route}?page=${page}`, options),
        genreCall: (options?: { signal?: AbortSignal; language?: string }) =>
            genreApi.findAllGenre("/tv/list", options)
    }), []);

    return (
        <MediaListClient
            initialData={{
                media: initialData.series,
                genres: initialData.genres
            }}
            buttons={buttons}
            defaultRoute="/airing_today"
            searchPlaceholder={t('searchTvShows')}
            apiConfig={apiConfig}
            getTitle={(item) => (item as IListTvShows).name}
        />
    );
}
