import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, API_TEST_URL } from "@/config/serverApiConfig";

// Define the initial state
const initialState = {
  status: "idel",
  griddata: null,
  error: null,
};

export const GetEntityGrid = createAsyncThunk(
  "entityGridData/GetEntityGrid",
  async (data) => {
    try {
      const response = await fetch(
        API_TEST_URL + "/arclist/getlistdetailsattributes",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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
const entityGridDataSlice = createSlice({
  name: "entityGridData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetEntityGrid.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(GetEntityGrid.fulfilled, (state, action) => {
        state.status = "success";
        state.griddata = action.payload;
      })
      .addCase(GetEntityGrid.rejected, (state, action) => {
        state.status = "failed";
        state.status = action.error.message;
      });
  },
});

// Export the reducer
export default entityGridDataSlice.reducer;
