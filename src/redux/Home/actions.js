import * as types from "./types";

export const changeEntityid = (id) => ({
  type: types.HOME_CHANGE_ENTITY_ID,
  payload: id,
});
export const getMasterDataSuccess = (masterdata) => ({
  type: types.HOME_FETCH_MASTER_DATA_SUCCESS,
  payload: masterdata,
});
