import { MoviesType } from "@/types/dataTypes";
import MoviesItem from "@/components/MovieItem";
import { MoviesResultType } from "@/types/apiTypes";

type MoviesListWrapperProps = {
  moviesList: MoviesResultType[] | MoviesType[];
};
const MoviesListWrapper = ({ moviesList }: MoviesListWrapperProps) => {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
      {moviesList?.map((movie: MoviesResultType | MoviesType) => (
        <MoviesItem key={movie.id} data={movie} />
      ))}
    </div>
  );
};

export default MoviesListWrapper;
