import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AUTHENTICATE_SOLR, solarsearch } from "@/config/serverApiConfig";

// Define the initial state
const initialState = {
  status: "idel",
  Data: [],
  filteredData: [],
  filteredResults: [],
  paginationStatus: "idel",
  error: null,
};

//Global search Fields
export const GlobalSearchFields = createAsyncThunk(
  "GlobalSearchFieldsState/GlobalSearchFields",
  async ({ searchData }) => {
    if (solarsearch) {
      const tokenString = localStorage.getItem("SolrToken");
      const tokenObject = JSON.parse(tokenString);
      console.log(tokenObject);
      const token = tokenObject.tokenString;
      const { username } = AUTHENTICATE_SOLR;
      console.log(token);
      const clientid = username;
      const Searchtext = searchData.replace(/ /g, "\\ ");
      console.log(Searchtext);

      try {
        // Prepare the data object in the required format
        const requestData = {
          clientId: clientid,
          query: `Titlelowercase:*${Searchtext}*`,
          count: 300,
        };
        const response = await fetch(
          "https://arcsolr-qa.archarina.com/api/Solr/GetAutoComplete",
          {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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

        const responseData = await response.json();
        console.log(responseData);
        return responseData?.response;
      } catch (error) {
        throw error.message || "An error occurred during the request";
      }
    }
  }
);

//Global Search Pagination

export const GlobalSearchPagination = createAsyncThunk(
  "GlobalSearchPaginationState/GlobalSearchPagination",
  async (RequestData) => {
    if (solarsearch) {
      const { pageNumberCount, searchData, entityName } = RequestData;
      console.log(RequestData.entityName);
      const tokenString = localStorage.getItem("SolrToken");
      const tokenObject = JSON.parse(tokenString);
      console.log(tokenObject);
      const token = tokenObject.tokenString;
      const { username } = AUTHENTICATE_SOLR;
      console.log(token);
      const clientid = username;
      const Searchtext = searchData.replace(/ /g, "\\ ");
      console.log(Searchtext, "Searchtext");

      let PostData = {};
      if (entityName === "All Results") {
        PostData = {
          clientId: clientid,
          query: `Titlelowercase:*${Searchtext}*`,
          pageDetails: {
            pageNumber: pageNumberCount || 0,
            pageSize: 5000,
          },
          orderBy: "Title asc",
        };
        // queryString = `Title:*${searchData}*`;
      } else {
        PostData = {
          clientId: clientid,
          query: `Titlelowercase:*${Searchtext}* AND EntityName:"${entityName}"`,
          pageDetails: {
            pageNumber: pageNumberCount || 0,
            pageSize: 15,
          },
          orderBy: "Title asc",
        };
      }
      try {
        // Prepare the data object in the required format
        // const requestData = {
        //   clientId: clientid,
        //   // query: `Title:*${searchData}* AND EntityName:*${entityName}*`,
        //   query: queryString,
        //   pageDetails: {
        //     pageNumber: pageNumberCount || 0,
        //     pageSize: 100,
        //   },
        //   orderBy: "Title asc",
        // };
        const response = await fetch(
          "https://arcsolr-qa.archarina.com/api/Solr/GetAutoCompletePagination",
          {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(PostData),
          }
        );
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(
            `HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`
          );
        }

        const responseData = await response.json();
        console.log(responseData.response);
        return responseData?.response;
      } catch (error) {
        throw error.message || "An error occurred during the request";
      }
    }
  }
);

// Create a slice
const GlobalSearchFieldsStateSlice = createSlice({
  name: "GlobalSearchFieldsState",
  initialState,
  reducers: {
    ResetFilter(state) {
      state.Data = [];
      state.status = "idel";
      state.filteredData = [];
      state.filteredResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GlobalSearchFields.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(GlobalSearchFields.fulfilled, (state, action) => {
        state.Data = action.payload;
        state.status = "successful";
      })
      .addCase(GlobalSearchFields.rejected, (state, action) => {
        state.status = "failed";
        state.status = action.error.message;
      })
      .addCase(GlobalSearchPagination.pending, (state) => {
        if (state.filteredResults.length === 0) {
          state.status = "loading...";
        }
      })
      .addCase(GlobalSearchPagination.fulfilled, (state, action) => {
        state.paginationStatus = "successful";
        state.Data = action.payload;
        if (state.filteredResults.length === 0) {
          state.status = "successful";
        }
        // if (action.payload.docs && action.payload.docs.length > 0) {
        //   // Assuming action.payload.docs is an array of data to be added
        //   state.filteredResults = [
        //     ...state.filteredResults,
        //     ...action.payload.docs,
        //   ];
        // } else {
        //   state.filteredResults = action.payload?.docs;
        // }
        state.filteredResults = [
          ...state.filteredResults,
          ...action.payload.docs,
        ];
        // state.filteredResults = action.payload?.docs.forEach((data) =>
        //   console.log(data)
        // );
        console.log(state.filteredResults);
        // state.filteredResults = [...filteredResults];
      })
      .addCase(GlobalSearchPagination.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Export the async thunk for use in components

// Export the reducer
export default GlobalSearchFieldsStateSlice.reducer;
export const { ResetFilter } = GlobalSearchFieldsStateSlice.actions;
