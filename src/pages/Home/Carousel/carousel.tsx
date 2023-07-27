import { IMovie, IResponse } from '@/shared/Interfaces';
import { MovieListService } from '@/shared/services';
import { Carousel } from 'primereact/carousel';
import { useQuery } from 'react-query';
import { ProgressSpinner } from 'primereact/progressspinner';
import "./carousel.style.scss";
import { Dialog } from '@/shared/Components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CarouselComponent = () => {
    const { data: movieList, isLoading } = useQuery<IResponse<IMovie[]>>("movies", () => {
        const response = MovieListService.getPopularMovie();
        return response;
    }, { staleTime: 1000 * 60 });

    const [movie, setMovie] = useState<IMovie>();
    const [toggle, setToggle] = useState<boolean>(false);
    const navigate = useNavigate();

    function showDialog(movie: IMovie) {
        setMovie(movie);
        setToggle(true);
    }

    const template = (item: IMovie) => {
        return (
            <div className="boxCard" onClick={() => showDialog(item)}>
                <div className="boxContentMovie hover:cursor-pointer">
                    <div className="boxImage">
                        <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} />
                    </div>

                    <div className="boxStar">
                        <i className="pi pi-bookmark-fill">
                            <i className="pi pi-star-fill text-center"><h3>{item.vote_average}%</h3></i>
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
            <Carousel value={movieList?.results} circular={true} showIndicators={false} itemTemplate={template} numVisible={3} numScroll={3} autoplayInterval={9000} />

            <Dialog.Root header={movie?.title!} onHide={() => setToggle(false)} visible={toggle}>
                <Dialog.Description description={movie?.overview || ""} image={movie?.backdrop_path} />

                <Dialog.Footer className='flex justify-center items-center'>
                    <button className="bg-sky-600 p-3 rounded-full capitalize font-semibold	text-base font-sans text-white mt-5" onClick={() => navigate(`/film/${movie?.id}`)}>ver mais...</button>
                </Dialog.Footer>
            </Dialog.Root>
        </div>
    )
}