import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

// Define the initial state
const initialState = {
  status: "idel",
  DefaultFormValues: [],
  error: null,
};

export const GetDefaultEntityInputs = createAsyncThunk(
  "GetDefaultEntityInputState/GetDefaultEntityInputs",
  async (TransactionId) => {
    try {
      // Prepare the data object in the required format
      const requestData = {
        transactionid: TransactionId,
      };
      const response = await fetch(
        API_TEST_URL + "/arcadminsetting/GetUpdateEntityByIdRequest",
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
const GetDefaultEntityInputStateSlice = createSlice({
  name: "GetDefaultEntityInputState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetDefaultEntityInputs.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(GetDefaultEntityInputs.fulfilled, (state, action) => {
        state.DefaultFormValues = action.payload;
        state.status = "successful";
      })
      .addCase(GetDefaultEntityInputs.rejected, (state, action) => {
        state.status = "failed";
        state.status = action.error.message;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default GetDefaultEntityInputStateSlice.reducer;
