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

export const HomepageContext = createContext<ContextType>(undefined);

type ContextType = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  // page: number;
  // setPage: (value: number) => void;
  moviesList: MoviesType[];
  setMoviesList: (value: MoviesType[]) => void;
  trendingMoviesList: MoviesType[];
  setTrendingMoviesList: (value: MoviesType[]) => void;
};

const Homepage = () => {
  const api = useMoviesApi();
  const searchParams = useSearchParams();
  const searchPage = searchParams?.get("page") ?? 1;
  const [page, setPage] = useState<number>(Number(searchPage) ?? 10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [moviesList, setMoviesList] = useState<MoviesType[]>([]);
  const [trendingMoviesList, setTrendingMoviesList] = useState<MoviesType[]>(
    [],
  );

  const { onShowErrorToast } = useContext(ErrorContext);

  const contextValues = {
    isLoading,
    setIsLoading,
    moviesList,
    setMoviesList,
    trendingMoviesList,
    setTrendingMoviesList,
  };

  const getMoviesData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.getMovies(page);
      setMoviesList(res.results);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [api, page]);

  const getTrendingMoviesData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.getTrendingMovies();
      setTrendingMoviesList(res.results);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      onShowErrorToast(e);
    }
  }, [api]);

  useEffect(() => {
    getMoviesData();
    getTrendingMoviesData();
  }, [getMoviesData, getTrendingMoviesData]);

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
    <HomepageContext.Provider value={contextValues}>
      <MoviesCarousel />
      <MoviesListWrapper moviesList={moviesList} />
      <Pagination
        page={page}
        onClickPreviousPage={() => onGoToNewPage(page - 1)}
        onClickNextPage={() => onGoToNewPage(page + 1)}
      />
    </HomepageContext.Provider>
  );
};

export default withAuth(Homepage);
