import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Addstatus: "idel",
  error: null,
};

export const UpdateStatus360Data = createAsyncThunk(
  "UpdateStatus360State/UpdateStatus360Data",
  async (requestData) => {
    try {
      const response = await fetch(
        API_TEST_URL + "/planexecution/updateplanexecstatusbyid360",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        ArcSuccess({
          Message: "Task Status Updated",
          position: "top-right",
        });
      }
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`
        );
      }

      const responseData = await response.text();
      console.log(responseData);
      return responseData;
    } catch (error) {
      throw error.message || "An error occurred during the request";
    }
  }
);

// Create a slice
const UpdateStatus360StateSlice = createSlice({
  name: "UpdateStatus360State",
  initialState,
  reducers: {
    resetAddStatus360: (state) => {
      state.Addstatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdateStatus360Data.pending, (state) => {
        state.Addstatus = "loading...";
      })
      .addCase(UpdateStatus360Data.fulfilled, (state, action) => {
        // state.Addstatus = "success";
        state.Addstatus = "successful";
      })
      .addCase(UpdateStatus360Data.rejected, (state, action) => {
        // state.status = "failed";
        state.Addstatus = "failed";
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default UpdateStatus360StateSlice.reducer;
export const { resetAddStatus360 } = UpdateStatus360StateSlice.actions;
