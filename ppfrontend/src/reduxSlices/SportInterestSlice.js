import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  Badminton: false,
  AmericanFootball: false,
  BaseBall: false,
  Cricket: false,
  Soccer: false,
  TableTennis: false,
  Tennis: false,
};

export const SportInterestSlice = createSlice({
  name: "sportInterests",
  initialState,
  reducers: {
    toggleBadminton: (state, action) => {
      state.Badminton = !state.Badminton;
    },
    toggleAmericanFootball: (state, action) => {
      state.AmericanFootball = !state.AmericanFootball;
    },
    toggleBaseBall: (state) => {
      state.BaseBall = !state.BaseBall;
    },
    toggleCricket: (state) => {
      state.Cricket = !state.Cricket;
    },
    toggleSoccer: (state) => {
      state.Soccer = !state.Soccer;
    },
    toggleTableTennis: (state) => {
      state.TableTennis = !state.TableTennis;
    },
    toggleTennis: (state) => {
      state.Tennis = !state.Tennis;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleTennis,
  toggleTableTennis,
  toggleSoccer,
  toggleCricket,
  toggleBaseBall,
  toggleAmericanFootball,
  toggleBadminton,
} = SportInterestSlice.actions;

export default SportInterestSlice.reducer;
