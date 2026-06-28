"use client";
import { useEffect, useState, useRef } from "react";

type ApiCall<K extends string, V> = {
    key: K;
    call: (signal?: AbortSignal) => Promise<V>;
};

type ApiCallEntry = ApiCall<string, unknown>;

export const useFetchData = <T extends Record<string, unknown>>(
    apiCalls: { [K in keyof T]: ApiCall<K & string, T[K]> }[keyof T][]
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
                const calls = apiCalls as ApiCallEntry[];
                const results = await Promise.all(
                    calls.map((api) => api.call(abortController.signal))
                );
                const newData = {} as Record<string, unknown>;
                results.forEach((result, index) => {
                    newData[calls[index].key] = result;
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
