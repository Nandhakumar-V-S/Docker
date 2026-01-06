import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

const initialState = {
  response: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  // other state properties
};

export const GetTaskReport = createAsyncThunk(
  "GetTaskReportState/GetTaskReport",
  async (RequestData) => {
    try {
      const response = await fetch(
        API_TEST_URL + "/Report/GetReportTaskDetails",
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
const GetTaskReportStateSlice = createSlice({
  name: "GetTaskReportState",
  initialState,
  reducers: {
    resetstatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetTaskReport.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(GetTaskReport.fulfilled, (state, action) => {
        state.status = "successful";
        state.response = action.payload;
      })
      .addCase(GetTaskReport.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default GetTaskReportStateSlice.reducer;
export const { resetstatus } = GetTaskReportStateSlice.actions;
