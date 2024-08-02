import { IGenre, IGenreList, IListMovie, IMovie, IResponse, IVideo, ICast, IImage } from "@/app/shared/interfaces";
import axios, { AxiosInstance } from "axios";

const createApiInstance = (url: string): AxiosInstance => {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_URL + url,
        params: {
            language: "pt-br"
        },
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_READ_API}`
        }
    });
};

const handleApiError = (error: any): never => {
    console.error(error);
    throw new Error(error.response?.data?.message || 'An unexpected error occurred');
};

export class Api {
    private api: AxiosInstance;

    /**
     * @param url Routes end-Points
     */
    constructor(url: string) {
        this.api = createApiInstance(url);
    };

    private async getRequest<T>(endpoint: string, params = {}): Promise<T> {
        try {
            const { data } = await this.api.get(endpoint, { params });
            return data;
        } catch (error) {
            handleApiError(error);
        }
    }

    async findByMovie(id: string): Promise<IMovie> {
        return this.getRequest<IMovie>(id);
    }

    async listPopularMovie(url: string): Promise<IResponse<IListMovie[]>> {
        return this.getRequest<IResponse<IListMovie[]>>(url);
    }

    async listNowPlayingMovie(url: string): Promise<IResponse<IListMovie[]>> {
        return this.getRequest<IResponse<IListMovie[]>>(url);
    }

    async findByTrailerMovie(id: string, url: string): Promise<IVideo> {
        return this.getRequest<IVideo>(`${id}/${url}`);
    }

    async findAllGenre(): Promise<IGenreList<IGenre>> {
        return this.getRequest<IGenreList<IGenre>>("/movie/list");
    }

    async findByCast(id: string, url: string): Promise<ICast> {
        return this.getRequest<ICast>(`${id}/${url}`);
    }

    async findImagesMovie(id: string, url: string): Promise<IImage> {
        return this.getRequest<IImage>(`${id}/${url}`, {
            include_image_language: "pt",
            language: ""
        });
    }

}
export const movieApi = new Api("/movie");
export const genreApi = new Api("/genre");
export const videoApi = new Api("");
export const castApi = new Api("/movie");
export const imageApi = new Api("/movie");