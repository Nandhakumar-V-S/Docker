import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Addstatus: "idel",
  error: null,
};

export const UpdateStatusData = createAsyncThunk(
  "UpdateStatusState/UpdateStatusData",
  async ({ data, transactionid, Subworkitemdata }) => {
    try {
      let loggedUserId = window.sessionStorage.getItem("Globalid");
      data.entityid = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
      // Prepare the data object in the required format
      const requestData = {
        entityid: data.entityid,
        userid: loggedUserId,
        transactionid: transactionid,
        data: data,
        Subworkitemdata: Subworkitemdata,
      };
      const response = await fetch(
        API_TEST_URL + "/planexecution/updateplanexecstatusbyid",
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
const UpdateStatusStateSlice = createSlice({
  name: "UpdateStatusState",
  initialState,
  reducers: {
    resetAddStatus: (state) => {
      state.Addstatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdateStatusData.pending, (state) => {
        state.Addstatus = "loading...";
      })
      .addCase(UpdateStatusData.fulfilled, (state, action) => {
        // state.Addstatus = "success";
        state.Addstatus = "successful";
      })
      .addCase(UpdateStatusData.rejected, (state, action) => {
        // state.status = "failed";
        state.Addstatus = "failed";
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default UpdateStatusStateSlice.reducer;
export const { resetAddStatus } = UpdateStatusStateSlice.actions;
