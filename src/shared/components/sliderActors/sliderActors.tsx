import "./sliderActors.style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ICast, ICastResponse } from "../../interfaces";
import { useAppContext } from "@/shared/context/context";

export const SliderActors = ({ data }: { data: ICastResponse | undefined }) => {
    const cast = data?.cast || [];
    const { language } = useAppContext();

    const filteredImages = cast?.filter((i: ICast) => i.profile_path !== null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: filteredImages.length <= 1 ? 1 : 4,
        slidesToScroll: filteredImages.length <= 1 ? 1 : 4,
        autoplay: filteredImages.length > 4,
        autoplaySpeed: 4000,
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

    return (
        <div className="movie-cast">
            <div className="container cast-box">
                <h2>{language === "en-US" ? "Cast" : "Elenco"}</h2>
                <div className="slider-box">
                    {filteredImages.length > 1 && (
                        <Slider {...settings}>
                            {filteredImages?.map((c, k) => (
                                <div className="cast" key={k}>
                                    <a href={`/cast/${c.id}`}>
                                        <img
                                            src={
                                                "https://image.tmdb.org/t/p/w300" +
                                                c.profile_path
                                            }
                                            alt="poster elenco"
                                            className="hover:opacity-75 transition ease-in-out duration-150"
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
                    )}
                    {filteredImages.length <= 1 && (
                        <div className="cast">
                            <a href={`/cast/${filteredImages[0]?.id}`}>
                                <img
                                    src={
                                        "https://image.tmdb.org/t/p/w300" +
                                        filteredImages[0]?.profile_path
                                    }
                                    alt="poster elenco"
                                    className="hover:opacity-75 transition ease-in-out duration-150"
                                />
                            </a>
                            <div className="info-cast">
                                <a
                                    href={`/cast/${filteredImages[0]?.id}`}
                                    className="hover:text-gray:300"
                                >
                                    {filteredImages[0]?.original_name}
                                </a>
                                <div className="text-gray-400">
                                    {filteredImages[0]?.character}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
