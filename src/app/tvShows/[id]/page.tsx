"use client";
import { tvShows } from "@/shared/api/api";
import { Actors } from "@/shared/components/actors/actors";
import { ImageMovie } from "@/shared/components/imageMovie/imageMovie";
import { Layout } from "@/shared/components/layoutComponent";
import { Modal } from "@/shared/components/modal/modal";
import { useFetchData } from "@/shared/hook/useFetchData";
import { ITvShow } from "@/shared/interfaces/ITvShow";
import { formatDate, formatGenres } from "@/shared/utils";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import "./tvShow.style.scss";
import { SkeletonDetails } from "@/shared/components/skeletonLoading";

type PropsTvShow = {
    details: ITvShow;
};

export default function TvShowDetails() {
    const tvShow = useParams();

    const apiCalls = useMemo(
        () => [
            {
                key: "details",
                call: () =>
                    tvShows.findByTvShow(
                        `${tvShow.id}?append_to_response=credits,videos,images`
                    )
            }
        ],
        [tvShow.id]
    );
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const { data, loading } = useFetchData<PropsTvShow>(apiCalls);

    if (loading) {
        return <SkeletonDetails />;
    }

    return (
        <div>
            <Layout.Root>
                <div className="flex-none image-tv">
                    <img
                        src={
                            "https://image.tmdb.org/t/p/w500" +
                            data?.details?.poster_path
                        }
                        alt="poster movie"
                        className="w-64 lg:w-96"
                    />
                </div>
                <Layout.Details>
                    <h2 className="title md:mt-0">{data?.details?.name}</h2>
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
                                    new Date(data?.details?.first_air_date!)
                                ).modelOne
                            }
                        </span>
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
            <Actors data={data?.details.credits!} />
            <ImageMovie param={String(tvShow.id)} urlApi="/tv" />
        </div>
    );
}
