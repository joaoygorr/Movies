import { IGenre } from "../interfaces";

export function formatGenres(genres: IGenre[]) {
    return genres?.map((genre) => genre.name).join(" - ");
}
