import { formatDate } from "@/app/shared/utils";
import "./banner.style.scss";
import Link from "next/link";
import { IListMovie } from "@/app/shared/interfaces";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Banner({
    prop,
    genre
}: {
    prop: IListMovie;
    genre: string;
}) {
    return (
        <div className="movie">
            <Link href={`/movie/${prop?.id}`}>
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
                <Link href={`/movie/${prop?.id}`} className="title-movie">
                    {prop?.title}
                </Link>
                <div className="specification">
                    <i className="pi pi-star-fill" />
                    <span className="ml-1">
                        {Math.trunc(prop?.vote_average! * 10) + "%"}
                    </span>
                    <span className="mx-2">|</span>
                    <span>
                        {formatDate(new Date(prop?.release_date!)).modelOne}
                    </span>
                </div>
                <span className="genre">{genre}</span>
            </div>
        </div>
    );
}
