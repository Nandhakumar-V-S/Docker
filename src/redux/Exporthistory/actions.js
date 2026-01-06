import * as types from "./types";

export const getentitySuccess = (entity) => ({
  type: types.EXPORTHISTORY_FETCH_EXPORTHISTORY_DATA_SUCCESS,
  payload: entity,
});
export const selectNewEntity = (entityid) => ({
  type: types.EXPORTHISTORY_SELECT_NEW_ENTITY,
  payload: entityid,
});
export const getMasterDataSuccess = (masterdata) => ({
  type: types.EXPORTHISTORY_FETCH_MASTER_DATA_SUCCESS,
  payload: masterdata,
});
export const getSubMasterDataSuccess = (masterdata) => ({
  type: types.EXPORTHISTORY_FETCH_SUB_MASTER_DATA_SUCCESS,
  payload: masterdata,
});

export const getlistfieldsSuccess = (listfields) => ({
  type: types.EXPORTHISTORY_FETCH_LIST_FIELDS_SUCCESS,
  payload: listfields,
});

export const getListdataSuccess = (listdata) => ({
  type: types.EXPORTHISTORY_FETCH_LIST_DATA_SUCCESS,
  payload: listdata,
});

export const getDatasetSuccess = (listdata) => ({
  type: types.EXPORTHISTORY_FETCH_DATASET_SUCCESS,
  payload: listdata,
});
export const setPagination = (firstPageIndex, pageSize) => ({
  type: types.EXPORTHISTORY_SET_PAGINATION,
  payload: { firstPageIndex, pageSize },
});
export const setPagesize = (pageSize) => ({
  type: types.EXPORTHISTORY_SET_PAGE_SIZE,
  payload: pageSize,
});
export const setAdvMatchedLookup = (lookup) => ({
  type: types.EXPORTHISTORY_SET_ADV_MATCHED_LOOKUP,
  payload: lookup,
});

export const setMatchedLookup = (lookup) => ({
  type: types.EXPORTHISTORY_SET_MATCHED_LOOKUP,
  payload: lookup,
});

export const toggleColumnMapping = (selectedAttributes) => ({
  type: types.EXPORTHISTORY_TOGGLE_COLUMN_ISMAPPING,
  payload: selectedAttributes,
});

export const toggleFilterMapping = (selectedAttributes) => ({
  type: types.EXPORTHISTORY_TOGGLE_FILTER_ISMAPPING,
  payload: selectedAttributes,
});

export const createGroupByData = (groupByData) => ({
  type: types.EXPORTHISTORY_CREATE_HOR_GROUPBYDATA,
  payload: groupByData,
});
export const setHorizontalGroupBy = (data, id, optionid) => ({
  type: types.EXPORTHISTORY_CHANGE_HORIZONTAL_GROUPBY,
  payload: {
    data,
    id,
    optionid,
  },
});

export const addSelectedFilter = (filter) => ({
  type: types.EXPORTHISTORY_SELECTED_FILTER_VALUE,
  payload: filter,
});
export const addSelectedCustomFilter = (selectedOptions, textvalues) => ({
  type: types.EXPORTHISTORY_ADD_ADDITIONAL_FILTER,
  payload: { selectedOptions, textvalues },
});

