import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Status: "idel",
  error: null,
  GetNotesDetails: [],
};

export const GetEditNotesdetails = createAsyncThunk(
  "GetEditNotesdetailsstate/GetEditNotesdetails",
  async (TransactionId) => {
    try {
      const requestData = {
        notesid: TransactionId,
        transactionid: TransactionId,
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
        API_TEST_URL + "/notes/GetNotesUpdateDetailslist",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      //   if (response.ok) {
      //     ArcSuccess({
      //       Message: "Notes Updated",
      //       position: "top-right",
      //     });
      //   }
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
const GetEditNotesdetailsstateSlice = createSlice({
  name: "GetEditNotesdetailsstate",
  initialState,
  reducers: {
    resetMasterNotesStatus: (state) => {
      state.Status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetEditNotesdetails.pending, (state) => {
        state.Status = "loading...";
      })
      .addCase(GetEditNotesdetails.fulfilled, (state, action) => {
        state.GetNotesDetails = action.payload;
        state.Status = "successful";
      })
      .addCase(GetEditNotesdetails.rejected, (state, action) => {
        // state.status = "failed";
        state.Status = "failed";
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default GetEditNotesdetailsstateSlice.reducer;
export const { resetMasterNotesStatus } = GetEditNotesdetailsstateSlice.actions;
