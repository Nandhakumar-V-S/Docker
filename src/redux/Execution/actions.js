import * as types from "./types";

export const getentitySuccess = (entity) => ({
  type: types.EXECUTION_FETCH_EXECUTION_DATA_SUCCESS,
  payload: entity,
});
export const selectNewEntity = (entityid) => ({
  type: types.EXECUTION_SELECT_NEW_ENTITY,
  payload: entityid,
});
export const getMasterDataSuccess = (masterdata) => ({
  type: types.EXECUTION_FETCH_MASTER_DATA_SUCCESS,
  payload: masterdata,
});
export const getSubMasterDataSuccess = (masterdata) => ({
  type: types.EXECUTION_FETCH_SUB_MASTER_DATA_SUCCESS,
  payload: masterdata,
});

export const getlistfieldsSuccess = (listfields) => ({
  type: types.EXECUTION_FETCH_LIST_FIELDS_SUCCESS,
  payload: listfields,
});

export const getListdataSuccess = (listdata) => ({
  type: types.EXECUTION_FETCH_LIST_DATA_SUCCESS,
  payload: listdata,
});

export const getDatasetSuccess = (listdata) => ({
  type: types.EXECUTION_FETCH_DATASET_SUCCESS,
  payload: listdata,
});
export const setPagination = (firstPageIndex, pageSize) => ({
  type: types.EXECUTION_SET_PAGINATION,
  payload: { firstPageIndex, pageSize },
});
export const setPagesize = (pageSize) => ({
  type: types.EXECUTION_SET_PAGE_SIZE,
  payload: pageSize,
});
export const setAdvMatchedLookup = (lookup) => ({
  type: types.EXECUTION_SET_ADV_MATCHED_LOOKUP,
  payload: lookup,
});

export const setMatchedLookup = (lookup) => ({
  type: types.EXECUTION_SET_MATCHED_LOOKUP,
  payload: lookup,
});

export const toggleColumnMapping = (selectedAttributes) => ({
  type: types.EXECUTION_TOGGLE_COLUMN_ISMAPPING,
  payload: selectedAttributes,
});

export const toggleFilterMapping = (selectedAttributes) => ({
  type: types.EXECUTION_TOGGLE_FILTER_ISMAPPING,
  payload: selectedAttributes,
});

export const createGroupByData = (groupByData) => ({
  type: types.EXECUTION_CREATE_HOR_GROUPBYDATA,
  payload: groupByData,
});
export const setHorizontalGroupBy = (data, id, optionid) => ({
  type: types.EXECUTION_CHANGE_HORIZONTAL_GROUPBY,
  payload: {
    data,
    id,
    optionid,
  },
});

export const addSelectedFilter = (filter) => ({
  type: types.EXECUTION_SELECTED_FILTER_VALUE,
  payload: filter,
});
export const addSelectedCustomFilter = (selectedOptions, textvalues) => ({
  type: types.EXECUTION_ADD_ADDITIONAL_FILTER,
  payload: { selectedOptions, textvalues },
});

