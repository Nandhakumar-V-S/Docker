import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Addstatus: "idel",
  error: null,
};

export const AddTaskData = createAsyncThunk(
  "addTaskState/AddTaskData",
  async (data) => {
    try {
      const response = await fetch(
        API_TEST_URL + "/planexecution/insertplanexecbyid",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        ArcSuccess({
          Message: "New Task Created",
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
const addTaskStateSlice = createSlice({
  name: "addTaskState",
  initialState,
  reducers: {
    resetAddStatus: (state) => {
      state.Addstatus = "idel";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddTaskData.pending, (state) => {
        state.Addstatus = "loading...";
      })
      .addCase(AddTaskData.fulfilled, (state, action) => {
        state.Addstatus = "succeeded";
        // state.Addstatus = action.payload;
      })
      .addCase(AddTaskData.rejected, (state, action) => {
        state.status = "failed";
        state.Addstatus = action.error.message;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default addTaskStateSlice.reducer;
export const { resetAddStatus } = addTaskStateSlice.actions;
