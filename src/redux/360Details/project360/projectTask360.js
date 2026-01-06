import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

const initialState = {
  response: {},
  status: "idle",
  error: null,
  loading: null,
};

export const projectTask = createAsyncThunk(
  "projectTaskState/projectTask",
  async (RequestData) => {
    try {
      const response = await fetch(API_TEST_URL + "/task/gettasklistdetails", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(RequestData),
      });

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
const projectTaskStateSlice = createSlice({
  name: "projectTaskState",
  initialState,
  reducers: {
    resetstatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(projectTask.pending, (state) => {
        state.status = "loading...";
        state.loading = true;
      })
      .addCase(projectTask.fulfilled, (state, action) => {
        state.status = "successful";
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(projectTask.rejected, (state) => {
        state.status = "failed";
        state.loading = false;
      });
  },
});

export default projectTaskStateSlice.reducer;
export const { resetstatus } = projectTaskStateSlice.actions;
