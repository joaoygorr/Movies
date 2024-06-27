import "./cast.style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useCast } from "./hook/useCast";

export const Cast = ({ param }: { param: string }) => {
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
                }
            }
        ]
    }

    const { data } = useCast(param);

    const filteredImages = data?.cast.filter(i => i.profile_path !== null);

    return (
        <div className="movie-cast">
            <div className="container cast-box">
                <h2>Elenco</h2>
                <div className="slider-box">
                    <Slider {...settings}>
                        {filteredImages?.map((c, k) => (
                            <div className="cast" key={k}>
                                <a href="#">
                                    <img src={"https://image.tmdb.org/t/p/w300" + c.profile_path} alt="poster elenco" className="hover:opacity-75 transition ease-in-out duration-150" />
                                </a>
                                <div className="info-cast">
                                    <a href="#" className="hover:text-gray:300">{c.original_name}</a>
                                    <div className="text-gray-400">{c.character}</div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}