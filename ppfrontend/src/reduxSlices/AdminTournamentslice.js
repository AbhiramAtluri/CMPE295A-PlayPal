import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ErrorMessage } from "formik";

const initialState = {
  tournamentList: [],
  tournamentDetails: [],
  isLoading: false,
  isError: false,
  isDone: false,
  ErrorMessage: "",
  getTournamentsLoading: false,
  getTournamentsDone: false,
  getTournamentsError: false,
};
const saveTournamentApi = "http://localhost:8080/harsha/admin/tournament/new";
const getAllTournamentsApi =
  "http://localhost:8080/harsha/admin/tournaments/all";

export const saveNewTournament = createAsyncThunk(
  "AdminTournament/save",
  async (formData, thunkAPI) => {
    const res = await axios.post(saveTournamentApi, formData);
    return res;
  }
);
export const getAllTournaments = createAsyncThunk(
  "AdminTournament/getAll",
  async (thunkApi) => {
    const res = await axios.get(getAllTournamentsApi);
    return res.data;
  }
);
export const getTournamentDetails = createAsyncThunk(
  "AdminTournament/getDetails",
  async (id, thunkApi) => {
    const getTournamentApi = `http://localhost:8080/harsha/admin/tournament/${id}`;
    const res = await axios.get(getTournamentApi);
    return res.data;
  }
);
export const AdminTournamentSlice = createSlice({
  name: "AdminTournament",
  initialState,
  reducers: {
    resetAdminTournamentStatus(state, action) {
      state.isDone = false;
      state.isError = false;
      state.ErrorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveNewTournament.pending, (state, action) => {
      console.log("API call made");
      state.isLoading = true;
    });
    builder.addCase(saveNewTournament.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isDone = true;
    });
    builder.addCase(saveNewTournament.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(getAllTournaments.pending, (state, action) => {
      console.log("Get all Tournaments API call made");
      state.getTournamentsLoading = true;
    });
    builder.addCase(getAllTournaments.fulfilled, (state, action) => {
      state.getTournamentsLoading = false;
      state.getTournamentsDone = true;
      state.tournamentList = action.payload;
    });
    builder.addCase(getAllTournaments.rejected, (state, action) => {
      state.getTournamentsLoading = false;
      state.getTournamentsError = true;
    });

    builder.addCase(getTournamentDetails.fulfilled, (state, action) => {
      state.tournamentDetails = action.payload;
    });
  },
});

export const { resetAdminTournamentStatus } = AdminTournamentSlice.actions;
export default AdminTournamentSlice.reducer;
