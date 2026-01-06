import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

// Define the initial state
const initialState = {
  status: "idel",
  EditTagValues: [],
  error: null,
};

export const GetEditTagValue = createAsyncThunk(
  "GetEditTagValuesState/GetEditTagValue",
  async (TransactionId) => {
    try {
      // Prepare the data object in the required format
      const requestData = {
        transactionid: TransactionId,
      };
      const response = await fetch(
        API_TEST_URL + "/arctag/gettaggroup_databyid",
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
const GetEditTagValueStateSlice = createSlice({
  name: "GetEditTagValuesState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetEditTagValue.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(GetEditTagValue.fulfilled, (state, action) => {
        state.EditTagValues = action.payload;
        state.status = "successful";
      })
      .addCase(GetEditTagValue.rejected, (state, action) => {
        state.status = "failed";
        state.status = action.error.message;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default GetEditTagValueStateSlice.reducer;
