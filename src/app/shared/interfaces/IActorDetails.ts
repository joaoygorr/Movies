import { ICastResponse } from "./ICastResponse";

interface IExternalIds {
    freebase_mid: string;
    freebase_id: string | null;
    imdb_id: string;
    tvrage_id: number;
    wikidata_id: string;
    facebook_id: string;
    instagram_id: string;
    tiktok_id: string | null;
    twitter_id: string;
    youtube_id: string | null;
}

export interface IActorDetails {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
    external_ids: IExternalIds;
    movie_credits: ICastResponse[];
}
