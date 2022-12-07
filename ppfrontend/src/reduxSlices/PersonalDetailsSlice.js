import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  pass: "",
  uname: "",
  mobile: "",
  dob: new Date(),
  city: "",
  state: "",
  zipcode: "",
};

export const personalDetailsSlice = createSlice({
  name: "personalDetails",
  initialState,
  reducers: {
    setPersonalDetials: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.pass = action.payload.pass;
      state.uname = action.payload.uname;
      state.mobile = action.payload.mobile;
      state.dob = action.payload.dob;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.zipcode = action.payload.zipcode;
    },
    resetPersonalDetails: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { setPersonalDetials, resetPersonalDetails } =
  personalDetailsSlice.actions;

export default personalDetailsSlice.reducer;
