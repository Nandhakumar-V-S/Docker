import { createSelector } from "reselect";

const selectList = (state) => state.plan;
export const horizontalGroupByMasterInfo = createSelector(
  [selectList],
  (plan) => plan.horizontalGroupByMaster
);
export const entitiesInfo = createSelector(
  [selectList],
  (plan) => plan.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (plan) => plan.entityid
);
export const listidInfo = createSelector([selectList], (plan) => plan.listid);
export const newentityidInfo = createSelector(
  [selectList],
  (plan) => plan.newentityid
);
export const newlistidInfo = createSelector(
  [selectList],
  (plan) => plan.newlistid
);
export const planentityidInfo = createSelector(
  [selectList],
  (plan) => plan.planentityid
);
export const planlistidInfo = createSelector(
  [selectList],
  (plan) => plan.planlistid
);
export const useridInfo = createSelector([selectList], (plan) => plan.userid);
export const newEntityInfo = createSelector(
  [selectList],
  (plan) => plan.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (plan) => plan.masterData
);
export const subMasterDataInfo = createSelector(
  [selectList],
  (plan) => plan.subMasterData
);

export const listInfo = createSelector([selectList], (plan) => plan.list);

export const listDataInfo = createSelector(
  [selectList],
  (plan) => plan.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (plan) => plan.columnMasterData
);

export const dataSetInfo = createSelector([selectList], (plan) => plan.dataSet);

export const dataForColumnInfo = createSelector(
  [selectList],
  (plan) => plan.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (plan) => plan.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (plan) => plan.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (plan) => plan.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (plan) => plan.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (plan) => plan.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (plan) => plan.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (plan) => plan.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (plan) => plan.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (plan) => plan.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (plan) => plan.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (plan) => plan.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (plan) => plan.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (plan) => plan.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (plan) => plan.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (plan) => plan.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (plan) => plan.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (plan) => plan.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (plan) => plan.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (plan) => plan.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (plan) => plan.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (plan) => plan.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (plan) => plan.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (plan) => plan.columnSequence
);
export const datePickerFilterInfo = createSelector(
  [selectList],
  (plan) => plan.datePickerFilter
);
export const weekFilterInfo = createSelector(
  [selectList],
  (plan) => plan.weekFilter
);
export const loadingInfo = createSelector([selectList], (plan) => plan.loading);
export const usernameInfo = createSelector(
  [selectList],
  (plan) => plan.username
);
export const userobjInfo = createSelector([selectList], (plan) => plan.userobj);
export const TransactionIdInfo = createSelector(
  [selectList],
  (plan) => plan.TransactionID
);
export const newdataSetIDInfo = createSelector(
  [selectList],
  (plan) => plan.newdataSetID
);
export const newTotalcolumnInfo = createSelector(
  [selectList],
  (plan) => plan.newTotalcolumn
);
export const TaskrowdataInfo = createSelector(
  [selectList],
  (plan) => plan.Taskrowdata
);
export const plandataSetIDInfo = createSelector(
  [selectList],
  (plan) => plan.plandataSetID
);
export const plannewTotalcolumnInfo = createSelector(
  [selectList],
  (plan) => plan.plannewTotalcolumn
);
export const planTaskrowdataInfo = createSelector(
  [selectList],
  (plan) => plan.planTaskrowdata
);
export const renderCountInfo = createSelector(
  [selectList],
  (plan) => plan.renderCount
);
export const savedDatasetidInfo = createSelector(
  [selectList],
  (plan) => plan.savedDatasetid
);
export const insertDataInfo = createSelector(
  [selectList],
  (plan) => plan.insertData
);
export const planweekInfo = createSelector(
  [selectList],
  (plan) => plan.postData.planweek
);
export const planassignedtoInfo = createSelector(
  [selectList],
  (plan) => plan.postData.planassignedto
);
export const clearFiltersInfo = createSelector(
  [selectList],
  (plan) => plan.clearFilters
);

export const currentPageInfo = createSelector(
  [selectList],
  (plan) => plan.currentPage
);
