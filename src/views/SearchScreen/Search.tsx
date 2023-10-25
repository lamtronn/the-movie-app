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
import MoviesCarousel from "@/components/MoviesCarousel";
import { ToastContainer, toast } from "react-toastify";
import ErrorBoundary, { ErrorContext } from "@/hocs/ErrorBoundary";
import SearchInput from "@/components/SearchInput";

export const SearchContext = createContext<ContextType>(undefined);

type ContextType = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  // page: number;
  // setPage: (value: number) => void;
  moviesList: MoviesType[];
  setMoviesList: (value: MoviesType[]) => void;
};

const Search = () => {
  const api = useMoviesApi();
  const searchParams = useSearchParams();
  const searchPage = searchParams?.get("page") ?? 1;
  const searchQuery = searchParams?.get("query") ?? 1;
  const [totalPages, setTotalPages] = useState<number>(0);
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
      const res = await api.searchMovies(searchQuery, page);
      setMoviesList(res.results);
      setTotalPages(res.total_pages);
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
      <p className="mb-4">Results for "{searchQuery}"</p>
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
