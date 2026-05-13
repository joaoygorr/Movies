'use client'
import "./sliderActors.style.scss";
import Slider from "react-slick";
import { ICast, ICastResponse } from "../../interfaces";
import { useTranslation } from "@/shared/hooks/useTranslation";
import Image from "next/image";
import { memo } from "react";

const SliderActorsComponent = ({ data }: { data: ICastResponse | undefined }) => {
    const cast = data?.cast || [];
    const { t } = useTranslation('cast');

    const filteredImages = cast?.filter((i: ICast) => i.profile_path !== null && i.profile_path !== undefined);

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
                <h2>{t('cast')}</h2>
                <div className="slider-box">
                    {filteredImages.length > 1 && (
                        <Slider {...settings}>
                            {filteredImages?.map((c, k) => (
                                <div className="cast" key={k}>
                                    <a href={`/cast/${c.id}`}>
                                        <Image
                                            src={
                                                "https://image.tmdb.org/t/p/w300" +
                                                c.profile_path
                                            }
                                            alt="poster elenco"
                                            width={200}
                                            height={300}
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
                            {filteredImages[0]?.id && filteredImages[0]?.profile_path && (
                                <a href={`/cast/${filteredImages[0]?.id}`}>
                                    <Image
                                        src={
                                            "https://image.tmdb.org/t/p/w300" +
                                            filteredImages[0]?.profile_path
                                        }
                                        alt="poster elenco"
                                        width={200}
                                        height={300}
                                        className="hover:opacity-75 transition ease-in-out duration-150"
                                    />
                                </a>
                            )}
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

export const SliderActors = memo(SliderActorsComponent);
