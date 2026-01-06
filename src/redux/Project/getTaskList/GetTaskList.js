import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_TEST_URL } from "@/config/serverApiConfig";

const initialState = {
  response: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  // other state properties
};

export const GetProjectTaskList = createAsyncThunk(
  "GetProjectTaskListState/GetProjectTaskList",
  async (RequestData) => {
    try {
      const response = await fetch(
        API_TEST_URL + "/arcproject/getprojecttasklistdetails",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(RequestData),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, Message: ${errorResponse.message}`
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
const GetProjectTaskListStateSlice = createSlice({
  name: "GetProjectTaskListState",
  initialState,
  reducers: {
    resetstatus: (state) => {
      state.status = null;
      state.response = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetProjectTaskList.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(GetProjectTaskList.fulfilled, (state, action) => {
        state.status = "successful";
        state.response = action.payload;
      })
      .addCase(GetProjectTaskList.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default GetProjectTaskListStateSlice.reducer;
export const { resetstatus } = GetProjectTaskListStateSlice.actions;
