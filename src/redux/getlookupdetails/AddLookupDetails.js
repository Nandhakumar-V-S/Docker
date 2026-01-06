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
};

export const addLookupDetail = createAsyncThunk(
  "addLookupDetailState/addLookupDetail",
  async (RequestData) => {
    try {
      const response = await fetch(
        API_TEST_URL + "/arcconfiguration/getlookupdetailsforadd",
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
const addLookupDetailStateSlice = createSlice({
  name: "addLookupDetailState",
  initialState,
  reducers: {
    resetstatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLookupDetail.pending, (state) => {
        state.status = "loading...";
        state.loading = true;
      })
      .addCase(addLookupDetail.fulfilled, (state, action) => {
        state.status = "successful";
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(addLookupDetail.rejected, (state) => {
        state.status = "failed";
        state.loading = false;
      });
  },
});

export default addLookupDetailStateSlice.reducer;
export const { resetstatus } = addLookupDetailStateSlice.actions;
