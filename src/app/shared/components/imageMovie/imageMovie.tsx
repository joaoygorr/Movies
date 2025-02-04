import { useMemo } from "react";
import "./imageMovie.style.scss";
import { imageApi } from "../../api/api";
import { useFetchData } from "../../hook/useFetchData";
import { IImage } from "../../interfaces";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const ImageMovie = ({
    param,
    urlApi
}: {
    param: string;
    urlApi: string;
}) => {
    imageApi.setUrl(urlApi);

    const apiCalls = useMemo(
        () => [
            {
                key: "posters",
                call: () => imageApi.findImagesMovie(param, "/images")
            }
        ],
        [param]
    );

    const { data } = useFetchData<{ posters: IImage }>(apiCalls);
    const posters = data?.posters;

    const filteredElements = posters?.backdrops.slice(0, 9);

    return (
        <div className="movie-image">
            <div className="container image-box">
                <h2>Imagens</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {filteredElements?.map((image, key) => (
                        <div className="image" key={key}>
                            <LazyLoadImage
                                key={image.file_path}
                                src={
                                    "https://image.tmdb.org/t/p/w500" +
                                    image.file_path
                                }
                                effect="blur"
                                alt="posters"
                                wrapperClassName="hover:opacity-75 transition ease-in-out duration-150"
                                placeholderSrc={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
