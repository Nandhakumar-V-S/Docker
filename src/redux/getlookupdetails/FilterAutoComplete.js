import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

const initialState = {
  responses: {}, // Store responses keyed by lookupId
  status: "idle",
  error: null,
  loading: null,
};

export const filterAutoComplete = createAsyncThunk(
  "filterAutoCompleteState/filterAutoComplete",
  async (RequestData) => {
    try {
      const response = await fetch(
        API_TEST_URL + "/arcconfiguration/getlookupdetailsforfilter",
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
      return { lookupId: RequestData.lookupId, data: responseData };
    } catch (error) {
      throw error.message || "An error occurred during the request";
    }
  }
);

// Create a slice
const filterAutoCompleteStateSlice = createSlice({
  name: "filterAutoCompleteState",
  initialState,
  reducers: {
    resetstatus: (state, action) => {
      state.status = null;
      if (action.payload) {
        delete state.responses[action.payload]; // Reset specific lookupId data
      } else {
        state.responses = {}; // Reset all data
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterAutoComplete.pending, (state, action) => {
        state.status = "loading...";
        state.loading = true;
      })
      .addCase(filterAutoComplete.fulfilled, (state, action) => {
        const { lookupId, data } = action.payload;
        state.status = "successful";
        state.loading = false;
        state.responses[lookupId] = data; // Store data keyed by lookupId
      })
      .addCase(filterAutoComplete.rejected, (state) => {
        state.status = "failed";
        state.loading = false;
      });
  },
});

export default filterAutoCompleteStateSlice.reducer;
export const { resetstatus } = filterAutoCompleteStateSlice.actions;
