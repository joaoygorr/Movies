"use client";
import { useState } from "react";
import { Modal } from "@/shared/components/modal/modal";
import { IVideo } from "@/shared/interfaces";

type TvShowDetailsClientProps = {
    tvShowId: string;
    videos: IVideo;
};

export default function TvShowDetailsClient({ tvShowId, videos }: TvShowDetailsClientProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsVisible(true)}
                className="flex inline-flex items-center bg-orange-500 text-gray-900 rounded font-semibold px-5 py-4 hover:bg-orange-600 transition ease-in-out duration-150"
            >
                <i className="pi pi-caret-right"></i>
                <span className="ml-2">Play Trailer</span>
            </button>
            {isVisible && (
                <Modal hidden={setIsVisible}>
                    <div className="modal-body">
                        <div className="modal-children responsive-container">
                            <iframe
                                src={`https://www.youtube.com/embed/${videos.results[0].key}?autoplay=1`}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}