"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import withAuth from "@/hocs/withAuth";
import { MoviesType } from "@/types/dataTypes";
import MoviesListWrapper from "@/components/MoviesListWrapper";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSearchParams } from "next/navigation";

export const PopularContext = createContext<ContextType>(undefined);

type ContextType = {};

const Popular = () => {
  const searchParams = useSearchParams();
  const searchPage = searchParams?.get("page") ?? 1;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trendingMoviesList, setTrendingMoviesList] = useState<MoviesType[]>(
    [],
  );
  const api = useApi();

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
