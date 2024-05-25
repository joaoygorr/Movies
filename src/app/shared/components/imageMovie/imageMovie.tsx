import { useImage } from "./hook/useImage";
import "./imageMovie.style.scss";

export const ImageMovie = ({ param }: { param: string }) => {
    const { data } = useImage(param);
    
    return (
        <div className="movie-image">
            <div className="container image-box">
                <h2>Imagens</h2>
                <div>
                    <div className="image">
                        
                        <img src="#" alt="" className="hover:opacity-75 transition ease-in-out duration-150" />
                    </div>
                </div>
            </div>
        </div>
    )
}