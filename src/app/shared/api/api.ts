import { IListMovie, IMovie, IResponse, IVideo } from "@/app/shared/interfaces";
import axios, { AxiosInstance } from "axios";

export class Api {
    private api: AxiosInstance;

    /**
     * @param url Routes end-Points
     */
    constructor(url: string) {
        this.api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_URL + url,
            params: {
                language: "pt-br"
            },
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_READ_API}`
            }
        })
    };

    /**
     * @param id Movie Id
     * @returns Return list movie
     */
    async findByMovie(id: string): Promise<IMovie> {
        try {
            const { data } = await this.api.get(id);
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    /**
     * @param url Path variable
     * @returns Return list popular movie
     */
    async listPopularMovie(url: string): Promise<IResponse<IListMovie[]>> {
        try {
            const { data } = await this.api.get(`/${url}`);
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    /**
     * @param url Path variable
     * @returns Return list Now Playing
     */
    async listNowPlayingMovie(url: string): Promise<IResponse<IListMovie[]>> {
        try {
            const { data } = await this.api.get(`/${url}`);
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    /**
     * @param id Movie Id
     * @param url Path variable
     * @returns Return video movie
     */
    async findByVideoMovie(id: string, url: string): Promise<IResponse<IVideo>> {
        try {
            const { data } = await this.api.get(`/${id}/${url}`);
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

/**
 * Api Movie
 */
export const movieApi = new Api("/movie");