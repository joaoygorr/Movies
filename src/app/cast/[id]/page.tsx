"use client";
import { castApi } from "@/app/shared/api/api";
import { Layout } from "@/app/shared/components/layoutComponent";
import { useFetchData } from "@/app/shared/hook/useFetchData";
import { IActorDetails } from "@/app/shared/interfaces";
import { formatDate } from "@/app/shared/utils";
import { useEffect, useMemo, useState } from "react";
import "./cast.style.scss";
import { useParams } from "next/navigation";

export default function CastDetails() {
    const cast = useParams();

    const apiCalls = useMemo(
        () => [
            {
                key: "details",
                call: () =>
                    castApi.findByPeaple(
                        `${cast.id}?append_to_response=external_ids,movie_credits`
                    )
            }
        ],
        [cast.id]
    );

    const [socialMedia, setSocialMedia] = useState<string[]>([]);
    const [valueSocialMedia, setValueSocialMedia] = useState<string[]>([]);

    const { data } = useFetchData<{ details: IActorDetails }>(apiCalls);
    const details = data?.details;

    const yearsOld =
        new Date().getFullYear() - parseInt(details?.birthday?.split("-")[0]!);

    useEffect(() => {
        if (details?.external_ids) {
            const excludeKeys = ["freebase", "imdb", "tvrage", "wikidata"];

            const nonNullEntries = Object.entries(details.external_ids).filter(
                ([key, value]) =>
                    value !== null &&
                    value !== "" &&
                    !excludeKeys.includes(key.split("_")[0])
            );

            const listSocialMedia = Array.from(
                new Set(nonNullEntries.map(([key]) => key.split("_")[0]))
            );

            const socialMediaValues = nonNullEntries.map(([_, value]) => value);
            setValueSocialMedia(socialMediaValues);
            setSocialMedia(listSocialMedia);
        }
    }, [details?.external_ids]);

    const filteredDates = details?.movie_credits.cast
        .filter(
            (e, i, self) =>
                e.release_date &&
                i === self.findIndex((t) => t.title === e.title)
        )
        .sort(
            (a, b) =>
                parseInt(b.release_date.split("-")[0].trim()) -
                parseInt(a.release_date.split("-")[0].trim())
        );

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
                    <ul className="info-social-media">
                        {socialMedia?.map((media, i) => (
                            <li className={i > 0 ? "ml-6" : ""} key={i}>
                                <a
                                    href={`https://${media}.com/${
                                        media === "tiktok" ? "@" : ""
                                    }${valueSocialMedia[i]}`}
                                >
                                    <i
                                        className={`pi pi-${media} fill-current text-gray-400 hover:text-white`}
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                </Layout.Image>

                <Layout.Details>
                    <h2 className="text-4xl mt-4 md:mt-0 font-semibold">
                        {details?.name}
                    </h2>

                    <div className="details-peaple text-gray-400">
                        <i className="pi pi-gift fill-current text-gray-400 hover:text-white w-4" />
                        <span className="ml-2">
                            {formatDate(new Date(details?.birthday!)).modelOne}(
                            {yearsOld} anos) em {details?.place_of_birth}
                        </span>
                    </div>

                    <p className="text-gray-300 mt-8">{details?.biography}</p>
                </Layout.Details>
            </Layout.Root>

            <div className="credits border-b border-gray-800">
                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-4xl font-semibold">Créditos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                        {filteredDates?.map((c, i) => (
                            <span key={i}>
                                {c?.release_date.split("-")[0]} ·
                                <strong className="hover:underline">
                                    <a href={`/movie/${c?.id}`}> {c?.title}</a>
                                </strong>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
