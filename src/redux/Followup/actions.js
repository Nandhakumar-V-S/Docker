import * as types from "./types";

export const getentitySuccess = (entity) => ({
  type: types.FOLLOWUP_FETCH_ENTITY_DATA_SUCCESS,
  payload: entity,
});
export const selectNewEntity = (entityid) => ({
  type: types.FOLLOWUP_SELECT_NEW_ENTITY,
  payload: entityid,
});
export const getMasterDataSuccess = (masterdata) => ({
  type: types.FOLLOWUP_FETCH_MASTER_DATA_SUCCESS,
  payload: masterdata,
});

export const getlistfieldsSuccess = (listfields) => ({
  type: types.FOLLOWUP_FETCH_LIST_FIELDS_SUCCESS,
  payload: listfields,
});

export const getListdataSuccess = (listdata) => ({
  type: types.FOLLOWUP_FETCH_LIST_DATA_SUCCESS,
  payload: listdata,
});

export const getDatasetSuccess = (listdata) => ({
  type: types.FOLLOWUP_FETCH_DATASET_SUCCESS,
  payload: listdata,
});
export const setPagination = (firstPageIndex, pageSize) => ({
  type: types.FOLLOWUP_SET_PAGINATION,
  payload: { firstPageIndex, pageSize },
});
export const setPagesize = (pageSize) => ({
  type: types.FOLLOWUP_SET_PAGE_SIZE,
  payload: pageSize,
});

export const setAdvMatchedLookup = (lookup) => ({
  type: types.FOLLOWUP_SET_ADV_MATCHED_LOOKUP,
  payload: lookup,
});

export const setMatchedLookup = (lookup) => ({
  type: types.FOLLOWUP_SET_MATCHED_LOOKUP,
  payload: lookup,
});

export const toggleColumnMapping = (selectedAttributes) => ({
  type: types.FOLLOWUP_TOGGLE_COLUMN_ISMAPPING,
  payload: selectedAttributes,
});

export const toggleFilterMapping = (selectedAttributes) => ({
  type: types.FOLLOWUP_TOGGLE_FILTER_ISMAPPING,
  payload: selectedAttributes,
});

export const createGroupByData = (groupByData) => ({
  type: types.FOLLOWUP_CREATE_HOR_GROUPBYDATA,
  payload: groupByData,
});
export const setHorizontalGroupBy = (data, id, optionid) => ({
  type: types.FOLLOWUP_CHANGE_HORIZONTAL_GROUPBY,
  payload: {
    data,
    id,
    optionid,
  },
});

export const addSelectedFilter = (filter) => ({
  type: types.FOLLOWUP_SELECTED_FILTER_VALUE,
  payload: filter,
});
export const addSelectedCustomFilter = (selectedOptions, textvalues) => ({
  type: types.FOLLOWUP_ADD_ADDITIONAL_FILTER,
  payload: { selectedOptions, textvalues },
});

