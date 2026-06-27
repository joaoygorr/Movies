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
import {
    safeValidateMovieList,
    safeValidateMovieDetails,
    safeValidateTVShowList,
    safeValidateTVShowDetails,
    safeValidateActorDetails,
    safeValidateGenreList,
    safeValidateImageData
} from "@/shared/validators/validators";

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
    if (error?.message !== 'canceled' && error?.code !== 'ERR_CANCELED') {
        console.error('API Error:', error);
    }
    throw new Error(
        error.response?.data?.message || error.message || "An unexpected error occurred"
    );
};

const logValidationWarning = (context: string, errors: unknown) => {
    if (process.env.NODE_ENV === 'development') {
        console.warn(`[API Validation] ${context}:`, errors);
    }
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

    private async getRequest<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
        try {
            const { data } = await this.api.get(endpoint, {
                params: {
                    language: endpoint.includes("images") ? "" : this.language
                },
                signal
            });
            return data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    }

    async findByMovie(id: string, signal?: AbortSignal): Promise<IMovie> {
        const data = await this.getRequest<IMovie>(id, signal);
        const result = safeValidateMovieDetails(data);
        if (!result.success) {
            logValidationWarning(`findByMovie(${id})`, result.error.issues);
        }
        return data;
    }

    async findByTvShow(id: string, signal?: AbortSignal): Promise<ITvShow> {
        const data = await this.getRequest<ITvShow>(id, signal);
        const result = safeValidateTVShowDetails(data);
        if (!result.success) {
            logValidationWarning(`findByTvShow(${id})`, result.error.issues);
        }
        return data;
    }

    async listMovie(url: string, signal?: AbortSignal): Promise<IResponse<IListMovie[]>> {
        const data = await this.getRequest<IResponse<IListMovie[]>>(url, signal);
        const result = safeValidateMovieList(data);
        if (!result.success) {
            logValidationWarning(`listMovie(${url})`, result.error.issues);
        }
        return data;
    }

    async listTvShows(url: string, signal?: AbortSignal): Promise<IResponse<IListTvShows[]>> {
        const data = await this.getRequest<IResponse<IListTvShows[]>>(url, signal);
        const result = safeValidateTVShowList(data);
        if (!result.success) {
            logValidationWarning(`listTvShows(${url})`, result.error.issues);
        }
        return data;
    }

    async findByPeople(url: string, signal?: AbortSignal): Promise<IActorDetails> {
        const data = await this.getRequest<IActorDetails>(url, signal);
        const result = safeValidateActorDetails(data);
        if (!result.success) {
            logValidationWarning(`findByPeople(${url})`, result.error.issues);
        }
        return data;
    }

    async findAllGenre(url: string, signal?: AbortSignal): Promise<{ genres: IGenre[] }> {
        const data = await this.getRequest<{ genres: IGenre[] }>(url, signal);
        const result = safeValidateGenreList(data);
        if (!result.success) {
            logValidationWarning(`findAllGenre(${url})`, result.error.issues);
        }
        return data;
    }

    async findImagesMovie(id: string, url: string, signal?: AbortSignal): Promise<IImage> {
        const data = await this.getRequest<IImage>(`${id}/${url}`, signal);
        const result = safeValidateImageData(data);
        if (!result.success) {
            logValidationWarning(`findImagesMovie(${id}/${url})`, result.error.issues);
        }
        return data;
    }
}

export const movieApi = new Api();
export const genreApi = new Api("/genre");
export const castApi = new Api("/person");
export const imageApi = new Api();
export const tvShows = new Api("/tv");
