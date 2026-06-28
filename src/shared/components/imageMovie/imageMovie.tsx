'use client'
import { useMemo } from "react";
import "./imageMovie.style.scss";
import { Api } from "../../api/api";
import { useFetchData } from "../../hooks/useFetchData";
import { IImage } from "../../interfaces";
import { useAppContext } from "@/shared/context/context";
import { useTranslation } from "@/shared/hooks/useTranslation";
import Image from "next/image";

export const ImageMovie = ({
    param,
    urlApi
}: {
    param: string;
    urlApi: string;
}) => {
    const { language } = useAppContext();
    const { t } = useTranslation('common');

    const api = useMemo(() => new Api(urlApi), [urlApi]);

    const apiCalls = useMemo(
        () => [
            {
                key: "posters",
                call: (signal?: AbortSignal) => api.findImagesMovie(param, "images", { signal, language })
            }
        ],
        [param, language, api]
    );

    const { data } = useFetchData<{ posters: IImage }>(apiCalls);
    const posters = data?.posters;

    const filteredElements = posters?.backdrops.slice(0, 9);

    return (
        <div className="movie-image">
            <div className="container image-box">
                <h2>{t('images')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {filteredElements?.map((image, key) => (
                        image.file_path && (
                            <div className="image" key={key}>
                                <Image
                                    key={image.file_path}
                                    src={
                                        "https://image.tmdb.org/t/p/w500" +
                                        image.file_path
                                    }
                                    alt="posters"
                                    width={400}
                                    height={225}
                                    className="hover:opacity-75 transition ease-in-out duration-150"
                                />
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};
