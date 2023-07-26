import { ReactNode } from "react"
import "./filmRoot.style.scss";

type FilmRootProps = {
    children: ReactNode
}

export const FilmRoot = ({ children }: FilmRootProps) => {
    return (
        <section className="box-details">
            {children}
        </section>
    )
}