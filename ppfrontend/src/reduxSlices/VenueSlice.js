import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import S3 from "react-aws-s3";
import config from "../utils/S3upload";
const initialState = {
  approvedVenuesList: [],
  allVenuesForOwnerId: [],
  isSaveNewVenueSuccess: false,
  isSaveNewVenueFailed: false,
  isLoading: false,
  venueDetailsById: {
    id: 0,
    venueownerid: 0,
    venuename: "",
    startTime: "",
    endTime: "",
    address: "",
    type: "",
    city: "",
    mobile: "",
    email: "",
    amenity1: "",
    amenity2: "",
    amenity3: "",
    amenity4: "",
    amenity5: "",
    amenity6: "",
    noofcourts: 0,
    verificationStatus: "",
    verifcationReqDT: "",
    verificationRespDT: "",
    url: [],
  },
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

export const saveVenueImages = createAsyncThunk(
  "venueSlice/venuewOwner/venue/images",
  async (data, type, thunkAPI) => {
    const s3Client = new S3(config);
    let { images } = data;

    let urls = [];
    for (const image of images) {
      console.log(image);
      const ts = Date.now();
      let fileName = `venueowner-${
        thunkAPI.getState().profileDetails.id
      }-${ts}-${image.name}`;
      let url = await s3Client.uploadFile(image, fileName);
      console.log(url.location);
      urls.push(url.location);
    }
    data.venueOwnerId = thunkAPI.getState().profileDetails.id;
    data.urls = urls;
    thunkAPI.dispatch(saveNewVenue(data));
  }
);
const SAVE_VENUE_API = "http://localhost:8080/harsha/venues/new";
export const saveNewVenue = createAsyncThunk(
  "venueSlice/venuewOwner/venue/new",
  async (data, thunkAPI) => {
    console.log("Data in save venue", data);
    let res = await axios.post(SAVE_VENUE_API, data);
    return res.data;
  }
);

export const getVenueDetailsById = createAsyncThunk(
  "venueSlice/venue/detailsById",
  async (id, thunkAPI) => {
    const VENUE_DETAILS_BY_ID = `http://localhost:8080/harsha/venues/${id}`;
    let res = await axios.get(VENUE_DETAILS_BY_ID);
    return res.data;
  }
);
export const venueSlice = createSlice({
  name: "venueSlice",
  initialState,
  reducers: {
    resetNewVenueStatus: (state, action) => {
      state.isSaveNewVenueFailed = false;
      state.isSaveNewVenueSuccess = false;
    },
  },
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

    builder.addCase(saveNewVenue.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(saveNewVenue.fulfilled, (state, action) => {
      state.isSaveNewVenueSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(saveNewVenue.rejected, (state, action) => {
      state.isSaveNewVenueSuccess = false;
      state.isSaveNewVenueFailed = true;
      state.isLoading = false;
      console.log(action.error);
    });

    builder.addCase(saveVenueImages.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(saveVenueImages.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(saveVenueImages.rejected, (state, action) => {
      state.isLoading = false;
      state.isSaveNewVenueSuccess = false;
      state.isSaveNewVenueFailed = true;
      console.log(action.error);
    });

    builder.addCase(getVenueDetailsById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getVenueDetailsById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.venueDetailsById = action.payload.venue[0];
    });
    builder.addCase(getVenueDetailsById.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export const { resetNewVenueStatus } = venueSlice.actions;
export default venueSlice.reducer;
