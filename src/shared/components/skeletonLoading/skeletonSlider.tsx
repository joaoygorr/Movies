import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";

export default function SkeletonSlider() {
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
    return (
        <div className="movie-cast">
            <div className="container cast-box">
                <h2>
                    <Skeleton width={130} />
                </h2>
                <div className="slider-box">
                    <Slider {...settings}>
                        {Array(4)
                            .fill(0)
                            ?.map((c, k) => (
                                <div className="cast" key={k}>
                                    <Skeleton width={300} height={450} />
                                    <div className="info-cast">
                                        <Skeleton width={100} />
                                        <div className="text-gray-400">
                                            <Skeleton width={100} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}
