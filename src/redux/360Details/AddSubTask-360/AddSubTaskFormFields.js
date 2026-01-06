import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

export const fetchAddSubTaskFormFields = createAsyncThunk(
  "addSubTask/fetchAddSubTaskFormFields",
  async () => {
    const formid = "0A49D2AA-2A06-4FF0-BEB9-F28CDE56FF0B";
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

const addSubTaskSlice = createSlice({
  name: "addSubTask",
  initialState: {
    screenFields: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddSubTaskFormFields.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddSubTaskFormFields.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.screenFields = action.payload;
      })
      .addCase(fetchAddSubTaskFormFields.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default addSubTaskSlice.reducer;
