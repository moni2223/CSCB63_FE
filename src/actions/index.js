import { configureStore } from "@reduxjs/toolkit";

import users from "./users";
import general from "./general";

export * from "./users";
export * from "./general";

const store = configureStore({
  reducer: {
    users,
    general,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
