import * as types from "./types";

export const getentitySuccess = (entity) => ({
  type: types.FETCH_ENTITY_DATA_SUCCESS,
  payload: entity,
});
export const selectNewEntity = (entityid) => ({
  type: types.SELECT_NEW_ENTITY,
  payload: entityid,
});
export const getMasterDataSuccess = (masterdata) => ({
  type: types.FETCH_MASTER_DATA_SUCCESS,
  payload: masterdata,
});

export const getlistfieldsSuccess = (listfields) => ({
  type: types.FETCH_LIST_FIELDS_SUCCESS,
  payload: listfields,
});

export const getListdataSuccess = (listdata) => ({
  type: types.FETCH_LIST_DATA_SUCCESS,
  payload: listdata,
});

export const getDatasetSuccess = (listdata) => ({
  type: types.FETCH_DATASET_SUCCESS,
  payload: listdata,
});
export const setPagination = (firstPageIndex, pageSize) => ({
  type: types.SET_PAGINATION,
  payload: { firstPageIndex, pageSize },
});

export const setAdvMatchedLookup = (lookup) => ({
  type: types.SET_ADV_MATCHED_LOOKUP,
  payload: lookup,
});

export const setMatchedLookup = (lookup) => ({
  type: types.SET_MATCHED_LOOKUP,
  payload: lookup,
});

export const toggleColumnMapping = (selectedAttributes) => ({
  type: types.TOGGLE_COLUMN_ISMAPPING,
  payload: selectedAttributes,
});

export const toggleFilterMapping = (selectedAttributes) => ({
  type: types.TOGGLE_FILTER_ISMAPPING,
  payload: selectedAttributes,
});

export const createGroupByData = (groupByData) => ({
  type: types.CREATE_HOR_GROUPBYDATA,
  payload: groupByData,
});
export const setHorizontalGroupBy = (id, optionid) => ({
  type: types.CHANGE_HORIZONTAL_GROUPBY,
  payload: {
    id,
    optionid,
  },
});

export const addSelectedFilter = (filter) => ({
  type: types.SELECTED_FILTER_VALUE,
  payload: filter,
});
export const addSelectedCustomFilter = (selectedOptions, textvalues) => ({
  type: types.ADD_ADDITIONAL_FILTER,
  payload: { selectedOptions, textvalues },
});

export const setDropdownChecked = (masterid, selectedValue, isChecked) => ({
  type: types.SET_DROPDOWN_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const setMultiselectChecked = (masterid, selectedValue, isChecked) => ({
  type: types.SET_MULTISELECT_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const removeAllFilters = (filterId) => ({
  type: types.REMOVE_ALL_FILTER,
  payload: filterId,
});
export const removeQuickFilter = (filterId) => ({
  type: types.REMOVE_QUICK_FILTER,
  payload: filterId,
});
export const removeAdvancedFilter = (filterId) => ({
  type: types.REMOVE_ADVANCED_FILTER,
  payload: filterId,
});
export const setTextValue = (textValues) => ({
  type: types.QUICK_TEXT_VALUE,
  payload: textValues,
});
export const resetCheckedValues = (filterid) => ({
  type: types.RESET_QUICK_FILTER_VALUES,
  payload: filterid,
});
export const createDataset = (dataSet) => ({
  type: types.CREATE_NEW_DATASET,
  payload: dataSet,
});
export const updateDataset = (dataSet) => ({
  type: types.EDIT_DATASET,
  payload: dataSet,
});
export const setNewDatasetID = (dataSetID) => ({
  type: types.GET_NEW_DATASET_INFO_SUCCESS,
  payload: dataSetID,
});
export const deleteDataset = (dataSetID) => ({
  type: types.DELETE_DATASET_DB,
  payload: dataSetID,
});
export const sortColumn = (dataindex) => ({
  type: types.SORTED_COLUMN,
  payload: { dataindex },
});

export const updateColumnSeq = (columnSequence) => ({
  type: types.SET_COLUMN_SEQ,
  payload: columnSequence,
});

export const updatedNewLayout = (newLayout) => ({
  type: types.SET_NEW_LAYOUT,
  payload: newLayout,
});
export const setAdvMultiOptionChecked = (
  masterid,
  selectedValue,
  isChecked
) => ({
  type: types.SET_ADV_MULTISELECT_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});
export const setAdvOptionChecked = (masterid, selectedValue, isChecked) => ({
  type: types.SET_ADV_DROPDOWN_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});
