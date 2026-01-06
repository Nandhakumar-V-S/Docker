import * as types from "./types";

export const getentitySuccess = (entity) => ({
  type: types.PROJECTVSSTATUSREPORT_FETCH_ENTITY_DATA_SUCCESS,
  payload: entity,
});
export const selectNewEntity = (entityid) => ({
  type: types.PROJECTVSSTATUSREPORT_SELECT_NEW_ENTITY,
  payload: entityid,
});
export const getMasterDataSuccess = (masterdata) => ({
  type: types.PROJECTVSSTATUSREPORT_FETCH_MASTER_DATA_SUCCESS,
  payload: masterdata,
});

export const getlistfieldsSuccess = (listfields) => ({
  type: types.PROJECTVSSTATUSREPORT_FETCH_LIST_FIELDS_SUCCESS,
  payload: listfields,
});

export const getListdataSuccess = (listdata) => ({
  type: types.PROJECTVSSTATUSREPORT_FETCH_LIST_DATA_SUCCESS,
  payload: listdata,
});

export const getDatasetSuccess = (listdata) => ({
  type: types.PROJECTVSSTATUSREPORT_FETCH_DATASET_SUCCESS,
  payload: listdata,
});
export const setPagination = (firstPageIndex, pageSize) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_PAGINATION,
  payload: { firstPageIndex, pageSize },
});
export const setPagesize = (pageSize) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_PAGE_SIZE,
  payload: pageSize,
});

export const setAdvMatchedLookup = (lookup) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_ADV_MATCHED_LOOKUP,
  payload: lookup,
});

export const setMatchedLookup = (lookup) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_MATCHED_LOOKUP,
  payload: lookup,
});

export const toggleColumnMapping = (selectedAttributes) => ({
  type: types.PROJECTVSSTATUSREPORT_TOGGLE_COLUMN_ISMAPPING,
  payload: selectedAttributes,
});

export const toggleFilterMapping = (selectedAttributes) => ({
  type: types.PROJECTVSSTATUSREPORT_TOGGLE_FILTER_ISMAPPING,
  payload: selectedAttributes,
});

export const createGroupByData = (groupByData) => ({
  type: types.PROJECTVSSTATUSREPORT_CREATE_HOR_GROUPBYDATA,
  payload: groupByData,
});
export const setHorizontalGroupBy = (id, optionid) => ({
  type: types.PROJECTVSSTATUSREPORT_CHANGE_HORIZONTAL_GROUPBY,
  payload: {
    id,
    optionid,
  },
});

export const addSelectedFilter = (filter) => ({
  type: types.PROJECTVSSTATUSREPORT_SELECTED_FILTER_VALUE,
  payload: filter,
});
export const addSelectedCustomFilter = (selectedOptions, textvalues) => ({
  type: types.PROJECTVSSTATUSREPORT_ADD_ADDITIONAL_FILTER,
  payload: { selectedOptions, textvalues },
});

export const setDropdownChecked = (masterid, selectedValue, isChecked) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_DROPDOWN_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const setMultiselectChecked = (masterid, selectedValue, isChecked) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_MULTISELECT_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const removeAllFilters = (filterId) => ({
  type: types.PROJECTVSSTATUSREPORT_REMOVE_ALL_FILTER,
  payload: filterId,
});
export const removeQuickFilter = (filterId) => ({
  type: types.PROJECTVSSTATUSREPORT_REMOVE_QUICK_FILTER,
  payload: filterId,
});
export const removeAdvancedFilter = (filterId) => ({
  type: types.PROJECTVSSTATUSREPORT_REMOVE_ADVANCED_FILTER,
  payload: filterId,
});
export const setTextValue = (textValues) => ({
  type: types.PROJECTVSSTATUSREPORT_QUICK_TEXT_VALUE,
  payload: textValues,
});
export const resetCheckedValues = (filterid) => ({
  type: types.PROJECTVSSTATUSREPORT_RESET_QUICK_FILTER_VALUES,
  payload: filterid,
});
export const createDataset = (dataSet) => ({
  type: types.PROJECTVSSTATUSREPORT_CREATE_NEW_DATASET,
  payload: dataSet,
});
export const updateDataset = (dataSet) => ({
  type: types.PROJECTVSSTATUSREPORT_EDIT_DATASET,
  payload: dataSet,
});
export const setNewDatasetID = (dataSetID) => ({
  type: types.PROJECTVSSTATUSREPORT_GET_NEW_DATASET_INFO_SUCCESS,
  payload: dataSetID,
});
export const deleteDataset = (dataSetID) => ({
  type: types.PROJECTVSSTATUSREPORT_DELETE_DATASET_DB,
  payload: dataSetID,
});
export const sortColumn = (dataindex) => ({
  type: types.PROJECTVSSTATUSREPORT_SORTED_COLUMN,
  payload: { dataindex },
});

export const updateColumnSeq = (columnSequence) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_COLUMN_SEQ,
  payload: columnSequence,
});

export const updatedNewLayout = (newLayout) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_NEW_LAYOUT,
  payload: newLayout,
});
export const setAdvMultiOptionChecked = (
  masterid,
  selectedValue,
  isChecked
) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_ADV_MULTISELECT_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});
export const setAdvOptionChecked = (masterid, selectedValue, isChecked) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_ADV_DROPDOWN_CHECKED,
  payload: {
    masterid,
    selectedValue,
    isChecked,
  },
});

export const setDatepicker = (id, api_name, name, date, formattedDate) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_DATEPICKER_VALUE,
  payload: {
    id,
    api_name,
    name,
    date,
    formattedDate,
  },
});

export const setWeekfilter = (id, api_name, name, week, year) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_WEEKFILTER_VALUE,
  payload: {
    id,
    api_name,
    name,
    week,
    year,
  },
});

export const setPlanWeekFilter = (id, api_name, name, week, year) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_PLANWEEKFILTER_VALUE,
  payload: {
    id,
    api_name,
    name,
    week,
    year,
  },
});

export const setMonthFilter = (id, api_name, name, month, year) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_MONTHFILTER_VALUE,
  payload: {
    id,
    api_name,
    name,
    month,
    year,
  },
});

export const setPlanMonthFilter = (id, api_name, name, month, year) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_PLANMONTHFILTER_VALUE,
  payload: {
    id,
    api_name,
    name,
    month,
    year,
  },
});

export const resetDatefilters = () => ({
  type: types.PROJECTVSSTATUSREPORT_RESET_DATE_FILTERS,
});
export const changeMasterdata = (masterid, api_name, week, selectedYear) => ({
  type: types.PROJECTVSSTATUSREPORT_CHANGE_MASTER_DATA,
  payload: {
    masterid,
    api_name,
    week,
    selectedYear,
  },
});

export const getProjectVsStatusReportUsername = (name, globalid) => ({
  type: types.PROJECTVSSTATUSREPORT_GET_USERNAME,
  payload: { name, globalid },
});

export const setLoading = (status) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_LOADING,
  payload: status,
});

export const incrementRenderCount = () => ({
  type: types.PROJECTVSSTATUSREPORT_INCREMENT_COUNT,
});
export const setdataSetID = (id) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_DATASETID,
  payload: id,
});

export const setCurrentPage = (page) => ({
  type: types.PROJECTVSSTATUSREPORT_SET_CURRENTPAGE,
  payload: page,
});
