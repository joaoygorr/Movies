import { ReactNode } from "react"
import "./filmInformation.style.scss";

type FilmInformationProps = {
    children: ReactNode
}

export const FilmInformation = ({ children }: FilmInformationProps) => {
    return (
        <div className="box-content-details">
            {children}
        </div>
    )
}