import useAxios from "@/hooks/useAxios";
import { useMemo } from "react";
import { MoviesResponseType } from "@/types/apiTypes";
import { MovieDetailsType } from "@/types/dataTypes";

export type AppApi = {
  getMovies: (page: number) => Promise<MoviesResponseType>;
  getTrendingMovies: () => Promise<MoviesResponseType>;
  getUpcomingMovies: (page: number) => Promise<MoviesResponseType>;
  getMovieDetails: (
    movieId: string | null | undefined,
  ) => Promise<MovieDetailsType>;
  searchMovies: (query: string, page?: number) => Promise<any>;
};

function useMoviesApi(): AppApi {
  const axios = useAxios();

  return useMemo(() => {
    return {
      getMovies: async (page: number) =>
        await axios
          .get(`/discover/movie?page=${page ?? 1}`)
          .then((res) => res.data),
      getTrendingMovies: async () =>
        await axios
          .get(`/trending/movie/day?language=en-US`)
          .then((res) => res.data),
      getUpcomingMovies: async (page: number) =>
        await axios
          .get(`/movie/upcoming?page=${page ?? 1}`)
          .then((res) => res.data),
      getMovieDetails: async (id: number) =>
        await axios.get(`/movie/${id}`).then((res) => res.data),
      searchMovies: async (query: string, page: number) =>
        await axios
          .get(`/search/movie?query=${query}&page=${page ?? 1}`)
          .then((res) => res.data),
    };
  }, [axios]) as any;
}

export default useMoviesApi;
