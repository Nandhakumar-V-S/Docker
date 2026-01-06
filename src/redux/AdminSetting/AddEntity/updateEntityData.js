import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Status: "idel",
  error: null,
  loading:false
};

export const UpdateEntityData = createAsyncThunk(
  "UpdateEntityState/UpdateEntityData",
  async ({ data, transactionid }) => {
    try {
      let loggedUserId = window.sessionStorage.getItem("Globalid");
      data.entityid = "5CDC0F7A-0670-45A8-B87E-3B131390931C";
      // Prepare the data object in the required format
      const requestData = {
        entityid: data.entityid,
        userid: loggedUserId,
        transactionid: transactionid,
        data: data,
      };
      const response = await fetch(
        API_TEST_URL + "/arcadminsetting/updateentitybyid",
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
          Message: "Entity Updated",
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
const UpdateEntityStateSlice = createSlice({
  name: "UpdateEntityState",
  initialState,
  reducers: {
    resetMasterTaskStatus: (state) => {
      state.Status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdateEntityData.pending, (state) => {
        state.Status = "loading...";
        state.loading=true;
      })
      .addCase(UpdateEntityData.fulfilled, (state, action) => {
        state.loading = false;
        state.Status = "successful";
      })
      .addCase(UpdateEntityData.rejected, (state, action) => {
        state.loading = false;
        state.Status = "failed";
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default UpdateEntityStateSlice.reducer;
export const { resetEntityStatus } = UpdateEntityStateSlice.actions;
