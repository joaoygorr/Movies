import { IDetails } from "@/shared/Interfaces";
import { MovieService } from "@/shared/services/movieService";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"

export const Film = () => {
    const { id } = useParams();

    const { data } = useQuery<IDetails>("details", () => {
        const detail = MovieService.getDetails(parseInt(id!));
        return detail;
    }, { staleTime: 1000 * 60 })

    return (
        <div>Olá</div>
    )
}