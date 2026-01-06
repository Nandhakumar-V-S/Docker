import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

export const fetchUpdateFollowupScreenFields = createAsyncThunk(
  "UpdateFollowup/fetchUpdateFollowupScreenFields",
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

const UpdateFollowupSlice = createSlice({
  name: "UpdateFollowup",
  initialState: {
    screenFields: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdateFollowupScreenFields.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateFollowupScreenFields.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.screenFields = action.payload;
      })
      .addCase(fetchUpdateFollowupScreenFields.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default UpdateFollowupSlice.reducer;
