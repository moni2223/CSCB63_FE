import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { startLoading, stopLoading } from "./general";

const initialState = {
  students: null,
  schedule: null,
  student: null,
};
export const studentsSlice = createSlice({
  name: "studentsSlice",
  initialState,
  reducers: {
    setStudents: (state, { payload }) => ({ ...state, students: payload }),
    setSchedule: (state, { payload }) => ({ ...state, schedule: payload }),
    setCurrentStudent: (state, { payload }) => ({ ...state, student: payload }),
  },
});
export const { setStudents, setSchedule, setCurrentStudent } = studentsSlice.actions;

export const createStudent = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post(`/students/add`, { ...payload });
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export const getCurrentStudent = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`students/getStudent/${payload?.id}`);
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(setCurrentStudent(data));
  dispatch(stopLoading());
};
export const editStudent = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post(`students/edit/${payload?.id}`, { ...payload?.body });
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export const deleteStudent = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.delete(`students/delete/${payload?.id}`);
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export const getStudentsForSchool = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`/students/listBySchool/${payload?.schoolId}`);
  dispatch(setStudents(data));
  dispatch(stopLoading());
};
export const getStudentSchedule = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`/students/getSchedule/${payload?.studentId}`);
  dispatch(setSchedule(data));
  dispatch(stopLoading());
};
export default studentsSlice.reducer;
