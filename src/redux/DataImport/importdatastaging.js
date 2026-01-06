import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

const initialState = {
  response: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  importfileresponse: [],
  importfilestatus: "idle",
};

export const PostImportDataStaging = createAsyncThunk(
  "ImportDataStaging/PostImportDataStaging",
  async (RequestData) => {
    try {
      const response = await fetch(
        API_TEST_URL + "/arcimport/insertimportdatastaging",
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

export const PostImportFileData = createAsyncThunk(
  "ImportDataStaging/PostImportFileData",
  async (file) => {
    try {
      const formData = new FormData();
      Object.keys(file).forEach((key) => {
        formData.append(key, file[key]);
      });
      const response = await fetch(
        API_TEST_URL + "/arcimport/dynamicimportexcel",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: formData,
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
const ImportDataStagingSlice = createSlice({
  name: "ImportDataStaging",
  initialState,
  reducers: {
    resetstatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PostImportDataStaging.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(PostImportDataStaging.fulfilled, (state, action) => {
        state.status = "successful";
        state.response = action.payload;
      })
      .addCase(PostImportDataStaging.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(PostImportFileData.pending, (state) => {
        state.importfilestatus = "loading...";
      })
      .addCase(PostImportFileData.fulfilled, (state, action) => {
        state.importfilestatus = "successful";
        state.importfileresponse = action.payload;
      })
      .addCase(PostImportFileData.rejected, (state, action) => {
        state.importfilestatus = "failed";
        // state.error = action.error.message;
      });
  },
});

export default ImportDataStagingSlice.reducer;
export const { resetstatus } = ImportDataStagingSlice.actions;
