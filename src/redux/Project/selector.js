import { createSelector } from "reselect";

const selectList = (state) => state.project;
export const horizontalGroupByMasterInfo = createSelector(
  [selectList],
  (project) => project.horizontalGroupByMaster
);

export const horizontalGroupByDirInfo = createSelector(
  [selectList],
  (project) => project.horizontalGroupByDir
);
export const entitiesInfo = createSelector(
  [selectList],
  (project) => project.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (project) => project.entityid
);
export const listidInfo = createSelector(
  [selectList],
  (project) => project.listid
);
export const useridInfo = createSelector(
  [selectList],
  (project) => project.userid
);
export const newEntityInfo = createSelector(
  [selectList],
  (project) => project.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (project) => project.masterData
);

export const listInfo = createSelector([selectList], (project) => project.list);

export const listDataInfo = createSelector(
  [selectList],
  (project) => project.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (project) => project.columnMasterData
);

export const dataSetInfo = createSelector(
  [selectList],
  (project) => project.dataSet
);

export const dataForColumnInfo = createSelector(
  [selectList],
  (project) => project.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (project) => project.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (project) => project.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (project) => project.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (project) => project.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (project) => project.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (project) => project.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (project) => project.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (project) => project.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (project) => project.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (project) => project.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (project) => project.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (project) => project.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (project) => project.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (project) => project.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (project) => project.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (project) => project.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (project) => project.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (project) => project.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (project) => project.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (project) => project.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (project) => project.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (project) => project.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (project) => project.columnSequence
);

export const datePickerFilterInfo = createSelector(
  [selectList],
  (project) => project.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (project) => project.weekFilter
);
export const loadingInfo = createSelector(
  [selectList],
  (project) => project.loading
);
export const usernameInfo = createSelector(
  [selectList],
  (project) => project.username
);
export const userobjInfo = createSelector(
  [selectList],
  (project) => project.userobj
);

export const renderCountInfo = createSelector(
  [selectList],
  (project) => project.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (project) => project.savedDatasetid
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (project) => project.clearFilters
);
export const editcellInfo = createSelector(
  [selectList],
  (project) => project.editcell
);

export const currentPageInfo = createSelector(
  [selectList],
  (project) => project.currentPage
);
