import { createSelector } from "reselect";

const selectList = (state) => state.journey;

export const entitiesInfo = createSelector(
  [selectList],
  (journey) => journey.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (journey) => journey.entityid
);
export const listidInfo = createSelector(
  [selectList],
  (journey) => journey.listid
);
export const useridInfo = createSelector(
  [selectList],
  (journey) => journey.userid
);
export const newEntityInfo = createSelector(
  [selectList],
  (journey) => journey.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (journey) => journey.masterData
);

export const listInfo = createSelector([selectList], (journey) => journey.list);

export const listDataInfo = createSelector(
  [selectList],
  (journey) => journey.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (journey) => journey.columnMasterData
);

export const dataSetInfo = createSelector(
  [selectList],
  (journey) => journey.dataSet
);

export const dataForColumnInfo = createSelector(
  [selectList],
  (journey) => journey.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (journey) => journey.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (journey) => journey.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (journey) => journey.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (journey) => journey.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (journey) => journey.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (journey) => journey.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (journey) => journey.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (journey) => journey.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (journey) => journey.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (journey) => journey.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (journey) => journey.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (journey) => journey.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (journey) => journey.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (journey) => journey.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (journey) => journey.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (journey) => journey.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (journey) => journey.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (journey) => journey.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (journey) => journey.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (journey) => journey.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (journey) => journey.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (journey) => journey.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (journey) => journey.columnSequence
);

export const datePickerFilterInfo = createSelector(
  [selectList],
  (journey) => journey.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (journey) => journey.weekFilter
);
export const loadingInfo = createSelector(
  [selectList],
  (journey) => journey.loading
);
export const usernameInfo = createSelector(
  [selectList],
  (journey) => journey.username
);
export const usereamilInfo = createSelector(
  [selectList],
  (journey) => journey.email
);
export const userobjInfo = createSelector(
  [selectList],
  (journey) => journey.userobj
);
export const loggedinuserinfo = createSelector(
  [selectList],
  (journey) => journey.loggedinuserinfo
);

export const loginUserIDobjInfo = createSelector(
  [selectList],
  (journey) => journey.loginUserIDobj
);

export const renderCountInfo = createSelector(
  [selectList],
  (journey) => journey.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (journey) => journey.savedDatasetid
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (journey) => journey.clearFilters
);
export const editcellInfo = createSelector(
  [selectList],
  (journey) => journey.editcell
);
