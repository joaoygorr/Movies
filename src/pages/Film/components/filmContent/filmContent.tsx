import "./filmContent.style.scss";

type FilmContentProps = {
    genres: [{ id: number, name: string }] | undefined
}

export const FilmContent = ({ genres }: FilmContentProps) => {
    return (
        <div className="box-genres">
            <div className="genre">
                {genres?.map((genre, key) => {
                    return (
                        <span key={key}>{genre.name}</span>
                    )
                })}
            </div>
            <div className="pulse">
                <button><i className="pi pi-play" /></button>
            </div>
        </div>
    )
}