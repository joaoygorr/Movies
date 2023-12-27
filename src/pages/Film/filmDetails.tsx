import { Image } from 'primereact/image';
import "./filmDetails.style.scss";
import { Film } from "./components";
import { useFilm } from "./hook/useFilm";

export const FilmDetails = () => {
    const { credits, details, videos } = useFilm();

    return (
        <div className="box-container">
            <Film.Root>
                <div className="box-header-details">
                    <div className="box-image">
                        <Image src={"https://image.tmdb.org/t/p/w500" + details?.poster_path} alt="poster filme" preview={true} />
                    </div>

                    <Film.Information>
                        <Film.Header title={details?.title || ""} release_date={details?.release_date || ""} runtime={details?.runtime || 0} />

                        <Film.Content genres={details?.genres} videos={videos}/>

                        <Film.Footer overview={details?.overview || ""} tagline={details?.tagline || ""} />
                    </Film.Information>
                </div>
            </Film.Root>
        </div >
    )
} 