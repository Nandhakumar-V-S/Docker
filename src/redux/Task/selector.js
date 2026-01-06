import { createSelector } from "reselect";

const selectList = (state) => state.task;
export const horizontalGroupByMasterInfo = createSelector(
  [selectList],
  (task) => task.horizontalGroupByMaster
);
export const horizontalGroupByDirInfo = createSelector(
  [selectList],
  (task) => task.horizontalGroupByDir
);
export const entitiesInfo = createSelector(
  [selectList],
  (task) => task.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (task) => task.entityid
);
export const listidInfo = createSelector([selectList], (task) => task.listid);
export const useridInfo = createSelector([selectList], (task) => task.userid);
export const newEntityInfo = createSelector(
  [selectList],
  (task) => task.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (task) => task.masterData
);

export const listInfo = createSelector([selectList], (task) => task.list);

export const listDataInfo = createSelector(
  [selectList],
  (task) => task.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (task) => task.columnMasterData
);

export const dataSetInfo = createSelector([selectList], (task) => task.dataSet);

export const dataForColumnInfo = createSelector(
  [selectList],
  (task) => task.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (task) => task.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (task) => task.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (task) => task.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (task) => task.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (task) => task.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (task) => task.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (task) => task.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (task) => task.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (task) => task.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (task) => task.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (task) => task.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (task) => task.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (task) => task.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (task) => task.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (task) => task.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (task) => task.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (task) => task.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (task) => task.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (task) => task.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (task) => task.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (task) => task.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (task) => task.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (task) => task.columnSequence
);

export const datePickerFilterInfo = createSelector(
  [selectList],
  (task) => task.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (task) => task.weekFilter
);
export const loadingInfo = createSelector([selectList], (task) => task.loading);
export const usernameInfo = createSelector(
  [selectList],
  (task) => task.username
);
export const usereamilInfo = createSelector([selectList], (task) => task.email);
export const userobjInfo = createSelector([selectList], (task) => task.userobj);
export const loggedinuserinfo = createSelector(
  [selectList],
  (task) => task.loggedinuserinfo
);

export const loginUserIDobjInfo = createSelector(
  [selectList],
  (task) => task.loginUserIDobj
);

export const renderCountInfo = createSelector(
  [selectList],
  (task) => task.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (task) => task.savedDatasetid
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (task) => task.clearFilters
);
export const editcellInfo = createSelector(
  [selectList],
  (task) => task.editcell
);
export const currentPageInfo = createSelector(
  [selectList],
  (task) => task.currentPage
);
