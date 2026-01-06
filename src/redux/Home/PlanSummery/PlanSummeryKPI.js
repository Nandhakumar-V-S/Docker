import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { format, getDay } from "date-fns";
// Define the base URL
import { OFFLINE_API_BASE_URL } from "@/Offline_API/Offline_API";
import { API_TEST_URL } from "@/config/serverApiConfig";

// Create an async thunk for fetching data
export const fetchPlanSummeryKPI = createAsyncThunk(
  "PlanSummeryKPIState/fetchPlanSummeryKPI",
  async () => {
    let loggedUserId = window.sessionStorage.getItem("Globalid");
    let CurrentDate = format(new Date(), "MM/dd/yyyy");
    const response = await fetch(
      API_TEST_URL +
        `/planhome/gethomekpi?userid=${loggedUserId}&todaydate=${CurrentDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Convert the response to JSON
    const data = await response.json();
    return data; // Return the fetched data
  }
);

const PlanSummeryKPIStateSlice = createSlice({
  name: "PlanSummeryKPIState",
  initialState: {
    response: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Define synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanSummeryKPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlanSummeryKPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload; // Store the fetched data
      })
      .addCase(fetchPlanSummeryKPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Store any error message
      });
  },
});

export default PlanSummeryKPIStateSlice.reducer;
