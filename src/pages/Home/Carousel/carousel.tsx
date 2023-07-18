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
                        <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} />
                    </div>

                    <div className="boxStar">
                        <i className="pi pi-bookmark-fill">
                            <i className="pi pi-star-fill"><h3>{item.vote_average}</h3> </i>
                        </i>
                    </div>

                </div>
            </div>
        )
    }

    if (isLoading) {
        return <div className='flex justify-center items-center'><ProgressSpinner /></div>;
    }

    return (
        <div className="boxContentCarousel">
            <Carousel value={data?.results} circular={true} showIndicators={false} itemTemplate={template} numVisible={3} numScroll={3} autoplayInterval={5000}/>
        </div>
    )
}