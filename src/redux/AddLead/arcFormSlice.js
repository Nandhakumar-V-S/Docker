import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, API_TEST_URL } from "@/config/serverApiConfig";

export const fetchScreenFields = createAsyncThunk(
  "arcForm/fetchScreenFields",
  async () => {
    const entityId = "FE8F3D1F-C6A4-44D1-BEB5-599DE1D331CF";
    const screenId = "DD1AB1F0-31E1-4BEE-80E2-3EFFC73AD748";
    const formid = "5786E789-87A1-4AF3-AFB8-FA02B559370B";

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

const arcFormSlice = createSlice({
  name: "arcForm",
  initialState: {
    screenFields: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchScreenFields.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchScreenFields.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.screenFields = action.payload;
      })
      .addCase(fetchScreenFields.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default arcFormSlice.reducer;
