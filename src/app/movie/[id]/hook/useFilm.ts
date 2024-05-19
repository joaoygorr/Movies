"use client";
import { movieApi } from "@/app/shared/api/api";
import { IVideo, IMovie } from "@/app/shared/interfaces";
import { useEffect, useState } from "react";

type Data = {
    details: IMovie,
    video: IVideo
}

export const useFilm = (idMovie: string) => {
    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [details, videos] = await Promise.all([
                    movieApi.findByMovie(idMovie),
                    movieApi.findByTrailerMovie(idMovie, "videos")
                ]);
                console.log('detalhes', details);

                setData({
                    details: details,
                    video: videos
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [idMovie]);

    return { data, loading };
};


