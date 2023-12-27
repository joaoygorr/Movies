import { useState } from "react";
import "./filmContent.style.scss";
import { Dialog } from "@/shared/Components"
import { IVideos } from "@/shared/Interfaces";
import { useVideo } from "../../hook/useVideo";

type FilmContentProps = {
    genres: [{ id: number, name: string }] | undefined
    videos: IVideos | undefined
}

export const FilmContent = ({ genres, videos }: FilmContentProps) => {

    const [toggle, setToggle] = useState<boolean>(false);
    const filteredResults = useVideo(videos);
    const { key = '', name = '' } = filteredResults || {};

    return (
        <div className="box-genres">
            <div className="genre">
                {genres?.map((genre, key) => {
                    return (
                        <span key={key}>{genre.name}</span>
                    )
                })}
            </div>
            <div className="pulse" onClick={() => setToggle(true)}>
                <button type="button"><i className="pi pi-play" /></button>
            </div>

            <Dialog.Root onHide={() => setToggle(false)} visible={toggle} header={name} width="auto">
                <iframe src={`https://www.youtube.com/embed/${key}`} width={1412} height={760} allowFullScreen></iframe>
            </Dialog.Root>
        </div>
    )
}