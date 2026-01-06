import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

export const fetchUpdateattributesScreenFields = createAsyncThunk(
  "UpdateAttributeState/fetchUpdateattributesScreenFields",
  async () => {
    const formid = "2856287F-A139-4ACC-A2F2-E2F78B3B2198";

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

const UpdateAttributeStateSlice = createSlice({
  name: "UpdateAttributeState",
  initialState: {
    screenFields: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdateattributesScreenFields.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateattributesScreenFields.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.screenFields = action.payload;
      })
      .addCase(fetchUpdateattributesScreenFields.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default UpdateAttributeStateSlice.reducer;
