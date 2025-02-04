import {
    IListMovie,
    IMovie,
    IResponse,
    ICast,
    IImage,
    IActorDetails,
    IListTvShows,
    IGenre
} from "@/app/shared/interfaces";
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

    constructor(url: string = "/movie") {
        this.api = createApiInstance(url);
        this.url = url;
    }

    setUrl(newUrl: string): void {
        this.url = newUrl;
        this.api = createApiInstance(newUrl);
    }

    private async getRequest<T>(endpoint: string, params = {}): Promise<T> {
        try {
            const { data } = await this.api.get(endpoint, { params });
            return data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    }

    async findByMovie(id: string): Promise<IMovie> {
        return this.getRequest<IMovie>(id, {
            language: "pt-br"
        });
    }

    async findByTvShow(id: string): Promise<ITvShow> {
        return this.getRequest<ITvShow>(id, {
            language: "pt-br"
        });
    }

    async listMovie(url: string): Promise<IResponse<IListMovie[]>> {
        return this.getRequest<IResponse<IListMovie[]>>(url, {
            language: "pt-br"
        });
    }

    async listTvShows(url: string): Promise<IResponse<IListTvShows[]>> {
        return this.getRequest<IResponse<IListTvShows[]>>(url, {
            language: "pt-br"
        });
    }

    async findByPeaple(url: string): Promise<IActorDetails> {
        return this.getRequest<IActorDetails>(url, {
            language: "pt-br"
        });
    }

    async findAllGenre(url: string): Promise<IGenre[]> {
        return this.getRequest<IGenre[]>(url, {
            language: "pt-br"
        });
    }

    async findByCast(id: string, url: string): Promise<ICast> {
        return this.getRequest<ICast>(`${id}/${url}`);
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
