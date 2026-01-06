import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcFaild } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";
// Define the initial state
const initialState = {
  status: "idel",
  response: "idel",
  error: null,
};

export const AddTaskDataValidation = createAsyncThunk(
  "addTaskValidationState/AddTaskDataValidation",
  async (data) => {
    try {
      let loggedUserId = window.sessionStorage.getItem("Globalid");
      const requestData = {
        entityid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userid: loggedUserId,
        data: data,
      };
      const response = await fetch(
        API_TEST_URL + "/planexecution/getduplicatecheckresult",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`
        );
      }

      const responseData = await response.json();
      if (responseData?.result?.response === "Task Already Exists.") {
        ArcFaild({
          Title: "Failed",
          Message: responseData?.result?.response,
          position: "top-right",
        });
      }

      console.log(responseData);
      return responseData;
    } catch (error) {
      throw error.message || "An error occurred during the request";
    }
  }
);

// Create a slice
const addTaskValidationStateSlice = createSlice({
  name: "addTaskValidationState",
  initialState,
  reducers: {
    resetValidationStatus: (state) => {
      state.status = null;
      state.response = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddTaskDataValidation.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(AddTaskDataValidation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(AddTaskDataValidation.rejected, (state, action) => {
        state.status = "failed";
        state.status = action.error.message;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default addTaskValidationStateSlice.reducer;
export const { resetValidationStatus } = addTaskValidationStateSlice.actions;
