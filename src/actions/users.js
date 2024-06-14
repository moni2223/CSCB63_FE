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

// export const loginUser = (payload) => async (dispatch) => {
//   dispatch(startLoading());
//   const { data } = await httpClient.post("/users/login", { ...payload });
//   User.authenticate({ ...data });
//   dispatch(setUser(data));
//   if (payload?.onSuccess) payload?.onSuccess(data);
//   dispatch(stopLoading());
// };
// export const registerRequest = (payload) => async (dispatch) => {
//   dispatch(startLoading());
//   const { data } = await httpClient.post("/User/register", { ...payload });
//   if (payload?.onSuccess) payload?.onSuccess(data);
//   dispatch(stopLoading());
// };
// export const checkUser = (payload) => async (dispatch) => {
//   if (payload?.id) dispatch(setUser(payload));
//   else logoutUser();
// };
// export const getRoles = () => async (dispatch) => {
//   dispatch(startLoading());
//   const { data } = await httpClient.get("/Role/list");
//   dispatch(setRoles(data));
//   dispatch(stopLoading());
// };
export const logoutUser = (payload) => async (dispatch) => {
  window.localStorage.clear();
  window.location.href = "/";
  dispatch(setUser({}));
};

export default usersSlice.reducer;
