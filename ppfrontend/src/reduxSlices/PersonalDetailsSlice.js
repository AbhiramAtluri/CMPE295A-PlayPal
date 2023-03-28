import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  uname: "",
  mobile: "",
  dob: new Date(),
  city: "",
  state: "",
  zipcode: "",
  venueOwnerRegistrationIsDone: false,
  venueOwnerRegistrationIsSucess: false,
};
const SAVE_VENUE_OWNER_API =
  "http://localhost:8080/auth/venueOwner/registration";
export const saveVenueOwner = createAsyncThunk(
  "personalDetails/saveNewVenueOwner",
  async (data, thunkAPI) => {
    let res = axios.post(
      SAVE_VENUE_OWNER_API,
      thunkAPI.getState().personalDetails
    );
    return res;
  }
);
export const personalDetailsSlice = createSlice({
  name: "personalDetails",
  initialState,
  reducers: {
    setPersonalDetials: (state, action) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.uname = action.payload.uname;
      state.mobile = action.payload.mobile;
      state.dob = action.payload.dob;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.zipcode = action.payload.zipcode;
    },
    resetPersonalDetails: (state) => {
      state.venueOwnerRegistrationIsDone = false;
      state.venueOwnerRegistrationIsSucess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveVenueOwner.pending, (state, action) => {});
    builder.addCase(saveVenueOwner.fulfilled, (state, action) => {
      state.venueOwnerRegistrationIsDone = true;
      state.venueOwnerRegistrationIsSucess = true;
    });
    builder.addCase(saveVenueOwner.rejected, (state, action) => {
      state.venueOwnerRegistrationIsDone = true;
      state.venueOwnerRegistrationIsSucess = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setPersonalDetials, resetPersonalDetails } =
  personalDetailsSlice.actions;

export default personalDetailsSlice.reducer;
