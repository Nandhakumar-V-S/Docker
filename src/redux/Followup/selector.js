import { createSelector } from "reselect";

const selectList = (state) => state.followup;
export const horizontalGroupByMasterInfo = createSelector(
  [selectList],
  (followup) => followup.horizontalGroupByMaster
);
export const entitiesInfo = createSelector(
  [selectList],
  (followup) => followup.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (followup) => followup.entityid
);
export const listidInfo = createSelector(
  [selectList],
  (followup) => followup.listid
);
export const newentityidInfo = createSelector(
  [selectList],
  (followup) => followup.newentityid
);
export const newlistidInfo = createSelector(
  [selectList],
  (followup) => followup.newlistid
);
export const useridInfo = createSelector(
  [selectList],
  (followup) => followup.userid
);
export const newEntityInfo = createSelector(
  [selectList],
  (followup) => followup.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (followup) => followup.masterData
);

export const masterDataInfofollowup = createSelector(
  [selectList],
  (followup) => followup.masterData
);
export const listInfo = createSelector(
  [selectList],
  (followup) => followup.list
);

export const listDataInfo = createSelector(
  [selectList],
  (followup) => followup.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (followup) => followup.columnMasterData
);

export const dataSetInfo = createSelector(
  [selectList],
  (followup) => followup.dataSet
);

export const dataForColumnInfo = createSelector(
  [selectList],
  (followup) => followup.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (followup) => followup.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (followup) => followup.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (followup) => followup.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (followup) => followup.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (followup) => followup.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (followup) => followup.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (followup) => followup.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (followup) => followup.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (followup) => followup.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (followup) => followup.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (followup) => followup.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (followup) => followup.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (followup) => followup.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (followup) => followup.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (followup) => followup.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (followup) => followup.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (followup) => followup.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (followup) => followup.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (followup) => followup.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (followup) => followup.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (followup) => followup.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (followup) => followup.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (followup) => followup.columnSequence
);
export const datePickerFilterInfo = createSelector(
  [selectList],
  (followup) => followup.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (followup) => followup.weekFilter
);
export const loadingInfo = createSelector(
  [selectList],
  (followup) => followup.loading
);
export const usernameInfo = createSelector(
  [selectList],
  (followup) => followup.username
);
export const userobjInfo = createSelector(
  [selectList],
  (followup) => followup.userobj
);
export const TransactionIdInfo = createSelector(
  [selectList],
  (followup) => followup.TransactionID
);
export const newdataSetIDInfo = createSelector(
  [selectList],
  (followup) => followup.newdataSetID
);
export const newTotalcolumnInfo = createSelector(
  [selectList],
  (followup) => followup.newTotalcolumn
);
export const TaskrowdataInfo = createSelector(
  [selectList],
  (followup) => followup.Taskrowdata
);
export const renderCountInfo = createSelector(
  [selectList],
  (followup) => followup.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (followup) => followup.savedDatasetid
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (followup) => followup.clearFilters
);
export const currentPageInfo = createSelector(
  [selectList],
  (followup) => followup.currentPage
);
