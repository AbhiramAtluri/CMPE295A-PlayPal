import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvedVenuesList: [],
};
const GET_APPROVED_VENUES_API =
  "http://localhost:8080/harsha/venues/approved/all";
export const getAllApprovedVenues = createAsyncThunk(
  "venueSlice/getAll",
  async (thunkAPI) => {
    const res = await axios.get(GET_APPROVED_VENUES_API);
    return res.data;
  }
);

export const venueSlice = createSlice({
  name: "venueSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllApprovedVenues.pending, (state, action) => {
      console.log("API call made");
    });
    builder.addCase(getAllApprovedVenues.fulfilled, (state, action) => {
      state.approvedVenuesList = action.payload;
    });
    builder.addCase(getAllApprovedVenues.rejected, (state, action) => {
      console.log(action.error);
    });
  },
});
export const {} = venueSlice.actions;
export default venueSlice.reducer;
