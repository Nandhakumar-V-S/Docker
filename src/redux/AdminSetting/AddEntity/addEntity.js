import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

export const fetchAddEntityFormFields = createAsyncThunk(
  "addEntity/fetchAddEntityFormFields",
  async () => {
    const formid = "707EFDD5-F86E-4D46-AB82-9A45081F5B55";

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

const addEntitySlice = createSlice({
  name: "addEntityTask",
  initialState: {
    screenFields: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddEntityFormFields.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddEntityFormFields.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.screenFields = action.payload;
      })
      .addCase(fetchAddEntityFormFields.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default addEntitySlice.reducer;
