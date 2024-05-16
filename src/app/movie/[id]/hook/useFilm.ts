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

    useEffect(() => {
        const fetchData = async () => {
            const [details, videos] = await Promise.all([
                movieApi.findByMovie(idMovie),
                movieApi.findByVideoMovie(idMovie, "videos")
            ]);
            console.log('detalhes', details);
            
            setData({
                details: details,
                video: videos.results
            });
        };

        fetchData();
    }, [idMovie]);

    return data;
}; 


