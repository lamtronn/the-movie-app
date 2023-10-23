import { MoviesType } from "@/types/dataTypes";
import { TMDB_BASE_IMAGE_URL } from "@/constants/config";
import { Carousel } from "react-responsive-carousel";

("use-client");

type MoviesCarouselProps = {
  moviesList: MoviesType[];
};
const MoviesCarousel = ({ moviesList }: MoviesCarouselProps) => {
  return (
    <Carousel showArrows showStatus={false} infiniteLoop showThumbs={false}>
      {moviesList.map((item: MoviesType) => (
        <div key={item.id} className="mb-5">
          <img
            className="aspect-video object-cover"
            src={`${TMDB_BASE_IMAGE_URL}${item?.poster_path}`}
            alt="poster"
          />
          <p className="legend bg-black-100">{item.title}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default MoviesCarousel;
