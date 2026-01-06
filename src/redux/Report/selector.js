import { createSelector } from "reselect";

const selectList = (state) => state.report;

export const entitiesInfo = createSelector(
  [selectList],
  (report) => report.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (report) => report.entityid
);
export const listidInfo = createSelector(
  [selectList],
  (report) => report.listid
);
export const useridInfo = createSelector(
  [selectList],
  (report) => report.userid
);
export const newEntityInfo = createSelector(
  [selectList],
  (report) => report.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (report) => report.masterData
);

export const listInfo = createSelector([selectList], (report) => report.list);

export const listDataInfo = createSelector(
  [selectList],
  (report) => report.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (report) => report.columnMasterData
);

export const dataSetInfo = createSelector(
  [selectList],
  (report) => report.dataSet
);

export const dataForColumnInfo = createSelector(
  [selectList],
  (report) => report.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (report) => report.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (report) => report.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (report) => report.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (report) => report.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (report) => report.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (report) => report.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (report) => report.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (report) => report.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (report) => report.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (report) => report.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (report) => report.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (report) => report.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (report) => report.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (report) => report.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (report) => report.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (report) => report.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (report) => report.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (report) => report.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (report) => report.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (report) => report.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (report) => report.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (report) => report.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (report) => report.columnSequence
);

export const datePickerFilterInfo = createSelector(
  [selectList],
  (report) => report.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (report) => report.weekFilter
);
export const loadingInfo = createSelector(
  [selectList],
  (report) => report.loading
);
export const usernameInfo = createSelector(
  [selectList],
  (report) => report.username
);
export const userobjInfo = createSelector(
  [selectList],
  (report) => report.userobj
);
export const renderCountInfo = createSelector(
  [selectList],
  (report) => report.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (report) => report.savedDatasetid
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (report) => report.clearFilters
);

export const currentPageInfo = createSelector(
  [selectList],
  (report) => report.currentPage
);
