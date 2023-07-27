import { ICredits, IDetails, IVideos } from "@/shared/Interfaces";
import { CreditsService, MovieService } from "@/shared/services";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const useFilm = () => {
    const { id } = useParams();
    const idMovie: number = parseInt(id || '');

    const { data: detailAndCredit } = useQuery<[IDetails, ICredits, IVideos]>("details", () => {

        const DetailAndCredit = Promise.all([MovieService.getDetails(idMovie), CreditsService.getCredits(idMovie), MovieService.getVideos(idMovie)]);

        return DetailAndCredit;
    });

    const [details, credits, videos] = detailAndCredit ? detailAndCredit : [undefined, undefined, undefined];

    return { details, credits, videos }
}