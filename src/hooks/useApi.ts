import useAxios from "@/hooks/useAxios";
import { useMemo } from "react";
import useAxiosNewTMDB from "@/hooks/useAxiosNewTMDB";
import { AccessTokenType, RequestTokenType } from "@/types/apiTypes";
import { useAuthStore } from "@/store/useAuthStore";

export type AppApi = {
  getMovies: (page: number) => Promise<any>;
  getTrendingMovies: () => Promise<any>;
};

function useApi(): {
  getMovies: (page: number) => Promise<any>;
  getTrendingMovies: () => Promise<any>;
} {
  const axios = useAxios();
  const axiosNewTMDB = useAxiosNewTMDB();

  return useMemo(() => {
    return {
      getMovies: async (page: number) =>
        await axios
          .get(`/discover/movie?page=${page ?? 1}`)
          .then((res) => res.data),
      getTrendingMovies: async () =>
        await axios
          .get(`/trending/movie/day?language=en-US`)
          .then((res) => res.data),
    };
  }, [axios, axiosNewTMDB]);
}

export default useApi;
