import { configureStore } from "@reduxjs/toolkit";
import AdminTournamentSlice from "./reduxSlices/AdminTournamentslice";
import personalDetailsReducer from "./reduxSlices/PersonalDetailsSlice";
import sportInterestReducer from "./reduxSlices/SportInterestSlice";
import VerificationSlice from "./reduxSlices/VerificationSlice";
export const store = configureStore({
  reducer: {
    personalDetails: personalDetailsReducer,
    sportInterests: sportInterestReducer,
    verificationDetails: VerificationSlice,
    adminTournament: AdminTournamentSlice,
  },
  devTools: true,
});
