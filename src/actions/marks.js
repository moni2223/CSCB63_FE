import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { startLoading, stopLoading } from "./general";

const initialState = {
  allMarks: null,
  studentMarks: null,
  subjectMarks: null,
};
export const marksSlice = createSlice({
  name: "marksSlice",
  initialState,
  reducers: {
    setAllMarks: (state, { payload }) => ({ ...state, allMarks: payload }),
    setStudentMarks: (state, { payload }) => ({ ...state, studentMarks: payload }),
    setSubjectMarks: (state, { payload }) => ({ ...state, subjectMarks: payload }),
  },
});
export const { setStudentMarks, setSubjectMarks, setAllMarks } = marksSlice.actions;

export const getAllMarks = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`marks/list`);
  dispatch(setAllMarks(data));
  dispatch(stopLoading());
};
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
export const addStudentMark = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post(`marks/add`, { ...payload });
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export const getCurrentMark = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`marks/getMark/${payload?.id}`);
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export const editCurrentMark = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.put(`marks/edit/${payload?.id}`, { ...payload?.body });
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export const deleteStudentMark = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.delete(`marks/delete/${payload?.id}`);
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export default marksSlice.reducer;
