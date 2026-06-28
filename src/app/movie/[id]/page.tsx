"use client";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { formatDate, formatGenres, returnHours } from "@/utils";
import "./movie.style.scss";
import { Layout } from "@/components/layoutComponent";
import { movieApi } from "@/lib/api";
import Image from "next/image";
import MovieDetailsClient from "./MovieDetailsClient";
import { SliderActors } from "@/components/sliderActors/sliderActors";
import { ImageMovie } from "@/components/imageMovie/imageMovie";
import { useFetchData } from "@/hooks/useFetchData";
import { useAppContext } from "@/context/context";
import { IMovie } from "@/types";
import { SkeletonDetails } from "@/components/skeletonLoading";

export default function MovieDetails() {
    const { id } = useParams<{ id: string }>();
    const { language } = useAppContext();

    const apiCalls = useMemo(
        () => [
            {
                key: "details",
                call: (signal?: AbortSignal) =>
                    movieApi.findByMovie(
                        `${id}?append_to_response=credits,videos`,
                        { signal, language }
                    )
            }
        ],
        [id, language]
    );

    const { data, loading } = useFetchData<{ details: IMovie }>(apiCalls);
    const details = data?.details;

    if (loading || !details) {
        return <SkeletonDetails />;
    }

    return (
        <div>
            <Layout.Root>
                <div className="flex-none image-movie">
                    {details.poster_path && (
                        <Image
                            src={
                                "https://image.tmdb.org/t/p/w500" +
                                details.poster_path
                            }
                            alt={`Pôster de ${details.title}`}
                            width={384}
                            height={576}
                            className="w-64 lg:w-96"
                            priority
                        />
                    )}
                </div>

                <Layout.Details>
                    <h2 className="title md:mt-0">{details.title}</h2>

                    <div className="detail-genre-date">
                        <i className="pi pi-star-fill" />
                        <span className="ml-1">
                            {Math.trunc(details.vote_average * 10)}%
                        </span>

                        <span className="mx-2">|</span>

                        <span>
                            {formatDate(new Date(details.release_date)).modelOne}
                        </span>

                        <span className="mx-2">|</span>

                        <span>{returnHours(details.runtime)}</span>

                        <span className="mx-2">|</span>

                        <span>{formatGenres(details.genres)}</span>
                    </div>

                    {details.tagline && (
                        <span className="text-gray-400 mt-8">
                            {details.tagline}
                        </span>
                    )}

                    <p>{details.overview || "Sem Informação"}</p>

                    <div className="box-button">
                        {details?.videos?.results?.length > 0 && (
                            <MovieDetailsClient
                                movieId={id}
                                videos={details.videos}
                            />
                        )}
                    </div>
                </Layout.Details>
            </Layout.Root>

            <SliderActors data={details.credits} />
            <ImageMovie param={id} urlApi="/movie" />
        </div>
    );
}
