import { configureStore } from "@reduxjs/toolkit";
import personalDetailsReducer from "./reduxSlices/PersonalDetailsSlice";
import sportInterestReducer from "./reduxSlices/SportInterestSlice";
export const store = configureStore({
  reducer: {
    personalDetails: personalDetailsReducer,
    sportInterests: sportInterestReducer,
  },
  devTools: true,
});
