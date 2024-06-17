import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { User } from "../utilities/User";
import { startLoading, stopLoading } from "./general";

const initialState = {
  currentGrade: null,
  allGrades: null,
  gradesForTeacher: null,
};
export const gradesSlice = createSlice({
  name: "gradesSlice",
  initialState,
  reducers: {
    setCurrentGrade: (state, { payload }) => ({ ...state, currentGrade: payload }),
    setAllGrades: (state, { payload }) => ({ ...state, currentGrade: [...payload] }),
    setGradesForTeacher: (state, { payload }) => ({ ...state, gradesForTeacher: [...payload] }),
  },
});
export const { setCurrentGrade, setAllGrades, setGradesForTeacher } = gradesSlice.actions;

export const getStudentGrade = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`grades/getGradeByStudent/${payload?.studentId}`);
  dispatch(setCurrentGrade(data));
  dispatch(stopLoading());
};
export const getAllGrades = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`grades/list`);
  if (payload) dispatch(setGradesForTeacher(data?.filter((grd) => payload?.includes(grd?.id))));
  else dispatch(setAllGrades(data));
  dispatch(stopLoading());
};

export default gradesSlice.reducer;
