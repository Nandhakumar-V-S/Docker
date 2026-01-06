import { createSelector } from "reselect";

const selectList = (state) => state.features;

export const entitiesInfo = createSelector(
  [selectList],
  (features) => features.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (features) => features.entityid
);
export const listidInfo = createSelector(
  [selectList],
  (features) => features.listid
);
export const useridInfo = createSelector(
  [selectList],
  (features) => features.userid
);
export const newEntityInfo = createSelector(
  [selectList],
  (features) => features.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (features) => features.masterData
);

export const listInfo = createSelector(
  [selectList],
  (features) => features.list
);

export const listDataInfo = createSelector(
  [selectList],
  (features) => features.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (features) => features.columnMasterData
);

export const dataSetInfo = createSelector(
  [selectList],
  (features) => features.dataSet
);

export const dataForColumnInfo = createSelector(
  [selectList],
  (features) => features.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (features) => features.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (features) => features.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (features) => features.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (features) => features.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (features) => features.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (features) => features.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (features) => features.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (features) => features.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (features) => features.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (features) => features.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (features) => features.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (features) => features.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (features) => features.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (features) => features.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (features) => features.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (features) => features.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (features) => features.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (features) => features.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (features) => features.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (features) => features.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (features) => features.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (features) => features.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (features) => features.columnSequence
);

export const datePickerFilterInfo = createSelector(
  [selectList],
  (features) => features.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (features) => features.weekFilter
);
export const loadingInfo = createSelector(
  [selectList],
  (features) => features.loading
);
export const usernameInfo = createSelector(
  [selectList],
  (features) => features.username
);
export const userobjInfo = createSelector(
  [selectList],
  (features) => features.userobj
);

export const renderCountInfo = createSelector(
  [selectList],
  (features) => features.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (features) => features.savedDatasetid
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (features) => features.clearFilters
);
export const editcellInfo = createSelector(
  [selectList],
  (features) => features.editcell
);
