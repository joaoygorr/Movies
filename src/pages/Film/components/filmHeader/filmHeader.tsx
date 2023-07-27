import { ReturnDate, ReturnHours } from "@/shared/utils";
import "./filmHeader.style.scss";

type FilmHeaderProps = {
    title: string,
    release_date: string,
    runtime: number
}

export const FilmHeader = ({ release_date, runtime, title }: FilmHeaderProps) => {
    return (
        <div className="box-title">
            <div className="box-titles-content">
                <h1>{title}</h1>
                <span className="year">({ReturnDate(release_date).year}) </span>
                <span className="hours">• {ReturnHours(runtime)}</span>
            </div>
            <span className="date-completed">{ReturnDate(release_date).completed}</span>
        </div>
    )
}