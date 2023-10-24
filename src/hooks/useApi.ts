import useAxios from "@/hooks/useAxios";
import { useMemo } from "react";
import useAxiosNewTMDB from "@/hooks/useAxiosNewTMDB";
import { AccessTokenType, RequestTokenType } from "@/types/apiTypes";
import { useAuthStore } from "@/store/useAuthStore";

export type AppApi = {
  getMovies: (page: number) => Promise<any>;
  getTrendingMovies: () => Promise<any>;
  getUpcomingMovies: () => Promise<any>;
};

function useApi(): AppApi {
  const axios = useAxios();

  return <AppApi>useMemo(() => {
    return {
      getMovies: async (page: number) =>
        await axios
          .get(`/discover/movie?page=${page ?? 1}`)
          .then((res) => res.data),
      getTrendingMovies: async () =>
        await axios
          .get(`/trending/movie/day?language=en-US`)
          .then((res) => res.data),
      getUpcomingMovies: async (page: number) =>
        await axios
          .get(`/movie/upcoming?page=${page ?? 1}`)
          .then((res) => res.data),
    };
  }, [axios]);
}

export default useApi;
