import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Status: "idel",
  error: null,
  GetTaskListForNoteslist: [],
};

export const GetTaskListForNotes = createAsyncThunk(
  "GetTaskListForNotesState/GetTaskListForNotes",
  async () => {
    try {
      const requestData = {
        entityid: "4AFB7451-C0D6-4BC8-BAAA-51ED99F1A323",
        transactionid: "8323A251-DF08-493F-9906-DB137AAF6961",
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
        API_TEST_URL + "/notes/GetNotesTaskwithProjectDetails",
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
const GetTaskListForNotesStateSlice = createSlice({
  name: "GetTaskListForNotesState",
  initialState,
  reducers: {
    resetMasterNotesStatus: (state) => {
      state.Status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetTaskListForNotes.pending, (state) => {
        state.Status = "loading...";
      })
      .addCase(GetTaskListForNotes.fulfilled, (state, action) => {
        state.GetTaskListForNoteslist = action.payload;
        state.Status = "successful";
      })
      .addCase(GetTaskListForNotes.rejected, (state, action) => {
        // state.status = "failed";
        state.Status = "failed";
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default GetTaskListForNotesStateSlice.reducer;
export const { resetMasterNotesStatus } = GetTaskListForNotesStateSlice.actions;
