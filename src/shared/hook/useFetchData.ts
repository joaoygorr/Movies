"use client";
import { useEffect, useState, useRef } from "react";

type Data = {
    [key: string]: any;
};

type ApiCall<T> = {
    key: string;
    call: (signal?: AbortSignal) => Promise<T>;
};

export const useFetchData = <T extends Data>(apiCalls: ApiCall<any>[]) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        // Cancel previous request
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
                const newData: Data = {};
                results.forEach((result, index) => {
                    newData[apiCalls[index].key] = result;
                });
                setData(newData as T);
            } catch (error) {
                // Check if request was cancelled (AbortError or Axios CanceledError)
                if (error instanceof Error) {
                    if (error.name === 'AbortError' || error.name === 'CanceledError') {
                        // Request was cancelled, do nothing
                        return;
                    }
                    if (error.message === 'canceled') {
                        // Axios cancel
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
