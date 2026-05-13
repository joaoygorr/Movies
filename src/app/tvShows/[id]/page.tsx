import { tvShows } from "@/shared/api/api";
import { Layout } from "@/shared/components/layoutComponent";
import { Suspense, lazy } from "react";
import { formatDate, formatGenres } from "@/shared/utils";
import "./tvShow.style.scss";
import Image from "next/image";
import TvShowDetailsClient from "./TvShowDetailsClient";

const ImageMovie = lazy(() => import("@/shared/components/imageMovie/imageMovie").then(module => ({ default: module.ImageMovie })));

async function getServerSideTvShowData(id: string) {
    try {
        const details = await tvShows.findByTvShow(`${id}?append_to_response=credits,videos`);
        return { details };
    } catch (error) {
        console.error("Error fetching TV show details:", error);
        return { details: null };
    }
}

export default async function TvShowDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const { details } = await getServerSideTvShowData(id);

    if (!details) {
        return <div>TV Show not found</div>;
    }

    return (
        <div>
            <Layout.Root>
                <div className="flex-none image-tv">
                    {details?.poster_path && (
                        <Image
                            src={
                                "https://image.tmdb.org/t/p/w500" +
                                details?.poster_path
                            }
                            alt="poster movie"
                            width={384}
                            height={576}
                            className="w-64 lg:w-96"
                        />
                    )}
                </div>
                <Layout.Details>
                    <h2 className="title md:mt-0">{details?.name}</h2>
                    <div className="detail-genre-date">
                        <i className="pi pi-star-fill" />
                        <span className="ml-1">
                            {Math.trunc(details?.vote_average! * 10) +
                                "%"}
                        </span>
                        <span className="mx-2">|</span>
                        <span>
                            {
                                formatDate(
                                    new Date(details?.first_air_date!)
                                ).modelOne
                            }
                        </span>
                        <span className="mx-2">|</span>
                        <span>{formatGenres(details?.genres!)}</span>
                    </div>
                    {details?.tagline && (
                        <span className="text-gray-400 mt-8">
                            {details?.tagline}
                        </span>
                    )}
                    <p>{details?.overview || "Sem Informação"}</p>
                    <div className="box-button">
                        <div>
                            {details?.videos.results.length! > 0 && (
                                <TvShowDetailsClient tvShowId={id} videos={details.videos} />
                            )}
                        </div>
                    </div>
                </Layout.Details>
            </Layout.Root>
            <Suspense fallback={<div>Loading...</div>}>
                <ImageMovie param={id} urlApi="/tv" />
            </Suspense>
        </div>
    );
}
