import Axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useCallback, useMemo } from "react";
import { ApiMode } from "@/types/apiTypes";

const apiMode: ApiMode = "local";
const baseUrl = process.env.NEXT_PUBLIC_NEW_API_URL;

const createAxiosInstance = () => {
  return Axios.create({
    baseURL: baseUrl,
    timeout: 20000,
    headers: {
      Accept: "application/json",
    },
  });
};

function useAxiosNewTMDB() {
  const requestInterceptor = useCallback(
    (config: InternalAxiosRequestConfig) => {
      let newConfig: any = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN}`,
        },
      };
      return newConfig;
    },
    [],
  );

  return useMemo(() => {
    console.info(`API mode ${apiMode}, using ${baseUrl}.`);
    const axiosNewTMDB = createAxiosInstance();

    axiosNewTMDB.interceptors.request.use(requestInterceptor);

    return axiosNewTMDB;
  }, [requestInterceptor]);
}

export default useAxiosNewTMDB;
export { apiMode, baseUrl };
