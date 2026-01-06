import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, API_TEST_URL } from "@/config/serverApiConfig";

export const fetchAttriuteFormFields = createAsyncThunk(
  "arcAttributeFields/fetchAttriuteFormFields",
  async () => {
    const AttributeFormId = "01752469-556C-47A7-8892-0BE0B7E5BC26";

    try {
      const response = await fetch(
        `${API_TEST_URL}/arcform/getforminfobyid?formid=${AttributeFormId}`,
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

const attributeFormSlice = createSlice({
  name: "arcAttributeFields",
  initialState: {
    AttributeScreenFields: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttriuteFormFields.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAttriuteFormFields.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.AttributeScreenFields = action.payload;
      })
      .addCase(fetchAttriuteFormFields.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default attributeFormSlice.reducer;
