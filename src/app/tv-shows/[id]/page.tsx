"use client";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { formatDate, formatGenres } from "@/utils";
import "./tvShow.style.scss";
import { Layout } from "@/components/layoutComponent";
import { tvShowsApi } from "@/lib/api";
import Image from "next/image";
import TvShowDetailsClient from "./TvShowDetailsClient";
import { ImageMovie } from "@/components/imageMovie/imageMovie";
import { useFetchData } from "@/hooks/useFetchData";
import { useAppContext } from "@/context/context";
import { ITvShow } from "@/types/ITvShow";
import { SkeletonDetails } from "@/components/skeletonLoading";

export default function TvShowDetails() {
    const { id } = useParams<{ id: string }>();
    const { language } = useAppContext();

    const apiCalls = useMemo(
        () => [
            {
                key: "details",
                call: (signal?: AbortSignal) =>
                    tvShowsApi.findByTvShow(
                        `${id}?append_to_response=credits,videos`,
                        { signal, language }
                    )
            }
        ],
        [id, language]
    );

    const { data, loading } = useFetchData<{ details: ITvShow }>(apiCalls);
    const details = data?.details;

    if (loading || !details) {
        return <SkeletonDetails />;
    }

    return (
        <div>
            <Layout.Root>
                <div className="flex-none image-tv">
                    {details?.poster_path && (
                        <Image
                            src={
                                "https://image.tmdb.org/t/p/w500" +
                                details.poster_path
                            }
                            alt={`Pôster de ${details.name}`}
                            width={384}
                            height={576}
                            className="w-64 lg:w-96"
                        />
                    )}
                </div>
                <Layout.Details>
                    <h2 className="title md:mt-0">{details.name}</h2>
                    <div className="detail-genre-date">
                        <i className="pi pi-star-fill" />
                        <span className="ml-1">
                            {Math.trunc(details.vote_average * 10)}%
                        </span>
                        <span className="mx-2">|</span>
                        <span>
                            {formatDate(new Date(details.first_air_date)).modelOne}
                        </span>
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
                        <div>
                            {details?.videos?.results?.length > 0 && (
                                <TvShowDetailsClient tvShowId={id} videos={details.videos} />
                            )}
                        </div>
                    </div>
                </Layout.Details>
            </Layout.Root>

            <ImageMovie param={id} urlApi="/tv" />
        </div>
    );
}
