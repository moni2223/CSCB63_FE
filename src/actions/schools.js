import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { startLoading, stopLoading } from "./general";

const initialState = {
  schools: [],
  subjects: [],
  teachers: [],
  qualifications: [],
  teacher: null,
  currentSchool: { data: null, subjects: null },
};
export const schoolsSlice = createSlice({
  name: "schoolsSlice",
  initialState,
  reducers: {
    setCurrentSchoolData: (state, { payload }) => ({ ...state, currentSchool: { ...state.currentSchool, data: { ...payload } } }),
    setCurrentSchoolSubjects: (state, { payload }) => ({ ...state, currentSchool: { data: payload?.[0]?.school, subjects: [...payload] } }),
    setCurrentSchoolTeachers: (state, { payload }) => ({ ...state, teachers: payload }),
    setSchools: (state, { payload }) => ({ ...state, schools: payload }),
    setQualifications: (state, { payload }) => ({ ...state, qualifications: payload }),
    setCurrentTeacher: (state, { payload }) => ({ ...state, teacher: payload }),
  },
});

export const { setCurrentSchoolData, setCurrentSchoolSubjects, setCurrentSchoolTeachers, setSchools, setQualifications, setCurrentTeacher } = schoolsSlice.actions;

export const getSchools = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`schools/list`);
  dispatch(setSchools(data));
  dispatch(stopLoading());
};
export const getCurrentSchool = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`schools/getSchool/${payload?.schoolId}`);
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(setCurrentSchoolData(data));
  dispatch(stopLoading());
};
export const addSchool = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post(`schools/add`, { ...payload });
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export const editSchool = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post(`schools/edit/${payload?.id}`, { ...payload?.body });
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export const getSchoolSubjects = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`subjects/school/${payload?.schoolId}`);
  dispatch(setCurrentSchoolSubjects(data));
  dispatch(stopLoading());
};
export const getSchoolTeachers = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`teachers/listBySchool/${payload?.schoolId}`);
  dispatch(setCurrentSchoolTeachers(data));
  dispatch(stopLoading());
};
export const getAllQualifications = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`qualifications/list`);
  dispatch(setQualifications(data));
  dispatch(stopLoading());
};
export const createTeacher = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post(`teachers/add`, { ...payload });
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export const getCurrentTeacher = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`teachers/getTeacher/${payload?.id}`);
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(setCurrentTeacher(data));
  dispatch(stopLoading());
};
export const editTeacher = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post(`teachers/edit/${payload?.id}`, { ...payload?.body });
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export const deleteTeacher = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.delete(`teachers/delete/${payload?.id}`);
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export default schoolsSlice.reducer;
