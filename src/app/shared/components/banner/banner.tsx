import { formatDate } from "@/app/shared/utils";
import "./banner.style.scss";
import Link from "next/link";
import { IGenre, IGenresResponse, IListMovie } from "@/app/shared/interfaces";
import { useMemo } from "react";
import { genreApi } from "../../api/api";
import { useFetchData } from "../../hook/useFetchData";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Banner({ prop }: { prop: IListMovie | undefined }) {
    const apiCalls = useMemo(
        () => [
            {
                key: "genres",
                call: () => genreApi.findAllGenre("/movie/list")
            }
        ],
        [prop]
    );

    const { data } = useFetchData<IGenresResponse>(apiCalls);
    const response = data?.genres;

    function filterGenres(genre: string[]) {
        const genreFiltered = response?.genres?.filter((e: IGenre) =>
            genre?.includes(e.id)
        );
        return genreFiltered
            ?.map((value: IGenre) => {
                return value.name;
            })
            .join(", ");
    }

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
                <span className="genre">{filterGenres(prop?.genre_ids!)}</span>
            </div>
        </div>
    );
}
