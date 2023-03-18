import { configureStore } from "@reduxjs/toolkit";
import personalDetailsReducer from "./reduxSlices/PersonalDetailsSlice";
import sportInterestReducer from "./reduxSlices/SportInterestSlice";
import VerificationSlice from "./reduxSlices/VerificationSlice";
export const store = configureStore({
  reducer: {
    personalDetails: personalDetailsReducer,
    sportInterests: sportInterestReducer,
    verificationDetails: VerificationSlice,
  },
  devTools: true,
});
