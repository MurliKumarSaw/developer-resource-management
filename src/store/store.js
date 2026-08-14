import { configureStore } from "@reduxjs/toolkit";

import assignmentsReducer from "./slices/assignmentsSlice.js";

export const store = configureStore({
  reducer: {
    assignments: assignmentsReducer,
  },
});