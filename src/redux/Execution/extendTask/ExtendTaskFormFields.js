import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

export const fetchExtendTaskScreenFields = createAsyncThunk(
  "ExtendTask/fetchExtendTaskScreenFields",
  async () => {
    const formid = "41D3B7EB-6D64-4871-93C5-58A1118EDAC2";

    try {
      const response = await fetch(
        `${API_TEST_URL}/arcform/getforminfobyid?formid=${formid}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Fetch error: ${error.message}`);
    }
  }
);

const ExtendTaskSlice = createSlice({
  name: "ExtendTask",
  initialState: {
    screenFields: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExtendTaskScreenFields.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExtendTaskScreenFields.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.screenFields = action.payload;
      })
      .addCase(fetchExtendTaskScreenFields.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ExtendTaskSlice.reducer;
