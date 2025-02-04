import { formatDate } from "@/app/shared/utils";
import "./banner.style.scss";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IListMovie, IListTvShows } from "../../interfaces";

type BannerProps<T> = {
    prop: T;
    genre: string;
};

export default function Banner<T extends IListMovie | IListTvShows>({
    prop,
    genre
}: BannerProps<T>) {
    return (
        <div className="movie">
            <Link
                href={`/${"title" in prop ? "movie" : "tvShows"}/${prop?.id}`}
            >
                <LazyLoadImage
                    key={prop?.poster_path}
                    src={"https://image.tmdb.org/t/p/w500" + prop?.poster_path}
                    alt="poster filme"
                    effect="blur"
                    wrapperClassName="hover:opacity-75 transition ease-in-out duration-150"
                    placeholderSrc={`https://image.tmdb.org/t/p/w500${prop?.poster_path}`}
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
