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
  validation: [],
  error: null,
  status:"idel"
};
// Move the navigation logic outside the async function

export const createAttriute = createAsyncThunk(
  "Attribute/CreateAttriute",
  async (data) => {
    try {
      console.log("Create Attribute");
      console.log(data);
      const TransactionID = sessionStorage.getItem("Current_EntityID");

      console.log(TransactionID);
      data.entityid = TransactionID;
      const response = await fetch(
        API_TEST_URL + "/arcconfiguration/createnewattribute",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
console.log(response);
      // if (response.ok) {
      //   ArcSuccess({
      //     Message: "New Attribute created successfully",
      //     position: "top-right",
      //   });
      // }

      // if (!response.ok) {
      //   const errorResponse = await response.json();
      //   throw new Error(
      //     `HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`
      //   );
      // }

      const responseData = await response.text();
      console.log(responseData);

      // const navigate = useNavigate();
      // if (responseData === "successful") {
      //   ArcSuccess({
      //     Message: "Lead Information Added Successfully",
      //     position: "top-center",
      //   });
      // }

      return responseData;
    } catch (error) {
      throw error.message || "An error occurred during the request";
    }
  }
);

export const createattributevalidation = createAsyncThunk(
  "Attribute/createattributevalidation",
  async (data) => {
    try {
      console.log(data);
      const TransactionID = sessionStorage.getItem("Current_EntityID");

      console.log(TransactionID);
      data.entityid = TransactionID;
      const response = await fetch(
        API_TEST_URL + "/arcconfiguration/createattributevalidation",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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
const arcAddAttributeSlice = createSlice({
  name: "arcAddAttribute",
  initialState,
  reducers: {
    resetAddStatus: (state) => {
      state.Addstatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAttriute.pending, (state) => {
        state.status="loading...";
        state.Addstatus = "loading...";
      })
      .addCase(createAttriute.fulfilled, (state, action) => {
        state.status = "success";
        state.Addstatus = action.payload;       
      })
      .addCase(createAttriute.rejected, (state, action) => {
        state.status = "failed";
        state.Addstatus = action.error.message;
      })
      .addCase(createattributevalidation.fulfilled, (state, action) => {
        console.log(action.payload);
        // state.Addstatus = "success";
        state.validation = action.payload;


      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default arcAddAttributeSlice.reducer;
export const { resetAddStatus } = arcAddAttributeSlice.actions;
