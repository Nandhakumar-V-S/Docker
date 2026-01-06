import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Addstatus: "idel",
  error: null,
  details: [],
};

export const AuditlogDetails = createAsyncThunk(
  "AuditlogDetailsState/AuditlogDetails",
  async (obj ) => {
    try {
        // const requestData = {
        //     emailID: obj.emailID,
        //     tenantappid: "string",
        //     tenant: sessionStorage.getItem("tenantidentifier"),
        //     loginType: loginType,
        //     loginStatus: loginStatus,
        //     ip: ip
        //   };

      const response = await fetch(
        API_TEST_URL + "/audit/insertaudit",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );

      if (response.ok) {
        // ArcSuccess({
        //   Message: "Permission Created Successfully",
        //   position: "top-right",
        // });
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
const AuditlogDetailsStateSlice = createSlice({
  name: "AuditlogDetailsState",
  initialState,
  reducers: {
    resetAddStatus: (state) => {
      state.Addstatus = "idel";
    },
  },      
  extraReducers: (builder) => {
    builder
      .addCase(AuditlogDetails.pending, (state) => {
        state.Addstatus = "loading...";
      })
      .addCase(AuditlogDetails.fulfilled, (state, action) => {
        state.Addstatus = "succeeded";
        state.details = action.payload;
      })
      .addCase(AuditlogDetails.rejected, (state, action) => {
        state.Addstatus = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default AuditlogDetailsStateSlice.reducer;
export const { resetAddStatus } = AuditlogDetailsStateSlice.actions;
