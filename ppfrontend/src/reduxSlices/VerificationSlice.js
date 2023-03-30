import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  verificationRequests: [],
  selected: {},
};
export const getAllVerificationRequests = createAsyncThunk(
  "verificationReq/all",
  async (thunkAPI) => {
    const verifications = [];
    const res = await axios.all([
      axios.get(
        "http://localhost:8080/harsha/admin/verificationRequests/coach"
      ),
      axios.get(
        "http://localhost:8080/harsha/admin/verificationRequests/venue"
      ),
    ]);
    // console.log(res);
    res.forEach((r) => verifications.push(r.data));
    return verifications.flat();
  }
);
export const saveVenueStatus = createAsyncThunk(
  "verificationReq/save/venue",
  async (status, thunkAPI) => {
    const res = await axios.post(
      "http://localhost:8080/harsha/admin/verificationRequests/venue",
      {
        status: status,
        id: thunkAPI.getState().verificationDetails.selected.id,
      }
    );
    if (res.status == 200) thunkAPI.dispatch(getAllVerificationRequests());
    return res;
  }
);
export const saveProfileStatus = createAsyncThunk(
  "verificationReq/save/coach",
  async (status, thunkAPI) => {
    const res = await axios.post(
      "http://localhost:8080/harsha/admin/verificationRequests/coach",
      {
        status: status,
        id: thunkAPI.getState().verificationDetails.selected.id,
      }
    );
    if (res.status == 200) thunkAPI.dispatch(getAllVerificationRequests());
    return res;
  }
);
export const verificationSlice = createSlice({
  name: "verificationSlice",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    resetSelected: (state, action) => {
      state.selected = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllVerificationRequests.pending, (state, action) => {
      console.log("API call made");
    });
    builder.addCase(getAllVerificationRequests.fulfilled, (state, action) => {
      state.verificationRequests = action.payload;
    });
    builder.addCase(getAllVerificationRequests.rejected, (state, action) => {
      console.log(action.error);
    });

    builder.addCase(saveVenueStatus.pending, (state, action) => {});
    builder.addCase(saveVenueStatus.fulfilled, (state, action) => {});
    builder.addCase(saveVenueStatus.rejected, (state, action) => {});

    builder.addCase(saveProfileStatus.pending, (state, action) => {});
    builder.addCase(saveProfileStatus.fulfilled, (state, action) => {});
    builder.addCase(saveProfileStatus.rejected, (state, action) => {});
  },
});
export const { setSelected, resetSelected } = verificationSlice.actions;
export default verificationSlice.reducer;
