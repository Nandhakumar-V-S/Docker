import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
  entityDetails: {},
};

export const get360EntityInfo = createAsyncThunk(
  "entity/get360EntityInfo",
  async ({ TransactionID, previousPathName }) => {
    try {
      // Prepare the data object in the required format
      let TaskEntityID = "26B84156-CC30-416E-99D5-B37409B4D0BD";
      let TaskListID = "0C67EE8D-2E31-4E25-85B2-4AFA61197F3E";
      let ExecEntityID = "F48EF545-9995-4F8F-857D-DDDA2BC063CC";
      let ExecListID = "B319C6B4-957F-49BC-B59B-5BE86FB3FA08";
      const requestData = {
        entityid: previousPathName === "/task" ? TaskEntityID : ExecEntityID,
        listid: previousPathName === "/task" ? TaskListID : ExecListID,
        start: 0,
        skip: 10,
        orderby: "",
        orderbydir: "",
        loggeduserid: "",
        sessionid: "",
        transactionid: TransactionID,
        filterparams: [
          {
            filterid: "",
            apiname: "",
            filtervalue: "",
            condition: "",
          },
        ],
      };
      const response = await fetch(
        API_TEST_URL +
          (previousPathName === "/task"
            ? "/task/gettask360details"
            : "/planexecution/getplanexeclistdetailsbyid"),
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
      console.log(responseData);
      return responseData;
    } catch (error) {
      throw error.message || "An error occurred during the request";
    }
  }
);

// Create a slice
const entitySlice = createSlice({
  name: "entity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get360EntityInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(get360EntityInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entityDetails = action.payload;
      })
      .addCase(get360EntityInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message || "Request failed";
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default entitySlice.reducer;
