"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import useMoviesApi from "@/hooks/apis/useMoviesApi";
import withAuth from "@/hocs/withAuth";
import { MoviesType } from "@/types/dataTypes";
import MoviesListWrapper from "@/components/MoviesListWrapper";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import UpcomingMoviesListWrapper from "@/components/UpcomingMoviesListWrapper";

export const UpcomingContext = createContext<ContextType>(undefined);

type ContextType = {};

const Upcoming = () => {
  const searchParams = useSearchParams();
  const searchPage = searchParams?.get("page") ?? 1;
  const [page, setPage] = useState<number>(Number(searchPage) ?? 10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<MoviesType[]>(
    [],
  );
  const api = useMoviesApi();

  const contextValues = {};

  const getUpcomingMoviesData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.getUpcomingMovies(page);
      setUpcomingMoviesList(res.results);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [api, page]);

  useEffect(() => {
    getUpcomingMoviesData();
  }, [getUpcomingMoviesData]);

  const onGoToNewPage = useCallback((newPage: number) => {
    setPage(newPage);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?page=${newPage}`,
    );
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <UpcomingContext.Provider value={contextValues}>
      <h1 className="mb-4">Upcoming movies</h1>
      <UpcomingMoviesListWrapper moviesList={upcomingMoviesList} />
      <Pagination
        page={page}
        onClickPreviousPage={() => onGoToNewPage(page - 1)}
        onClickNextPage={() => onGoToNewPage(page + 1)}
      />
    </UpcomingContext.Provider>
  );
};

export default withAuth(Upcoming);
