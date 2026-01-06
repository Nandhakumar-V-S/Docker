import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the base URL
import { OFFLINE_API_BASE_URL } from "@/Offline_API/Offline_API";

// Create an async thunk for fetching data
export const fetchUnsubmittedBills = createAsyncThunk(
  "UnsubmittedBills/fetchUnsubmittedBills",
  async () => {
    const response = await fetch(`${OFFLINE_API_BASE_URL}Plan_Home_TodayTask`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Convert the response to JSON
    const data = await response.json();
    return data; // Return the fetched data
  }
);

const UnsubmittedBillsSlice = createSlice({
  name: "UnsubmittedBills",
  initialState: {
    data: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Define synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnsubmittedBills.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUnsubmittedBills.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload; // Store the fetched data
      })
      .addCase(fetchUnsubmittedBills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Store any error message
      });
  },
});

export default UnsubmittedBillsSlice.reducer;
