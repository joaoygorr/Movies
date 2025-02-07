export interface ICrew {
    adult: boolean;
    backdrop_path: string;
    character: string;
    credit_id: string;
    genre_ids: number[];
    id: number;
    order: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    job?: string;
    department?: string;
    profile_path?: string;
    original_name?: string;
    name?: string;
    know_for_department?: string;
    gender?: number;
}
