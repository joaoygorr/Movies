import { IDetails, ICredits } from "@/shared/Interfaces";
import { CreditsService, MovieService } from "@/shared/services";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Image } from 'primereact/image';
import "./filmDetails.style.scss";
import { Film } from "./components";

export const FilmDetails = () => {
    const { id } = useParams();

    const { data: detailAndCredit } = useQuery<[IDetails, ICredits]>("details", () => {
        const DetailAndCredit = Promise.all([MovieService.getDetails(parseInt(id!)), CreditsService.getCredits(parseInt(id!))]);

        return DetailAndCredit;
    });

    const [details, credits] = detailAndCredit ? detailAndCredit : [undefined, undefined];

    const year: string = details?.release_date || "";
    const hours = details?.runtime ? (details.runtime / 60).toFixed(1) : 0;

    return (
        <div className="max-w-screen-xl mx-auto box-container" >
            <Film.Root>
                <div className="box-image">
                    <Image src={"https://image.tmdb.org/t/p/w500" + details?.poster_path} alt="poster filme" preview={true} />
                </div>

                <div className="box-content-details"  >
                    <div className="box-title">
                        <h1>{details?.title}</h1>
                        <span className="year">({year.split("-")[0]}) </span>
                        <span className="hours">• {hours.toString().replace(".", ",")}h</span>
                    </div>

                    <div className="box-genres">
                        {details?.genres.map((genre, key) => {
                            return (
                                <span key={key}> {genre.name}</span>
                            )
                        })}
                    </div>

                    <div className="box-infos">
                        <h3 className="box-tagLine">{details?.tagline}</h3>

                        <h3 className="box-sinopse">sinopse</h3>
                        <div className="box-overview">
                            <p>{details?.overview}</p>
                        </div>
                    </div>
                </div>
            </Film.Root>
        </div >
    )
} 