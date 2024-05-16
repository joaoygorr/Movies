"use client";
import { IGenre, IParams } from "@/app/shared/interfaces";
import { useFilm } from "./hook/useFilm";
import { formatDate, returnHours } from "@/app/shared/utils";
import "./movie.style.scss";

export default function MovieDetails(movie: IParams) {
    const data = useFilm(movie.params.id);

    const formatGenres = (genres: IGenre[]) => {
        return genres?.map((genre) => {
            return genre.name
        }).join(' - ');
    };


    return (
        <div className="movie-info">
            <div className="container movie-box flex flex-col md:flex-row">
                <div className="flex-none movie-image">
                    <img src={"https://image.tmdb.org/t/p/w500" + data?.details?.poster_path} alt="poster" className="lg:w-96" />
                </div>

                <div className="md:ml-24 details">
                    <h2 className="md:mt-0">{data?.details?.title}</h2>
                    <div className="detail-genre-date">
                        <i className="pi pi-star-fill" />
                        <span className="ml-1">{Math.trunc(data?.details?.vote_average! * 10) + "%"}</span>
                        <span className="mx-2">|</span>
                        <span>{formatDate(new Date(data?.details?.release_date!)).modelOne}</span>
                        <span className="mx-2">|</span>
                        <span>{returnHours(data?.details?.runtime!)}</span>
                        <span className="mx-2">|</span>
                        <span>{formatGenres(data?.details?.genres!)}</span>
                    </div>
                    {data?.details?.tagline && (
                        <span className="text-gray-400 mt-8">{data?.details?.tagline}</span>
                    )}
                    <p>{data?.details?.overview}</p>
                    <div className="popular">
                        <h4>Elenco Popular</h4>
                        <div className="crew">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}