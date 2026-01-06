import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, API_TEST_URL } from "@/config/serverApiConfig";

// Define the initial state with clear defaults
const initialState = {
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
  entityDetails: {},
};

// Define an asynchronous thunk to fetch data
export const    get360EntityInfo = createAsyncThunk(
  "attribute/get360EntityInfo",
  async (TransactionId, previousPathName) => {
    const EntityId = "5cdc0f7a-0670-45a8-b87e-3b131390931c";
    const listId = "8202cff6-0a0d-47af-9516-eace2b886c96";
    const fetchURL = `${API_TEST_URL}/arclist/getlistdetailsid?entityid=${EntityId}&transactionid=${TransactionId}&listid=${listId}`;
    try {
      const response = await fetch(fetchURL);

      if (!response.ok) {
        const errorResponse = await response.json();
        return thunkAPI.rejectWithValue({
          status: response.status,
          message: errorResponse.message || "An error occurred while fetching",
        });
      }

      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.message || "An unexpected error occurred",
      });
    }
  }
);

// Create a Redux slice to manage the entity state
const entitySlice = createSlice({
  name: "attribute",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get360EntityInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(get360EntityInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entityDetails = action.payload;
      })
      .addCase(get360EntityInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Request failed";
      });
  },
});

export default entitySlice.reducer;
