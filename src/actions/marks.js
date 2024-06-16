import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { startLoading, stopLoading } from "./general";

const initialState = {
  studentMarks: null,
};
export const marksSlice = createSlice({
  name: "marksSlice",
  initialState,
  reducers: {
    setStudentMarks: (state, { payload }) => ({ ...state, studentMarks: payload }),
  },
});
export const { setStudentMarks } = marksSlice.actions;

export const getStudentMarks = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`marks/student/list/${payload?.studentId}`);
  dispatch(setStudentMarks(data));
  dispatch(stopLoading());
};

export default marksSlice.reducer;
