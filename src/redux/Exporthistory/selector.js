import { createSelector } from "reselect";

const selectList = (state) => state.exporthistory;

export const entitiesInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.entityid
);
export const listidInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.listid
);
export const newentityidInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.newentityid
);
export const newlistidInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.newlistid
);
export const planentityidInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.planentityid
);
export const planlistidInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.planlistid
);
export const useridInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.userid
);
export const newEntityInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.masterData
);
export const subMasterDataInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.subMasterData
);

export const listInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.list
);

export const listDataInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.columnMasterData
);

export const dataSetInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.dataSet
);

export const dataForColumnInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.columnSequence
);
export const datePickerFilterInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.weekFilter
);
export const loadingInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.loading
);
export const usernameInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.username
);
export const userobjInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.userobj
);
export const TransactionIdInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.TransactionID
);
export const newdataSetIDInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.newdataSetID
);
export const newTotalcolumnInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.newTotalcolumn
);
export const TaskrowdataInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.Taskrowdata
);
export const plandataSetIDInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.plandataSetID
);
export const plannewTotalcolumnInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.plannewTotalcolumn
);
export const planTaskrowdataInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.planTaskrowdata
);
export const renderCountInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.savedDatasetid
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.clearFilters
);
export const editcellInfo = createSelector(
  [selectList],
  (exporthistory) => exporthistory.editcell
);
