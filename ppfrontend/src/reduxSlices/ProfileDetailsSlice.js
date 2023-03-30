import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  id: 0,
  type: "",
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
};

export const profileDetailsSlice = createSlice({
  name: "profileDetails",
  initialState,
  reducers: {
    setProfileDetails: (state, action) => {
      state.id = action.payload.id;
      state.type = action.payload.type;
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
    // resetPersonalDetails: (state) => {
    // },
  },
  extraReducers: (builder) => {},
});

// Action creators are generated for each case reducer function
export const { setProfileDetails } = profileDetailsSlice.actions;

export default profileDetailsSlice.reducer;
