import { ICastResponse } from "./ICastResponse";
import { IGenre } from "./IGenre";
import { IVideo } from "./IVideo";

export interface ITvShow {
    adult: boolean;
    backdrop_path: string;
    created_by: Creator[];
    episode_run_time: number[];
    first_air_date: string;
    genres: IGenre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: Episode;
    name: string;
    next_episode_to_air: Episode;
    networks: Network[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    tagline: string;
    videos: IVideo;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    seasons: Season[];
    credits: ICastResponse;
}

interface Creator {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string;
}

interface Episode {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string | null;
}

interface Network {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

interface Season {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
}
