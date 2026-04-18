import { IMovie } from "@/shared/interfaces";
import { formatDate, formatGenres, returnHours } from "@/shared/utils";
import "./movie.style.scss";
import { Modal } from "@/shared/components/modal/modal";
import { Suspense, lazy } from "react";
import { Layout } from "@/shared/components/layoutComponent";
import { movieApi } from "@/shared/api/api";
import { SkeletonDetails } from "@/shared/components/skeletonLoading";
import Image from "next/image";
import MovieDetailsClient from "./MovieDetailsClient";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const SliderActors = lazy(() => import("@/shared/components/sliderActors/sliderActors").then(module => ({ default: module.SliderActors })));
const ImageMovie = lazy(() => import("@/shared/components/imageMovie/imageMovie").then(module => ({ default: module.ImageMovie })));

// Server component for SSR
async function getServerSideMovieData(id: string) {
    try {
        const details = await movieApi.findByMovie(`${id}?append_to_response=credits,videos`);
        return { details };
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return { details: null };
    }
}

export default async function MovieDetails({ params }: { params: { id: string } }) {
    // Fetch data on server
    const { details } = await getServerSideMovieData(params.id);

    if (!details) {
        return <div>Movie not found</div>;
    }

    return (
        <div>
            <Layout.Root>
                <div className="flex-none image-movie">
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
                    <h2 className="title md:mt-0">{details?.title}</h2>
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
                                    new Date(details?.release_date!)
                                ).modelOne
                            }
                        </span>
                        <span className="mx-2">|</span>
                        <span>{returnHours(details?.runtime!)}</span>
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
                                <MovieDetailsClient movieId={params.id} videos={details.videos} />
                            )}
                        </div>
                    </div>
                </Layout.Details>
            </Layout.Root>
            <Suspense fallback={<div>Loading...</div>}>
                <SliderActors data={details.credits} />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <ImageMovie param={params.id} urlApi="/movie" />
            </Suspense>
        </div>
    );
}
