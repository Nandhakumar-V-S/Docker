import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Addstatus: "idel",
  error: null,
  validation:[]
};

export const UpdateEntityAttributesData = createAsyncThunk(
  "UpdateEntityAttributesStatus/UpdateEntityAttributesData",
  async ({ data, transactionid }) => {
    try {
      data.userid = "1000";
      data.entityid = sessionStorage.getItem("Current_EntityID");
      // Prepare the data object in the required format
      const requestData = {
        entityid: data.entityid,
        userid: data.userid,
        transactionid: transactionid,
        data: data,
      };
      const response = await fetch(
        API_TEST_URL + "/arcadminsetting/UpdateEntityAttributesByID",
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
          Message: "Attribute  Updated",
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

export const Updateattributevalidation = createAsyncThunk(
  "Attribute/Updateattributevalidation",
  async ({data,transactionid}) => {
    try {
      console.log(data);
      //const TransactionID = sessionStorage.getItem("Current_EntityID");

      data.userid = "1000";
      data.entityid = sessionStorage.getItem("Current_EntityID");
      // Prepare the data object in the required format
      const requestData = {
        entityid: data.entityid,
        userid: data.userid,
        transactionid: transactionid,
        data: data,
      };
      const response = await fetch(
        API_TEST_URL + "/arcadminsetting/editattributevalidation",
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

      const responsedata = await response.json();
      console.log(responsedata);
      return responsedata;
    } catch (error) {
      throw error.message || "An error occurred during the request";
    }
  }
);
// Create a slice
const UpdateEntityAttributesStatusSlice = createSlice({
  name: "UpdateEntityAttributesStatus",
  initialState,
  reducers: {
    resetAddStatus: (state) => {
      state.Addstatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdateEntityAttributesData.pending, (state) => {
        state.Addstatus = "loading...";
      })
      .addCase(UpdateEntityAttributesData.fulfilled, (state, action) => {
        // state.Addstatus = "success";
        state.Addstatus = "successful";
      })
      .addCase(UpdateEntityAttributesData.rejected, (state, action) => {
        // state.status = "failed";
        state.Addstatus = "failed";
      })
      .addCase(Updateattributevalidation.fulfilled, (state, action) => {
        console.log(action.payload);
        // state.Addstatus = "success";
        state.validation = action.payload;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default UpdateEntityAttributesStatusSlice.reducer;
export const { resetAddStatus } = UpdateEntityAttributesStatusSlice.actions;
