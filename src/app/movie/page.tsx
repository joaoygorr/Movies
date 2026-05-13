import "../../styles/home.style.scss";
import { genreApi, movieApi } from "../../shared/api/api";
import { Suspense } from "react";
import MovieClient from "./MovieClient";

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
    const initialData = await getServerSideData();

    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <MovieClient initialData={initialData} />
            </Suspense>
        </main>
    );
}

export const revalidate = 3600;
export const dynamic = 'force-dynamic';