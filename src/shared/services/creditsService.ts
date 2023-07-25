import { ICredits } from "../Interfaces/iCredits";
import { instance } from "./api/api"

const getCredits = async (movieId: number): Promise<ICredits> => {
    const credits = await instance.get(`/movie/${movieId}/credits`);
    return credits.data;
}

export const CreditsService = {
    getCredits
}