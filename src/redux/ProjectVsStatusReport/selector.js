import { createSelector } from "reselect";

const selectList = (state) => state.projectVsStatusReport;
export const horizontalGroupByMasterInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.horizontalGroupByMaster
);
export const entitiesInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.entityid
);
export const listidInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.listid
);
export const useridInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.userid
);
export const newEntityInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.masterData
);

export const listInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.list
);

export const listDataInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.columnMasterData
);

export const dataSetInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.dataSet
);

export const dataForColumnInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.columnSequence
);

export const datePickerFilterInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.weekFilter
);
export const planWeekFilterInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.planWeekFilter
);
export const monthFilterInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.monthFilter
);
export const planMonthFilterInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.planMonthFilter
);
export const loadingInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.loading
);
export const usernameInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.username
);
export const userobjInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.userobj
);
export const renderCountInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.savedDatasetid
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.clearFilters
);

export const currentPageInfo = createSelector(
  [selectList],
  (projectVsStatusReport) => projectVsStatusReport.currentPage
);
