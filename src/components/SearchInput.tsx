"use client";
import "flowbite";
import { useCallback, useEffect, useRef, useState } from "react";
import useMoviesApi from "@/hooks/apis/useMoviesApi";
import { MoviesType } from "@/types/dataTypes";
import debounce from "lodash/debounce";
import { TMDB_BASE_IMAGE_URL_500 } from "@/constants/config";
import { useRouter } from "next/navigation";

const NUMBER_OF_DISPLAYING_MOVIES = 5;

const SearchInput = () => {
  const [searchResults, setSearchResults] = useState<MoviesType[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const api = useMoviesApi();
  const router = useRouter();

  const onChangeSearchInput = debounce(async ({ target }) => {
    try {
      setSearchInput(target.value);
      const res = await api.searchMovies(target.value);
      setSearchResults(res.results.slice(0, NUMBER_OF_DISPLAYING_MOVIES));
    } catch (e) {
      console.error(e);
    }
  }, 500);

  const handleClickSearchResult = useCallback(
    (movie: MoviesType) => {
      console.log("click");
      router.push(`/details?id=${movie.id}`);
    },
    [router],
  );

  const handleClickSeeMore = useCallback(() => {
    router.push(`/search?query=${searchInput}&page=1`);
  }, [router, searchInput]);

  return (
    <div className="w-full relative">
      <div className="flex w-full mb-4">
        <div className="relative w-full">
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search movies..."
            required
            onChange={onChangeSearchInput}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
      {searchResults.length > 0 && (
        <div
          id="dropdown"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 w-full absolute"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdown-button"
          >
            {searchResults.map((movie: MoviesType) => (
              <SearchItem
                movie={movie}
                key={movie.id}
                onClick={() => handleClickSearchResult(movie)}
              />
            ))}
            {searchResults.length >= NUMBER_OF_DISPLAYING_MOVIES && (
              <li className="text-center cursor-pointer">
                <button onClick={handleClickSeeMore}>See more</button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const SearchItem = ({ movie, onClick }) => {
  return (
    <div
      className="flex justify-start items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-600 mb-3"
      onClick={onClick}
    >
      <img
        className="w-8 ml-4"
        src={`${TMDB_BASE_IMAGE_URL_500}${movie.poster_path}`}
        alt="poster"
      />
      <button
        type="button"
        className="inline-flex w-full px-4 py-2 dark:hover:text-white"
      >
        {movie.title}
      </button>
    </div>
  );
};

export default SearchInput;
