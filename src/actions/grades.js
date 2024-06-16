import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { User } from "../utilities/User";
import { startLoading, stopLoading } from "./general";

const initialState = {
  currentGrade: null,
};
export const gradesSlice = createSlice({
  name: "gradesSlice",
  initialState,
  reducers: {
    setCurrentGrade: (state, { payload }) => ({ ...state, currentGrade: payload }),
  },
});
export const { setCurrentGrade } = gradesSlice.actions;

export const getStudentGrade = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`grades/getGradeByStudent/${payload?.studentId}`);
  dispatch(setCurrentGrade(data));
  dispatch(stopLoading());
};

export default gradesSlice.reducer;
