export interface IImage {
    id: string;
    backdrops: Image[];
    logos: Image[];
    posters: Image[];
}

type Image = {
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
};
