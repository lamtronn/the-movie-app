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
import MoviesListWrapper from "@/components/MoviesListWrapper";
import Pagination from "@/components/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSearchParams } from "next/navigation";
import MoviesCarousel from "@/components/MoviesCarousel";
import { ErrorContext } from "@/hocs/ErrorBoundary";
import SearchInput from "@/components/SearchInput";
import { MoviesResultType } from "@/types/apiTypes";

export const HomepageContext = createContext<any>(undefined);

type ContextType = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  moviesList: MoviesResultType[];
  setMoviesList: (value: MoviesResultType[]) => void;
  trendingMoviesList: MoviesResultType[];
  setTrendingMoviesList: (value: MoviesResultType[]) => void;
};

const Homepage = () => {
  const api = useMoviesApi();
  const searchParams = useSearchParams();
  const searchPage = searchParams?.get("page") ?? 1;
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(Number(searchPage) ?? 10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [moviesList, setMoviesList] = useState<MoviesResultType[]>([]);
  const [trendingMoviesList, setTrendingMoviesList] = useState<
    MoviesResultType[]
  >([]);

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
      setTotalPages(res.total_pages);
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
      <SearchInput />
      <MoviesCarousel />
      <MoviesListWrapper moviesList={moviesList} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onClickPreviousPage={() => onGoToNewPage(page - 1)}
        onClickNextPage={() => onGoToNewPage(page + 1)}
      />
    </HomepageContext.Provider>
  );
};

export default withAuth(Homepage);
