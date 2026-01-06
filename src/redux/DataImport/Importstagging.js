import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

export const PostAdditionalData = createAsyncThunk(
  "PostImportDataState/PostAdditionalData",
  async (requestdata, { rejectWithValue }) => {
    try {
      const response = await fetch(
        API_TEST_URL + "/arcimport/insertimportdatastaging",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestdata),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        return rejectWithValue(errorResponse.message);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(
        error.message || "An error occurred during the request"
      );
    }
  }
);

const initialState = {
  response: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  loading: false,
  // other state properties
};

const PostAdditionalDataSlice = createSlice({
  name: "PostAdditionalDataState",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PostAdditionalData.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(PostAdditionalData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
        state.loading = false;
      })
      .addCase(PostAdditionalData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default PostAdditionalDataSlice.reducer;
export const { resetStatus } = PostAdditionalDataSlice.actions;
