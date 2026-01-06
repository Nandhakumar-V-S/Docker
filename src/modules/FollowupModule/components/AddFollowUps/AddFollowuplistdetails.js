import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Addstatus: "idel",
  error: null,
};

export const AddFollowuplistdetails = createAsyncThunk(
  "AddFollowuplistdetailsState/AddFollowuplistdetails",
  async (data) => {
    let loggedUserId = window.sessionStorage.getItem("Globalid");
    const requestData = {
      entityid: "4AFB7451-C0D6-4BC8-BAAA-51ED99F1A323",
      userid: loggedUserId,
      data: data,
    };
    try {
      const response = await fetch(
        API_TEST_URL + "/PlanFollowup/InsertFollowupPageByID",
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
          Message: "Followup Created",
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
const AddFollowuplistdetailsStateSlice = createSlice({
  name: "AddFollowuplistdetailsState",
  initialState,
  reducers: {
    resetAddStatus: (state) => {
      state.Addstatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddFollowuplistdetails.pending, (state) => {
        state.Addstatus = "loading...";
      })
      .addCase(AddFollowuplistdetails.fulfilled, (state, action) => {
        state.Addstatus = "succeeded";
        // state.Addstatus = action.payload;
      })
      .addCase(AddFollowuplistdetails.rejected, (state, action) => {
        state.status = "failed";
        state.Addstatus = action.error.message;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default AddFollowuplistdetailsStateSlice.reducer;
export const { resetAddStatus } = AddFollowuplistdetailsStateSlice.actions;
