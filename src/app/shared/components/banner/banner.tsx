import { formatDate } from "@/app/shared/utils";
import "./banner.style.scss";
import Link from "next/link";
import { IListMovie} from "@/app/shared/interfaces";

export default function Banner({ movies }: { movies: IListMovie[] | undefined }) {

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
                        <span className="genre">teste, teste, teste</span>
                    </div>
                </div>
            ))}
        </>
    )
};