import { IDetails, ICredits } from "@/shared/Interfaces";
import { CreditsService, MovieService } from "@/shared/services";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import { Image } from 'primereact/image';
import "./film.style.scss";

export const Film = () => {
    const { id } = useParams();

    const { data: detailAndCredit } = useQuery<[IDetails, ICredits]>("details", () => {
        const DetailAndCredit = Promise.all([MovieService.getDetails(parseInt(id!)), CreditsService.getCredits(parseInt(id!))]);
        return DetailAndCredit;
    }, { staleTime: 1000 * 60 });

    const [details, credits] = detailAndCredit ? detailAndCredit : [undefined, undefined];

    const year: string = details?.release_date || "";

    return (
        <div className="max-w-screen-xl mx-auto box-container">
            <div className="box-details">
                <div className="box-image">
                    <Image src={"https://image.tmdb.org/t/p/w500" + details?.poster_path} alt="poster filme" preview={true} />
                </div>

                <div className="box-content-details">
                    <div className="box-title">
                        <h1>{details?.title}</h1>
                        <span>({year.split("-")[0]})</span>
                    </div>
                    
                    <div className="box-infos">
                        <h3 className="box-tagLine">{details?.tagline}</h3>

                        <h3 className="box-sinopse">sinopse</h3>
                        <div className="box-overview">
                            <p>{details?.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 