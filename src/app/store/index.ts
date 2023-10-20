import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import { authReducer } from "./slices/authSlice";
import storage from "./customStorage";
import logger from "redux-logger";
import { ThunkAction } from "redux-thunk";
import { PersistedState } from "redux-persist/es/types";
import { Action } from "redux";

export type RootReducerState = PersistedState & ReturnType<typeof rootReducer>;

export type AppThunk = ThunkAction<
  void,
  RootReducerState,
  unknown,
  Action<string>
>;

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["isAuth", "jid", "requestToken", "accessToken"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
