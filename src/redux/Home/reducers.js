import * as types from "./types";

const initialState = {
  entityid: "",
  masterData: [],
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HOME_CHANGE_ENTITY_ID: {
      console.log(action.payload);
      return {
        ...state,
        entityid: action.payload,
      };
    }
    case types.HOME_FETCH_MASTER_DATA_SUCCESS: {
      const masterData = action.payload?.result?.data?.lookupvalues;
      const parsedMasterData = masterData.map((item) => ({
        ...item,
        mastervalues: JSON.parse(item.mastervalues),
      }));
      console.log(parsedMasterData);
      return {
        ...state,
        masterData: parsedMasterData,
      };
    }
    default:
      return state;
  }
};

export default HomeReducer;