export const setDropdownChecked = (masterid, selectedValue, isChecked) => ({
  type: types.EXPORTHISTORY_SET_DROPDOWN_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const setMultiselectChecked = (masterid, selectedValue, isChecked) => ({
  type: types.EXPORTHISTORY_SET_MULTISELECT_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const removeAllFilters = (filterId) => ({
  type: types.EXPORTHISTORY_REMOVE_ALL_FILTER,
  payload: filterId,
});
export const removeQuickFilter = (filterId) => ({
  type: types.EXPORTHISTORY_REMOVE_QUICK_FILTER,
  payload: filterId,
});
export const removeAdvancedFilter = (filterId) => ({
  type: types.EXPORTHISTORY_REMOVE_ADVANCED_FILTER,
  payload: filterId,
});
export const setTextValue = (textValues) => ({
  type: types.EXPORTHISTORY_QUICK_TEXT_VALUE,
  payload: textValues,
});
export const resetCheckedValues = (filterid) => ({
  type: types.EXPORTHISTORY_RESET_QUICK_FILTER_VALUES,
  payload: filterid,
});
export const createDataset = (dataSet) => ({
  type: types.EXPORTHISTORY_CREATE_NEW_DATASET,
  payload: dataSet,
});
export const updateDataset = (dataSet) => ({
  type: types.EXPORTHISTORY_EDIT_DATASET,
  payload: dataSet,
});
export const setNewDatasetID = (dataSetID) => ({
  type: types.EXPORTHISTORY_GET_NEW_DATASET_INFO_SUCCESS,
  payload: dataSetID,
});
export const deleteDataset = (dataSetID) => ({
  type: types.EXPORTHISTORY_DELETE_DATASET_DB,
  payload: dataSetID,
});
export const sortColumn = (dataindex) => ({
  type: types.EXPORTHISTORY_SORTED_COLUMN,
  payload: { dataindex },
});

export const updateColumnSeq = (columnSequence) => ({
  type: types.EXPORTHISTORY_SET_COLUMN_SEQ,
  payload: columnSequence,
});

export const updatedNewLayout = (newLayout) => ({
  type: types.EXPORTHISTORY_SET_NEW_LAYOUT,
  payload: newLayout,
});
export const setAdvMultiOptionChecked = (
  masterid,
  selectedValue,
  isChecked
) => ({
  type: types.EXPORTHISTORY_SET_ADV_MULTISELECT_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});
export const setAdvOptionChecked = (masterid, selectedValue, isChecked) => ({
  type: types.EXPORTHISTORY_SET_ADV_DROPDOWN_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const setDatepicker = (id, api_name, name, date, formattedDate) => ({
  type: types.EXPORTHISTORY_SET_DATEPICKER_VALUE,
  payload: {
    id,
    api_name,
    name,
    date,
    formattedDate,
  },
});

export const setWeekfilter = (id, api_name, name, week, year) => ({
  type: types.EXPORTHISTORY_SET_WEEKFILTER_VALUE,
  payload: {
    id,
    api_name,
    name,
    week,
    year,
  },
});

export const resetDatefilters = () => ({
  type: types.EXPORTHISTORY_RESET_DATE_FILTERS,
});
export const changeMasterdata = (masterid, week, selectedYear) => ({
  type: types.EXPORTHISTORY_CHANGE_MASTER_DATA,
  payload: {
    masterid,
    week,
    selectedYear,
  },
});

export const getExporthistoryUsername = (name, globalid) => ({
  type: types.EXPORTHISTORY_GET_USERNAME,
  payload: { name, globalid },
});

export const setLoading = (status) => ({
  type: types.EXPORTHISTORY_SET_LOADING,
  payload: status,
});
export const getTransactionID = (TransactionID) => ({
  type: types.EXPORTHISTORY_SET_TRANSACTIONID,
  payload: TransactionID,
});

export const getnewlistfieldsSuccess = (listfields) => ({
  type: types.EXPORTHISTORY_360_FETCH_LIST_FIELDS_SUCCESS,
  payload: listfields,
});
export const getTaskrowdata = (Taskrowdata) => ({
  type: types.EXPORTHISTORY_360_TASK_ROW_DATA,
  payload: Taskrowdata,
});
export const getnewDatasetSuccess = (data) => ({
  type: types.EXPORTHISTORY_360_DATASET_SUCCESS,
  payload: data,
});
export const getPlanlistfieldsSuccess = (listfields) => ({
  type: types.EXPORTHISTORY_360_FETCH_SUB_LIST_FIELDS_SUCCESS,
  payload: listfields,
});
export const getPlanTaskrowdata = (Taskrowdata) => ({
  type: types.EXPORTHISTORY_360_SUB_TASK_ROW_DATA,
  payload: Taskrowdata,
});
export const getPlanDatasetSuccess = (data) => ({
  type: types.EXPORTHISTORY_360_SUB_DATASET_SUCCESS,
  payload: data,
});
export const incrementRenderCount = () => ({
  type: types.EXPORTHISTORY_INCREMENT_COUNT,
});
export const setdataSetID = (id) => ({
  type: types.EXPORTHISTORY_SET_DATASETID,
  payload: id,
});

export const editcell = (
  transactionid,
  attributedatatype,
  listconfigid,
  apiname,
  value
) => ({
  type: types.EXPORTHISTORY_EDIT_CELL,
  payload: { transactionid, attributedatatype, listconfigid, apiname, value },
});
export const reseteditcell = () => ({
  type: types.EXPORTHISTORY_RESET_EDIT_CELL,
});
