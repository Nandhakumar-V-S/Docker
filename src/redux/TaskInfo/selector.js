import { createSelector } from "reselect";

const selectList = (state) => state.taskinfo;

export const entitiesInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.entityid
);
export const listidInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.listid
);
export const useridInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.userid
);
export const newEntityInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.masterData
);

export const listInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.list
);

export const listDataInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.columnMasterData
);

export const dataSetInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.dataSet
);

export const dataForColumnInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.columnSequence
);

export const datePickerFilterInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.weekFilter
);
export const loadingInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.loading
);
export const usernameInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.username
);
export const userobjInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.userobj
);

export const renderCountInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.savedDatasetid
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.clearFilters
);
export const editcellInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.editcell
);

export const currentPageInfo = createSelector(
  [selectList],
  (taskinfo) => taskinfo.currentPage
);
