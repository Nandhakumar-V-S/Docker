import { createSelector } from "reselect";

const selectList = (state) => state.ImportHistory;

export const entitiesInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.entityid
);
export const listidInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.listid
);
export const useridInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.userid
);
export const newEntityInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.masterData
);

export const listInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.list
);

export const listDataInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.columnMasterData
);

export const dataSetInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.dataSet
);

export const dataForColumnInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.columnSequence
);

export const datePickerFilterInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.weekFilter
);
export const loadingInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.loading
);
export const usernameInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.username
);
export const userobjInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.userobj
);
export const renderCountInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.savedDatasetid
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (ImportHistory) => ImportHistory.clearFilters
);
