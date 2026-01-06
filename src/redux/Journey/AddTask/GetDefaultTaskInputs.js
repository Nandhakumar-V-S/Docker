import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  status: "idel",
  DefaultFormValues: [],
  error: null,
};

export const GetDefaultTaskInputs = createAsyncThunk(
  "GetDefaultTaskInputState/GetDefaultTaskInputs",
  async (requestData) => {
    try {
      
      const response = await fetch(
        API_TEST_URL + "/planexecution/taskupadateformdatabyid",
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
const GetDefaultTaskInputStateSlice = createSlice({
  name: "GetDefaultTaskInputState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetDefaultTaskInputs.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(GetDefaultTaskInputs.fulfilled, (state, action) => {
        state.DefaultFormValues = action.payload;
        state.status = "successful";
  
      })
      .addCase(GetDefaultTaskInputs.rejected, (state, action) => {
        state.status = "failed";
        state.status = action.error.message;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default GetDefaultTaskInputStateSlice.reducer;
