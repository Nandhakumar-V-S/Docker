import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
//export const API_TEST_URL =  "https://uiframework.archarina.com/plannerapi/api/v1";
// export const API_TEST_URL =
//   "https://uiframework.archarina.com/plannerApiQA/api/v1";
const initialState = {
  response: [],
  status: "idle",
  error: null,
  loading: null,
  LookupId: null,
};

export const updateLookupDetail = createAsyncThunk(
  "updateLookupDetailState/updateLookupDetail",
  async (RequestData) => {
    try {
      const response = await fetch(
        API_TEST_URL + "/arcconfiguration/getlookupdetailsforupdate",
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
const updateLookupDetailStateSlice = createSlice({
  name: "updateLookupDetailState",
  initialState,
  reducers: {
    resetstatus: (state) => {
      state.status = null;
    },
    updateLookupid: (state, action) => {
      console.log(action.payload);
      state.LookupId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateLookupDetail.pending, (state) => {
        state.status = "loading...";
        state.loading = true;
      })
      .addCase(updateLookupDetail.fulfilled, (state, action) => {
        state.status = "successful";
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(updateLookupDetail.rejected, (state) => {
        state.status = "failed";
        state.loading = false;
      });
  },
});

export default updateLookupDetailStateSlice.reducer;
export const { resetstatus, updateLookupid } =
  updateLookupDetailStateSlice.actions;
