// ! New Data
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import {
  ArcFaild,
  ArcSuccess,
} from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  AddSubtaskstatus: "idel",
  error: null,
};

export const AddSubTaskData = createAsyncThunk(
  "addSubTaskState/AddSubTaskData",
  async ({ data, transactionid, previousPathName }) => {
    let loggedUserId = window.sessionStorage.getItem("Globalid");
    try {
      let userid = loggedUserId;
      let entityid = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
      // Prepare the data object in the required format
      const requestData = {
        entityid: entityid,
        userid: userid,
        transactionid: previousPathName === "/task" ? "" : transactionid,
        workitemid: previousPathName === "/task" ? transactionid : "",
        data: data,
      };
      const response = await fetch(
        API_TEST_URL + "/planexecution/insert_subworkitem360",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        const ToasterMsg = responseData?.result?.response;
        if (!ToasterMsg.includes("Already exists")) {
          ArcSuccess({
            Message: ToasterMsg,
            position: "top-right",
          });
        }
      }
      if (!response.ok) {
        const errorResponse = await response.json();
        ArcFaild({
          Message: "Something went Wrong",
          position: "top-right",
        });
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`
        );
      }

      return responseData;
    } catch (error) {
      throw error.message || "An error occurred during the request";
    }
  }
);

// Create a slice
const addSubTaskStateSlice = createSlice({
  name: "addSubTaskState",
  initialState,
  reducers: {
    resetAddSubtaskStatus: (state) => {
      state.AddSubtaskstatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddSubTaskData.pending, (state) => {
        state.AddSubtaskstatus = "loading...";
      })
      .addCase(AddSubTaskData.fulfilled, (state, action) => {
        // state.Addstatus = "success";
        state.AddSubtaskstatus = "successful";
      })
      .addCase(AddSubTaskData.rejected, (state, action) => {
        state.status = "failed";
        state.AddSubtaskstatus = action.error.message;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default addSubTaskStateSlice.reducer;
export const { resetAddSubtaskStatus } = addSubTaskStateSlice.actions;
