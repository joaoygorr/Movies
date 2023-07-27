import { IDetails, ICredits, IVideos } from "@/shared/Interfaces";
import { CreditsService, MovieService } from "@/shared/services";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Image } from 'primereact/image';
import "./filmDetails.style.scss";
import { Film } from "./components";

export const FilmDetails = () => {
    const { id } = useParams();
    const idMovie: number = parseInt(id || '');

    const { data: detailAndCredit } = useQuery<[IDetails, ICredits, IVideos]>("details", () => {
        const DetailAndCredit = Promise.all([MovieService.getDetails(idMovie), CreditsService.getCredits(idMovie), MovieService.getVideos(idMovie)]);

        return DetailAndCredit;
    });

    const [details, credits, videos] = detailAndCredit ? detailAndCredit : [undefined, undefined, undefined];

    return (
        <div className="box-container" >
            <Film.Root>
                <div className="box-image">
                    <Image src={"https://image.tmdb.org/t/p/w500" + details?.poster_path} alt="poster filme" preview={true} />
                </div>

                <Film.Information>
                    <Film.Header title={details?.title || ""} release_date={details?.release_date || ""} runtime={details?.runtime || 0} />

                    <div className="box-genres">
                        {details?.genres.map((genre, key) => {
                            return (
                                <span key={key}> {genre.name}</span>
                            )
                        })}
                    </div>

                    <Film.Footer overview={details?.overview || ""} tagline={details?.tagline || ""} />
                </Film.Information>
            </Film.Root>
        </div >
    )
} 