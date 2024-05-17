export interface IGenre {
    id: string,
    name: string
}

export interface IGenreList<IGenre> {
    genres: IGenre[]
}