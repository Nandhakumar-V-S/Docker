import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Status: "idel",
  error: null,
};

export const UpdateMasterTaskData = createAsyncThunk(
  "UpdateMasterTaskState/UpdateMasterTaskData",
  async (requestData) => {
    try {
      const response = await fetch(
        API_TEST_URL + "/planexecution/updatetaskbyid",
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
          Message: "Task Updated",
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
const UpdateMasterTaskStateSlice = createSlice({
  name: "UpdateMasterTaskState",
  initialState,
  reducers: {
    resetMasterTaskStatus: (state) => {
      state.Status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdateMasterTaskData.pending, (state) => {
        state.Status = "loading...";
      })
      .addCase(UpdateMasterTaskData.fulfilled, (state, action) => {
        // state.Status = "success";
        state.Status = "successful";
      })
      .addCase(UpdateMasterTaskData.rejected, (state, action) => {
        // state.status = "failed";
        state.Status = "failed";
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default UpdateMasterTaskStateSlice.reducer;
export const { resetMasterTaskStatus } = UpdateMasterTaskStateSlice.actions;
