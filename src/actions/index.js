import { configureStore } from "@reduxjs/toolkit";

import students from "./students";
import general from "./general";
import grades from "./grades";
import marks from "./marks";
import schools from "./schools";
import absences from "./absences";
import schedules from "./schedules";

export * from "./students";
export * from "./general";
export * from "./grades";
export * from "./marks";
export * from "./schools";
export * from "./absences";
export * from "./schedules";

const store = configureStore({
  reducer: {
    students,
    general,
    grades,
    marks,
    schools,
    absences,
    schedules,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
