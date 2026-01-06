import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

// Define the initial state
const initialState = {
  status: "idel",
  TimelineState: [],
  error: null,
};

export const GetTimeline360 = createAsyncThunk(
  "GetTimelineState/GetTimeline360",
  async (TransactionId) => {
    try {
      // Prepare the data object in the required format
      const requestData = {
        transactionid: TransactionId,
        filterparams: [
          {
            filterid: "",
            apiname: "",
            filtervalue: "",
            condition: "",
          },
        ],
      };
      const response = await fetch(
        API_TEST_URL + "/eventlogger/gettransactiontimelineinfobyid",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`
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
const GetTimelineStateSlice = createSlice({
  name: "GetTimelineState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetTimeline360.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(GetTimeline360.fulfilled, (state, action) => {
        state.TimelineState = action.payload;
        state.status = "successful";
      })
      .addCase(GetTimeline360.rejected, (state, action) => {
        state.status = "failed";
        state.status = action.error.message;
      });
  },
});

// Export the reducer
export default GetTimelineStateSlice.reducer;
