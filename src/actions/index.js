import { configureStore } from "@reduxjs/toolkit";

import general from "./general";

export * from "./general";

const store = configureStore({
  reducer: {
    general,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
