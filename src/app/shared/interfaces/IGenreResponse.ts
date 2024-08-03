import { IGenre } from "./IGenre";

export interface IGenresResponse {
    genres: IGenresInnerResponse;
}

interface IGenresInnerResponse {
    genres: IGenre[];
}
