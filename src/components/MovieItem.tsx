"use client";
import { MoviesType } from "@/types/dataTypes";
import { TMDB_BASE_IMAGE_URL } from "@/constants/config";

type MoviesItemProps = {
  data: MoviesType;
};
const MoviesItem = ({ data }: MoviesItemProps) => {
  return (
    <div className="hover:scale-110 hover:bg-zinc-900 duration-100 transition ease-in-out delay-150 group">
      <img src={`${TMDB_BASE_IMAGE_URL}${data.poster_path}`} alt="poster" />
      <div className="p-3">
        <p className="text-lg hidden group-hover:block">{data.title}</p>
        <p className="text-xs hidden group-hover:block mt-4">{data.overview}</p>
        <p className="text-xs underline text-right hidden group-hover:block mt-4">Details ></p>
      </div>
    </div>
  );
};

export default MoviesItem;
