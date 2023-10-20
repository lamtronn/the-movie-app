"use client";

import Link from "next/link";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { logout, setAuth, setJid } from "../store/slices/authSlice";
import useApi from "@/hooks/api/useApi";

export default function MainNavbar() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const dispatch = useAppDispatch();
  const api = useApi();

  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuth]);

  const handleLogout = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      dispatch(logout(api, accessToken));
      dispatch(setJid(""));
      dispatch(setAuth(false));
    }
    // [api, accessToken, dispatch]
  );

  return (
    <nav className="flex content-between justify-between w-full h-full px-5 text-white">
      <div className="w-2/3 h-full flex">
        <Link href={"/"} className="my-auto font-bold text-4xl">
          Test App
        </Link>
      </div>

      <div className="flex justify-end w-1/3">
        {isAuthenticated && (
          <>
            <Link className="m-auto" href={"/account"}>
              Account
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
        {accessToken && (
          <div className="flex">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
