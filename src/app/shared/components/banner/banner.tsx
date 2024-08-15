import { formatDate } from "@/app/shared/utils";
import "./banner.style.scss";
import Link from "next/link";
import {
    IGenre,
    IGenresResponse,
    IListMovie,
    IResponse
} from "@/app/shared/interfaces";
import { useMemo } from "react";
import { genreApi } from "../../api/api";
import { useFetchData } from "../../hook/useFetchData";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Banner({
    movies
}: {
    movies: IResponse<IListMovie[]> | undefined;
}) {
    const apiCalls = useMemo(
        () => [
            {
                key: "genres",
                call: () => genreApi.findAllGenre()
            }
        ],
        [movies]
    );

    const { data } = useFetchData<IGenresResponse>(apiCalls);
    const response = data?.genres;

    function filterGenres(genre: string[]) {
        const genreFiltered = response?.genres?.filter((e: IGenre) =>
            genre.includes(e.id)
        );
        return genreFiltered
            ?.map((value: IGenre) => {
                return value.name;
            })
            .join(", ");
    }

    return (
        <>
            {movies?.results?.map((movie, key) => (
                <div className="movie" key={key}>
                    <Link href={`/movie/${movie.id}`}>
                        <LazyLoadImage
                            key={movie.poster_path}
                            src={
                                "https://image.tmdb.org/t/p/w500" +
                                movie?.poster_path
                            }
                            alt="poster filme"
                            effect="blur"
                            wrapperClassName="hover:opacity-75 transition ease-in-out duration-150"
                            placeholderSrc={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                        />
                    </Link>
                    <div className="detail-movie">
                        <Link
                            href={`/movie/${movie.id}`}
                            className="title-movie"
                        >
                            {movie.title}
                        </Link>
                        <div className="specification">
                            <i className="pi pi-star-fill" />
                            <span className="ml-1">
                                {Math.trunc(movie?.vote_average * 10) + "%"}
                            </span>
                            <span className="mx-2">|</span>
                            <span>
                                {
                                    formatDate(new Date(movie?.release_date))
                                        .modelOne
                                }
                            </span>
                        </div>
                        <span className="genre">
                            {filterGenres(movie?.genre_ids)}
                        </span>
                    </div>
                </div>
            ))}
        </>
    );
}
