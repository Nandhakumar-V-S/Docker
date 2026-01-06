import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

// Define the initial state
const initialState = {
  status: "idel",
  DefaultFormValues: [],
  error: null,
};

export const GetDefaultFormValues = createAsyncThunk(
  "GetDefaultValuesState/GetDefaultFormValues",
  async ({ TransactionId, previousPathName }) => {
    try {
      // Prepare the data object in the required format
      console.log("dfdfdf" + previousPathName);
      console.log(TransactionId);
      const requestData = {
        transactionid: previousPathName === "/task" ? null : TransactionId,
        workitemid: previousPathName === "/task" ? TransactionId : null,
      };
      const response = await fetch(
        API_TEST_URL + "/planexecution/getplanexeclistdetailsbytransid",
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
const GetDefaultValuesStateSlice = createSlice({
  name: "GetDefaultValuesState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetDefaultFormValues.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(GetDefaultFormValues.fulfilled, (state, action) => {
        state.DefaultFormValues = action.payload;
        state.status = "successful";
      })
      .addCase(GetDefaultFormValues.rejected, (state, action) => {
        state.status = "failed";
        state.status = action.error.message;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default GetDefaultValuesStateSlice.reducer;
