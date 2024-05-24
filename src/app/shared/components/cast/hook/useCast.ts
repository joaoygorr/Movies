"use client";
import { castApi } from "@/app/shared/api/api";
import { ICast } from "@/app/shared/interfaces";
import { useEffect, useState } from "react";

export const useCast = (idMovie: string) => {
    const [data, setData] = useState<ICast>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await castApi.findByCast(idMovie, "credits");
                setData(res);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [idMovie]);

    return { data };
};


