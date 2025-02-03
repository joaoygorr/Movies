import { IGenre, IGenresResponse } from "../interfaces";

export function filterGenres(genre: string[], genresResponse: IGenresResponse) {
    const genreFiltered = genresResponse.genres?.filter((e: IGenre) =>
        genre?.includes(e.id)
    );
    return genreFiltered
        ?.map((value: IGenre) => {
            return value.name;
        })
        .join(", ");
}
