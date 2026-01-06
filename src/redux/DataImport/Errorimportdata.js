import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

export const errorimportdatastaging = createAsyncThunk(
    "errorimportdatastaging",
    async (data, { rejectWithValue }) => {
      try {
      
        const requestdata = {
            userid : window.sessionStorage.getItem("Globalid"),
            insertcorrecteddata : 1,
            ...data
        }
        console.log(requestdata);
        const response = await fetch(API_TEST_URL + "/arcimport/insertimportdatastaging", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestdata),
        });
  
        if (!response.ok) {
          const errorResponse = await response.json();
          return rejectWithValue(errorResponse.message);
        }
  
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        return rejectWithValue(error.message || "An error occurred during the request");
      }
    }
  );

  const initialState = {
    response: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    loading:false,
    // other state properties
  };
  
  const errorimportdatastagingSlice = createSlice({
    name: "errorimportdatastagingState",
    initialState,
    reducers: {
      resetStatus: (state) => {
        state.status = "idle";
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(errorimportdatastaging.pending, (state) => {
          state.status = "loading";
          state.loading = true;
        })
        .addCase(errorimportdatastaging.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.response = action.payload;
          state.loading = false;
        })
        .addCase(errorimportdatastaging.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
          state.loading = false;
        });
    },
  });
  
  export default errorimportdatastagingSlice.reducer;
  export const { resetStatus } = errorimportdatastagingSlice.actions;
  
  