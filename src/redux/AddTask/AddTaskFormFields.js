import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

export const fetchAddTaskFormFields = createAsyncThunk(
  "addTask/fetchAddTaskFormFields",
  async () => {
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

const addTaskSlice = createSlice({
  name: "addTask",
  initialState: {
    screenFields: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddTaskFormFields.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddTaskFormFields.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.screenFields = action.payload;
      })
      .addCase(fetchAddTaskFormFields.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default addTaskSlice.reducer;
