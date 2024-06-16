import { configureStore } from "@reduxjs/toolkit";

import users from "./users";
import general from "./general";
import grades from "./grades";
import marks from "./marks";
import schools from "./schools";
import absences from "./absences";

export * from "./users";
export * from "./general";
export * from "./grades";
export * from "./marks";
export * from "./schools";
export * from "./absences";

const store = configureStore({
  reducer: {
    users,
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
