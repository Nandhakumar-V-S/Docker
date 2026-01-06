import * as types from "./types";

export const getentitySuccess = (entity) => ({
  type: types.PROJECT_FETCH_ENTITY_DATA_SUCCESS,
  payload: entity,
});
export const selectNewEntity = (entityid) => ({
  type: types.PROJECT_SELECT_NEW_ENTITY,
  payload: entityid,
});
export const getMasterDataSuccess = (masterdata) => ({
  type: types.PROJECT_FETCH_MASTER_DATA_SUCCESS,
  payload: masterdata,
});

export const getlistfieldsSuccess = (listfields) => ({
  type: types.PROJECT_FETCH_LIST_FIELDS_SUCCESS,
  payload: listfields,
});

export const getListdataSuccess = (listdata) => ({
  type: types.PROJECT_FETCH_LIST_DATA_SUCCESS,
  payload: listdata,
});

export const getDatasetSuccess = (listdata) => ({
  type: types.PROJECT_FETCH_DATASET_SUCCESS,
  payload: listdata,
});
export const setPagination = (firstPageIndex, pageSize) => ({
  type: types.PROJECT_SET_PAGINATION,
  payload: { firstPageIndex, pageSize },
});
export const setPagesize = (pageSize) => ({
  type: types.PROJECT_SET_PAGE_SIZE,
  payload: pageSize,
});

export const setAdvMatchedLookup = (lookup) => ({
  type: types.PROJECT_SET_ADV_MATCHED_LOOKUP,
  payload: lookup,
});

export const setMatchedLookup = (lookup) => ({
  type: types.PROJECT_SET_MATCHED_LOOKUP,
  payload: lookup,
});

export const toggleColumnMapping = (selectedAttributes) => ({
  type: types.PROJECT_TOGGLE_COLUMN_ISMAPPING,
  payload: selectedAttributes,
});

export const toggleFilterMapping = (selectedAttributes) => ({
  type: types.PROJECT_TOGGLE_FILTER_ISMAPPING,
  payload: selectedAttributes,
});
export const updateGroupByDataDir = (Direction) => ({
  type: types.PROJECT_CREATE_HOR_GROUPBYDATA_DIRECTION,
  payload: Direction,
});
export const createGroupByData = (groupByData) => ({
  type: types.PROJECT_CREATE_HOR_GROUPBYDATA,
  payload: groupByData,
});
export const setHorizontalGroupBy = (id, optionid) => ({
  type: types.PROJECT_CHANGE_HORIZONTAL_GROUPBY,
  payload: {
    id,
    optionid,
  },
});

export const addSelectedFilter = (filter) => ({
  type: types.PROJECT_SELECTED_FILTER_VALUE,
  payload: filter,
});
export const addSelectedCustomFilter = (selectedOptions, textvalues) => ({
  type: types.PROJECT_ADD_ADDITIONAL_FILTER,
  payload: { selectedOptions, textvalues },
});

export const setDropdownChecked = (masterid, selectedValue, isChecked) => ({
  type: types.PROJECT_SET_DROPDOWN_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const setMultiselectChecked = (masterid, selectedValue, isChecked) => ({
  type: types.PROJECT_SET_MULTISELECT_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const removeAllFilters = (filterId) => ({
  type: types.PROJECT_REMOVE_ALL_FILTER,
  payload: filterId,
});
export const removeQuickFilter = (filterId) => ({
  type: types.PROJECT_REMOVE_QUICK_FILTER,
  payload: filterId,
});
export const removeAdvancedFilter = (filterId) => ({
  type: types.PROJECT_REMOVE_ADVANCED_FILTER,
  payload: filterId,
});
export const setTextValue = (textValues) => ({
  type: types.PROJECT_QUICK_TEXT_VALUE,
  payload: textValues,
});
export const resetCheckedValues = (filterid) => ({
  type: types.PROJECT_RESET_QUICK_FILTER_VALUES,
  payload: filterid,
});
export const createDataset = (dataSet) => ({
  type: types.PROJECT_CREATE_NEW_DATASET,
  payload: dataSet,
});
export const updateDataset = (dataSet) => ({
  type: types.PROJECT_EDIT_DATASET,
  payload: dataSet,
});
export const setNewDatasetID = (dataSetID) => ({
  type: types.PROJECT_GET_NEW_DATASET_INFO_SUCCESS,
  payload: dataSetID,
});
export const deleteDataset = (dataSetID) => ({
  type: types.PROJECT_DELETE_DATASET_DB,
  payload: dataSetID,
});
export const sortColumn = (dataindex) => ({
  type: types.PROJECT_SORTED_COLUMN,
  payload: { dataindex },
});

export const updateColumnSeq = (columnSequence) => ({
  type: types.PROJECT_SET_COLUMN_SEQ,
  payload: columnSequence,
});

export const updatedNewLayout = (newLayout) => ({
  type: types.PROJECT_SET_NEW_LAYOUT,
  payload: newLayout,
});
export const setAdvMultiOptionChecked = (
  masterid,
  selectedValue,
  isChecked
) => ({
  type: types.PROJECT_SET_ADV_MULTISELECT_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});
export const setAdvOptionChecked = (masterid, selectedValue, isChecked) => ({
  type: types.PROJECT_SET_ADV_DROPDOWN_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const setDatepicker = (id, api_name, name, date, formattedDate) => ({
  type: types.PROJECT_SET_DATEPICKER_VALUE,
  payload: {
    id,
    api_name,
    name,
    date,
    formattedDate,
  },
});

export const setWeekfilter = (id, api_name, name, week, year) => ({
  type: types.PROJECT_SET_WEEKFILTER_VALUE,
  payload: {
    id,
    api_name,
    name,
    week,
    year,
  },
});

export const resetDatefilters = () => ({
  type: types.PROJECT_RESET_DATE_FILTERS,
});
export const changeMasterdata = (masterid, api_name, week, selectedYear) => ({
  type: types.PROJECT_CHANGE_MASTER_DATA,
  payload: {
    masterid,
    api_name,
    week,
    selectedYear,
  },
});

export const getUsernameproject = (name, globalid) => ({
  type: types.PROJECT_GET_USERNAME,
  payload: { name, globalid },
});

export const setLoading = (status) => ({
  type: types.PROJECT_SET_LOADING,
  payload: status,
});
export const incrementRenderCount = () => ({
  type: types.PROJECT_INCREMENT_COUNT,
});
export const setdataSetID = (id) => ({
  type: types.PROJECT_SET_DATASETID,
  payload: id,
});

export const editcell = (
  transactionid,
  attributedatatype,
  listconfigid,
  apiname,
  value
) => ({
  type: types.PROJECT_EDIT_CELL,
  payload: { transactionid, attributedatatype, listconfigid, apiname, value },
});
export const reseteditcell = () => ({
  type: types.PROJECT_RESET_EDIT_CELL,
});

export const setCurrentPage = (page) => ({
  type: types.PROJECT_SET_CURRENTPAGE,
  payload: page,
});
