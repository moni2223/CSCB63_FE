import { configureStore } from "@reduxjs/toolkit";

import students from "./students";
import general from "./general";
import grades from "./grades";
import marks from "./marks";
import schools from "./schools";
import absences from "./absences";

export * from "./students";
export * from "./general";
export * from "./grades";
export * from "./marks";
export * from "./schools";
export * from "./absences";

const store = configureStore({
  reducer: {
    students,
    general,
    grades,
    marks,
    schools,
    absences,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
