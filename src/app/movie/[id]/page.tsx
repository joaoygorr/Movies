"use client";
import { IMovie } from "@/shared/interfaces";
import { formatDate, formatGenres, returnHours } from "@/shared/utils";
import "./movie.style.scss";
import { Modal } from "@/shared/components/modal/modal";
import { useMemo, useState, Suspense, lazy } from "react";
import { Layout } from "@/shared/components/layoutComponent";
import { movieApi } from "@/shared/api/api";
import { useFetchData } from "@/shared/hook/useFetchData";
import { useParams } from "next/navigation";
import { SkeletonDetails } from "@/shared/components/skeletonLoading";
import { useAppContext } from "@/shared/context/context";
import Image from "next/image";

const SliderActors = lazy(() => import("@/shared/components/sliderActors/sliderActors").then(module => ({ default: module.SliderActors })));
const ImageMovie = lazy(() => import("@/shared/components/imageMovie/imageMovie").then(module => ({ default: module.ImageMovie })));

type PropMovie = {
    details: IMovie;
};

export default function MovieDetails() {
    const movie = useParams();
    const { language } = useAppContext();

    const apiCalls = useMemo(
        () => [
            {
                key: "details",
                call: (signal?: AbortSignal) =>
                    movieApi.findByMovie(
                        `${movie.id}?append_to_response=credits,videos`,
                        signal
                    )
            }
        ],
        [movie.id, language]
    );

    const { data, loading } = useFetchData<PropMovie>(apiCalls);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    if (loading) {
        return <SkeletonDetails />;
    }

    return (
        <div>
            <Layout.Root>
                <div className="flex-none image-movie">
                    {data?.details?.poster_path && (
                        <Image
                            src={
                                "https://image.tmdb.org/t/p/w500" +
                                data?.details?.poster_path
                            }
                            alt="poster movie"
                            width={384}
                            height={576}
                            className="w-64 lg:w-96"
                        />
                    )}
                </div>

                <Layout.Details>
                    <h2 className="title md:mt-0">{data?.details?.title}</h2>
                    <div className="detail-genre-date">
                        <i className="pi pi-star-fill" />
                        <span className="ml-1">
                            {Math.trunc(data?.details?.vote_average! * 10) +
                                "%"}
                        </span>
                        <span className="mx-2">|</span>
                        <span>
                            {
                                formatDate(
                                    new Date(data?.details?.release_date!)
                                ).modelOne
                            }
                        </span>
                        <span className="mx-2">|</span>
                        <span>{returnHours(data?.details?.runtime!)}</span>
                        <span className="mx-2">|</span>
                        <span>{formatGenres(data?.details?.genres!)}</span>
                    </div>
                    {data?.details?.tagline && (
                        <span className="text-gray-400 mt-8">
                            {data?.details?.tagline}
                        </span>
                    )}
                    <p>{data?.details?.overview || "Sem Informação"}</p>
                    <div className="box-button">
                        <div>
                            {data?.details?.videos.results.length! > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setIsVisible(true)}
                                    className="flex inline-flex items-center bg-orange-500 text-gray-900 rounded font-semibold px-5 py-4 hover:bg-orange-600 transition ease-in-out duration-150"
                                >
                                    <i className="pi pi-caret-right"></i>
                                    <span className="ml-2">Play Trailer</span>
                                </button>
                            )}
                        </div>
                    </div>
                </Layout.Details>
                {isVisible && (
                    <Modal hidden={setIsVisible}>
                        <div className="modal-body">
                            <div className="modal-children responsive-container">
                                <iframe
                                    src={`https://www.youtube.com/embed/${data?.details?.videos.results[0].key}?autoplay=1`}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </Modal>
                )}
            </Layout.Root>
            <Suspense fallback={<div>Loading...</div>}>
                <SliderActors data={data?.details.credits} />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <ImageMovie param={String(movie.id)} urlApi="/movie" />
            </Suspense>
        </div>
    );
}
