import { IMovie, IResponse } from '@/shared/Interfaces';
import { MovieService } from '@/shared/services/movieService';
import { Carousel } from 'primereact/carousel';
import { useQuery } from 'react-query';
import { BoxCard, BoxImage, BoxContent, BoxTitle, Img } from './carousel.styled';
import { ProgressSpinner } from 'primereact/progressspinner';

export const CarouselComponent = () => {
    const { data, isLoading } = useQuery<IResponse<IMovie[]>>("movies", () => {
        const response = MovieService.getPopularMovie();
        return response;
    })

    const template = (item: IMovie) => {
        return (
            <BoxCard>
                <BoxContent>
                    <BoxImage>
                        <Img src={"https://image.tmdb.org/t/p/original" + item.backdrop_path} />
                    </BoxImage>

                    <BoxTitle>
                        <h1>{item.title}</h1>
                    </BoxTitle>
                </BoxContent>
            </BoxCard>
        )
    }

    if (isLoading) {
        return <ProgressSpinner />;
    }

    return (
        <div className="max-w-screen-xl mx-auto">
            <Carousel value={data?.results} itemTemplate={template} numVisible={1} numScroll={1} autoplayInterval={3000}/>

        </div>
    )
}