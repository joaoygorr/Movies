import { IDetails, ICredits } from "@/shared/Interfaces";
import { CreditsService, MovieService } from "@/shared/services";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"


export const Film = () => {
    const { id } = useParams();

    const { data: details } = useQuery<[IDetails, ICredits]>("details", () => {
        const DetailAndCredit = Promise.all([MovieService.getDetails(parseInt(id!)), CreditsService.getCredits(parseInt(id!))])
        return DetailAndCredit;
    }, { staleTime: 1000 * 60 });

    const [obj1, obj2] = details!;

    return (
        <div></div>
    )
}