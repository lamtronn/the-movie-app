"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import useMoviesApi from "@/hooks/apis/useMoviesApi";
import withAuth from "@/hocs/withAuth";
import { MoviesType } from "@/types/dataTypes";
import MoviesListWrapper from "@/components/MoviesListWrapper";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSearchParams } from "next/navigation";
import { MoviesResultType } from "@/types/apiTypes";

export const PopularContext = createContext<any>(undefined);

const Popular = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trendingMoviesList, setTrendingMoviesList] = useState<
    MoviesResultType[] | MoviesType[]
  >([]);
  const api = useMoviesApi();

  const contextValues = {};

  const getTrendingMoviesData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.getTrendingMovies();
      setTrendingMoviesList(res.results);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [api]);

  useEffect(() => {
    getTrendingMoviesData();
  }, [getTrendingMoviesData]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <PopularContext.Provider value={contextValues}>
      <h1 className="mb-4">Top 20 trending movies</h1>
      <MoviesListWrapper moviesList={trendingMoviesList} />
    </PopularContext.Provider>
  );
};

export default withAuth(Popular);
