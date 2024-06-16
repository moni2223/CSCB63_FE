import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { startLoading, stopLoading } from "./general";

const initialState = {
  schools: [],
  subjects: [],
  currentSchool: { data: null, subjects: null },
};
export const schoolsSlice = createSlice({
  name: "schoolsSlice",
  initialState,
  reducers: {
    setCurrentSchoolData: (state, { payload }) => ({ ...state, currentSchool: { ...state.currentSchool, data: { ...payload } } }),
    setCurrentSchoolSubjects: (state, { payload }) => ({ ...state, currentSchool: { data: payload?.[0]?.school, subjects: [...payload] } }),
  },
});

export const { setCurrentSchoolData, setCurrentSchoolSubjects } = schoolsSlice.actions;

export const getCurrentSchool = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`schools/getSchool/${payload?.schoolId}`);
  dispatch(setCurrentSchoolData(data));
  dispatch(stopLoading());
};
export const getSchoolSubjects = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`subjects/school/${payload?.schoolId}`);
  dispatch(setCurrentSchoolSubjects(data));
  dispatch(stopLoading());
};

export default schoolsSlice.reducer;
