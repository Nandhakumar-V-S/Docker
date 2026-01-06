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

export const EditTagGroupName = createAsyncThunk(
  "EditTagGroupNameState/EditTagGroupName",
  async ({ column16, transactionid }) => {
    try {
      // Prepare the data object in the required format
      const requestData = {
        column16: column16,
        transactionid: transactionid,
      };
      const response = await fetch(
        API_TEST_URL + "/arctag/duplicatetaggroupnamecheck",
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
        const result = await response.json();
        if (result) {
          console.log(result);
          const msg = await result?.result?.response;
          console.log(msg);
          if (msg === "Tagname Already Exists.") {
            ArcFaild({
              Message: "Tag Group Already Exists",
              position: "top-right",
            });
            return "Already Existed";
          } else {
            try {
              let loggedUserId = window.sessionStorage.getItem("Globalid");
              const entityid = "7E6694D1-8477-4E8A-A19F-477156E832FF";
              const requestedData = {
                entityid: entityid,
                transactionid: transactionid,
                userid: loggedUserId,
                data: [
                  {
                    apiname: "column16",
                    tablename: "utbl_Workitem",
                    id: "520f2992-58a6-49f0-8021-ec264b715e59",
                    columntype: "text",
                    value: column16,
                  },
                ],
              };

              const UpdateTagNameResponse = await fetch(
                API_TEST_URL + "/arctag/updatetaggroup",
                {
                  method: "POST",
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(requestedData),
                }
              );
              if (UpdateTagNameResponse.ok) {
                ArcSuccess({
                  Message: " Tag Group Edited Successfully",
                  position: "top-right",
                });
                return "Tag Group Edited Successfully";
              }
              if (!UpdateTagNameResponse.ok) {
                const errorResponse = await UpdateTagNameResponse.json();

                throw new Error(
                  `HTTP error! Status: ${UpdateTagNameResponse.status}, Message: ${errorResponse.message}`
                );
              }
            } catch (error) {
              throw error.message || "An error occurred during the request";
            }
          }
        }
        console.log(result);
        // console.log(response.json())
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
const EditTagGroupNameStateSlice = createSlice({
  name: "EditTagGroupNameState",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.Status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(EditTagGroupName.pending, (state) => {
        state.Status = "loading...";
      })
      .addCase(EditTagGroupName.fulfilled, (state) => {
        state.Status = "successful";
      })
      .addCase(EditTagGroupName.rejected, (state) => {
        state.Status = "failed";
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default EditTagGroupNameStateSlice.reducer;
export const { resetStatus } = EditTagGroupNameStateSlice.actions;
