import { createSelector } from "reselect";

const selectList = (state) => state.tag;

export const entitiesInfo = createSelector([selectList], (tag) => tag.entities);
export const entityidInfo = createSelector([selectList], (tag) => tag.entityid);
export const listidInfo = createSelector([selectList], (tag) => tag.listid);
export const useridInfo = createSelector([selectList], (tag) => tag.userid);
export const newEntityInfo = createSelector(
  [selectList],
  (tag) => tag.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (tag) => tag.masterData
);

export const listInfo = createSelector([selectList], (tag) => tag.list);

export const listDataInfo = createSelector([selectList], (tag) => tag.listData);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (tag) => tag.columnMasterData
);

export const dataSetInfo = createSelector([selectList], (tag) => tag.dataSet);

export const dataForColumnInfo = createSelector(
  [selectList],
  (tag) => tag.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (tag) => tag.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (tag) => tag.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (tag) => tag.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (tag) => tag.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (tag) => tag.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (tag) => tag.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (tag) => tag.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (tag) => tag.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (tag) => tag.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (tag) => tag.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (tag) => tag.createGroupByData
);
export const postDataInfo = createSelector([selectList], (tag) => tag.postData);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (tag) => tag.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (tag) => tag.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (tag) => tag.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (tag) => tag.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (tag) => tag.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (tag) => tag.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (tag) => tag.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (tag) => tag.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (tag) => tag.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (tag) => tag.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (tag) => tag.columnSequence
);

export const datePickerFilterInfo = createSelector(
  [selectList],
  (tag) => tag.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (tag) => tag.weekFilter
);
export const loadingInfo = createSelector([selectList], (tag) => tag.loading);
export const usernameInfo = createSelector([selectList], (tag) => tag.username);
export const userobjInfo = createSelector([selectList], (tag) => tag.userobj);

export const renderCountInfo = createSelector(
  [selectList],
  (tag) => tag.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (tag) => tag.savedDatasetid
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (tag) => tag.clearFilters
);
export const editcellInfo = createSelector([selectList], (tag) => tag.editcell);

export const currentPageInfo = createSelector(
  [selectList],
  (tag) => tag.currentPage
);
