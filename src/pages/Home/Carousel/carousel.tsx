import { IMovie, IResponse } from '@/shared/Interfaces';
import { MovieService } from '@/shared/services/movieService';
import { Carousel } from 'primereact/carousel';
import { useQuery } from 'react-query';
import { ProgressSpinner } from 'primereact/progressspinner';
import "./carousel.style.scss";

export const CarouselComponent = () => {
    const { data, isLoading } = useQuery<IResponse<IMovie[]>>("movies", () => {
        const response = MovieService.getPopularMovie();
        return response;
    })

    const template = (item: IMovie) => {
        return (
            <div className="boxCard">
                <div className="boxContentMovie">
                    <div className="boxImage">
                        <img src={"https://image.tmdb.org/t/p/original" + item.backdrop_path} />
                    </div>

                    <div className="boxTitle">
                        <h1>{item.title}</h1>
                    </div>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return <ProgressSpinner />;
    }

    return (
        <div className="max-w-screen-xl mx-auto">
            <Carousel value={data?.results} itemTemplate={template} numVisible={1} numScroll={1} autoplayInterval={3000} />
        </div>
    )
}