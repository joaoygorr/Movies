import { Suspense } from "react";
import TvShowsClient from "./TvShowsClient";
import { genreApi, tvShows } from "../../shared/api/api";
import { IGenre, IResponse, IListTvShows } from "../../shared/interfaces";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Server component for SSR
async function getServerSideData(route: string = "/airing_today", page: number = 1) {
    try {
        const [genresResponse, seriesResponse] = await Promise.all([
            genreApi.findAllGenre("/tv/list"),
            tvShows.listTvShows(`${route}?page=${page}`)
        ]);

        return {
            genres: genresResponse,
            series: seriesResponse
        };
    } catch (error) {
        console.error("Error fetching server data:", error);
        return {
            genres: { genres: [] },
            series: { results: [], total_pages: 0, page: 1, total_results: 0 }
        };
    }
}

export default async function PageTvShows() {
    // Fetch initial data on server
    const initialData = await getServerSideData();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TvShowsClient initialData={initialData} />
        </Suspense>
    );
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour
