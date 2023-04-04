import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  bookingsListForUserId: [],
  bookingsListForVenueOwnerId: [],
  saveBookingStatus: {
    isSaveLoadng: false,
    isSaveDone: false,
    isSaveHasError: false,
  },
};
export const saveNewBooking = createAsyncThunk(
  "bookings/saveNew",
  async (data, thunkAPI) => {
    console.log("Inside save new Booking");
    const SAVE_NEW_BOOKING_API = `http://localhost:8080/harsha/booking`;
    let res = await axios.post(SAVE_NEW_BOOKING_API, data);
    return thunkAPI.fulfillWithValue(res.data);
  }
);
export const getAllBookingsByUserId = createAsyncThunk(
  "bookings/all/userId",
  async (userId, thunkAPI) => {}
);
const BookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveNewBooking.pending, (state, action) => {
      state.saveBookingStatus.isSaveLoadng = true;
    });
    builder.addCase(saveNewBooking.fulfilled, (state, action) => {
      state.saveBookingStatus.isSaveLoadng = false;
      state.saveBookingStatus.isSaveDone = true;
    });
    builder.addCase(saveNewBooking.rejected, (state, action) => {
      state.saveBookingStatus.isSaveLoadng = false;
      state.saveBookingStatus.isSaveHasError = true;
    });
  },
});

export const {} = BookingsSlice.actions;

export default BookingsSlice.reducer;
