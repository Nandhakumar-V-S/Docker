import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

export const GetFormFields = createAsyncThunk(
  "FormFields/GetFormFields",
  async (formid) => {
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

const FormFieldsSlice = createSlice({
  name: "FormFields",
  initialState: {
    screenFields: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetFormFields: (state) => {
      state.status = "idel";
      state.screenFields = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetFormFields.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetFormFields.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.screenFields = action.payload;
      })
      .addCase(GetFormFields.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default FormFieldsSlice.reducer;
export const { resetFormFields } = FormFieldsSlice.actions;
