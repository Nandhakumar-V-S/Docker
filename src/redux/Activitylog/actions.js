import * as types from "./types";

export const getentitySuccess = (entity) => ({
  type: types.ACTIVITYLOG_FETCH_ENTITY_DATA_SUCCESS,
  payload: entity,
});
export const selectNewEntity = (entityid) => ({
  type: types.ACTIVITYLOG_SELECT_NEW_ENTITY,
  payload: entityid,
});
export const getMasterDataSuccess = (masterdata) => ({
  type: types.ACTIVITYLOG_FETCH_MASTER_DATA_SUCCESS,
  payload: masterdata,
});

export const getlistfieldsSuccess = (listfields) => ({
  type: types.ACTIVITYLOG_FETCH_LIST_FIELDS_SUCCESS,
  payload: listfields,
});

export const getListdataSuccess = (listdata) => ({
  type: types.ACTIVITYLOG_FETCH_LIST_DATA_SUCCESS,
  payload: listdata,
});

export const getDatasetSuccess = (listdata) => ({
  type: types.ACTIVITYLOG_FETCH_DATASET_SUCCESS,
  payload: listdata,
});
export const setPagination = (firstPageIndex, pageSize) => ({
  type: types.ACTIVITYLOG_SET_PAGINATION,
  payload: { firstPageIndex, pageSize },
});
export const setPagesize = (pageSize) => ({
  type: types.ACTIVITYLOG_SET_PAGE_SIZE,
  payload: pageSize,
});

export const setAdvMatchedLookup = (lookup) => ({
  type: types.ACTIVITYLOG_SET_ADV_MATCHED_LOOKUP,
  payload: lookup,
});

export const setMatchedLookup = (lookup) => ({
  type: types.ACTIVITYLOG_SET_MATCHED_LOOKUP,
  payload: lookup,
});

export const toggleColumnMapping = (selectedAttributes) => ({
  type: types.ACTIVITYLOG_TOGGLE_COLUMN_ISMAPPING,
  payload: selectedAttributes,
});

export const toggleFilterMapping = (selectedAttributes) => ({
  type: types.ACTIVITYLOG_TOGGLE_FILTER_ISMAPPING,
  payload: selectedAttributes,
});

export const createGroupByData = (groupByData) => ({
  type: types.ACTIVITYLOG_CREATE_HOR_GROUPBYDATA,
  payload: groupByData,
});
export const updateGroupByDataDir = (Direction) => ({
  type: types.ACTIVITYLOG_CREATE_HOR_GROUPBYDATA_DIRECTION,
  payload: Direction,
});
export const setHorizontalGroupBy = (id, optionid) => ({
  type: types.ACTIVITYLOG_CHANGE_HORIZONTAL_GROUPBY,
  payload: {
    id,
    optionid,
  },
});

export const addSelectedFilter = (filter) => ({
  type: types.ACTIVITYLOG_SELECTED_FILTER_VALUE,
  payload: filter,
});
export const addSelectedCustomFilter = (selectedOptions, textvalues) => ({
  type: types.ACTIVITYLOG_ADD_ADDITIONAL_FILTER,
  payload: { selectedOptions, textvalues },
});

