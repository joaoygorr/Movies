import { IGenre } from "../interfaces";

type Genres = {
    genres: IGenre[];
};

export function filterGenres(genre: string[], genresResponse: Genres) {
    const genreFiltered = genresResponse?.genres?.filter((e: IGenre) =>
        genre?.includes(e.id)
    );
    return genreFiltered
        ?.map((value: IGenre) => {
            return value.name;
        })
        .join(", ");
}
