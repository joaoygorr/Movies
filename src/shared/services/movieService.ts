import { IResponse } from "../Interfaces"
import { IMovie } from "../Interfaces/IMovie"
import { instance } from "./api/api";


const getMovie = async (): Promise<IResponse<IMovie>> => {
    const response = await instance.get("/discover/movie")
    return response.data;
}


export const MovieService = {
    getMovie
}