export const setDropdownChecked = (masterid, selectedValue, isChecked) => ({
  type: types.EXECUTION_SET_DROPDOWN_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const setMultiselectChecked = (masterid, selectedValue, isChecked) => ({
  type: types.EXECUTION_SET_MULTISELECT_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const removeAllFilters = (filterId) => ({
  type: types.EXECUTION_REMOVE_ALL_FILTER,
  payload: filterId,
});
export const removeQuickFilter = (filterId) => ({
  type: types.EXECUTION_REMOVE_QUICK_FILTER,
  payload: filterId,
});
export const removeAdvancedFilter = (filterId) => ({
  type: types.EXECUTION_REMOVE_ADVANCED_FILTER,
  payload: filterId,
});
export const setTextValue = (textValues) => ({
  type: types.EXECUTION_QUICK_TEXT_VALUE,
  payload: textValues,
});
export const resetCheckedValues = (filterid) => ({
  type: types.EXECUTION_RESET_QUICK_FILTER_VALUES,
  payload: filterid,
});
export const createDataset = (dataSet) => ({
  type: types.EXECUTION_CREATE_NEW_DATASET,
  payload: dataSet,
});
export const updateDataset = (dataSet) => ({
  type: types.EXECUTION_EDIT_DATASET,
  payload: dataSet,
});
export const setNewDatasetID = (dataSetID) => ({
  type: types.EXECUTION_GET_NEW_DATASET_INFO_SUCCESS,
  payload: dataSetID,
});
export const deleteDataset = (dataSetID) => ({
  type: types.EXECUTION_DELETE_DATASET_DB,
  payload: dataSetID,
});
export const sortColumn = (dataindex) => ({
  type: types.EXECUTION_SORTED_COLUMN,
  payload: { dataindex },
});

export const updateColumnSeq = (columnSequence) => ({
  type: types.EXECUTION_SET_COLUMN_SEQ,
  payload: columnSequence,
});

export const updatedNewLayout = (newLayout) => ({
  type: types.EXECUTION_SET_NEW_LAYOUT,
  payload: newLayout,
});
export const setAdvMultiOptionChecked = (
  masterid,
  selectedValue,
  isChecked
) => ({
  type: types.EXECUTION_SET_ADV_MULTISELECT_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});
export const setAdvOptionChecked = (masterid, selectedValue, isChecked) => ({
  type: types.EXECUTION_SET_ADV_DROPDOWN_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const setDatepicker = (id, api_name, name, date, formattedDate) => ({
  type: types.EXECUTION_SET_DATEPICKER_VALUE,
  payload: {
    id,
    api_name,
    name,
    date,
    formattedDate,
  },
});

export const setWeekfilter = (id, api_name, name, week, year) => ({
  type: types.EXECUTION_SET_WEEKFILTER_VALUE,
  payload: {
    id,
    api_name,
    name,
    week,
    year,
  },
});

export const resetDatefilters = () => ({
  type: types.EXECUTION_RESET_DATE_FILTERS,
});
export const changeMasterdata = (masterid, week, selectedYear) => ({
  type: types.EXECUTION_CHANGE_MASTER_DATA,
  payload: {
    masterid,
    week,
    selectedYear,
  },
});

export const getUsername = (name, globalid) => ({
  type: types.EXECUTION_GET_USERNAME,
  payload: { name, globalid },
});

export const setLoading = (status) => ({
  type: types.EXECUTION_SET_LOADING,
  payload: status,
});
export const getTransactionID = (TransactionID) => ({
  type: types.EXECUTION_SET_TRANSACTIONID,
  payload: TransactionID,
});

export const getnewlistfieldsSuccess = (listfields) => ({
  type: types.EXECUTION_360_FETCH_LIST_FIELDS_SUCCESS,
  payload: listfields,
});
export const getTaskrowdata = (Taskrowdata) => ({
  type: types.EXECUTION_360_TASK_ROW_DATA,
  payload: Taskrowdata,
});
export const getnewDatasetSuccess = (data) => ({
  type: types.EXECUTION_360_DATASET_SUCCESS,
  payload: data,
});
export const getPlanlistfieldsSuccess = (listfields) => ({
  type: types.EXECUTION_360_FETCH_SUB_LIST_FIELDS_SUCCESS,
  payload: listfields,
});
export const getPlanTaskrowdata = (Taskrowdata) => ({
  type: types.EXECUTION_360_SUB_TASK_ROW_DATA,
  payload: Taskrowdata,
});
export const getPlanDatasetSuccess = (data) => ({
  type: types.EXECUTION_360_SUB_DATASET_SUCCESS,
  payload: data,
});
export const incrementRenderCount = () => ({
  type: types.EXECUTION_INCREMENT_COUNT,
});
export const setdataSetID = (id) => ({
  type: types.EXECUTION_SET_DATASETID,
  payload: id,
});

export const editcell = (
  transactionid,
  attributedatatype,
  listconfigid,
  apiname,
  value
) => ({
  type: types.EXECUTION_EDIT_CELL,
  payload: { transactionid, attributedatatype, listconfigid, apiname, value },
});
export const reseteditcell = () => ({
  type: types.EXECUTION_RESET_EDIT_CELL,
});

export const setCurrentPage = (page) => ({
  type: types.EXECUTION_SET_CURRENTPAGE,
  payload: page,
});
