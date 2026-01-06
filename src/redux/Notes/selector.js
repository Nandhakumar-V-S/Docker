import { createSelector } from "reselect";

const selectList = (state) => state.notes;

export const entitiesInfo = createSelector(
  [selectList],
  (notes) => notes.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (notes) => notes.entityid
);
export const listidInfo = createSelector([selectList], (notes) => notes.listid);
export const useridInfo = createSelector([selectList], (notes) => notes.userid);
export const newEntityInfo = createSelector(
  [selectList],
  (notes) => notes.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (notes) => notes.masterData
);

export const listInfo = createSelector([selectList], (notes) => notes.list);

export const listDataInfo = createSelector(
  [selectList],
  (notes) => notes.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (notes) => notes.columnMasterData
);

export const dataSetInfo = createSelector(
  [selectList],
  (notes) => notes.dataSet
);

export const dataForColumnInfo = createSelector(
  [selectList],
  (notes) => notes.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (notes) => notes.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (notes) => notes.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (notes) => notes.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (notes) => notes.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (notes) => notes.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (notes) => notes.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (notes) => notes.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (notes) => notes.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (notes) => notes.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (notes) => notes.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (notes) => notes.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (notes) => notes.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (notes) => notes.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (notes) => notes.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (notes) => notes.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (notes) => notes.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (notes) => notes.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (notes) => notes.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (notes) => notes.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (notes) => notes.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (notes) => notes.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (notes) => notes.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (notes) => notes.columnSequence
);

export const datePickerFilterInfo = createSelector(
  [selectList],
  (notes) => notes.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (notes) => notes.weekFilter
);
export const loadingInfo = createSelector(
  [selectList],
  (notes) => notes.loading
);
export const usernameInfo = createSelector(
  [selectList],
  (notes) => notes.username
);
export const usereamilInfo = createSelector(
  [selectList],
  (notes) => notes.email
);
export const userobjInfo = createSelector(
  [selectList],
  (notes) => notes.userobj
);
export const loggedinuserinfo = createSelector(
  [selectList],
  (notes) => notes.loggedinuserinfo
);

export const loginUserIDobjInfo = createSelector(
  [selectList],
  (notes) => notes.loginUserIDobj
);

export const renderCountInfo = createSelector(
  [selectList],
  (notes) => notes.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (notes) => notes.savedDatasetid
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (notes) => notes.clearFilters
);
export const editcellInfo = createSelector(
  [selectList],
  (notes) => notes.editcell
);
export const horizontalGroupByMasterInfo = createSelector(
  [selectList],
  (notes) => notes.horizontalGroupByMaster
);

export const currentPageInfo = createSelector(
  [selectList],
  (notes) => notes.currentPage
);
