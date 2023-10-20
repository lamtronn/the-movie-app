import useAxios from "@/hooks/api/useAxios";
import { useMemo } from "react";

export type AppApi = {
  updateText: () => Promise<string>;
};

function useApi(): AppApi {
  const axios = useAxios();

  return useMemo(() => {
    return {
      updateText: async () => {
        return "text is updated!";
      },
    };
  }, []);
}
export default useApi;
