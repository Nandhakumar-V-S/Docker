import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcFaild, ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Status: "idel",
  error: null,
};

export const AddTag = createAsyncThunk(
  "AddTagState/AddTag",
  async ({ data, transactionid }) => {
    try {
      let loggedUserId = window.sessionStorage.getItem("Globalid");
      const entityid = "7E6694D1-8477-4E8A-A19F-477156E832FF";
      // Prepare the data object in the required format
      const requestData = {
        entityid: entityid,
        userid: loggedUserId,
        transactionid: transactionid,
        data: data,
      };
      const response = await fetch(
        API_TEST_URL + "/arctag/addtagtotaggroup",
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
          Message: " Tag Added Successfully",
          position: "top-right",
        });
      }
      if (!response.ok) {
        const errorResponse = await response.json();
        ArcFaild({
            Message: {errorResponse},
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
const AddTagStateSlice = createSlice({
  name: "AddTagState",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.Status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddTag.pending, (state) => {
        state.Status = "loading...";
      })
      .addCase(AddTag.fulfilled, (state) => {
        state.Status = "successful";
      })
      .addCase(AddTag.rejected, (state) => {
        state.Status = "failed";
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default AddTagStateSlice.reducer;
export const { resetStatus } = AddTagStateSlice.actions;
