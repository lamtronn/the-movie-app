import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppApi } from "@/hooks/api/useApi";
import { AppThunk } from "@/app/store";
import { TMDB_BASE_URL } from "@/constants/config";

export interface IAuthState {
  isAuth: boolean;
  jid: string;
  text: string;
  requestToken: string | undefined;
  accessToken: string | undefined;
  previousUrl: string;
}

const initialState: IAuthState = {
  isAuth: false,
  jid: "",
  text: "",
  requestToken: undefined,
  accessToken: undefined,
  previousUrl: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setJid: (state, action: PayloadAction<string>) => {
      state.jid = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setRequestToken: (state, action: PayloadAction<string>) => {
      state.requestToken = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setPreviousUrl: (state, action: PayloadAction<string>) => {
      state.previousUrl = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAuth,
  setJid,
  setText,
  setRequestToken,
  setAccessToken,
  setPreviousUrl,
} = authSlice.actions;

export const authReducer = authSlice.reducer;

// Reducers
export const updateText =
  (api: AppApi): AppThunk =>
  async (dispatch) => {
    try {
      const res = await api.getMovies();
    } catch (e) {
      console.error(e);
    }
  };

export const login =
  (api: AppApi, previousUrl: string): AppThunk =>
  async (dispatch) => {
    try {
      const requestTokenResponse = await api.getRequestToken(previousUrl);
      const requestTokenResult = requestTokenResponse.data;
      dispatch(setRequestToken(requestTokenResult.request_token));
      window.location.replace(
        `${TMDB_BASE_URL}/auth/access?request_token=${requestTokenResult.request_token}`
      );
    } catch (e) {
      console.error(e);
    }
  };

export const getAccessKey =
  (api: AppApi, requestToken: string): AppThunk =>
  async (dispatch) => {
    try {
      const accessTokenResponse = await api.getAccessToken(requestToken);
      const accessTokenResult = accessTokenResponse.data;
      dispatch(setAccessToken(accessTokenResult.access_token));
    } catch (e) {
      console.error(e);
    }
  };
