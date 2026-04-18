import "../../styles/home.style.scss";
import Banner from "../../shared/components/banner/banner";
import { genreApi, movieApi } from "../../shared/api/api";
import { IGenre, IListMovie, IResponse } from "../../shared/interfaces";
import { filterGenres } from "../../shared/utils";
import SkeletonBanner from "@/shared/components/skeletonLoading/skeletonBanner";
import Pagination from "@/shared/components/pagination/pagination";
import { useAppContext } from "@/shared/context/context";
import { Suspense } from "react";
import MovieClient from "./MovieClient";

// Server component for SSR
async function getServerSideData(route: string = "/now_playing", page: number = 1) {
    try {
        const [moviesResponse, genresResponse] = await Promise.all([
            movieApi.listMovie(`${route}?page=${page}`),
            genreApi.findAllGenre("/movie/list")
        ]);

        return {
            movies: moviesResponse,
            genres: genresResponse
        };
    } catch (error) {
        console.error("Error fetching server data:", error);
        return {
            movies: { results: [], total_pages: 0, page: 1, total_results: 0 },
            genres: { genres: [] }
        };
    }
}

export default async function PageMovies() {
    // Fetch initial data on server
    const initialData = await getServerSideData();

    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <MovieClient initialData={initialData} />
            </Suspense>
        </main>
    );
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour
