import { createSelector } from "reselect";

const selectList = (state) => state.listpage;

export const entitiesInfo = createSelector(
  [selectList],
  (listpage) => listpage.entities
);
export const entityidInfo = createSelector(
  [selectList],
  (listpage) => listpage.entityid
);
export const listidInfo = createSelector(
  [selectList],
  (listpage) => listpage.listid
);
export const useridInfo = createSelector(
  [selectList],
  (listpage) => listpage.userid
);
export const newEntityInfo = createSelector(
  [selectList],
  (listpage) => listpage.newEntity
);
export const masterDataInfo = createSelector(
  [selectList],
  (listpage) => listpage.masterData
);

export const listInfo = createSelector(
  [selectList],
  (listpage) => listpage.list
);

export const listDataInfo = createSelector(
  [selectList],
  (listpage) => listpage.listData
);
export const columnMasterDataInfo = createSelector(
  [selectList],
  (listpage) => listpage.columnMasterData
);

export const dataSetInfo = createSelector(
  [selectList],
  (listpage) => listpage.dataSet
);

export const dataForColumnInfo = createSelector(
  [selectList],
  (listpage) => listpage.dataForColumn
);

export const unMappedColumnsInfo = createSelector(
  [selectList],
  (listpage) => listpage.unMappedColumns
);

export const filterMasterDataInfo = createSelector(
  [selectList],
  (listpage) => listpage.filterMasterData
);

export const groupMasterDataInfo = createSelector(
  [selectList],
  (listpage) => listpage.groupMasterData
);

export const quickFilterDataInfo = createSelector(
  [selectList],
  (listpage) => listpage.quickFilterData
);

export const addFilterDataInfo = createSelector(
  [selectList],
  (listpage) => listpage.addFilterData
);

export const matchedLookupInfo = createSelector(
  [selectList],
  (listpage) => listpage.matchedLookup
);

export const advMatchedLookupInfo = createSelector(
  [selectList],
  (listpage) => listpage.advMatchedLookup
);
export const dataSetIDInfo = createSelector(
  [selectList],
  (listpage) => listpage.dataSetID
);

export const totalColumnsInfo = createSelector(
  [selectList],
  (listpage) => listpage.totalColumns
);
export const GroupByhorizontalInfo = createSelector(
  [selectList],
  (listpage) => listpage.horizontalGroupBy
);
export const createGroupByDataInfo = createSelector(
  [selectList],
  (listpage) => listpage.createGroupByData
);
export const postDataInfo = createSelector(
  [selectList],
  (listpage) => listpage.postData
);
export const selectedFiltersInfo = createSelector(
  [selectList],
  (listpage) => listpage.selectedFilters
);
export const textFilterInfo = createSelector(
  [selectList],
  (listpage) => listpage.textFilter
);
export const additionalFiltersInfo = createSelector(
  [selectList],
  (listpage) => listpage.additionalFilters
);
export const dataSetListInfo = createSelector(
  [selectList],
  (listpage) => listpage.dataSetList
);
export const newDatasetInfo = createSelector(
  [selectList],
  (listpage) => listpage.newDataset
);
export const updateDataSetInfo = createSelector(
  [selectList],
  (listpage) => listpage.updateDataSet
);
export const newDatasetIDInfo = createSelector(
  [selectList],
  (listpage) => listpage.newDatasetID
);
export const deleteDatasetIDInfo = createSelector(
  [selectList],
  (listpage) => listpage.deleteDatasetID
);
export const newgroupbydataInfo = createSelector(
  [selectList],
  (listpage) => listpage.newgroupbydata
);
export const newLayoutInfo = createSelector(
  [selectList],
  (listpage) => listpage.newLayout
);
export const columnSequenceInfo = createSelector(
  [selectList],
  (listpage) => listpage.columnSequence
);
