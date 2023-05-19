import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URl = `http://localhost:8080`;
const initialState = {
  venueReviewsList: [],
};
export const getAllVenueReviewsById = createAsyncThunk(
  "venueReviews/getAll/venueId",
  async (venueId, thunkAPI) => {
    const GET_VENUE_REVIEWS = `${BASE_URl}/harsha/venue/reviews/${venueId}`;
    let result = await axios.get(GET_VENUE_REVIEWS);
    return result.data;
  }
);

export const saveNewVenueReview = createAsyncThunk(
  "venueReviews/saveNew/venueId",
  async (data, thunkAPI) => {
    const SAVE_NEW_VENUE_REVIEWS = `${BASE_URl}/harsha/venue/review`;
    let result = await axios.post(SAVE_NEW_VENUE_REVIEWS, data);
    thunkAPI.dispatch(getAllVenueReviewsById(data.toVenueId));
    return result.data;
  }
);

export const updateVenueReview = createAsyncThunk(
  "venueReviews/update/reviewId",
  async (data, thunkAPI) => {
    const UPDATE_VENUE_REVIEWS = `${BASE_URl}/venue/review`;
    let result = await axios.put(UPDATE_VENUE_REVIEWS, data);
    return result.data;
  }
);

export const deleteVenueReview = createAsyncThunk(
  "venueReviews/delete/reviewId",
  async (reviewId, thunkAPI) => {
    const DELETE_VENUE_REVIEWS = `${BASE_URl}/venue/review/${reviewId}`;
    let result = await axios.delete(DELETE_VENUE_REVIEWS);
    return result.data;
  }
);
const VenueReviewsSlice = createSlice({
  name: "venueReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllVenueReviewsById.fulfilled, (state, action) => {
      state.venueReviewsList = action.payload.reviews;
    });
  },
});

export const {} = VenueReviewsSlice.actions;

export default VenueReviewsSlice.reducer;
