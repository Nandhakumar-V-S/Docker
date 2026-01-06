import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import {
  ArcFaild,
  ArcSuccess,
} from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Status: "idel",
  error: null,
};

export const CreateTagGroup = createAsyncThunk(
  "CreateTagGroupState/CreateTagGroup",
  async ({ taggroupdata, entitydata, tagdata }) => {
    try {
      let loggedUserId = window.sessionStorage.getItem("Globalid");
      const entityid = "7E6694D1-8477-4E8A-A19F-477156E832FF";
      const transactionid = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
      // Prepare the data object in the required format
      const requestData = {
        entityid: entityid,
        userid: loggedUserId,
        transactionid: transactionid,
        tagroupdata: taggroupdata,
        entityids: entitydata,
        tagdata: tagdata,
      };
      const response = await fetch(API_TEST_URL + "/arctag/insertnewtaggroup", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        const checkTagGroup = await result?.result?.response;
        console.log(result);
        // const result = "";
        if (checkTagGroup === "Tag groupname Already Exists.") {
          ArcFaild({
            Message: "Tag groupname Already Exists.",
            position: "top-right",
          });
          return "Tag groupname Already Exists.";
        } else {
          ArcSuccess({
            Message: "Tag group Added successfully.",
            position: "top-right",
          });
          return "Tag group inserted successfully.";
        }
      }
      if (!response.ok) {
        const errorResponse = await response.json();
        ArcFaild({
          Message: "TagGroup Not Created",
          position: "top-right",
        });
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
const CreateTagGroupStateSlice = createSlice({
  name: "CreateTagGroupState",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.Status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateTagGroup.pending, (state) => {
        state.Status = "loading...";
      })
      .addCase(CreateTagGroup.fulfilled, (state) => {
        state.Status = "successful";
      })
      .addCase(CreateTagGroup.rejected, (state) => {
        state.Status = "failed";
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default CreateTagGroupStateSlice.reducer;
export const { resetStatus } = CreateTagGroupStateSlice.actions;
