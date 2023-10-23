import { MoviesType } from "@/types/dataTypes";
import MoviesItem from "@/components/MovieItem";
import { useContext } from "react";
import { HomepageContext } from "@/views/HomeScreen/Homepage";

const MoviesListWrapper = () => {
  const { moviesList } = useContext(HomepageContext);

  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
      {moviesList?.map((movie: MoviesType) => (
        <MoviesItem key={movie.id} data={movie} />
      ))}
    </div>
  );
};

export default MoviesListWrapper;
