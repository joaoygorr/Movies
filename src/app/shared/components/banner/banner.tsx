import { formatDate } from "@/app/shared/utils";
import "./banner.style.scss";
import Link from "next/link";
import { IGenre, IGenreList, IListMovie } from "@/app/shared/interfaces";
import { useEffect, useState } from "react";
import { genreApi } from "../../api/api";

export default function Banner({ movies }: { movies: IListMovie[] | undefined }) {
    const [data, setData] = useState<IGenreList<IGenre>>();
    const [genreIds, setGenreIds] = useState<number[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await genreApi.findAllGenre();
                setData(data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [movies]);

    function filterGenres(genre: string[]) {
        const genreFiltered = data?.genres.filter(e => genre.includes(e.id));

        return genreFiltered?.map(value => { return value.name }).join(', ');
    }

    return (
        <>
            {movies?.map((movie, key) => (
                <div className="movie" key={key}>
                    <Link href={`/movie/${movie.id}`}>
                        <img src={"https://image.tmdb.org/t/p/w500" + movie?.poster_path} alt="poster filme" className="hover:opacity-75 transition ease-in-out duration-150" />
                    </Link>
                    <div className="detail-movie">
                        <Link href={`/movie/${movie.id}`} className="title-movie">{movie.title}</Link>
                        <div className="specification">
                            <i className="pi pi-star-fill" />
                            <span className="ml-1">{Math.trunc(movie?.vote_average * 10) + "%"}</span>
                            <span className="mx-2">|</span>
                            <span>{formatDate(new Date(movie?.release_date)).modelOne}</span>
                        </div>
                        <span className="genre">{filterGenres(movie?.genre_ids)}</span>
                    </div>
                </div>
            ))}
        </>
    )
};