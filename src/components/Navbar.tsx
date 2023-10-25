"use client";

import { MouseEvent, useCallback, useContext } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import useAuthApi from "@/hooks/apis/useAuthApi";
import { usePathname } from "next/navigation";
import "flowbite";
import ErrorToast from "@/components/ErrorToast";
import { createPortal } from "react-dom";
import { ErrorContext } from "@/hocs/ErrorBoundary";

const nav = [
  {
    title: "Home",
    path: "/home",
  },
  {
    title: "Popular",
    path: "/popular",
  },
  {
    title: "Upcoming",
    path: "/upcoming",
  },
];

const MainNavbar = () => {
  const api = useAuthApi();
  const pathname = usePathname();
  const { accessToken } = useAuthStore();
  const { onShowErrorToast } = useContext(ErrorContext);

  const handleLogout = useCallback(async () => {
    try {
      await api.deleteAccessToken(accessToken);
    } catch (e) {
      console.log(e);
      onShowErrorToast(e, true);
    }
  }, [accessToken, api]);

  return (
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-black border-gray-200">
      <p className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Movie App
      </p>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="z-50 absolute md:relative right-4 font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-black md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
          {nav.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                className={`block py-2 pl-3 pr-4 text-white bg-black rounded md:p-0 dark:text-white ${
                  item.path === pathname &&
                  "md:text-blue-700 md:dark:text-blue-500"
                }`}
                aria-current="page"
              >
                {item.title}
              </a>
            </li>
          ))}
          {accessToken && (
            <li>
              <button
                className="block py-2 pl-3 pr-4 text-white bg-black rounded md:p-0 dark:text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MainNavbar;
