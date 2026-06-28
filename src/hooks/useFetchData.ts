"use client";
import { useEffect, useState, useRef } from "react";

type ApiCall = {
    key: string;
    call: (signal?: AbortSignal) => Promise<unknown>;
};

export const useFetchData = <T extends Record<string, unknown>>(
    apiCalls: ApiCall[]
) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        const fetchData = async () => {
            setLoading(true);
            try {
                const results = await Promise.all(
                    apiCalls.map((api) => api.call(abortController.signal))
                );
                const newData = {} as Record<string, unknown>;
                results.forEach((result, index) => {
                    newData[apiCalls[index].key] = result;
                });
                setData(newData as T);
            } catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'AbortError' || error.name === 'CanceledError') {
                        return;
                    }
                    if (error.message === 'canceled') {
                        return;
                    }
                }
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            abortController.abort();
        };
    }, [apiCalls]);

    return { data, loading };
};
