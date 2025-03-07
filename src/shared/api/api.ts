import {
    IListMovie,
    IMovie,
    IResponse,
    IImage,
    IActorDetails,
    IListTvShows,
    IGenre
} from "@/shared/interfaces";
import axios, { AxiosInstance } from "axios";
import { ITvShow } from "../interfaces/ITvShow";

const createApiInstance = (url: string): AxiosInstance => {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_URL + url,

        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_READ_API}`
        }
    });
};

const handleApiError = (error: any): never => {
    console.error(error);
    throw new Error(
        error.response?.data?.message || "An unexpected error occurred"
    );
};

export class Api {
    private api: AxiosInstance;

    private url: string;

    private language: string = "pt-BR";

    constructor(url: string = "/movie") {
        this.api = createApiInstance(url);
        this.url = url;
    }

    setUrl(newUrl: string): void {
        this.url = newUrl;
        this.api = createApiInstance(newUrl);
    }

    setLanguage(language: string): void {
        this.language = language;
    }

    private async getRequest<T>(endpoint: string): Promise<T> {
        try {
            const { data } = await this.api.get(endpoint, {
                params: {
                    language: endpoint.includes("images") ? "" : this.language
                }
            });
            return data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    }

    async findByMovie(id: string): Promise<IMovie> {
        return this.getRequest<IMovie>(id);
    }

    async findByTvShow(id: string): Promise<ITvShow> {
        return this.getRequest<ITvShow>(id);
    }

    async listMovie(url: string): Promise<IResponse<IListMovie[]>> {
        return this.getRequest<IResponse<IListMovie[]>>(url);
    }

    async listTvShows(url: string): Promise<IResponse<IListTvShows[]>> {
        return this.getRequest<IResponse<IListTvShows[]>>(url);
    }

    async findByPeaple(url: string): Promise<IActorDetails> {
        return this.getRequest<IActorDetails>(url);
    }

    async findAllGenre(url: string): Promise<IGenre[]> {
        return this.getRequest<IGenre[]>(url);
    }

    async findImagesMovie(id: string, url: string): Promise<IImage> {
        return this.getRequest<IImage>(`${id}/${url}`);
    }
}

export const movieApi = new Api();
export const genreApi = new Api("/genre");
export const castApi = new Api("/person");
export const imageApi = new Api();
export const tvShows = new Api("/tv");
