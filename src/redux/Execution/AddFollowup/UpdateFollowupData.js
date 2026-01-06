import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Status: "idel",
  error: null,
};

export const AddFollowupData = createAsyncThunk(
  "AddFollowupState/AddFollowupData",
  async ({ data, transactionid }) => {
    try {
      let loggedUserId = window.sessionStorage.getItem("Globalid");
      data.entityid = "C65FE730-5FDC-418E-BDC5-98F2FC405750";
      // Prepare the data object in the required format
      const requestData = {
        entityid: data.entityid,
        userid: loggedUserId,
        transactionid: transactionid,
        data: data,
      };
      const response = await fetch(
        API_TEST_URL + "/PlanFollowup/InsertFollowupbyID",
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
          Message: "Task Followup Added Successfully",
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
const AddFollowupStateSlice = createSlice({
  name: "AddFollowupState",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.Status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddFollowupData.pending, (state) => {
        state.Status = "loading...";
      })
      .addCase(AddFollowupData.fulfilled, (state, action) => {
        // state.Status = "success";
        state.Status = "successful";
      })
      .addCase(AddFollowupData.rejected, (state, action) => {
        // state.status = "failed";
        state.Status = "failed";
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default AddFollowupStateSlice.reducer;
export const { resetStatus } = AddFollowupStateSlice.actions;
