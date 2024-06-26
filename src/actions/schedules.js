import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { User } from "../utilities/User";
import { startLoading, stopLoading } from "./general";

const initialState = {
  schedules: null,
};
export const schedulesSlice = createSlice({
  name: "schedulesSlice",
  initialState,
  reducers: {
    setSchedules: (state, { payload }) => ({ ...state, schedules: payload }),
  },
});
export const { setSchedules } = schedulesSlice.actions;

export const getAllSchedulesForSchool = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`schedule/listBySchool/${payload?.schoolId}`);
  dispatch(setSchedules(data));
  dispatch(stopLoading());
};
export const createSchedule = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post(`schedule/add`, { ...payload });
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export const deleteSchedule = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.delete(`schedule/delete/${payload?.id}`);
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
// export const getAllGrades = (payload) => async (dispatch) => {
//   dispatch(startLoading());
//   const { data } = await httpClient.get(`grades/list`);
//   if (payload) dispatch(setGradesForTeacher(data?.filter((grd) => payload?.includes(grd?.id))));
//   else dispatch(setAllGrades(data));
//   dispatch(stopLoading());
// };
// export const editGrade = (payload) => async (dispatch) => {
//   dispatch(startLoading());
//   const { data } = await httpClient.put(`grades/edit/${payload?.id}`, { ...payload?.body });
//   if (payload?.onSuccess) payload?.onSuccess(data);
//   dispatch(stopLoading());
// };

export default schedulesSlice.reducer;
