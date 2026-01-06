import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

// Define the initial state
const initialState = {
  status: "idel",
  Entity: [],
  error: null,
};

export const GetAddEntityFields = createAsyncThunk(
  "GetAddEntityFieldssState/GetAddEntityFields",
  async (TransactionId) => {
    const defaultTransactionId = "e344ad88-19d0-4075-90df-62b6f6ea0735";
    try {
      // Prepare the data object in the required format
      const requestData = {
        transactionid: TransactionId || defaultTransactionId,
      };
      const response = await fetch(
        API_TEST_URL + "/arctag/associated_taggrouptoentity",
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
const GetAddEntityFieldsStateSlice = createSlice({
  name: "GetAddEntityFieldssState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAddEntityFields.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(GetAddEntityFields.fulfilled, (state, action) => {
        state.Entity = action.payload;
        state.status = "successful";
      })
      .addCase(GetAddEntityFields.rejected, (state, action) => {
        state.status = "failed";
        state.status = action.error.message;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default GetAddEntityFieldsStateSlice.reducer;
