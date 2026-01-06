import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcFaild, ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Status: "idel",
  error: null,
};

export const Downloadexportedata = createAsyncThunk(
  "DownloadexportedataState/Downloadexportedata",
  async ({requestData}) => {
    try {
     // Key to remove and new key-value pair to add
    
      

      
      // Prepare the  object in the required format
    //   const requestData = {
    //     entityids: entityIds,
    //     userid: loggedUserId,
    //     transactionid: transactionId,
    //   };
      const response = await fetch(
        API_TEST_URL + "/arc_export/downloadexportedtaskdata",
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
          Message: " Entity Updated Successfully",
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
const DownloadexportedataStateSlice = createSlice({
  name: "Downloadexportedata",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.Status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Downloadexportedata.pending, (state) => {
        state.Status = "loading...";
      })
      .addCase(Downloadexportedata.fulfilled, (state) => {
        state.Status = "successful";
      })
      .addCase(Downloadexportedata.rejected, (state) => {
        state.Status = "failed";
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default DownloadexportedataStateSlice.reducer;
// export const { resetStatus } = AddTagtoGroupEntityStateSlice.actions;
