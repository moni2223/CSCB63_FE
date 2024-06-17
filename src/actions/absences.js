import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { startLoading, stopLoading } from "./general";

const initialState = {
  studentAbsences: null,
  subjectAbsences: null,
};
export const absencesSlice = createSlice({
  name: "absencesSlice",
  initialState,
  reducers: {
    setStudentAbsences: (state, { payload }) => ({ ...state, studentAbsences: payload }),
    setSubjectAbsences: (state, { payload }) => ({ ...state, subjectAbsences: payload }),
  },
});
export const { setStudentAbsences, setSubjectAbsences } = absencesSlice.actions;

export const getStudentAbsences = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`attendance/student/list/${payload?.studentId}`);
  dispatch(setStudentAbsences(data));
  dispatch(stopLoading());
};
export const getSubjectAbsences = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`attendance/subject/list/${payload?.subjectId}`);
  dispatch(setSubjectAbsences(data));
  dispatch(stopLoading());
};
export const addStudentAbsence = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post(`attendance/add`, { ...payload });
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export default absencesSlice.reducer;
