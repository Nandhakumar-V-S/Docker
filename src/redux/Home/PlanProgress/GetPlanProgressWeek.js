import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

const initialState = {
  response: [],
  selectweek: "", // Initial state as string
  selectyear: "",
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  // other state properties
};

export const GetWorkWeekProgress = createAsyncThunk(
  "WorkWeekProgressState/GetWorkWeekProgress",
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
const WorkWeekProgressStateSlice = createSlice({
  name: "WorkWeekProgressState",
  initialState,
  reducers: {
    resetstatus: (state) => {
      state.status = null;
    },
    SetSelectedWeekYear: (state, action) => {
      state.selectweek = action.payload.week;
      state.selectyear = action.payload.year;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetWorkWeekProgress.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(GetWorkWeekProgress.fulfilled, (state, action) => {
        state.status = "successful";
        state.response = action.payload;
      })
      .addCase(GetWorkWeekProgress.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default WorkWeekProgressStateSlice.reducer;
export const { resetstatus, SetSelectedWeekYear } =
  WorkWeekProgressStateSlice.actions;
