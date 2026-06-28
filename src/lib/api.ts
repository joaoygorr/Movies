import {
    IListMovie,
    IMovie,
    IResponse,
    IImage,
    IActorDetails,
    IListTvShows,
    IGenre
} from "@/types";
import axios, { AxiosInstance } from "axios";
import { ITvShow } from "@/types/ITvShow";
import {
    safeValidateMovieList,
    safeValidateMovieDetails,
    safeValidateTVShowList,
    safeValidateTVShowDetails,
    safeValidateActorDetails,
    safeValidateGenreList,
    safeValidateImageData
} from "@/lib/validators";

const DEFAULT_LANGUAGE = "pt-BR";

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

type RequestOptions = {
    signal?: AbortSignal;
    language?: string;
};

export class Api {
    private api: AxiosInstance;

    constructor(url: string = "/movie") {
        this.api = createApiInstance(url);
    }

    private async getRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const { signal, language = DEFAULT_LANGUAGE } = options;
        try {
            const { data } = await this.api.get(endpoint, {
                params: {
                    language: endpoint.includes("images") ? "" : language
                },
                signal
            });
            return data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    }

    async findByMovie(id: string, options: RequestOptions = {}): Promise<IMovie> {
        const data = await this.getRequest<IMovie>(id, options);
        const result = safeValidateMovieDetails(data);
        if (!result.success) {
            logValidationWarning(`findByMovie(${id})`, result.error.issues);
        }
        return data;
    }

    async findByTvShow(id: string, options: RequestOptions = {}): Promise<ITvShow> {
        const data = await this.getRequest<ITvShow>(id, options);
        const result = safeValidateTVShowDetails(data);
        if (!result.success) {
            logValidationWarning(`findByTvShow(${id})`, result.error.issues);
        }
        return data;
    }

    async listMovie(url: string, options: RequestOptions = {}): Promise<IResponse<IListMovie[]>> {
        const data = await this.getRequest<IResponse<IListMovie[]>>(url, options);
        const result = safeValidateMovieList(data);
        if (!result.success) {
            logValidationWarning(`listMovie(${url})`, result.error.issues);
        }
        return data;
    }

    async listTvShows(url: string, options: RequestOptions = {}): Promise<IResponse<IListTvShows[]>> {
        const data = await this.getRequest<IResponse<IListTvShows[]>>(url, options);
        const result = safeValidateTVShowList(data);
        if (!result.success) {
            logValidationWarning(`listTvShows(${url})`, result.error.issues);
        }
        return data;
    }

    async findByPeople(url: string, options: RequestOptions = {}): Promise<IActorDetails> {
        const data = await this.getRequest<IActorDetails>(url, options);
        const result = safeValidateActorDetails(data);
        if (!result.success) {
            logValidationWarning(`findByPeople(${url})`, result.error.issues);
        }
        return data;
    }

    async findAllGenre(url: string, options: RequestOptions = {}): Promise<{ genres: IGenre[] }> {
        const data = await this.getRequest<{ genres: IGenre[] }>(url, options);
        const result = safeValidateGenreList(data);
        if (!result.success) {
            logValidationWarning(`findAllGenre(${url})`, result.error.issues);
        }
        return data;
    }

    async findImagesMovie(id: string, url: string, options: RequestOptions = {}): Promise<IImage> {
        const data = await this.getRequest<IImage>(`${id}/${url}`, options);
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
export const tvShowsApi = new Api("/tv");
