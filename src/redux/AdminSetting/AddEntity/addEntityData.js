import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { ArcError, ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// Define the initial state
const initialState = {
  Addstatus: "idel",
  error: null,
  loading:false
};

export const AddEntityData = createAsyncThunk(
  "addEntityState/AddEntityData",
  async (data) => {
    try {
      
      let loggedUserId = window.sessionStorage.getItem("Globalid");
      //data.entityid = "5CDC0F7A-0670-45A8-B87E-3B131390931C";
      data.userid=loggedUserId;
      // Prepare the data object in the required format
      const requestData = {
        entityid: data.entityid,
        userid: loggedUserId,
        data: data,
      };
      const response = await fetch(
        API_TEST_URL + "/arcadminsetting/createnewentity",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const messageval=await response.json();
        if(messageval?.result?.response=="entity already exists" || messageval?.result?.response=="Failed to create the entity."){
          ArcError({
            Message: messageval.message,
            position: "top-right",
          })
        }else {
          ArcSuccess({
            Message: "New Entity created",
            position: "top-right",
          });
        }
        
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
const addEntityStateSlice = createSlice({
  name: "addEntityState",
  initialState,
  reducers: {
    resetAddStatus: (state) => {
      state.Addstatus = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddEntityData.pending, (state) => {
        state.Addstatus = "loading...";
        state.loading=true;
      })
      .addCase(AddEntityData.fulfilled, (state, action) => {
        state.Addstatus = "succeeded";
        state.loading=false;
      })
      .addCase(AddEntityData.rejected, (state, action) => {
        state.status = "failed";
        state.Addstatus = action.error.message;
        state.loading=false;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default addEntityStateSlice.reducer;
export const { resetAddStatus } = addEntityStateSlice.actions;
