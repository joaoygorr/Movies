import { useImage } from "./hook/useImage";
import "./imageMovie.style.scss";

export const ImageMovie = ({ param }: { param: string }) => {
    const { data } = useImage(param);
    const firtNineElements = data?.posters.slice(0, 9);

    return (
        <div className="movie-image">
            <div className="container image-box">
                <h2>Imagens</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {firtNineElements?.map((image, key) => (
                        <div className="image" key={key}>
                            <img src={"https://image.tmdb.org/t/p/w500" + image.file_path} alt="" className="hover:opacity-75 transition ease-in-out duration-150" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}