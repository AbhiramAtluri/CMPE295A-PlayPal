import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AdminTournamentSlice from "./reduxSlices/AdminTournamentslice";
import personalDetailsReducer from "./reduxSlices/PersonalDetailsSlice";
import profileDetailsSlice from "./reduxSlices/ProfileDetailsSlice";
import sportInterestReducer from "./reduxSlices/SportInterestSlice";
import venueSlice from "./reduxSlices/VenueSlice";
import VerificationSlice from "./reduxSlices/VerificationSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import VenueReviewsSlice from "./reduxSlices/VenueReviewsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["profileDetails"],
};
const rootReducer = combineReducers({
  profileDetails: profileDetailsSlice,
  personalDetails: personalDetailsReducer,
  sportInterests: sportInterestReducer,
  verificationDetails: VerificationSlice,
  adminTournament: AdminTournamentSlice,
  venues: venueSlice,
  venueReviews: VenueReviewsSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});
