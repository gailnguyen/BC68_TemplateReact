import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../utils/utils";

const initialState = {
  user: getLocalStorage("user"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setValueUser: (state, payload) => {
      state.user = payload;
    },
  },
});

export const { setValueUser } = authSlice.actions;

export default authSlice.reducer;
