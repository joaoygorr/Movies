import { IResponse, IMovie, IDetails } from "../Interfaces"
import { instance } from "./api/api";

const getTopRated = async (): Promise<IResponse<IMovie[]>> => {
    const topRated = await instance.get("/movie/top_rated?language=pt-br");
    return topRated.data;
};

const getPopularMovie = async (): Promise<IResponse<IMovie[]>> => {
    const popularMovie = await instance.get("https://api.themoviedb.org/3/movie/popular?language=pt-br");
    return popularMovie.data;
};

const getDetails = async (movieId: number): Promise<IDetails> => {
    const movie = await instance.get(`https://api.themoviedb.org/3/movie/${movieId}?language=pt-br`);
    return movie.data;
}

export const MovieService = {
    getTopRated,
    getPopularMovie,
    getDetails
}