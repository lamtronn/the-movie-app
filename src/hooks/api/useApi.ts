import useAxios from "@/hooks/api/useAxios";
import { useMemo } from "react";
import useAxiosNewTMDB from "@/hooks/api/useAxiosNewTMDB";
import { AccessTokenType, RequestTokenType } from "@/types/apiTypes";

export type AppApi = {
  updateText: () => Promise<string>;
  getMovies: (page: number) => Promise<any>;
  getTrendingMovies: () => Promise<any>;
  getRequestToken: (currentURL: string) => Promise<RequestTokenType>;
  getAccessToken: (requestToken: string) => Promise<AccessTokenType>;
  deleteAccessToken: (accessToken: string) => Promise<any>;
};

function useApi(): AppApi {
  const axios = useAxios();
  const axiosNewTMDB = useAxiosNewTMDB();

  return useMemo(() => {
    return {
      updateText: async () => {
        return "text is updated!";
      },
      getRequestToken: async (currentURL: string) =>
        await axiosNewTMDB.post(`/auth/request_token`, {
          redirect_to: currentURL,
        }),
      getAccessToken: async (requestToken: string) =>
        await axiosNewTMDB.post(`/auth/access_token`, {
          request_token: requestToken,
        }),
      deleteAccessToken: async (accessToken: string) =>
        await axiosNewTMDB.delete(`/auth/access_token`, {
          data: {
            access_token: accessToken,
          },
        }),
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
