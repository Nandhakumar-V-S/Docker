import { createSelector } from "reselect";

const selectList = (state) => state.execution;
export const horizontalGroupByMasterInfo = createSelector(
  [selectList],
  (execution) => execution.horizontalGroupByMaster
);
export const entitiesInfo = createSelector(
  [selectList],
  (execution) => execution.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (execution) => execution.entityid
);
export const listidInfo = createSelector(
  [selectList],
  (execution) => execution.listid
);
export const newentityidInfo = createSelector(
  [selectList],
  (execution) => execution.newentityid
);
export const att30entityidInfo = createSelector(
  [selectList],
  (execution) => execution.att360entityid
);
export const newlistidInfo = createSelector(
  [selectList],
  (execution) => execution.newlistid
);
export const att360listidInfo = createSelector(
  [selectList],
  (execution) => execution.att360listid
);
export const planentityidInfo = createSelector(
  [selectList],
  (execution) => execution.planentityid
);
export const planlistidInfo = createSelector(
  [selectList],
  (execution) => execution.planlistid
);
export const useridInfo = createSelector(
  [selectList],
  (execution) => execution.userid
);
export const newEntityInfo = createSelector(
  [selectList],
  (execution) => execution.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (execution) => execution.masterData
);
export const subMasterDataInfo = createSelector(
  [selectList],
  (execution) => execution.subMasterData
);

export const listInfo = createSelector(
  [selectList],
  (execution) => execution.list
);

export const listDataInfo = createSelector(
  [selectList],
  (execution) => execution.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (execution) => execution.columnMasterData
);

export const dataSetInfo = createSelector(
  [selectList],
  (execution) => execution.dataSet
);

export const dataForColumnInfo = createSelector(
  [selectList],
  (execution) => execution.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (execution) => execution.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (execution) => execution.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (execution) => execution.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (execution) => execution.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (execution) => execution.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (execution) => execution.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (execution) => execution.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (execution) => execution.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (execution) => execution.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (execution) => execution.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (execution) => execution.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (execution) => execution.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (execution) => execution.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (execution) => execution.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (execution) => execution.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (execution) => execution.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (execution) => execution.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (execution) => execution.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (execution) => execution.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (execution) => execution.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (execution) => execution.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (execution) => execution.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (execution) => execution.columnSequence
);
export const datePickerFilterInfo = createSelector(
  [selectList],
  (execution) => execution.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (execution) => execution.weekFilter
);
export const loadingInfo = createSelector(
  [selectList],
  (execution) => execution.loading
);
export const usernameInfo = createSelector(
  [selectList],
  (execution) => execution.username
);
export const userobjInfo = createSelector(
  [selectList],
  (execution) => execution.userobj
);
export const TransactionIdInfo = createSelector(
  [selectList],
  (execution) => execution.TransactionID
);
export const newdataSetIDInfo = createSelector(
  [selectList],
  (execution) => execution.newdataSetID
);
export const newTotalcolumnInfo = createSelector(
  [selectList],
  (execution) => execution.newTotalcolumn
);
export const TaskrowdataInfo = createSelector(
  [selectList],
  (execution) => execution.Taskrowdata
);
export const plandataSetIDInfo = createSelector(
  [selectList],
  (execution) => execution.plandataSetID
);
export const plannewTotalcolumnInfo = createSelector(
  [selectList],
  (execution) => execution.plannewTotalcolumn
);
export const planTaskrowdataInfo = createSelector(
  [selectList],
  (execution) => execution.planTaskrowdata
);
export const renderCountInfo = createSelector(
  [selectList],
  (execution) => execution.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (execution) => execution.savedDatasetid
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (execution) => execution.clearFilters
);
export const editcellInfo = createSelector(
  [selectList],
  (execution) => execution.editcell
);

export const currentPageInfo = createSelector(
  [selectList],
  (execution) => execution.currentPage
);
