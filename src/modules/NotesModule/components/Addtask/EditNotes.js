import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Status: "idel",
  error: null,
};

export const UpdateMasterNotesData = createAsyncThunk(
  "UpdateNotes/UpdateNotesdata",
  async ({ allInputValues, TransactionId }) => {
    try {
      const requestData = {
        entityid: "4AFB7451-C0D6-4BC8-BAAA-51ED99F1A323",
        transactionid: TransactionId,
        userid: "1011",
        data: allInputValues,
      };
      const response = await fetch(API_TEST_URL + "/notes/NotesUpdate", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        ArcSuccess({
          Message: "Notes Updated",
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
const UpdateMasterNotesStateSlice = createSlice({
  name: "UpdateNotesdata",
  initialState,
  reducers: {
    resetMasterNotesStatus: (state) => {
      state.Status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdateMasterNotesData.pending, (state) => {
        state.Status = "loading...";
      })
      .addCase(UpdateMasterNotesData.fulfilled, (state, action) => {
        // state.Status = "success";
        state.Status = "successful";
      })
      .addCase(UpdateMasterNotesData.rejected, (state, action) => {
        // state.status = "failed";
        state.Status = "failed";
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default UpdateMasterNotesStateSlice.reducer;
export const { resetMasterNotesStatus } = UpdateMasterNotesStateSlice.actions;
