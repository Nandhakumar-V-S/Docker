// arcAddFormSlice.js
import { useNavigate } from "react-router-dom";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import {
  ArcSuccess,
  ArcError,
} from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  status: "idel",
  error: null,
};
// Move the navigation logic outside the async function

export const DefaultInsertUpdate = createAsyncThunk(
  "default/DefaultInsertUpdate",
  async (RequestData) => {
    try {
      //   data.userid = "1000";
      //   data.entityid = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
      //   // Prepare the data object in the required format
      //   const requestData = {
      //     entityid: data.entityid,
      //     userid: data.userid,
      //     data: data,
      //   };
      const response = await fetch(API_TEST_URL + RequestData.endPoint, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(RequestData.postData),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        const ToasterMsg = responseData?.result?.response;
        ArcSuccess({
          Message: ToasterMsg,
          position: "top-right",
        });
      }
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`
        );
      }

      // const navigate = useNavigate();
      //   if (responseData === "successful") {
      //     ArcSuccess({
      //       Message: "Lead Information Added Successfully",
      //       position: "top-center",
      //     });
      //   }

      return responseData;
    } catch (error) {
      throw error.message || "An error occurred during the request";
    }
  }
);

// Create a slice
const DefaultInsertUpdateSlice = createSlice({
  name: "DefaultInsertUpdate",
  initialState,
  reducers: {
    resetInsertUpdateStatus: (state) => {
      state.status = "idel";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(DefaultInsertUpdate.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(DefaultInsertUpdate.fulfilled, (state, action) => {
        state.status = "success";
        // state.status = action.payload;
      })
      .addCase(DefaultInsertUpdate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default DefaultInsertUpdateSlice.reducer;
export const { resetInsertUpdateStatus } = DefaultInsertUpdateSlice.actions;
