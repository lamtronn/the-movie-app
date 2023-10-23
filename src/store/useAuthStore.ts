import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      requestToken: undefined,
      accessToken: undefined,
      previousUrl: undefined,
      isLoadingAccessToken: false,
      setRequestToken: (requestToken) => set((state) => ({ requestToken })),
      setAccessToken: (accessToken) => set((state) => ({ accessToken })),
      setPreviousUrl: (previousUrl) => set((state) => ({ previousUrl })),
      setIsLoadingAccessToken: (isLoadingAccessToken) =>
        set((state) => ({ isLoadingAccessToken })),
    }),
    {
      name: "auth-storage",
    },
  ),
);
