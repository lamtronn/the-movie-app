"use client";

import { useCallback, useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import withAuth from "@/hocs/withAuth";
import { MoviesType } from "@/types/dataTypes";
import MoviesListWrapper from "@/components/MoviesListWrapper";
import Pagination from "@/components/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter, useSearchParams } from "next/navigation";

const Popular = () => {
  const searchParams = useSearchParams();
  const searchPage = searchParams?.get("page") ?? 1;
  const [page, setPage] = useState<number>(Number(searchPage) ?? 10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [moviesList, setMoviesList] = useState<MoviesType[]>([]);
  const api = useApi();

  const getMoviesData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.getMovies(page);
      setMoviesList(res.results);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [page]);

  useEffect(() => {
    getMoviesData();
  }, [api, getMoviesData]);

  const onGoToNewPage = (newPage: number) => {
    setPage(newPage);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?page=${newPage}`,
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <MoviesListWrapper moviesList={moviesList} />
      <Pagination
        page={page}
        onClickPreviousPage={() => onGoToNewPage(page - 1)}
        onClickNextPage={() => onGoToNewPage(page + 1)}
      />
    </div>
  );
};

export default withAuth(Popular);
