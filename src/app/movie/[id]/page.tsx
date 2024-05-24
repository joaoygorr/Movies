"use client";
import { IGenre, IParams } from "@/app/shared/interfaces";
import { useFilm } from "./hook/useFilm";
import { formatDate, returnHours } from "@/app/shared/utils";
import "./movie.style.scss";
import { Loading } from "@/app/shared/components/loading/loading";
import { Modal } from "@/app/shared/components/modal/modal";
import { useState } from "react";
import { Cast } from "@/app/shared/components/cast/cast";

export default function MovieDetails(movie: IParams) {
    const { data, loading } = useFilm(movie.params.id);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const formatGenres = (genres: IGenre[]) => {
        return genres?.map((genre) => {
            return genre.name
        }).join(' - ');
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
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

                        <div className="box-button">
                            <div>
                                <button type="button" onClick={() => setIsVisible(true)} className="flex inline-flex items-center bg-orange-500 text-gray-900 rounded font-semibold px-5 py-4 hover:bg-orange-600 transition ease-in-out duration-150">
                                    <i className="pi pi-caret-right"></i>
                                    <span className="ml-2">Play Trailer</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {isVisible && (<Modal video={data?.video!} hidden={setIsVisible} />)}
            </div>
            <Cast />
        </div>
    )
}