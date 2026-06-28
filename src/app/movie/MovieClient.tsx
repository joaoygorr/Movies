"use client";
import { useMemo } from "react";
import { IGenre, IListMovie, IResponse } from "@/types";
import { movieApi, genreApi } from "@/lib/api";
import { useTranslation } from "@/hooks/useTranslation";
import MediaListClient from "@/components/mediaList/MediaListClient";

type Movies = {
    movies: IResponse<IListMovie[]>;
    genres: { genres: IGenre[] };
};

type MovieClientProps = {
    initialData: Movies;
};

export default function MovieClient({ initialData }: MovieClientProps) {
    const { t } = useTranslation('movie');

    const buttons = useMemo(() => [
        { title: t('nowPlaying'), route: "/now_playing" },
        { title: t('popular'), route: "/popular" },
        { title: t('topRated'), route: "/top_rated" },
        { title: t('upcoming'), route: "/upcoming" }
    ], [t]);

    const apiConfig = useMemo(() => ({
        mediaCall: (route: string, page: number, options?: { signal?: AbortSignal; language?: string }) =>
            movieApi.listMovie(`${route}?page=${page}`, options),
        genreCall: (options?: { signal?: AbortSignal; language?: string }) =>
            genreApi.findAllGenre("/movie/list", options)
    }), []);

    return (
        <MediaListClient
            initialData={{
                media: initialData.movies,
                genres: initialData.genres
            }}
            buttons={buttons}
            defaultRoute="/now_playing"
            searchPlaceholder={t('searchMovies')}
            apiConfig={apiConfig}
            getTitle={(item) => (item as IListMovie).title}
        />
    );
}
