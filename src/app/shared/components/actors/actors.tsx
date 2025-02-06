import "./actors.style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ICast, ICastResponse } from "../../interfaces";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Actors = ({ data }: { data: ICastResponse | undefined }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false
                }
            }
        ]
    };

    const cast = data?.cast || [];

    const filteredImages = cast?.filter((i: ICast) => i.profile_path !== null);

    return (
        <div className="movie-cast">
            <div className="container cast-box">
                <h2>Elenco</h2>
                <div className="slider-box">
                    <Slider {...settings}>
                        {filteredImages?.map((c, k) => (
                            <div className="cast" key={k}>
                                <a href={`/cast/${c.id}`}>
                                    <LazyLoadImage
                                        src={
                                            "https://image.tmdb.org/t/p/w300" +
                                            c.profile_path
                                        }
                                        alt="poster elenco"
                                        effect="blur"
                                        wrapperClassName="hover:opacity-75 transition ease-in-out duration-150"
                                        placeholderSrc={`https://image.tmdb.org/t/p/w300${c.profile_path}`}
                                    />
                                </a>
                                <div className="info-cast">
                                    <a
                                        href={`/cast/${c.id}`}
                                        className="hover:text-gray:300"
                                    >
                                        {c.original_name}
                                    </a>
                                    <div className="text-gray-400">
                                        {c.character}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};
