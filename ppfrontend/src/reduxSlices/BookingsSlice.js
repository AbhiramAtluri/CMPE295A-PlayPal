import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = `http://localhost:8080`;
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
    const SAVE_NEW_BOOKING_API = `${BASE_URL}/harsha/booking`;
    let res = await axios.post(SAVE_NEW_BOOKING_API, data);
    return thunkAPI.fulfillWithValue(res.data);
  }
);
export const getAllBookingsByUserId = createAsyncThunk(
  "bookings/all/userId",
  async (userId, thunkAPI) => {
    const GET_BOOKINGS_BY_USER_ID_API = `${BASE_URL}/harsha/bookings/${userId}`;
    const res = await axios.get(GET_BOOKINGS_BY_USER_ID_API);
    return res.data;
  }
);
const BookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    resetSaveStatus: (state, action) => {
      state.saveBookingStatus.isSaveDone = false;
      state.saveBookingStatus.isSaveHasError = false;
    },
  },
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

    builder.addCase(getAllBookingsByUserId.fulfilled, (state, action) => {
      state.bookingsListForUserId = action.payload.bookings;
    });
  },
});

export const { resetSaveStatus } = BookingsSlice.actions;

export default BookingsSlice.reducer;
