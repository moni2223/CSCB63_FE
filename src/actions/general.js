import { createSlice } from "@reduxjs/toolkit";
import { User } from "../utilities/User";
import { toast } from "react-toastify";

const initialState = {
  user: {},
  loading: false,
  loadingText: "Моля изчакайте...",
};
export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => ({ ...state, user: payload }),
    startLoading: (state) => ({ ...state, loading: true }),
    stopLoading: (state) => ({ ...state, loading: false }),
  },
});
export const { startLoading, setUser, stopLoading } = generalSlice.actions;

export const loginUser = (payload) => async (dispatch, getState) => {};
export const checkUser = (payload) => async (dispatch) => {
  // if (payload?.user) dispatch(setUser(payload?.user));
};
export const logoutUser = (payload) => async (dispatch) => {
  window.localStorage.clear();
  window.location.href = "/";
  dispatch(setUser({}));
};
export default generalSlice.reducer;
