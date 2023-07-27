import { IResponse, IMovie } from "../Interfaces"
import { instance } from "./api/api";

const getTopRated = async (): Promise<IResponse<IMovie[]>> => {
    const topRated = await instance.get("/movie/top_rated");
    return topRated.data;
};

const getPopularMovie = async (): Promise<IResponse<IMovie[]>> => {
    const popularMovie = await instance.get("/movie/popular");
    return popularMovie.data;
};

export const MovieListService = {
    getTopRated,
    getPopularMovie,
}