import Axios, { InternalAxiosRequestConfig } from "axios";
import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { ApiMode } from "@/types/apiTypes";
import { useAppDispatch, useAppSelector } from "@/store";
import { useAuthStore } from "@/store/useAuthStore";

const apiMode: ApiMode = "local";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const createAxiosInstance = () => {
  return Axios.create({
    baseURL: baseUrl,
    timeout: 20000,
    headers: {
      Accept: "application/json",
    },
  });
};

const retryAxios = createAxiosInstance();

function useAxios() {
  // const { accessToken } = useAppSelector((state) => state.auth);
  const { accessToken } = useAuthStore();

  // Using a ref for the session token means the Axios instance doesn't get rebuilt whenever the
  // session token is updated. If the Axios request were to be rebuilt, API requests could be
  // executed multiple times.
  const sessionToken = useRef<string | null>(accessToken);
  useLayoutEffect(() => {
    // sessionToken.current = accessToken;
    sessionToken.current =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGExYTUyMzRiMzBkNzBlYjNmNDBlOTgyOTQ4ZGQ3NiIsInN1YiI6IjY1MmQ2NmM3MDI0ZWM4MDBjNzc1NTI1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dwb4jT-inVLN7dxUFgaDrfRnyUOLZFZgdEgzu2_fTWw";
  }, [accessToken]);

  const requestInterceptor = useCallback(
    (config: InternalAxiosRequestConfig) => {
      let newConfig = config;
      // if (sessionToken.current) {
      newConfig = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${sessionToken.current}`,
        },
      };
      // }
      return newConfig;
    },
    [],
  );

  return useMemo(() => {
    console.info(`API mode ${apiMode}, using ${baseUrl}.`);
    const axios = createAxiosInstance();

    axios.interceptors.request.use(requestInterceptor);

    return axios;
  }, [requestInterceptor]);
}

export default useAxios;
export { apiMode, baseUrl };
