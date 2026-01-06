import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Status: "idel",
  error: null,
};

export const AddSubTaskPlanData = createAsyncThunk(
  "AddSubTaskPlanState/AddSubTaskPlanData",
  async ({ data, transactionid }) => {
    try {
      let loggedUserId = window.sessionStorage.getItem("Globalid");
      const entityid = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
      // Prepare the data object in the required format
      const requestData = {
        entityid: entityid,
        userid: loggedUserId,
        transactionid: transactionid,
        data: data,
      };
      const response = await fetch(
        API_TEST_URL + "/planexecution/insert_subworkitem",
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
          Message: "Sub Task Added Successfully",
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
const AddSubTaskPlanStateSlice = createSlice({
  name: "AddSubTaskPlanState",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.Status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddSubTaskPlanData.pending, (state) => {
        state.Status = "loading...";
      })
      .addCase(AddSubTaskPlanData.fulfilled, (state) => {
        state.Status = "successful";
      })
      .addCase(AddSubTaskPlanData.rejected, (state) => {
        state.Status = "failed";
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default AddSubTaskPlanStateSlice.reducer;
export const { resetStatus } = AddSubTaskPlanStateSlice.actions;
