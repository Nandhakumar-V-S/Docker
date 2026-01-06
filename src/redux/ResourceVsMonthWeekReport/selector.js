import { createSelector } from "reselect";

const selectList = (state) => state.resourceVsMonthWeekReport;
export const horizontalGroupByMasterInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) =>
    resourceVsMonthWeekReport.horizontalGroupByMaster
);
export const entitiesInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.entityid
);
export const listidInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.listid
);
export const useridInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.userid
);
export const newEntityInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.masterData
);

export const listInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.list
);

export const listDataInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.columnMasterData
);

export const dataSetInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.dataSet
);

export const dataForColumnInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.columnSequence
);

export const datePickerFilterInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.weekFilter
);
export const monthFilterInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.monthFilter
);
export const loadingInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.loading
);
export const usernameInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.username
);
export const userobjInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.userobj
);
export const renderCountInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.savedDatasetid
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.clearFilters
);

export const currentPageInfo = createSelector(
  [selectList],
  (resourceVsMonthWeekReport) => resourceVsMonthWeekReport.currentPage
);
