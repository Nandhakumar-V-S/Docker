import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns";
import { API_TEST_URL } from "@/config/serverApiConfig";

const initialState = {
  response: [],
  selectdate: format(new Date(), "MM/dd/yyyy"), // Initial state as string
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  // other state properties
};

export const GetWorkDayProgress = createAsyncThunk(
  "WorkDayProgressState/GetWorkDayProgress",
  async (RequestData) => {
    try {
      const response = await fetch(
        API_TEST_URL + "/home/gethometeamplanweekprogress",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(RequestData),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, Message: ${errorResponse.message}`
        );
      }

      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      throw error.message || "An error occurred during the request";
    }
  }
);

// Create a slice
const WorkDayProgressStateSlice = createSlice({
  name: "WorkDayProgressState",
  initialState,
  reducers: {
    resetstatus: (state) => {
      state.status = null;
    },
    SetSelectedDate: (state, action) => {
      state.selectdate = action.payload; // Ensure payload is a string
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetWorkDayProgress.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(GetWorkDayProgress.fulfilled, (state, action) => {
        state.status = "successful";
        state.response = action.payload;
      })
      .addCase(GetWorkDayProgress.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default WorkDayProgressStateSlice.reducer;
export const { resetstatus, SetSelectedDate } =
  WorkDayProgressStateSlice.actions;
