"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import useMoviesApi from "@/hooks/apis/useMoviesApi";
import withAuth from "@/hocs/withAuth";
import { MoviesType } from "@/types/dataTypes";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import UpcomingMoviesListWrapper from "@/components/UpcomingMoviesListWrapper";
import { MoviesResultType } from "@/types/apiTypes";

export const UpcomingContext = createContext<any>(undefined);

const Upcoming = () => {
  const searchParams = useSearchParams();
  const searchPage = searchParams?.get("page") ?? 1;
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(Number(searchPage) ?? 10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<
    MoviesResultType[] | MoviesType[]
  >([]);
  const api = useMoviesApi();

  const contextValues = {};

  const getUpcomingMoviesData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.getUpcomingMovies(page);
      setUpcomingMoviesList(res.results);
      setTotalPages(res.total_pages);
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
        totalPages={totalPages}
        onClickPreviousPage={() => onGoToNewPage(page - 1)}
        onClickNextPage={() => onGoToNewPage(page + 1)}
      />
    </UpcomingContext.Provider>
  );
};

export default withAuth(Upcoming);
