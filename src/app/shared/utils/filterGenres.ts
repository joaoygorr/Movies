import { IGenre } from "../interfaces";

type Genres = {
    genre: IGenre[];
};

export function filterGenres(genre: string[], genresResponse: Genres) {
    const genreFiltered = genresResponse?.genre?.filter((e: IGenre) =>
        genre?.includes(e.id)
    );
    return genreFiltered
        ?.map((value: IGenre) => {
            return value.name;
        })
        .join(", ");
}
