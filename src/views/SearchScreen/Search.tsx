"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useMoviesApi from "@/hooks/apis/useMoviesApi";
import withAuth from "@/hocs/withAuth";
import { MoviesType } from "@/types/dataTypes";
import MoviesListWrapper from "@/components/MoviesListWrapper";
import Pagination from "@/components/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSearchParams } from "next/navigation";
import { ErrorContext } from "@/hocs/ErrorBoundary";

export const SearchContext = createContext<any>(undefined);

type ContextType = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  moviesList: MoviesType[];
  setMoviesList: (value: MoviesType[]) => void;
};

const Search = () => {
  const api = useMoviesApi();
  const searchParams = useSearchParams();
  const searchPage = searchParams?.get("page") ?? 1;
  const searchQuery = searchParams?.get("query") ?? 1;
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [page, setPage] = useState<number>(Number(searchPage) ?? 10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [moviesList, setMoviesList] = useState<MoviesType[]>([]);

  const { onShowErrorToast } = useContext(ErrorContext);

  const contextValues = {
    isLoading,
    setIsLoading,
    moviesList,
    setMoviesList,
  };

  const getMoviesData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.searchMovies(searchQuery.toString(), page);
      setMoviesList(res.results);
      setTotalPages(res.total_pages);
      setTotalResults(res.total_results);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      onShowErrorToast(e);
    }
  }, [api, onShowErrorToast, page, searchQuery]);

  useEffect(() => {
    getMoviesData();
  }, [getMoviesData]);

  const onGoToNewPage = useCallback((newPage: number) => {
    setPage(newPage);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?query=${searchQuery}&page=${newPage}`,
    );
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SearchContext.Provider value={contextValues}>
      <p className="mb-4">
        {totalResults} results for{" "}
        <span className="font-black"> {searchQuery}</span>
      </p>
      <MoviesListWrapper moviesList={moviesList} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onClickPreviousPage={() => onGoToNewPage(page - 1)}
        onClickNextPage={() => onGoToNewPage(page + 1)}
      />
    </SearchContext.Provider>
  );
};

export default withAuth(Search);
