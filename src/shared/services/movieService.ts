import { IDetails, IVideos } from "../Interfaces";
import { instance } from "./api/api";

const getDetails = async (movieId: number): Promise<IDetails> => {
    const movie = await instance.get(`/movie/${movieId}`);
    return movie.data;
};

const getVideos = async (movieId: number): Promise<IVideos> => {
    const video = await instance.get(`/movie/${movieId}/videos`);
    return video.data;
}

export const MovieService = {
    getDetails,
    getVideos
}