import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  status: "idel",
  error: null,
};

export const UpdateSubTask = createAsyncThunk(
  "UpdateSubTaskState/UpdateSubTask",
  async (requestData) => {
    try {
      const response = await fetch(
        API_TEST_URL + "/planexecution/updatesubworkitemstatusbyid",
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
          Message: "Sub Task Updated Successfully",
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
const UpdateSubTaskStateSlice = createSlice({
  name: "UpdateSubTaskState",
  initialState,
  reducers: {
    resetstatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdateSubTask.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(UpdateSubTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.status = action.payload;
      })
      .addCase(UpdateSubTask.rejected, (state, action) => {
        state.status = "failed";
        state.status = action.error.message;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default UpdateSubTaskStateSlice.reducer;
export const { resetstatus } = UpdateSubTaskStateSlice.actions;
