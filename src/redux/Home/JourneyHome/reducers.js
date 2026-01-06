import * as types from "./types";

const initialState = {
  entityid: "",
  masterData: [],
  homescreenData: null, 
};

const JourneyHomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.JOURNEY_HOME_ENTITY_ID:
      
      return {
        ...state,
        entityid: action.payload,
      };
    case types.JOURNEY_HOME_FETCH_MASTER_DATA_SUCCESS:
          return {
            ...state,
            homescreenData: action.payload?.result?.data[0]?.panel,
          };
    case types.UPDATE_FIELD_STATUS_SUCCESS:
      return {
        ...state,
        field_id : action.payload.fieldId,
        field_isactive: action.payload.isActive,
        homescreenData: state.homescreenData.map((section) => {
          if(section.fields){
            return{
              ...section,
              fields: section.fields.map((field) => 
                field.field_Id === action.payload.fieldId ? 
                {...field, field_isactive: action.payload.isActive}
                : field)
            }
          }
          return section;
        })
      };
    default:
      return state;
  }
};

export default JourneyHomeReducer;
