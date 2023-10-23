"use client";

import { MouseEventHandler, useCallback, useState } from "react";
import useApi from "@/hooks/useApi";
import { TMDB_BASE_URL } from "@/constants/config";
import { useAuthStore } from "@/store/useAuthStore";
import useAuthApi from "@/hooks/apis/useAuthApi";

export default function LoginForm() {
  const api = useAuthApi();
  const { setRequestToken } = useAuthStore();

  const handleSubmit = useCallback(async () => {
    // setPreviousUrl(window.location.href);
    const requestTokenResponse = await api.getRequestToken(
      window.location.href,
    );
    const requestTokenResult = requestTokenResponse.data;
    setRequestToken(requestTokenResult.request_token);
    window.location.replace(
      `${TMDB_BASE_URL}/auth/access?request_token=${requestTokenResult.request_token}`,
    );
  }, [api, setRequestToken]);

  return (
    <div>
      <button
        onClick={handleSubmit}
        className="bg-blue-700 p-2 text-white font-bold"
      >
        Login with TMDB
      </button>
    </div>
  );
}
