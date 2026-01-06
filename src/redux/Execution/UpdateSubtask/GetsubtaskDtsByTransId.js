import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

// Define the initial state
const initialState = {
  status: "idel",
  DefaultFormValues: [],
  error: null,
};

export const GetsubtaskDtsByTransId = createAsyncThunk(
  "GetsubtaskDtsByTransIdstate/GetsubtaskDtsByTransId",
  async (TransactionId) => {
    try {
      // Prepare the data object in the required format
      const requestData = {
        loggeduserid: sessionStorage.getItem("Globalid"),
        transactionid: TransactionId,
      };
      const response = await fetch(
        API_TEST_URL + "/Task/GetSubtaskDetailsById",
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
const GetsubtaskDtsByTransIdstateSlice = createSlice({
  name: "GetsubtaskDtsByTransIdstate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetsubtaskDtsByTransId.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(GetsubtaskDtsByTransId.fulfilled, (state, action) => {
        state.DefaultFormValues = action.payload;
        state.status = "successful";
      })
      .addCase(GetsubtaskDtsByTransId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default GetsubtaskDtsByTransIdstateSlice.reducer;
