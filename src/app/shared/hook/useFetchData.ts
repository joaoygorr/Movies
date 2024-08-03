"use client";
import { useEffect, useState } from "react";

type Data = {
    [key: string]: any;
};

type ApiCall<T> = {
    key: string;
    call: () => Promise<T>;
};

export const useFetchData = <T extends Data>(apiCalls: ApiCall<any>[]) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const results = await Promise.all(
                    apiCalls.map((api) => api.call())
                );
                const newData: Data = {};
                results.forEach((result, index) => {
                    newData[apiCalls[index].key] = result;
                });
                setData(newData as T);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiCalls]);

    return { data, loading };
};
