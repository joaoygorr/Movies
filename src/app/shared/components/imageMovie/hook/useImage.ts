"use client";
import { imageApi } from "@/app/shared/api/api";
import { IImage } from "@/app/shared/interfaces";
import { useEffect, useState } from "react";

export const useImage = (idMovie: string) => {
    const [data, setData] = useState<IImage>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await imageApi.findImagesMovie(idMovie, "images");
                setData(res);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [idMovie]);

    return { data };
};


