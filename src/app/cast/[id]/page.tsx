"use client";
import { castApi } from "@/app/shared/api/api";
import { Layout } from "@/app/shared/components/layoutComponent";
import { useFetchData } from "@/app/shared/hook/useFetchData";
import { ICast, IParams } from "@/app/shared/interfaces";
import { useMemo } from "react";

export default function CastDetails(cast: IParams) {
    const apiCalls = useMemo(
        () => [
            {
                key: "details",
                call: () =>
                    castApi.findByPeaple(
                        `${cast.params.id}?append_to_response=external_ids`
                    )
            }
        ],
        [cast.params.id]
    );

    const { data } = useFetchData<{ details: ICast }>(apiCalls);
    const details = data?.details;

    return (
        <div>
            <Layout.Root>
                <Layout.Image
                    src={
                        "https://image.tmdb.org/t/p/w300" +
                        details?.profile_path
                    }
                    alt="poster cast"
                    className="w-76"
                />
            </Layout.Root>
        </div>
    );
}
