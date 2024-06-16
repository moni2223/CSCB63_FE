import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { startLoading, stopLoading } from "./general";

const initialState = {
  studentMarks: null,
  subjectMarks: null,
};
export const marksSlice = createSlice({
  name: "marksSlice",
  initialState,
  reducers: {
    setStudentMarks: (state, { payload }) => ({ ...state, studentMarks: payload }),
    setSubjectMarks: (state, { payload }) => ({ ...state, subjectMarks: payload }),
  },
});
export const { setStudentMarks, setSubjectMarks } = marksSlice.actions;

export const getStudentMarks = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`marks/student/list/${payload?.studentId}`);
  dispatch(setStudentMarks(data));
  dispatch(stopLoading());
};
export const getSubjectMarks = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`marks/subject/list/${payload?.subjectId}`);
  dispatch(setSubjectMarks(data));
  dispatch(stopLoading());
};
export default marksSlice.reducer;
