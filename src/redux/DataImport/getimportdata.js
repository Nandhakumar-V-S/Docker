import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

const initialState = {
  response: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  loading: false,
};

export const GetImportDataById = createAsyncThunk(
  "GetImportDataByIdState/GetImportDataById",
  async (RequestData) => {
    try {
      const response = await fetch(
        API_TEST_URL + "/arcimport/getimportdatabydataimportid",
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
const GetImportDataByIdStateSlice = createSlice({
  name: "GetImportDataByIdState",
  initialState,
  reducers: {
    resetstatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetImportDataById.pending, (state) => {
        state.status = "loading...";
        state.loading = true;
      })
      .addCase(GetImportDataById.fulfilled, (state, action) => {
        state.status = "successful";
        state.response = action.payload;
        state.loading = false;
      })
      .addCase(GetImportDataById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default GetImportDataByIdStateSlice.reducer;
export const { resetstatus } = GetImportDataByIdStateSlice.actions;
