import { CarouselComponent } from "./Carousel/carousel";
import "./home.style.scss";

function Home() {

  return (
    <main className="boxContainer">
      <div className="boxContent mx-auto">
        <section className="boxTopRated">
          <CarouselComponent />
        </section>
      </div>
    </main>
  )
}

export default Home;
