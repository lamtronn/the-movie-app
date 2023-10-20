import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppApi } from "@/hooks/api/useApi";
import { AppThunk } from "@/app/store";

export interface IAuthState {
  isAuth: boolean;
  jid: string;
  text: string;
}

const initialState: IAuthState = {
  isAuth: false,
  jid: "",
  text: "",
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
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setJid, setText } = authSlice.actions;

export const authReducer = authSlice.reducer;

// Reducers
export const updateText =
  (api: AppApi): AppThunk =>
  async (dispatch) => {
    try {
      console.log("update");
      const res = await api.updateText();
      console.log(res);
      dispatch(setText(res));
      // dispatch(setSearchContactRequestStatus("loading"));
      // const foundProjectMembers = await api.searchProjectMembers(
      //   project.id,
      //   inputText
      // );
      // dispatch(setSearchResults(foundProjectMembers.items));
      // dispatch(setSearchContactRequestStatus("success"));
    } catch (e) {
      console.error(e);
    }
  };
