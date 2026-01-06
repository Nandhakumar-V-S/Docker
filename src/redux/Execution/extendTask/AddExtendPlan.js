import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import {
  ArcSuccess,
  ArcFaild,
} from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Status: "idel",
  error: null,
  responseData: null, // Add a field to store response data
};

export const AddExtendPlanData = createAsyncThunk(
  "AddExtendPlanState/AddExtendPlanData",
  async ({ data, transactionid }) => {
    try {
      let loggedUserId = window.sessionStorage.getItem("Globalid");
      data.entityid = "F48EF545-9995-4F8F-857D-DDDA2BC063CC";
      // Prepare the data object in the required format
      const requestData = {
        entityid: data.entityid,
        userid: loggedUserId,
        transactionid: transactionid,
        data: data,
      };
      const response = await fetch(
        API_TEST_URL + "/planexecution/insertextendplan",
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
        const responseData = await response.json(); // Get JSON response
        console.log("responseData", responseData);
        if (
          responseData.result.response === "Plan Already Exists in same date"
        ) {
          ArcFaild({
            Message: responseData.result.response,
            position: "top-right",
          });
        }
        if (responseData.result.response === "successfully Extend") {
          ArcSuccess({
            Message: "Task Extended Successfully",
            position: "top-right",
          });
        }
        return responseData; // Return response data
      }

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`
        );
      }
    } catch (error) {
      throw error.message || "An error occurred during the request";
    }
  }
);

// Create a slice
const AddExtendPlanStateSlice = createSlice({
  name: "AddExtendPlanState",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.Status = null;
      state.responseData = null; // Reset response data on status reset
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddExtendPlanData.pending, (state) => {
        state.Status = "loading...";
      })
      .addCase(AddExtendPlanData.fulfilled, (state, action) => {
        state.Status = "successful";
        state.responseData = action.payload; // Store response data in state
      })
      .addCase(AddExtendPlanData.rejected, (state, action) => {
        state.Status = "failed";
        state.error = action.error.message; // Optionally store error message
      });
  },
});

// Export the async thunk for use in components
export const { resetStatus } = AddExtendPlanStateSlice.actions;

// Export the reducer
export default AddExtendPlanStateSlice.reducer;
