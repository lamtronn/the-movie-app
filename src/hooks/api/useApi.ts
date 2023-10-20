import useAxios from "@/hooks/api/useAxios";
import { useMemo } from "react";
import useAxiosNewTMDB from "@/hooks/api/useAxiosNewTMDB";
import { AccessTokenType, RequestTokenType } from "@/types/apiTypes";

export type AppApi = {
  updateText: () => Promise<string>;
  getMovies: () => Promise<any>;
  getRequestToken: (currentURL: string) => Promise<RequestTokenType>;
  getAccessToken: (requestToken: string) => Promise<AccessTokenType>;
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
        axiosNewTMDB.post(`/auth/request_token`, { redirect_to: currentURL }),
      getAccessToken: async (requestToken: string) =>
        axiosNewTMDB.post(`/auth/access_token`, {
          request_token: requestToken,
        }),
      getMovies: async () => axios.get(`/discover/movie`),
    };
  }, [axios]);
}
export default useApi;
