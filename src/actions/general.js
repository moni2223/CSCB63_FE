import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { User } from "../utilities/User";

const initialState = {
  user: {},
  profile: {},
  roles: [],
  loading: false,
  loadingText: "Моля изчакайте...",
};
export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => ({ ...state, user: payload }),
    setProfile: (state, { payload }) => ({ ...state, profile: payload }),
    startLoading: (state) => ({ ...state, loading: true }),
    stopLoading: (state) => ({ ...state, loading: false }),
    setRoles: (state, { payload }) => ({ ...state, roles: payload }),
  },
});
export const { setUser, setProfile, startLoading, stopLoading, setRoles } = generalSlice.actions;

export const getProfile = (user, role) => async (dispatch) => {
  var profile = {};
  if (role?.name === "Student") {
    profile = await httpClient.get(`/students/getStudent/${user?.email}`);
    dispatch(setProfile(profile?.data?.[0]));
  } else if (role?.name === "Parent") {
    profile = await httpClient.get(`/parents/getParentByEmail/${user?.email}`);
    dispatch(setProfile(profile?.data));
  } else if (role?.name === "Teacher") {
    profile = await httpClient.get(`teachers/getTeacherByEmail/${user?.email}`);
    dispatch(setProfile(profile?.data?.[0]));
  }
};

export const loginUser = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const user = await httpClient.post("/users/login", { ...payload });
  const role = await httpClient.get(`/roles/getRole/${user.data?.role}`);
  dispatch(getProfile(user?.data, role?.data));
  User.authenticate({ ...user?.data, role: role.data });
  dispatch(setUser({ ...user.data, role: role.data }));
  if (payload?.onSuccess) payload?.onSuccess(user.data);
  dispatch(stopLoading());
};
export const editUser = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.put(`/users/edit/${payload?.id}`, { ...payload?.body });
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};

export const checkUser = (payload) => async (dispatch) => {
  if (payload?.id) {
    dispatch(startLoading());
    const role = await httpClient.get(`/roles/getRole/${payload?.role?.id}`);
    dispatch(getProfile(payload, role?.data));
    dispatch(setUser({ ...payload, role: role.data }));
    dispatch(stopLoading());
  } else dispatch(logoutUser());
};

export const getRoles = () => async (dispatch) => {
  const { data } = await httpClient.get("/roles/list");
  dispatch(setRoles(data));
};

export const logoutUser = (payload) => async (dispatch) => {
  window.localStorage.clear();
  window.location.href = "/login";
  dispatch(setUser({}));
};

export default generalSlice.reducer;
