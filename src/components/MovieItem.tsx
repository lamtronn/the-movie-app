"use client";
import {MoviesType} from "@/types/dataTypes";
import {TMDB_BASE_IMAGE_URL_500} from "@/constants/config";

type MoviesItemProps = {
  data: MoviesType;
};
const MoviesItem = ({data}: MoviesItemProps) => {
  return (
    <div className="hover:scale-110 duration-100 transition ease-in-out delay-150 group">
      <img src={`${TMDB_BASE_IMAGE_URL_500}${data.poster_path}`} alt="poster"/>
      <div className="p-3 group-hover:absolute group-hover:bg-zinc-900 w-full">
        <div className="flex justify-between items-center">
          <p className="text-lg">{data.title}</p>
          <span
            className="bg-yellow-100 justify-center hidden group-hover:block text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{data.vote_average.toFixed(1)}</span>

        </div>
        <p className="text-xs hidden group-hover:block mt-4">{data.overview}</p>
        <p className="text-xs underline text-right hidden group-hover:block mt-4">Details ></p>
      </div>
    </div>
  );
};

export default MoviesItem;
