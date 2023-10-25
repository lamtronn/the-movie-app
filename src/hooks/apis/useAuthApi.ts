import useAxios from "@/hooks/useAxios";
import { useMemo } from "react";
import useAxiosNewTMDB from "@/hooks/useAxiosNewTMDB";
import {
  AccessTokenDeleteResultType,
  AccessTokenResultType,
  AccessTokenType,
  RequestTokenType,
} from "@/types/apiTypes";
import { useAuthStore } from "@/store/useAuthStore";
import { setRequestToken } from "@/store/slices/authSlice";

export type AppApi = {
  getRequestToken: (currentURL: string) => Promise<RequestTokenType>;
  getAccessToken: (requestToken: string) => Promise<AccessTokenType>;
  deleteAccessToken: (accessToken: string) => Promise<any>;
};

function useAuthApi(): {
  getRequestToken: (currentURL: string) => Promise<RequestTokenType>;
  deleteAccessToken: (
    accessToken: string,
  ) => Promise<AccessTokenDeleteResultType>;
  getAccessToken: (requestToken: string) => Promise<AccessTokenResultType>;
} {
  const axios = useAxios();
  const axiosNewTMDB = useAxiosNewTMDB();

  const { setAccessToken, setIsLoadingAccessToken, setRequestToken } =
    useAuthStore();

  return useMemo(() => {
    return {
      getRequestToken: async (currentURL: string) =>
        await axiosNewTMDB.post(`/auth/request_token`, {
          redirect_to: currentURL,
        }),
      getAccessToken: async (requestToken: string) => {
        setIsLoadingAccessToken(true);
        const res = await axiosNewTMDB.post(`/auth/access_token`, {
          request_token: requestToken,
        });
        setAccessToken(res.data.access_token);
        setIsLoadingAccessToken(false);
        return res.data;
      },
      deleteAccessToken: async (accessToken: string) => {
        const res = await axiosNewTMDB.delete(`/auth/access_token`, {
          data: {
            access_token: accessToken,
          },
        });
        setRequestToken(undefined);
        setAccessToken(undefined);
        return res.data;
      },
    };
  }, [axios, axiosNewTMDB]);
}

export default useAuthApi;
