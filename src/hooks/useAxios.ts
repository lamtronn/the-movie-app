import Axios, { InternalAxiosRequestConfig } from "axios";
import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { ApiMode } from "@/types/apiTypes";
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

function useAxios() {
  const { accessToken } = useAuthStore() as { accessToken: string | undefined };
  const sessionToken = useRef<string | null>(accessToken ?? "");
  useLayoutEffect(() => {
    sessionToken.current = accessToken ?? "";
  }, [accessToken]);

  const requestInterceptor = useCallback(
    (config: InternalAxiosRequestConfig) => {
      let newConfig: any = config;
      if (sessionToken.current) {
        newConfig = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${sessionToken.current}`,
          },
        };
      }
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
