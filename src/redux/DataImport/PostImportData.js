import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

const initialState = {
  response: [],
  status: "idle", //brbrlbk 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  loading:false,
  // other state properties
};

export const PostImportData = createAsyncThunk(
  "PostImportDataState/PostImportData",
  async (formData) => {
    try {       
       
      const response = await fetch(API_TEST_URL + "/arcimport/dynamicimportexcel", {
        method: "POST",
        headers: {
          //   "Content-Type": "multipart/form-data", // Note: This header should not be set. Fetch sets it automatically when using FormData
          "Access-Control-Allow-Origin": "*",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, Message: ${errorResponse.message}`
        );
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error.message || "An error occurred during the request";
    }
  }
);

// Create a slice
const PostImportDataSlice = createSlice({
  name: "PostImportDataState",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PostImportData.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(PostImportData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
        state.loading = false;
      })
      .addCase(PostImportData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default PostImportDataSlice.reducer;
export const { resetStatus } = PostImportDataSlice.actions;