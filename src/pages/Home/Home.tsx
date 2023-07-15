import { CarouselComponent } from "./carousel/carousel";
import { BoxContainer, BoxTopRated, BoxMain } from "./home.styled";

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
