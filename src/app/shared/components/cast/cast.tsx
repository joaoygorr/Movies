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
    }

    const { data } = useCast(param);

    return (
        <div className="movie-cast">
            <div className="container cast-box">
                <h2>Elenco</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    <Slider {...settings}>
                        {data?.cast.map((c, k) => (
                            <div className="mt-8" key={k}>
                                <a href="#">
                                    <img src={"https://image.tmdb.org/t/p/w300" + c.profile_path} alt="poster elenco" className="hover:opacity-75 transition ease-in-out duration-150" />
                                </a>
                                <div className="mt-2">
                                    <a href="#" className="text-lg mt-2 hover:text-gray:300">{c.original_name}</a>
                                    <div className="text-sm text-gray-400">{c.character}</div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}