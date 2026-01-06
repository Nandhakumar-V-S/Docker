import { createSelector } from "reselect";

const selectList = (state) => state.activitylog;
export const horizontalGroupByMasterInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.horizontalGroupByMaster
);
export const horizontalGroupByDirInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.horizontalGroupByDir
);
export const entitiesInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.entityid
);
export const listidInfo = createSelector([selectList], (activitylog) => activitylog.listid);
export const useridInfo = createSelector([selectList], (activitylog) => activitylog.userid);
export const newEntityInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.masterData
);

export const listInfo = createSelector([selectList], (activitylog) => activitylog.list);

export const listDataInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.columnMasterData
);

export const dataSetInfo = createSelector([selectList], (activitylog) => activitylog.dataSet);

export const dataForColumnInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.columnSequence
);

export const datePickerFilterInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.weekFilter
);
export const loadingInfo = createSelector([selectList], (activitylog) => activitylog.loading);
export const usernameInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.username
);
export const usereamilInfo = createSelector([selectList], (activitylog) => activitylog.email);
export const userobjInfo = createSelector([selectList], (activitylog) => activitylog.userobj);
export const loggedinuserinfo = createSelector(
  [selectList],
  (activitylog) => activitylog.loggedinuserinfo
);

export const loginUserIDobjInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.loginUserIDobj
);

export const renderCountInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.savedDatasetid
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.clearFilters
);
export const editcellInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.editcell
);
export const currentPageInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.currentPage
);

//vertical groupby
export const verticalGroupbySelectedInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.verticalGroupbyColumns
);
export const verticalGroupbyOptionsInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.verticalGroupbyOptions
);
export const verticalGroupbyDirectionInfo = createSelector(
  [selectList],
  (activitylog) => activitylog.verticalGroupbyDirection
);
//vertical groupby
