"use client";
import { useCallback, useEffect, useState } from "react";
import useMoviesApi from "@/hooks/apis/useMoviesApi";
import withAuth from "@/hocs/withAuth";
import { MovieDetailsType } from "@/types/dataTypes";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSearchParams } from "next/navigation";
import {
  IMDB_MOVIE_DETAILS_URL,
  TMDB_BASE_IMAGE_URL,
} from "@/constants/config";

const MovieDetails = () => {
  const searchParams = useSearchParams();
  const movieId = searchParams?.get("id");
  console.log(movieId);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType>();
  const api = useMoviesApi();

  const getTrendingMoviesData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.getMovieDetails(movieId);
      setMovieDetails(res);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [api]);

  useEffect(() => {
    getTrendingMoviesData();
  }, [getTrendingMoviesData]);

  const {
    vote_average = 0,
    title = "",
    genres = [],
    poster_path = "",
    overview = "",
    release_date = "",
    popularity = 0,
    imdb_id = "",
  } = movieDetails || {};

  if (isLoading && !movieDetails) {
    return <LoadingSpinner />;
  }

  return (
    <div className="block md:flex items-start gap-4">
      <img
        className="w-full md:w-1/5"
        src={`${TMDB_BASE_IMAGE_URL}${poster_path}`}
        alt="poster"
      />
      <div className="w-auto mt-4 md:pt-0">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="mb-4 text-3xl font-black">{title}</h1>
            <p className="mb-4 text-sm">Release date: {release_date}</p>
            <p className="mb-4 text-sm">Popularity: {popularity}</p>
            <p className="mb-4">
              {genres.map((it) => (
                <span
                  className="bg-gray-700 text-gray-100 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                  key={it.id}
                >
                  {it.name}
                </span>
              ))}
            </p>
          </div>
          <div>
            <p className="text-neutral-400 text-xs text-right">RATING</p>
            <p className="text-xs text-neutral-400">
              <span className="text-lg text-yellow-300 font-black">
                {vote_average.toFixed(1)}
              </span>{" "}
              / 10
            </p>
          </div>
        </div>
        <hr className="border-gray-700 my-3" />
        <p>{overview}</p>
        <a
          href={`${IMDB_MOVIE_DETAILS_URL}${imdb_id}`}
          className="mt-4 pt-4 text-blue-600 visited:text-purple-600 hover:underline"
          target="_blank"
        >
          See more on IMDB
        </a>
      </div>
    </div>
  );
};

export default withAuth(MovieDetails);
