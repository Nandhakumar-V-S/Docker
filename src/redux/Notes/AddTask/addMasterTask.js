import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

export const fetchAddMasterTaskFormFields = createAsyncThunk(
  "addMasterTask/fetchAddMasterTaskFormFields",
  async () => {
    const formid = "8EC24FBD-FB89-427E-8529-63E5EC2612E6";

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

const addMasterTaskSlice = createSlice({
  name: "addMasterTask",
  initialState: {
    screenFields: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddMasterTaskFormFields.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddMasterTaskFormFields.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.screenFields = action.payload;
      })
      .addCase(fetchAddMasterTaskFormFields.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default addMasterTaskSlice.reducer;
