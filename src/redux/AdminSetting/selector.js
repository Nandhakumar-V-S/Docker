import { createSelector } from "reselect";

const selectList = (state) => state.admin;

export const entitiesInfo = createSelector(
  [selectList],
  (admin) => admin.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (admin) => admin.entityid
);
export const listidInfo = createSelector([selectList], (admin) => admin.listid);
export const useridInfo = createSelector([selectList], (admin) => admin.userid);
export const newEntityInfo = createSelector(
  [selectList],
  (admin) => admin.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (admin) => admin.masterData
);

export const listInfo = createSelector([selectList], (admin) => admin.list);

export const listDataInfo = createSelector(
  [selectList],
  (admin) => admin.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (admin) => admin.columnMasterData
);

export const dataSetInfo = createSelector([selectList], (admin) => admin.dataSet);

export const dataForColumnInfo = createSelector(
  [selectList],
  (admin) => admin.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (admin) => admin.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (admin) => admin.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (admin) => admin.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (admin) => admin.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (admin) => admin.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (admin) => admin.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (admin) => admin.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (admin) => admin.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (admin) => admin.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (admin) => admin.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (admin) => admin.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (admin) => admin.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (admin) => admin.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (admin) => admin.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (admin) => admin.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (admin) => admin.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (admin) => admin.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (admin) => admin.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (admin) => admin.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (admin) => admin.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (admin) => admin.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (admin) => admin.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (admin) => admin.columnSequence
);

export const datePickerFilterInfo = createSelector(
  [selectList],
  (admin) => admin.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (admin) => admin.weekFilter
);
export const loadingInfo = createSelector([selectList], (admin) => admin.loading);
export const usernameInfo = createSelector(
  [selectList],
  (admin) => admin.username
);
export const userobjInfo = createSelector([selectList], (admin) => admin.userobj);

export const renderCountInfo = createSelector(
  [selectList],
  (admin) => admin.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (admin) => admin.savedDatasetid
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (admin) => admin.clearFilters
);
