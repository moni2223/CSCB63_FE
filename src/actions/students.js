import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { startLoading, stopLoading } from "./general";

const initialState = {
  students: null,
};
export const studentsSlice = createSlice({
  name: "studentsSlice",
  initialState,
  reducers: {
    setStudents: (state, { payload }) => ({ ...state, studentMarks: payload }),
  },
});
export const { setStudents } = studentsSlice.actions;

export const getStudentsForSchool = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`/students/listBySchool/${payload?.schoolId}`);
  dispatch(setStudents(data));
  dispatch(stopLoading());
};
export default studentsSlice.reducer;
