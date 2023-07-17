import { BoxContainer, BoxTopRated, BoxMain } from "./home.styled";
import { CarouselComponent } from "./Carousel/carousel";

function Home() {
 
  return (
    <BoxContainer>
      <BoxMain>

        <BoxTopRated>
          <CarouselComponent />
        </BoxTopRated>

      </BoxMain>
    </BoxContainer >
  )
}

export default Home;
