import { IVideo } from "../../interfaces";
import "./modal.styled.scss";

export const Modal = ({
    video,
    hidden
}: {
    video: IVideo;
    hidden: (visible: boolean) => any;
}) => {
    console.log("video:", video);

    return (
        <div className="modal-box shadow-lg">
            <div className="container modal lg:px-32 rounded-lg">
                <div className="children">
                    <div className="button-close">
                        <button
                            type="button"
                            onClick={() => hidden(false)}
                            className="hover:text-gray-300"
                        >
                            x
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-children responsive-container">
                            <iframe
                                src={`https://www.youtube.com/embed/${video.results[0].key}?autoplay=1`}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
