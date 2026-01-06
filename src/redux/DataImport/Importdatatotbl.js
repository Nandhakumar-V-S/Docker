import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

const initialState = {
  response: [],
  status: "idle", //brbrlbk 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  loading:false,
  // other state properties
};

export const Importdatatotbl = createAsyncThunk(
  "Importdatatotbl",
  async (data) => {
    try {
       console.log(JSON.stringify(data));     
        
       
      const response = await fetch(API_TEST_URL + "/arcimport/importdatafromtransfrom_to_maintable", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(obj);
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
const ImportdatatotblSlice = createSlice({
  name: "ImportdatatotblState",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Importdatatotbl.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(Importdatatotbl.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
        state.loading = false;
      })
      .addCase(Importdatatotbl.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default ImportdatatotblSlice.reducer;
export const { resetStatus } = ImportdatatotblSlice.actions;