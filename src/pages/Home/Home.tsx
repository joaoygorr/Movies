import { CarouselComponent } from "./Carousel/carousel";
import "./home.style.scss";

function Home() {

  return (
    <main className="boxContainer">
      <div className="boxContent">
        <div className="boxTopRated">
          <CarouselComponent />
        </div>
      </div>
    </main>
  )
}

export default Home;
