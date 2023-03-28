import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvedVenuesList: [],
  allVenuesForOwnerId: [],
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
export const getAllVenuesForOwnerId = createAsyncThunk(
  "venueSlice/venueOwner/getAll",
  async (id, thunkAPI) => {
    const GET_ALL_VENUES_FOR_OWNER_API = `http://localhost:8080/harsha/venueOwner/${id}/venues/all`;
    const res = await axios.get(GET_ALL_VENUES_FOR_OWNER_API);
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

    builder.addCase(getAllVenuesForOwnerId.pending, (state, action) => {
      console.log("API call made to get All venues for owner id");
    });
    builder.addCase(getAllVenuesForOwnerId.fulfilled, (state, action) => {
      state.allVenuesForOwnerId = action.payload.venues;
    });
    builder.addCase(getAllVenuesForOwnerId.rejected, (state, action) => {
      console.log(action.error);
    });
  },
});
export const {} = venueSlice.actions;
export default venueSlice.reducer;
