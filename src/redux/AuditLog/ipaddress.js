import { useState,useEffect } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Addstatus: "idel",
  error: null,
  details: [],
};

export const GetIPDetails = createAsyncThunk(
  "GetIPDetailsState/GetIPDetails",
  async ( ) => {
    try {
      const response = await fetch("https://geolocation-db.com/json/");

      if (response.ok) {
        const data = await response.json();
       // setIPAddress(data.IPv4);
        //console.log(data.IPv4);
        sessionStorage.setItem("ipAddress",data.IPv4)
      }
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`
        );
      }

      const responseData = await response.json();

      console.log(responseData);
      return responseData;
    } catch (error) {
      throw error.message || "An error occurred during the request";
    }
  }
);

// Create a slice
const GetIPDetailsStateSlice = createSlice({
  name: "GetIPDetailsState",
  initialState,
  reducers: {
    resetAddStatus: (state) => {
      state.Addstatus = "idel";
    },
  },      
  extraReducers: (builder) => {
    builder
      .addCase(GetIPDetails.pending, (state) => {
        state.Addstatus = "loading...";
      })
      .addCase(GetIPDetails.fulfilled, (state, action) => {
        state.Addstatus = "succeeded";
        state.details = action.payload;
      })
      .addCase(GetIPDetails.rejected, (state, action) => {
        state.Addstatus = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default GetIPDetailsStateSlice.reducer;
export const { resetAddStatus } = GetIPDetailsStateSlice.actions;

