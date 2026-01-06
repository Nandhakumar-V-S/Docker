import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

const initialState = {
  status: "idle",
  error: null,
  entityDetails: {},
};

export const getSearch360EntityInfo = createAsyncThunk(
  "entity/getSearch360EntityInfo",
  async ({ TransactionID, previousPathName }) => {
    try {
      console.log(TransactionID);
      let TaskEntityID = "26B84156-CC30-416E-99D5-B37409B4D0BD";
      let TaskListID = "0C67EE8D-2E31-4E25-85B2-4AFA61197F3E";
      let ProjectEntityID = "0462F02F-D350-4244-9B76-3CBC965207BB";
      let ProjectListID = "DD1AB1F0-31E1-4BEE-80E2-3EFFC73AD752";
      const requestData = {
        entityid: previousPathName === "/task" ? TaskEntityID : ProjectEntityID,
        listid: previousPathName === "/task" ? TaskListID : ProjectListID,
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
            : "/arcproject/getproject360details"),
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

const SearchEntitySlice = createSlice({
  name: "SearchEntity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearch360EntityInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSearch360EntityInfo.fulfilled, (state, action) => {
        (state.status = "success"), (state.entityDetails = action.payload);
      })
      .addCase(getSearch360EntityInfo.rejected, (state, action) => {
        (state.status = "failed"),
          (state.error = action.payload.message || "Request Failed");
      });
  },
});

export default SearchEntitySlice.reducer;
