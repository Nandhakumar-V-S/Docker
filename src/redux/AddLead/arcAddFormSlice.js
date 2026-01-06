// arcAddFormSlice.js
import { useNavigate } from "react-router-dom";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, API_TEST_URL } from "@/config/serverApiConfig";
import {
  ArcSuccess,
  ArcError,
} from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Addstatus: "idel",
  error: null,
};
// Move the navigation logic outside the async function

export const createLead = createAsyncThunk("Lead/CreateLead", async (data) => {
  try {
    data.userid = "1000";
    data.entityid = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    // Prepare the data object in the required format
    const requestData = {
      entityid: data.entityid,
      userid: data.userid,
      data: data,
    };
    const response = await fetch(
      API_TEST_URL + "/planexecution/insertplanexecbyid",
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
        Message: "New Task Created",
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

    // const navigate = useNavigate();
    if (responseData === "successful") {
      ArcSuccess({
        Message: "Lead Information Added Successfully",
        position: "top-center",
      });
    }

    return responseData;
  } catch (error) {
    throw error.message || "An error occurred during the request";
  }
});

// Create a slice
const arcAddFormSlice = createSlice({
  name: "arcAddForm",
  initialState,
  reducers: {
    resetAddStatus: (state) => {
      state.Addstatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLead.pending, (state) => {
        state.Addstatus = "loading...";
      })
      .addCase(createLead.fulfilled, (state, action) => {
        // state.Addstatus = "success";
        state.Addstatus = action.payload;
      })
      .addCase(createLead.rejected, (state, action) => {
        state.status = "failed";
        state.Addstatus = action.error.message;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default arcAddFormSlice.reducer;
export const { resetAddStatus } = arcAddFormSlice.actions;
