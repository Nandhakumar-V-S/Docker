// arcAddFormSlice.js
import { useNavigate } from "react-router-dom";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, API_TEST_URL } from "@/config/serverApiConfig";
import { ArcFaild } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";
import {
  ArcSuccess,
  ArcError,
} from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Addstatus: "idel",
  status: "idel",
  Validationstatus: "idel",
  validation: [],
  error: null,
};
// Move the navigation logic outside the async function

export const createProject = createAsyncThunk(
  "Project/createProject",
  async (data) => {
    try {
      console.log("Create Project");
      console.log(data);
      const TransactionID = sessionStorage.getItem("Current_EntityID");
      let loggedUserId = window.sessionStorage.getItem("Globalid");
      console.log(TransactionID);
      
      console.log(TransactionID);
      const requestData = {
        entityid: "0462F02F-D350-4244-9B76-3CBC965207BB",
        userid: loggedUserId,
        data: data,
      };
      const response = await fetch(
        API_TEST_URL + "/arcproject/createproject",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      

      const responseData = await response.json();
      console.log(responseData);

      // const navigate = useNavigate();
      if (responseData?.result?.response === "Project created successfully.") {
        ArcSuccess({
          Message: "Project Created Successfully",
          position: "top-right",
        });
      }else if (responseData?.result?.response === "Failed to create the Project.") {
        ArcFaild({
          Title: "Failed",
          Message: responseData?.result?.response,
          position: "top-right",
        });
      }

      return responseData;
    } catch (error) {
      throw error.message || "An error occurred during the request";
    }
  }
);

export const createprojectvalidation = createAsyncThunk(
  "Project/createprojectvalidation",
  async (data) => {
    try {
      console.log(data);
      
      let loggedUserId = window.sessionStorage.getItem("Globalid");
      // console.log(TransactionID);
      const requestData = {
        entityid: "0462F02F-D350-4244-9B76-3CBC965207BB",
        userid: loggedUserId,
        data: data,
      };
      console.log(requestData);
      const response = await fetch(
        API_TEST_URL + "/arcproject/CreateProjectValidation",
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
     // const responseData = await response.json();
      if (responsedata?.result?.response === "Project name already exists." || responsedata?.result?.response === "Project name exceeds 50 characters.") {
        ArcFaild({
          Title: "Failed",
          Message: responsedata?.result?.response,
          position: "top-right",
        });
      }
      console.log(responsedata);
      return responsedata;
    } catch (error) {
      throw error.message || "An error occurred during the request";
    }
  }
);

// Create a slice
const arcAddProjectSlice = createSlice({
  name: "arcAddProject",
  initialState,
  reducers: {
    resetAddStatus: (state) => {
      state.Addstatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.status ="loading...";
        state.Addstatus = "loading...";
      })
      .addCase(createProject.fulfilled, (state, action) => {
         state.status = "success";
        state.Addstatus = action.payload;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = "failed";
        state.Addstatus = action.error.message;
      })
      .addCase(createprojectvalidation.fulfilled, (state, action) => {
        console.log(action.payload);
         state.Validationstatus = "success";
        state.validation = action.payload;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default arcAddProjectSlice.reducer;
export const { resetAddStatus } = arcAddProjectSlice.actions;
