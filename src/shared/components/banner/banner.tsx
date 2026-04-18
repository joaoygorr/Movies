import { formatDate } from "@/shared/utils";
import "./banner.style.scss";
import Link from "next/link";
import { IListMovie, IListTvShows } from "../../interfaces";
import { memo } from "react";
import Image from "next/image";

type BannerProps<T> = {
    prop: T;
    genre: string;
};

function BannerComponent<T extends IListMovie | IListTvShows>({
    prop,
    genre
}: BannerProps<T>) {
    return (
        <div className="movie">
            <Link
                href={`/${"title" in prop ? "movie" : "tvShows"}/${prop?.id}`}
            >
                <Image
                    src={"https://image.tmdb.org/t/p/w500" + prop?.poster_path}
                    alt="Poster"
                    width={300}
                    height={450}
                />
            </Link>
            <div className="detail-movie">
                <Link
                    href={`/${"title" in prop ? "movie" : "tvShows"}/${
                        prop?.id
                    }`}
                    className="title-movie"
                >
                    {"title" in prop ? prop.title : prop.name}
                </Link>
                <div className="specification">
                    <i className="pi pi-star-fill" />
                    <span className="ml-1">
                        {Math.trunc(prop?.vote_average! * 10) + "%"}
                    </span>
                    <span className="mx-2">|</span>
                    <span>
                        {
                            formatDate(
                                new Date(
                                    "release_date" in prop
                                        ? prop?.release_date
                                        : prop?.first_air_date
                                )
                            ).modelOne
                        }
                    </span>
                </div>
                <span className="genre">{genre}</span>
            </div>
        </div>
    );
}

export default memo(BannerComponent);
