import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, API_TEST_URL } from "@/config/serverApiConfig";

export const fetchProjectFormFields = createAsyncThunk(
  "arcProjectFields/fetchProjectFormFields",
  async () => {
    const ProjectFormId = "A6BEEBEC-04EC-45D9-ABE5-4E59125FA591";

    try {
      const response = await fetch(
        `${API_TEST_URL}/arcform/getforminfobyid?formid=${ProjectFormId}`,
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
  name: "arcProjectFields",
  initialState: {
    AttributeScreenFields: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectFormFields.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectFormFields.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.AttributeScreenFields = action.payload;
      })
      .addCase(fetchProjectFormFields.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default attributeFormSlice.reducer;