export const setDropdownChecked = (masterid, selectedValue, isChecked) => ({
  type: types.ACTIVITYLOG_SET_DROPDOWN_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const setMultiselectChecked = (masterid, selectedValue, isChecked) => ({
  type: types.ACTIVITYLOG_SET_MULTISELECT_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const removeAllFilters = (filterId) => ({
  type: types.ACTIVITYLOG_REMOVE_ALL_FILTER,
  payload: filterId,
});
export const removeQuickFilter = (filterId) => ({
  type: types.ACTIVITYLOG_REMOVE_QUICK_FILTER,
  payload: filterId,
});
export const removeAdvancedFilter = (filterId) => ({
  type: types.ACTIVITYLOG_REMOVE_ADVANCED_FILTER,
  payload: filterId,
});
export const setTextValue = (textValues) => ({
  type: types.ACTIVITYLOG_QUICK_TEXT_VALUE,
  payload: textValues,
});
export const resetCheckedValues = (filterid) => ({
  type: types.ACTIVITYLOG_RESET_QUICK_FILTER_VALUES,
  payload: filterid,
});

export const createDataset = (dataSet) => ({
  type: types.ACTIVITYLOG_CREATE_NEW_DATASET,
  payload: dataSet,
});
export const updateDataset = (dataSet) => ({
  type: types.ACTIVITYLOG_EDIT_DATASET,
  payload: dataSet,
});
export const setNewDatasetID = (dataSetID) => ({
  type: types.ACTIVITYLOG_GET_NEW_DATASET_INFO_SUCCESS,
  payload: dataSetID,
});
export const deleteDataset = (dataSetID) => ({
  type: types.ACTIVITYLOG_DELETE_DATASET_DB,
  payload: dataSetID,
});
export const sortColumn = (dataindex) => ({
  type: types.ACTIVITYLOG_SORTED_COLUMN,
  payload: { dataindex },
});

export const updateColumnSeq = (columnSequence) => ({
  type: types.ACTIVITYLOG_SET_COLUMN_SEQ,
  payload: columnSequence,
});

export const updatedNewLayout = (newLayout) => ({
  type: types.ACTIVITYLOG_SET_NEW_LAYOUT,
  payload: newLayout,
});
export const setAdvMultiOptionChecked = (
  masterid,
  selectedValue,
  isChecked
) => ({
  type: types.ACTIVITYLOG_SET_ADV_MULTISELECT_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});
export const setAdvOptionChecked = (masterid, selectedValue, isChecked) => ({
  type: types.ACTIVITYLOG_SET_ADV_DROPDOWN_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const setDatepicker = (id, api_name, name, date, formattedDate) => ({
  type: types.ACTIVITYLOG_SET_DATEPICKER_VALUE,
  payload: {
    id,
    api_name,
    name,
    date,
    formattedDate,
  },
});

export const setWeekfilter = (id, api_name, name, week, year) => ({
  type: types.ACTIVITYLOG_SET_WEEKFILTER_VALUE,
  payload: {
    id,
    api_name,
    name,
    week,
    year,
  },
});

export const resetDatefilters = () => ({
  type: types.ACTIVITYLOG_RESET_DATE_FILTERS,
});
export const changeMasterdata = (masterid, api_name, week, selectedYear) => ({
  type: types.ACTIVITYLOG_CHANGE_MASTER_DATA,
  payload: {
    masterid,
    api_name,
    week,
    selectedYear,
  },
});

export const getUsernameactivitylog = (name, globalid) => ({
  type: types.ACTIVITYLOG_GET_USERNAME,
  payload: { name, globalid },
});
export const getTaskUsermail = (email) => ({
  type: types.ACTIVITYLOG_GET_USERMAIL,
  payload: { email },
});

export const setLoading = (status) => ({
  type: types.ACTIVITYLOG_SET_LOADING,
  payload: status,
});
export const incrementRenderCount = () => ({
  type: types.ACTIVITYLOG_INCREMENT_COUNT,
});
export const setdataSetID = (id) => ({
  type: types.ACTIVITYLOG_SET_DATASETID,
  payload: id,
});

export const editcell = (
  transactionid,
  attributedatatype,
  listconfigid,
  apiname,
  value
) => ({
  type: types.ACTIVITYLOG_EDIT_CELL,
  payload: { transactionid, attributedatatype, listconfigid, apiname, value },
});
export const reseteditcell = () => ({
  type: types.ACTIVITYLOG_RESET_EDIT_CELL,
});
export const setCurrentPage = (page) => ({
  type: types.ACTIVITYLOG_SET_CURRENTPAGE,
  payload: page,
});

export const setVerticalGroupbyDir = (val) => ({
  type: types.ACTIVITYLOG_SETVERTICAL_GROUPBY_DIR,
  payload: val,
});

export const createVerticalGroupbyData = (data) => ({
  type: types.ACTIVITYLOG_CREATE_VER_GROUPBYDATA,
  payload: data,
});

export const setMatrixData = (data) => ({
  type: types.ACTIVITYLOG_SETMATRIXROWCOLUMN,
  payload: data,
});