export const setDropdownChecked = (masterid, selectedValue, isChecked) => ({
  type: types.FOLLOWUP_SET_DROPDOWN_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const setMultiselectChecked = (masterid, selectedValue, isChecked) => ({
  type: types.FOLLOWUP_SET_MULTISELECT_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const removeAllFilters = (filterId) => ({
  type: types.FOLLOWUP_REMOVE_ALL_FILTER,
  payload: filterId,
});
export const removeQuickFilter = (filterId) => ({
  type: types.FOLLOWUP_REMOVE_QUICK_FILTER,
  payload: filterId,
});
export const removeAdvancedFilter = (filterId) => ({
  type: types.FOLLOWUP_REMOVE_ADVANCED_FILTER,
  payload: filterId,
});
export const setTextValue = (textValues) => ({
  type: types.FOLLOWUP_QUICK_TEXT_VALUE,
  payload: textValues,
});
export const resetCheckedValues = (filterid) => ({
  type: types.FOLLOWUP_RESET_QUICK_FILTER_VALUES,
  payload: filterid,
});
export const createDataset = (dataSet) => ({
  type: types.FOLLOWUP_CREATE_NEW_DATASET,
  payload: dataSet,
});
export const updateDataset = (dataSet) => ({
  type: types.FOLLOWUP_EDIT_DATASET,
  payload: dataSet,
});
export const setNewDatasetID = (dataSetID) => ({
  type: types.FOLLOWUP_GET_NEW_DATASET_INFO_SUCCESS,
  payload: dataSetID,
});
export const deleteDataset = (dataSetID) => ({
  type: types.FOLLOWUP_DELETE_DATASET_DB,
  payload: dataSetID,
});
export const sortColumn = (dataindex) => ({
  type: types.FOLLOWUP_SORTED_COLUMN,
  payload: { dataindex },
});

export const updateColumnSeq = (columnSequence) => ({
  type: types.FOLLOWUP_SET_COLUMN_SEQ,
  payload: columnSequence,
});

export const updatedNewLayout = (newLayout) => ({
  type: types.FOLLOWUP_SET_NEW_LAYOUT,
  payload: newLayout,
});
export const setAdvMultiOptionChecked = (
  masterid,
  selectedValue,
  isChecked
) => ({
  type: types.FOLLOWUP_SET_ADV_MULTISELECT_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});
export const setAdvOptionChecked = (masterid, selectedValue, isChecked) => ({
  type: types.FOLLOWUP_SET_ADV_DROPDOWN_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const setDatepicker = (id, api_name, name, date, formattedDate) => ({
  type: types.FOLLOWUP_SET_DATEPICKER_VALUE,
  payload: {
    id,
    api_name,
    name,
    date,
    formattedDate,
  },
});

export const setWeekfilter = (id, api_name, name, week, year) => ({
  type: types.FOLLOWUP_SET_WEEKFILTER_VALUE,
  payload: {
    id,
    api_name,
    name,
    week,
    year,
  },
});

export const resetDatefilters = () => ({
  type: types.FOLLOWUP_RESET_DATE_FILTERS,
});
export const changeMasterdata = (masterid, api_name, week, selectedYear) => ({
  type: types.FOLLOWUP_CHANGE_MASTER_DATA,
  payload: {
    masterid,
    api_name,
    week,
    selectedYear,
  },
});

export const getUsernamefollow = (name, globalid) => ({
  type: types.FOLLOWUP_GET_USERNAME,
  payload: { name, globalid },
});

export const setLoading = (status) => ({
  type: types.FOLLOWUP_SET_LOADING,
  payload: status,
});
export const getTransactionID = (TransactionID) => ({
  type: types.FOLLOWUP_SET_TRANSACTIONID,
  payload: TransactionID,
});

export const getnewlistfieldsSuccess = (listfields) => ({
  type: types.FOLLOWUP_360_FETCH_LIST_FIELDS_SUCCESS,
  payload: listfields,
});
export const getTaskrowdata = (Taskrowdata) => ({
  type: types.FOLLOWUP_360_TASK_ROW_DATA,
  payload: Taskrowdata,
});
export const getnewDatasetSuccess = (data) => ({
  type: types.FOLLOWUP_360_DATASET_SUCCESS,
  payload: data,
});
export const getPlanlistfieldsSuccess = (listfields) => ({
  type: types.FOLLOWUP_360_FETCH_SUB_LIST_FIELDS_SUCCESS,
  payload: listfields,
});
export const getPlanTaskrowdata = (Taskrowdata) => ({
  type: types.FOLLOWUP_360_SUB_TASK_ROW_DATA,
  payload: Taskrowdata,
});
export const getPlanDatasetSuccess = (data) => ({
  type: types.FOLLOWUP_360_SUB_DATASET_SUCCESS,
  payload: data,
});
export const incrementRenderCount = () => ({
  type: types.FOLLOWUP_INCREMENT_COUNT,
});
export const setdataSetID = (id) => ({
  type: types.FOLLOWUP_SET_DATASETID,
  payload: id,
});

export const setCurrentPage = (page) => ({
  type: types.FOLLOWUP_SET_CURRENTPAGE,
  payload: page,
});
