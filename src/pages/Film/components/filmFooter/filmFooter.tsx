import "./filmFooter.style.scss";

type FilmeFooterProps = {
    tagline: string,
    overview: string
}

export const FilmFooter = ({ overview, tagline }: FilmeFooterProps) => {
    return (
        <div className="box-infos">
            <h3 className="box-tagLine">{tagline}</h3>

            <h3 className="box-sinopse">sinopse</h3>
            <div className="box-overview">
                <p>{overview}</p>
            </div>
        </div>
    )
}