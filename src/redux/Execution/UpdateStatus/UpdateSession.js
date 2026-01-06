import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Addstatus: "idel",
  error: null,
};

export const UpdateSessionData = createAsyncThunk(
  "UpdateSessionState/UpdateSessionData",
  async ({ data, transactionid }) => {
    try {
      let loggedUserId = window.sessionStorage.getItem("Globalid");
      data.entityid = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
      // Prepare the data object in the required format
      const requestData = {
        entityid: data.entityid,
        userid: loggedUserId,
        transactionid: transactionid,
        data: data,
      };
      const response = await fetch(
        API_TEST_URL + "/planexecution/updateplanexecsession_priority_byid",
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
          Message: "Task Session Updated",
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
const UpdateSessionStateSlice = createSlice({
  name: "UpdateSessionState",
  initialState,
  reducers: {
    resetSessionStatus: (state) => {
      state.Addstatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdateSessionData.pending, (state) => {
        state.Addstatus = "loading...";
      })
      .addCase(UpdateSessionData.fulfilled, (state, action) => {
        // state.Addstatus = "success";
        state.Addstatus = "successful";
      })
      .addCase(UpdateSessionData.rejected, (state, action) => {
        // state.status = "failed";
        state.Addstatus = "failed";
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default UpdateSessionStateSlice.reducer;
export const { resetSessionStatus } = UpdateSessionStateSlice.actions;
