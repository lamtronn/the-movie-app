import { MoviesType } from "@/types/dataTypes";
import MoviesItem from "@/components/MovieItem";

type MoviesListWrapperProps = {
  moviesList: MoviesType[];
};

const MoviesListWrapper = ({ moviesList }: MoviesListWrapperProps) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {moviesList?.map((movie: MoviesType) => (
        <div key={movie.id}>
          <MoviesItem data={movie} />
        </div>
      ))}
    </div>
  );
};

export default MoviesListWrapper;
