// arcAddFormSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { API_BASE_URL } from "@/config/serverApiConfig";

const initialState = {
  status: "idle",
  error: null,
  leadDetails: null,
};

export const GetLeadInfo = createAsyncThunk(
  "arcGetLead/GetLead360",
  async (leadID) => {
    try {
      const response = await fetch(
        // `${API_BASE_URL}Lead/GetLeadDetailsbyID?leadID=${leadID}`
        `${API_BASE_URL}Lead/GetLead360?leadID=${leadID}`
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`
        );
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error.message || "An error occurred during the request";
    }
  }
);

const arcGetLeadSlice = createSlice({
  name: "arcGetLead",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetLeadInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetLeadInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leadDetails = action.payload;
      })
      .addCase(GetLeadInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default arcGetLeadSlice.reducer;
