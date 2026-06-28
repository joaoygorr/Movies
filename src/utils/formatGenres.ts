import { IGenre } from "@/types";

export function formatGenres(genres: IGenre[]) {
    return genres?.map((genre) => genre.name).join(" - ");
}
