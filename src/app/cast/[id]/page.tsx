"use client";
import { castApi } from "@/app/shared/api/api";
import { Layout } from "@/app/shared/components/layoutComponent";
import { useFetchData } from "@/app/shared/hook/useFetchData";
import { IActorDetails, IParams } from "@/app/shared/interfaces";
import { formatDate } from "@/app/shared/utils";
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
    const { data } = useFetchData<{ details: IActorDetails }>(apiCalls);
    const details = data?.details;

    const yearsOld =
        new Date().getFullYear() - parseInt(details?.birthday.split("-")[0]!);

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
                >
                    <ul className="info-social-media"></ul>
                </Layout.Image>

                <Layout.Details>
                    <h2 className="text-4xl mt-4 md:mt-0 font-semibold">
                        {details?.name}
                    </h2>

                    <div className="details-peaple text-gray-400">
                        <i className="pi pi-gift fill-current text-gray-400 hover:text-white w-4"></i>
                        <span className="ml-2">
                            {formatDate(new Date(details?.birthday!)).modelOne}(
                            {yearsOld} anos) em {details?.place_of_birth}
                        </span>
                    </div>

                    <p className="text-gray-300 mt-8">{details?.biography}</p>
                </Layout.Details>
            </Layout.Root>
        </div>
    );
}
