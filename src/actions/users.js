import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { User } from "../utilities/User";
import { startLoading, stopLoading } from "./general";

const initialState = {
  user: {},
  roles: [],
};
export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => ({ ...state, user: payload }),
    setRoles: (state, { payload }) => ({ ...state, roles: payload }),
  },
});
export const { setUser, setRoles } = usersSlice.actions;

export default usersSlice.reducer;
