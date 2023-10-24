"use client";
import {MoviesType} from "@/types/dataTypes";
import {TMDB_BASE_IMAGE_URL_500} from "@/constants/config";
import {useRouter} from "next/navigation";

type MoviesItemProps = {
  data: MoviesType;
};
const MoviesItem = ({data}: MoviesItemProps) => {
  const router = useRouter()
  const {id = 0, poster_path = '', title = '', overview = ''} = data || {}
  const onClickOnMovieItem = () => {
    router.push(`/details?id=${id}`)
  }
  return (
    <div onClick={onClickOnMovieItem} className="hover:scale-110 duration-100 transition ease-in-out delay-150 group cursor-pointer">
      <img src={`${TMDB_BASE_IMAGE_URL_500}${poster_path}`} alt="poster"/>
      <div className="p-3 group-hover:absolute group-hover:bg-zinc-900 w-full">
        <div className="flex justify-between items-center">
          <p className="text-lg">{title}</p>
          <span
            className="bg-yellow-100 justify-center hidden group-hover:block text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{data.vote_average.toFixed(1)}</span>

        </div>
        <p className="text-xs hidden group-hover:block mt-4">{overview}</p>
        <p className="text-xs underline text-right hidden group-hover:block mt-4">Details ></p>
      </div>
    </div>
  );
};

export default MoviesItem;
