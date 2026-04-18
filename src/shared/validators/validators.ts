import { z } from 'zod';

// Movie schemas
const MovieSchema = z.object({
    id: z.number(),
    title: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable(),
    vote_average: z.number(),
    release_date: z.string().optional(),
    overview: z.string().optional(),
});

const MovieListSchema = z.object({
    results: z.array(MovieSchema),
    page: z.number(),
    total_pages: z.number(),
    total_results: z.number(),
});

const MovieDetailsSchema = MovieSchema.extend({
    budget: z.number().optional(),
    revenue: z.number().optional(),
    runtime: z.number().optional(),
    status: z.string().optional(),
    genres: z.array(z.object({
        id: z.number(),
        name: z.string(),
    })).optional(),
    credits: z.object({
        cast: z.array(z.any()).optional(),
        crew: z.array(z.any()).optional(),
    }).optional(),
    videos: z.object({
        results: z.array(z.any()).optional(),
    }).optional(),
});

// TV Show schemas
const TVShowSchema = z.object({
    id: z.number(),
    name: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable(),
    vote_average: z.number(),
    first_air_date: z.string().optional(),
    overview: z.string().optional(),
});

const TVShowListSchema = z.object({
    results: z.array(TVShowSchema),
    page: z.number(),
    total_pages: z.number(),
    total_results: z.number(),
});

const TVShowDetailsSchema = TVShowSchema.extend({
    number_of_seasons: z.number().optional(),
    number_of_episodes: z.number().optional(),
    status: z.string().optional(),
    genres: z.array(z.object({
        id: z.number(),
        name: z.string(),
    })).optional(),
    credits: z.object({
        cast: z.array(z.any()).optional(),
        crew: z.array(z.any()).optional(),
    }).optional(),
    videos: z.object({
        results: z.array(z.any()).optional(),
    }).optional(),
});

// Actor/Person schemas
const ActorDetailsSchema = z.object({
    id: z.number(),
    name: z.string(),
    profile_path: z.string().nullable(),
    biography: z.string().optional(),
    birthday: z.string().nullable().optional(),
    deathday: z.string().nullable().optional(),
    known_for_department: z.string().optional(),
    movie_credits: z.object({
        cast: z.array(z.any()).optional(),
    }).optional(),
    external_ids: z.object({
        instagram_id: z.string().nullable().optional(),
        twitter_id: z.string().nullable().optional(),
        facebook_id: z.string().nullable().optional(),
    }).optional(),
});

// Cast/Crew schemas
const CastSchema = z.object({
    id: z.number(),
    name: z.string(),
    character: z.string().nullable().optional(),
    profile_path: z.string().nullable(),
    order: z.number().optional(),
    original_name: z.string().optional(),
});

const CastResponseSchema = z.object({
    cast: z.array(CastSchema),
    crew: z.array(z.any()).optional(),
    id: z.number(),
});

// Genre schemas
const GenreSchema = z.object({
    id: z.number(),
    name: z.string(),
});

const GenreListSchema = z.object({
    genres: z.array(GenreSchema),
});

// Image schemas
const ImageSchema = z.object({
    backdrops: z.array(z.object({
        file_path: z.string(),
        aspect_ratio: z.number().optional(),
        height: z.number().optional(),
        width: z.number().optional(),
        vote_average: z.number().optional(),
        vote_count: z.number().optional(),
    })),
    posters: z.array(z.object({
        file_path: z.string(),
        aspect_ratio: z.number().optional(),
        height: z.number().optional(),
        width: z.number().optional(),
        vote_average: z.number().optional(),
        vote_count: z.number().optional(),
    })).optional(),
    id: z.number(),
});

// Video schemas
const VideoSchema = z.object({
    id: z.string(),
    key: z.string(),
    name: z.string(),
    site: z.string(),
    type: z.string(),
});

// Export validators
export const validateMovieList = (data: unknown) => MovieListSchema.parse(data);
export const validateMovieDetails = (data: unknown) => MovieDetailsSchema.parse(data);
export const validateTVShowList = (data: unknown) => TVShowListSchema.parse(data);
export const validateTVShowDetails = (data: unknown) => TVShowDetailsSchema.parse(data);
export const validateActorDetails = (data: unknown) => ActorDetailsSchema.parse(data);
export const validateCastResponse = (data: unknown) => CastResponseSchema.parse(data);
export const validateGenreList = (data: unknown) => GenreListSchema.parse(data);
export const validateImageData = (data: unknown) => ImageSchema.parse(data);

// Safe parsing (returns result object)
export const safeValidateMovieList = (data: unknown) => MovieListSchema.safeParse(data);
export const safeValidateMovieDetails = (data: unknown) => MovieDetailsSchema.safeParse(data);
export const safeValidateTVShowList = (data: unknown) => TVShowListSchema.safeParse(data);
export const safeValidateTVShowDetails = (data: unknown) => TVShowDetailsSchema.safeParse(data);
export const safeValidateActorDetails = (data: unknown) => ActorDetailsSchema.safeParse(data);
export const safeValidateCastResponse = (data: unknown) => CastResponseSchema.safeParse(data);
export const safeValidateGenreList = (data: unknown) => GenreListSchema.safeParse(data);
export const safeValidateImageData = (data: unknown) => ImageSchema.safeParse(data);
