import { configureStore } from "@reduxjs/toolkit";
import personalDetailsReducer from "./reduxSlices/PersonalDetailsSlice";
export const store = configureStore({
  reducer: {
    personalDetails: personalDetailsReducer,
  },
  devTools: true,
});
