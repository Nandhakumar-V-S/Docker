import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

const initialState = {
  response: [],
  status: "idle", //brbrlbk 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  loading:false,
  // other state properties
};

export const Validatedimportdata = createAsyncThunk(
  "Validatedimportdata",
  async (data) => {
    try {
       console.log(JSON.stringify(data));
        const obj = {
            Impotdataid: data.importdataid,
            Importversionid: data.importdataversionid,
            start: "0",
            skip: "20",
            type: "Created"
          };
        
       
      const response = await fetch(API_TEST_URL + "/arcimport/getimportdatabydataimportid", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
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
const ValidatedimportdataSlice = createSlice({
  name: "ValidatedimportdataState",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Validatedimportdata.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(Validatedimportdata.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
        state.loading = false;
      })
      .addCase(Validatedimportdata.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default ValidatedimportdataSlice.reducer;
export const { resetStatus } = ValidatedimportdataSlice.actions;