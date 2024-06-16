import { configureStore } from "@reduxjs/toolkit";

import users from "./users";
import general from "./general";
import grades from "./grades";
import marks from "./marks";
import schools from "./schools";

export * from "./users";
export * from "./general";
export * from "./grades";
export * from "./marks";
export * from "./schools";

const store = configureStore({
  reducer: {
    users,
    general,
    grades,
    marks,
    schools,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
