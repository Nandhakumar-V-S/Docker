import * as types from "./types";

const initialState = {
  entities: [],
  entityid: "",
  listid: "",
  userid: 1000,
  newEntity: "",
  masterData: [],
  list: [],
  listData: {},
  dataSet: {},
  listDetails: {},
  columnMasterData: [],
  filterMasterData: [],
  groupMasterData: [],
  dataForColumn: [],
  quickFilterData: [],
  addFilterData: [],
  newgroupbydata: [],
  unMappedColumns: [],
  totalColumns: [],
  matchedLookup: {},
  advMatchedLookup: {},
  dataSetID: "",
  newDatasetID: "",
  deleteDatasetID: "",
  dataSetList: [],
  postData: {
    entityid: "",
    listid: "",
    start: "0",
    skip: "20",
    orderby: "",
    orderbydir: "",
    loggeduserid: "1000",
    sessionid: "",
    filterparams: [],
  },
  createGroupByData: [],
  horizontalGroupBy: [],
  selectedFilters: [],
  additionalFilters: [],
  newDataset: {},
  updateDataSet: {},
  textFilter: {},
  initialSortDirections: {},
  columnSequence: [],
  newLayout: [],
  loading: false,
  error: null,
};

const listpageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ENTITY_DATA_SUCCESS: {
      const entities = action.payload?.result?.data;
      const selectedEntities = entities.filter((entity) => entity.isselected);
      const entityid = selectedEntities
        .map((entity) => entity.entityid)
        .join(",");
      const listid = selectedEntities.map((entity) => entity.listid).join(",");
      const updatedPostData = {
        ...state.postData,
        entityid: entityid,
        listid: listid,
      };
      return {
        ...state,
        entities: entities,
        entityid: entityid,
        listid: listid,
        postData: updatedPostData,
      };
    }
    case types.SELECT_NEW_ENTITY: {
      // Update the selected item's isselected to true and others to false
      const updatedEntities = state.entities?.map((entity) => ({
        ...entity,
        isselected: entity.entityid === action.payload,
      }));

      const selectedListid =
        state.entities?.find((entity) => entity.entityid === action.payload)
          ?.listid || "";
      console.log(selectedListid);

      const updatedPostData = {
        ...state.postData,
        entityid: action.payload,
        listid: selectedListid,
        start: "0",
        skip: "20",
        orderby: "",
        orderbydir: "",
        filterparams: [],
      };

      return {
        ...state,
        entities: updatedEntities,
        newEntity: action.payload,
        entityid: action.payload,
        listid: selectedListid,
        postData: updatedPostData,
        masterData: [],
        columnMasterData: [],
        filterMasterData: [],
        groupMasterData: [],
        quickFilterData: [],
        addFilterData: [],
        matchedLookup: {},
        advMatchedLookup: {},
        createGroupByData: [],
        horizontalGroupBy: [],
        selectedFilters: [],
        additionalFilters: [],
        textFilter: {},
      };
    }
    case types.FETCH_MASTER_DATA_SUCCESS:
      const masterData = action.payload?.result?.data;
      return {
        ...state,
        masterData: masterData,
      };
    case types.FETCH_LIST_FIELDS_SUCCESS:
      const listfields =
        action.payload &&
        action.payload?.result?.list[0]?.data?.config?.listfields;
      const filterfields =
        action.payload &&
        action.payload?.result?.list[0]?.data?.config?.filterfields;
      const groupbyfields =
        action.payload &&
        action.payload?.result?.list[0]?.data?.config?.groupbyfields;
      const datasetArray =
        action.payload && action.payload?.result?.list[0]?.data?.dataset;

      let selectedDataset = datasetArray?.find(
        (dataset) => dataset.isselected
      )?.datasetid;

      if (!selectedDataset) {
        const defaultDataset = datasetArray?.find(
          (dataset) => dataset.isdefault
        );
        selectedDataset = defaultDataset?.datasetid;
      }

      console.log(selectedDataset);
      return {
        ...state,
        list: action.payload,
        columnMasterData: listfields,
        filterMasterData: filterfields,
        groupMasterData: groupbyfields,
        dataSetID: selectedDataset,
        dataSetList: datasetArray,
      };
    case types.FETCH_LIST_DATA_SUCCESS:
      return {
        ...state,
        listData: action.payload?.result,
      };
    case types.SET_PAGINATION:
      const { firstPageIndex, pageSize } = action.payload;
      console.log(firstPageIndex, pageSize);
      return {
        ...state,
        postData: {
          ...state.postData,
          start: firstPageIndex,
          skip: pageSize,
        },
      };
    case types.FETCH_DATASET_SUCCESS: {
      console.log(action.payload);
      const { isdefault } = action.payload?.result;
      const { columns } = action.payload?.result;
      const { filters } = action.payload?.result;
      const { groupby } = action.payload?.result;
      const newColumnMasterData = [...state.columnMasterData];
      console.log(newColumnMasterData);
      const newfilterMasterData = [...state.filterMasterData];
      const newgroupMasterData = [...state.groupMasterData];
      console.log(newgroupMasterData);

      const updatedPostData = {
        ...state.postData,
        start: "0",
        skip: "20",
        orderby: "",
        orderbydir: "",
        filterparams: [],
      };

      let updatedSelectedFilters = [];
      let updatedAdditionalFilters = [];
      //  let updatedFilterParams = [...updatedPostData.filterparams];

      let DataForColumn = [];

      // Create a set of IDs present in columns
      const columnIdsSet = new Set(columns?.map((column) => column.id));
      console.log(columnIdsSet);
      // Filter newColumnMasterData to find items not present in columns
      const unmatchedItems = newColumnMasterData
        .filter((item) => !columnIdsSet.has(item.id))
        .map((item) => ({ ...item, ismapped: false }));
      console.log(unmatchedItems);

      // Iterate over DatasetColumn array
      columns?.forEach((datasetColumn) => {
        // Find matching item in sortedColumn array
        const sortedItem = newColumnMasterData.find(
          (item) => item.id === datasetColumn.id
        );
        if (sortedItem) {
          // If match found, collect required properties
          const { name, visible, displayapiname, istitle, isdate } = sortedItem;
          DataForColumn.push({
            name,
            visible,
            displayapiname,
            istitle,
            isdate,
            ismapped: true,
            ...datasetColumn,
          });
        }
      });
      console.log(DataForColumn);
      const sortedColumn = DataForColumn?.sort((a, b) => a.seqno - b.seqno);
      const sortedUnMappedColumns = unmatchedItems?.sort(
        (a, b) => a.seqno - b.seqno
      );

      console.log(newfilterMasterData);
      let QuickFilterData = [];
      let AddFilterData = [];
      if (filters?.length === 0 && isdefault) {
        QuickFilterData = newfilterMasterData
          ?.filter((item) => item.isquickfilter)
          .map((item) => ({
            ...item,
            ismapped: true,
            defaultvalue: "",
            defaultvalall: "",
            filtercategory: "quick",
          }));

        AddFilterData = newfilterMasterData?.map((item) => ({
          ...item,
          defaultvalue: "",
          defaultvalall: "",
          filtercategory: "additional",
        }));
      } else {
        const selectedFiltersToAdd = filters
          ?.filter(
            (filter) =>
              filter.defaultvalue !== null &&
              filter.defaultvalue !== undefined &&
              filter.defaultvalue !== ""
          )
          .map((item) => ({
            filterid: item.id,
            apiname: item.filterid,
            filtervalue: item.defaultvalall,
            condition: "AND",
          }));

        // Update filterparams and selectedFilters
        const updatedFilterParams = [
          ...updatedPostData.filterparams,
          ...selectedFiltersToAdd,
        ];
        updatedPostData.filterparams = updatedFilterParams;

        const defaultQuickfilters = filters
          .filter(
            (filter) =>
              filter.defaultvalue !== null &&
              filter.defaultvalue !== undefined &&
              filter.defaultvalue !== "" &&
              filter.filtercategory === "quick"
          )
          .map((item) => ({
            filterid: item.id,
            apiname: item.filterid,
            filtervalue: item.defaultvalue,
            filtercontroltype: item.filtercontroltype,
          }));
        console.log(defaultQuickfilters);
        updatedSelectedFilters.push(...defaultQuickfilters);

        const defaultAddfilters = filters
          .filter(
            (filter) =>
              filter.defaultvalue !== null &&
              filter.defaultvalue !== undefined &&
              filter.defaultvalue !== "" &&
              filter.filtercategory === "additional"
          )
          .map((item) => ({
            filterid: item.id,
            apiname: item.filterid,
            filtervalue: item.defaultvalue,
            filtercontroltype: item.filtercontroltype,
          }));
        console.log(defaultAddfilters);
        updatedAdditionalFilters.push(...defaultAddfilters);

        QuickFilterData = newfilterMasterData
          .filter((item) => item.isquickfilter)
          .map((item) => {
            const filterMatch = filters
              .filter((filter) => filter.filtercategory === "quick")
              .find((filter) => filter.id === item.id);
            console.log(filterMatch);
            if (filterMatch) {
              return {
                ...item,
                defaultvalue: filterMatch.defaultvalue,
                defaultvalall: filterMatch.defaultvalall,
                ismapped: true,
                filtercategory: "quick",
              };
            } else {
              return {
                ...item,
                defaultvalue: "",
                defaultvalall: "",
                ismapped: false,
                filtercategory: "quick",
              };
            }
          });

        AddFilterData = newfilterMasterData?.map((item) => {
          const addfilterMatch = filters
            .filter((filter) => filter.filtercategory === "additional")
            .find((filter) => filter.id === item.id);
          console.log(addfilterMatch);
          if (addfilterMatch) {
            return {
              ...item,
              defaultvalue: addfilterMatch.defaultvalue,
              defaultvalall: addfilterMatch.defaultvalall,
              filtercategory: "additional",
            };
          } else {
            return {
              ...item,
              defaultvalue: "",
              defaultvalall: "",
              filtercategory: "additional",
            };
          }
        });
      }

      console.log(QuickFilterData);
      console.log(AddFilterData);
      const sortedQuickFilter = QuickFilterData?.sort(
        (a, b) => a.seqno - b.seqno
      );
      const sortedAddFilter = AddFilterData?.sort((a, b) => a.seqno - b.seqno);

      const totalColumns = [...sortedColumn, ...sortedUnMappedColumns];
      console.log(totalColumns);

      let newgroupbydata = [];

      if (groupby.length === 0) {
        // Case 2: If groupby length is 0
        newgroupbydata = newgroupMasterData.map((item) => ({
          ...item,
          defaultvalue: "",
        }));
      } else {
        // Case 1: If groupby length is greater than 0
        newgroupbydata = newgroupMasterData.map((groupItem) => {
          const groupById = groupby.find((item) => item.id === groupItem.id);
          if (groupById) {
            // Extract type, direction, and defaultvalue from groupby array
            const { type, direction, defaultvalue } = groupById;
            return {
              ...groupItem,
              type,
              direction,
              defaultvalue,
            };
          } else {
            // If ID doesn't match, extract all data from groupMasterData
            return {
              ...groupItem,
              defaultvalue: "", // Add defaultvalue as empty string
            };
          }
        });
      }

      if (groupby.length > 0) {
        let defaultGroupby = newgroupMasterData
          .map((groupItem) => {
            const groupById = groupby.find((item) => item.id === groupItem.id);
            console.log(groupById);
            if (groupById) {
              console.log(groupById.id);
              console.log(groupItem.api_name);
              console.log(groupById.defaultvalue);

              return {
                filterid: groupById.id,
                apiname: groupItem.api_name,
                filtervalue: groupById.defaultvalue,
                condition: "AND",
              };
            }
          })
          .filter(Boolean);
        console.log(defaultGroupby);
        const updatedFilterParams = [
          ...updatedPostData.filterparams,
          ...defaultGroupby,
        ];
        updatedPostData.filterparams = updatedFilterParams;
      }

      return {
        ...state,
        dataSet: action.payload.result,
        dataForColumn: sortedColumn,
        unMappedColumns: sortedUnMappedColumns,
        quickFilterData: sortedQuickFilter,
        addFilterData: sortedAddFilter,
        totalColumns: totalColumns,
        postData: updatedPostData,
        selectedFilters: updatedSelectedFilters,
        additionalFilters: updatedAdditionalFilters,
        newgroupbydata: newgroupbydata,
      };
    }
    case types.SET_ADV_MATCHED_LOOKUP:
      if (!action.payload || Object.keys(action.payload).length === 0) {
        console.log(action.payload);
        return {
          ...state,
          advMatchedLookup: {},
        };
      } else {
        return {
          ...state,
          advMatchedLookup: {
            ...state.advMatchedLookup,
            [action.payload.masterid]: action.payload,
          },
        };
      }
    case types.SET_MATCHED_LOOKUP:
      if (!action.payload || Object.keys(action.payload).length === 0) {
        console.log(action.payload);
        return {
          ...state,
          matchedLookup: {},
        };
      } else {
        return {
          ...state,
          matchedLookup: {
            ...state.matchedLookup,
            [action.payload.masterid]: action.payload,
          },
        };
      }

    case types.TOGGLE_COLUMN_ISMAPPING: {
      const updatedTotalColumn = [...state.totalColumns];
      const updatedColumns = updatedTotalColumn.map((column) => {
        if (action.payload.includes(column.id)) {
          return {
            ...column,
            ismapped: !column.ismapped,
          };
        }
        return column;
      });
      console.log(updatedColumns);
      return {
        ...state,
        totalColumns: updatedColumns,
      };
    }
    case types.TOGGLE_FILTER_ISMAPPING: {
      const updatedquickFilterData = [...state.quickFilterData];
      const updatedFilters = updatedquickFilterData.map((filter) => {
        if (action.payload.includes(filter.id)) {
          return {
            ...filter,
            ismapped: !filter.ismapped,
          };
        }
        return filter;
      });
      console.log(updatedFilters);
      return {
        ...state,
        quickFilterData: updatedFilters,
      };
    }

    case types.CREATE_HOR_GROUPBYDATA: {
      const { payload } = action;
      console.log(payload);
      const updatedPostData = { ...state.postData };
      const updatedGroupMasterData = [...state.groupMasterData];
      let updatedHorizontalGroupBy = [];
      let updatedCreateGroupByData = [];

      // Check if payload is not empty and contains horizontal items
      if (payload && payload.length > 0) {
        updatedCreateGroupByData = payload.filter(
          (item) => item.type === "Horizontal"
        );

        // Create a set of unique filter ids from the payload
        const payloadFilterIds = new Set(
          updatedGroupMasterData.map((item) => item.id)
        );
        console.log(payloadFilterIds);

        // Filter out filterParams whose filterid is in payloadFilterIds
        updatedPostData.filterparams = updatedPostData.filterparams?.filter(
          (filter) => !payloadFilterIds.has(filter.filterid)
        );

        updatedCreateGroupByData.forEach((item) => {
          const { id, api_name, value } = item;
          const filterIndex = updatedPostData.filterparams.findIndex(
            (filter) => filter.filterid === id
          );

          if (filterIndex !== -1) {
            // If the filter exists, update its filtervalue
            updatedPostData.filterparams[filterIndex] = {
              ...updatedPostData.filterparams[filterIndex],
              filtervalue: value,
            };
          } else {
            // If the filter does not exist, add a new object to filterParams
            updatedPostData.filterparams.push({
              filterid: id,
              apiname: api_name,
              filtervalue: value,
              condition: "AND",
            });
          }
        });

        // Extract relevant information for horizontal group by
        updatedHorizontalGroupBy = updatedCreateGroupByData.map((item) => ({
          masterid: item.masterid,
          mastervalues: item.mastervalues,
          value: item.value,
          id: item.id,
        }));
      } else {
        // If payload is empty, remove group by objects from filterparams
        const payloadFilterIds = new Set(
          updatedGroupMasterData.map((item) => item.id)
        );

        updatedPostData.filterparams = updatedPostData.filterparams?.filter(
          (filter) => !payloadFilterIds.has(filter.filterid)
        );
      }

      return {
        ...state,
        createGroupByData: updatedCreateGroupByData,
        postData: updatedPostData,
        horizontalGroupBy: updatedHorizontalGroupBy,
      };
    }
    case types.CHANGE_HORIZONTAL_GROUPBY: {
      const { id, optionid } = action.payload;
      console.log(id, optionid);
      const updatedPostData = { ...state.postData };
      const updatedCreateGroupByData = [...state.createGroupByData];

      // Update filterparams
      updatedPostData.filterparams = updatedPostData.filterparams.map(
        (filter) => {
          if (filter.filterid === id) {
            return {
              ...filter,
              filtervalue: optionid.toString(), // Assuming optionid is a string
            };
          }
          return filter;
        }
      );

      // Update createGroupByData
      const groupByIndex = updatedCreateGroupByData.findIndex(
        (group) => group.id === id
      );
      if (groupByIndex !== -1) {
        updatedCreateGroupByData[groupByIndex] = {
          ...updatedCreateGroupByData[groupByIndex],
          value: optionid.toString(), // Assuming optionid is a string
        };
      }

      return {
        ...state,
        postData: updatedPostData,
        createGroupByData: updatedCreateGroupByData,
      };
    }

    case types.SELECTED_FILTER_VALUE: {
      const { id, selectedValue, api_name } = action.payload;
      console.log(id, selectedValue, api_name);

      const updatedPostData = { ...state.postData };
      let updatedSelectedFilters = [...state.selectedFilters];
      const updatedAdditionalFilters = [...state.additionalFilters];
      let updatedFilterParams = [...updatedPostData.filterparams];

      const additionalFilterIndex = updatedAdditionalFilters.findIndex(
        (filter) => filter.filterid === id
      );

      if (additionalFilterIndex !== -1) {
        // If there is a match in additionalFilters
        const existingFilter = updatedAdditionalFilters[additionalFilterIndex];
        const existingFilterValue = existingFilter.filtervalue || "";
        let updatedFilterValue;
        if (
          selectedValue.length === 0 ||
          (Array.isArray(selectedValue) &&
            selectedValue.every((val) => val === "")) ||
          selectedValue[0] === ""
        ) {
          // If selectedValue is an empty array or an array containing only empty strings
          updatedFilterValue = existingFilterValue;
        } else {
          updatedFilterValue = existingFilterValue
            ? `${existingFilterValue},${selectedValue.join(",")}`
            : selectedValue.join(",");
        }
        // const updatedFilterValue = existingFilterValue
        //   ? `${existingFilterValue},${selectedValue.join(",")}`
        //   : selectedValue;
        console.log(updatedFilterValue);
        // Update filterparams if the object exists
        updatedFilterParams = updatedPostData.filterparams.map((filter) => {
          if (filter.filterid === id) {
            return { ...filter, filtervalue: updatedFilterValue };
          }
          return filter;
        });

        // If filterparams does not contain the object, add it
        const existingFilterInParams = updatedFilterParams.find(
          (filter) => filter.filterid === id
        );
        if (!existingFilterInParams) {
          updatedFilterParams.push({
            filterid: id,
            apiname: api_name,
            filtervalue: updatedFilterValue.join(","),
            condition: "AND",
          });
        }

        // Update or add to selectedFilters
        const selectedFilterIndex = updatedSelectedFilters.findIndex(
          (filter) => filter.filterid === id
        );
        if (selectedFilterIndex !== -1) {
          updatedSelectedFilters[selectedFilterIndex] = {
            filterid: id,
            apiname: api_name,
            filtervalue: selectedValue.join(","),
            condition: "AND",
          };
        } else {
          updatedSelectedFilters.push({
            filterid: id,
            apiname: api_name,
            filtervalue: selectedValue.join(","),
            condition: "AND",
          });
        }
      } else {
        // Check if the filter already exists in selectedFilters
        const existingSelectedFilterIndex = updatedSelectedFilters.findIndex(
          (filter) => filter.filterid === id
        );

        if (existingSelectedFilterIndex !== -1) {
          // If the filter already exists, update filtervalue in both updatedFilterParams and updatedSelectedFilters

          if (selectedValue.length === 0 || selectedValue[0] === "") {
            // If selectedValue is an empty string, remove the filter from both updatedFilterParams and updatedSelectedFilters
            updatedFilterParams = updatedFilterParams.filter(
              (filter) => filter.filterid !== id
            );
            updatedSelectedFilters = updatedSelectedFilters.filter(
              (filter) => filter.filterid !== id
            );
          } else {
            updatedFilterParams = updatedPostData.filterparams.map((filter) => {
              if (filter.filterid === id) {
                return { ...filter, filtervalue: selectedValue.join(",") };
              }
              return filter;
            });

            // Update selectedFilters
            updatedSelectedFilters = updatedSelectedFilters.map((filter) => {
              if (filter.filterid === id) {
                return { ...filter, filtervalue: selectedValue.join(",") };
              }
              return filter;
            });
          }
        } else {
          // If the filter does not exist, add it as a new object to both updatedFilterParams and updatedSelectedFilters
          if (selectedValue.length > 0) {
            const newFilter = {
              filterid: id,
              apiname: api_name,
              filtervalue: selectedValue.join(","),
              condition: "AND",
            };
            updatedFilterParams = [...updatedFilterParams, newFilter];
            updatedSelectedFilters.push(newFilter);
          }
        }
      }
      console.log(updatedFilterParams);
      console.log(updatedSelectedFilters);

      return {
        ...state,
        postData: {
          ...updatedPostData,
          filterparams: updatedFilterParams,
        },
        selectedFilters: updatedSelectedFilters,
      };
    }

    case types.ADD_ADDITIONAL_FILTER: {
      const { selectedOptions, textvalues } = action.payload;
      console.log(selectedOptions);
      console.log(textvalues);

      let updatedPostData = { ...state.postData };
      let updatedFilterParams = [...state.postData.filterparams];
      let updatedSelectedFilters = [...state.selectedFilters];
      let updatedAdditionalFilters = [...state.additionalFilters];

      console.log(updatedSelectedFilters);
      console.log(updatedAdditionalFilters);

      selectedOptions?.forEach((option) => {
        const quickFilterIndex = updatedSelectedFilters.findIndex(
          (filter) => filter.filterid === option.id
        );
        console.log(quickFilterIndex);
        if (quickFilterIndex !== -1) {
          // If there is a match in selectedFilters
          const existingFilter = updatedSelectedFilters[quickFilterIndex];
          console.log(existingFilter);
          const existingFilterValue = existingFilter.filtervalue || "";
          console.log(existingFilterValue);
          let updatedFilterValue;
          if (
            option.selectedValue.length === 0 ||
            option.selectedValue[0] === ""
          ) {
            // If selectedValue is an empty array or an array containing only empty strings
            updatedFilterValue = existingFilterValue;
          } else {
            updatedFilterValue = existingFilterValue
              ? `${existingFilterValue},${option.selectedValue.join(",")}`
              : selectedValue.join(",");
          }

          console.log(updatedFilterValue);

          // Update filterparams if the object exists
          updatedFilterParams = updatedFilterParams.map((filter) => {
            if (filter.filterid === option.id) {
              return { ...filter, filtervalue: updatedFilterValue };
            }
            return filter;
          });

          // If filterparams does not contain the object, add it
          const existingFilterInParams = updatedFilterParams.find(
            (filter) => filter.filterid === option.id
          );
          if (!existingFilterInParams) {
            updatedFilterParams.push({
              filterid: option.id,
              apiname: option.api_name,
              filtervalue: option.updatedFilterValue.join(","),
              condition: "AND",
            });
          }

          // Update or add to additionalFilters
          const selectedFilterIndex = updatedAdditionalFilters.findIndex(
            (filter) => filter.filterid === option.id
          );
          if (selectedFilterIndex !== -1) {
            updatedAdditionalFilters[selectedFilterIndex] = {
              filterid: option.id,
              apiname: option.api_name,
              filtervalue: option.selectedValue.join(","),
              filtercontroltype: option.filtercontroltype,
            };
          } else {
            updatedAdditionalFilters.push({
              filterid: option.id,
              apiname: option.api_name,
              filtervalue: option.selectedValue.join(","),
              filtercontroltype: option.filtercontroltype,
            });
          }
        } else {
          selectedOptions?.forEach((option) => {
            // Check if the filter ID exists in filterparams
            const filterIndex = updatedFilterParams.findIndex(
              (filter) => filter.filterid === option.id
            );
            console.log(filterIndex);
            if (filterIndex !== -1) {
              // If filter ID exists, update its filtervalue from selectedValue
              if (option.selectedValue.length > 0) {
                updatedFilterParams[filterIndex] = {
                  ...updatedFilterParams[filterIndex],
                  filtervalue: option.selectedValue.join(","),
                };
                // updatedFilterParams[filterIndex].filtervalue =
                //   option.selectedValue.join(",");
              } else {
                updatedFilterParams = updatedFilterParams.filter(
                  (filter, index) => index !== filterIndex
                );
                // updatedFilterParams.splice(filterIndex, 1);
              }
            } else {
              // If filter ID doesn't exist, add it to filterparams
              updatedFilterParams.push({
                filterid: option.id,
                apiname: option.api_name,
                filtervalue: option.selectedValue.join(","),
                condition: "AND",
              });
            }
          });

          // Update updatedAdditionalFilters according to selectedOptions and textvalues
          selectedOptions?.forEach((option) => {
            // Check if the filter ID exists in updatedAdditionalFilters
            const filterIndex = updatedAdditionalFilters?.findIndex(
              (filter) => filter.filterid === option.id
            );
            console.log(filterIndex);
            if (filterIndex !== -1) {
              // If filter ID exists, update its selectedValue
              if (option.selectedValue.length > 0) {
                updatedAdditionalFilters[filterIndex] = {
                  ...updatedAdditionalFilters[filterIndex],
                  filtervalue: option.selectedValue.join(","),
                };
              } else {
                // updatedAdditionalFilters.splice(filterIndex, 1);
                updatedAdditionalFilters = updatedAdditionalFilters.filter(
                  (filter, index) => index !== filterIndex
                );
              }
              // updatedAdditionalFilters[filterIndex].selectedValue =
              //   option.selectedValue.join(",");
            } else {
              // If filter ID doesn't exist, add it to updatedAdditionalFilters
              updatedAdditionalFilters.push({
                filterid: option.id,
                filtervalue: option.selectedValue.join(","),
                apiname: option.api_name,
                filtercontroltype: option.filtercontroltype,
              });
            }
          });
        }
      });
      // Update filterparams according to selectedOptions

      // Process textvalues
      if (textvalues && Object.keys(textvalues).length > 0) {
        Object.values(textvalues).forEach((textValue) => {
          const filterIndex = updatedSelectedFilters.findIndex(
            (filter) => filter.filterid === textValue.id
          );

          if (filterIndex !== -1) {
            updatedFilterParams[filterIndex] = {
              ...updatedFilterParams[filterIndex],
              filtervalue: `${updatedFilterParams[filterIndex].filtervalue},${textValue.value}`,
            };
          } else {
            const filterIndex = updatedFilterParams.findIndex(
              (filter) => filter.filterid === textValue.id
            );
            console.log(filterIndex);
            if (filterIndex !== -1) {
              // If filter ID exists, update its selectedValue
              if (textValue.value !== "") {
                updatedFilterParams[filterIndex] = {
                  ...updatedFilterParams[filterIndex],
                  filtervalue: textValue.value,
                };
              } else {
                // updatedAdditionalFilters.splice(filterIndex, 1);
                updatedFilterParams = updatedFilterParams.filter(
                  (filter, index) => index !== filterIndex
                );
              }
              // updatedAdditionalFilters[filterIndex].selectedValue =
              //   option.selectedValue.join(",");
            } else {
              updatedFilterParams.push({
                filterid: textValue.id,
                apiname: textValue.api_name,
                filtervalue: textValue.value,
                condition: "AND",
              });
            }
          }

          const additionalFilterIndex = updatedAdditionalFilters.findIndex(
            (filter) => filter.filterid === textValue.id
          );
          console.log(additionalFilterIndex);
          if (additionalFilterIndex !== -1) {
            updatedAdditionalFilters[additionalFilterIndex] = {
              ...updatedAdditionalFilters[additionalFilterIndex],
              filtervalue: textValue.value,
            };
          } else {
            updatedAdditionalFilters.push({
              filterid: textValue.id,
              filtervalue: textValue.value,
              apiname: textValue.api_name,
              filtercontroltype: textValue.filtercontroltype,
            });
          }
        });
      }
      updatedPostData = {
        ...updatedPostData,
        filterparams: updatedFilterParams,
      };
      console.log(updatedPostData);
      console.log(updatedAdditionalFilters);
      return {
        ...state,
        postData: updatedPostData,
        additionalFilters: updatedAdditionalFilters,
      };
    }

    case types.SET_DROPDOWN_CHECKED: {
      const { masterid, selectedValue, isChecked } = action.payload;
      console.log(masterid);
      console.log(selectedValue);
      console.log(isChecked);
      //const matchedLookup = state.matchedLookup;
      const matchedLookup = JSON.parse(JSON.stringify(state.matchedLookup));
      console.log(matchedLookup);
      if (matchedLookup[masterid]) {
        if (matchedLookup.hasOwnProperty(String(masterid))) {
          const mastervalues = matchedLookup[String(masterid)].mastervalues;
          console.log(mastervalues);
          if (mastervalues) {
            for (let i = 0; i < mastervalues.length; i++) {
              if (mastervalues[i].optionid === selectedValue) {
                mastervalues[i].isChecked = isChecked;
              } else {
                // Set isChecked property of other optionIds
                mastervalues[i].isChecked = false;
              }
            }
          }
        }
      }

      return {
        ...state,
        matchedLookup: matchedLookup,
      };
    }
    case types.SET_MULTISELECT_CHECKED: {
      const { masterid, selectedValue, isChecked } = action.payload;
      console.log(masterid);
      console.log(selectedValue);
      console.log(isChecked);
      //const matchedLookup = state.matchedLookup;
      const matchedLookup = JSON.parse(JSON.stringify(state.matchedLookup));
      console.log(matchedLookup);
      if (matchedLookup[masterid]) {
        // Check if mastervalues array exists
        if (matchedLookup[masterid].mastervalues) {
          // Iterate through mastervalues
          matchedLookup[masterid].mastervalues.forEach((option) => {
            // Check if the optionid exists in selectedValue array
            const isSelected = selectedValue.includes(option.optionid);
            // Set isChecked based on the existence of optionid in selectedValue
            option.isChecked = isSelected ? isChecked : false;
          });
        }
      } else {
        console.log("111");
      }

      return {
        ...state,
        matchedLookup: matchedLookup,
      };
    }

    case types.REMOVE_ALL_FILTER: {
      console.log(action.payload);
      let filterIdsToRemove = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      console.log(filterIdsToRemove);
      const updatedAdditionalFilters = [];
      const updatedFilters = [];
      let updatedPostData = { ...state.postData };

      // Remove filter parameters from postData.filterparams
      updatedPostData.filterparams = updatedPostData.filterparams.filter(
        (filter) => !filterIdsToRemove.includes(filter.filterid)
      );

      return {
        ...state,
        selectedFilters: updatedFilters,
        additionalFilters: updatedAdditionalFilters,
        postData: updatedPostData,
      };
    }

    case types.REMOVE_QUICK_FILTER: {
      console.log(action.payload);
      // const { payload: idToRemove } = action;

      const updatedAdditionalFilters = [...state.additionalFilters];
      let updatedFilters = [...state.selectedFilters];
      console.log(updatedAdditionalFilters);
      console.log(updatedFilters);
      let updatedPostData = { ...state.postData };

      // Check if the ID exists in additionalFilters
      const filterIndex = updatedAdditionalFilters.findIndex(
        (filter) => filter.filterid === action.payload
      );

      // Case 1: ID exists in additionalFilters
      if (filterIndex !== -1) {
        const filterToUpdateIndex = updatedPostData.filterparams.findIndex(
          (filter) => filter.filterid === action.payload
        );
        if (filterToUpdateIndex !== -1) {
          // Update filtervalue with the value from additionalFilters
          const valueToUpdate =
            updatedAdditionalFilters[filterIndex].filtervalue;
          const updatedFilterToUpdate = {
            ...updatedPostData.filterparams[filterToUpdateIndex],
            filtervalue: valueToUpdate,
          };
          updatedPostData.filterparams = [
            ...updatedPostData.filterparams.slice(0, filterToUpdateIndex),
            updatedFilterToUpdate,
            ...updatedPostData.filterparams.slice(filterToUpdateIndex + 1),
          ];
        }
        console.log(filterToUpdateIndex);
        // Remove the filter from selectedFilters
        updatedFilters = updatedFilters.filter(
          (filter) => filter.filterid !== action.payload
        );
      } else {
        // Case 2: ID does not exist in additionalFilters
        updatedPostData.filterparams = updatedPostData.filterparams.filter(
          (filter) => filter.filterid !== action.payload
        );
        updatedFilters = updatedFilters.filter(
          (filter) => filter.filterid !== action.payload
        );
      }

      console.log(updatedPostData);
      console.log(updatedFilters);

      return {
        ...state,
        selectedFilters: updatedFilters,
        postData: updatedPostData,
      };
    }
    case types.REMOVE_ADVANCED_FILTER: {
      console.log(action.payload);

      let updatedAdditionalFilters = [...state.additionalFilters];
      const updatedFilters = [...state.selectedFilters];

      console.log(updatedAdditionalFilters);
      console.log(updatedFilters);
      let updatedPostData = { ...state.postData };

      // Check if the ID exists in additionalFilters
      const filterIndex = updatedFilters.findIndex(
        (filter) => filter.filterid === action.payload
      );

      // Case 1: ID exists in additionalFilters
      if (filterIndex !== -1) {
        const filterToUpdateIndex = updatedPostData.filterparams.findIndex(
          (filter) => filter.filterid === action.payload
        );
        if (filterToUpdateIndex !== -1) {
          // Update filtervalue with the value from additionalFilters
          const valueToUpdate = updatedFilters[filterIndex].filtervalue;
          const updatedFilterToUpdate = {
            ...updatedPostData.filterparams[filterToUpdateIndex],
            filtervalue: valueToUpdate,
          };
          updatedPostData.filterparams = [
            ...updatedPostData.filterparams.slice(0, filterToUpdateIndex),
            updatedFilterToUpdate,
            ...updatedPostData.filterparams.slice(filterToUpdateIndex + 1),
          ];
        }
        console.log(filterToUpdateIndex);
        // Remove the filter from selectedFilters
        updatedAdditionalFilters = updatedAdditionalFilters.filter(
          (filter) => filter.filterid !== action.payload
        );
      } else {
        // Case 2: ID does not exist in additionalFilters
        updatedPostData.filterparams = updatedPostData.filterparams.filter(
          (filter) => filter.filterid !== action.payload
        );
        updatedAdditionalFilters = updatedAdditionalFilters.filter(
          (filter) => filter.filterid !== action.payload
        );
      }

      console.log(updatedPostData);
      console.log(updatedAdditionalFilters);

      return {
        ...state,
        additionalFilters: updatedAdditionalFilters,
        postData: updatedPostData,
      };
    }

    case types.QUICK_TEXT_VALUE: {
      console.log(action.payload);
      return {
        ...state,
        textFilter: action.payload,
      };
    }
    case types.RESET_QUICK_FILTER_VALUES: {
      let filterIds = [];
      console.log(action.payload);
      // Check if action.payload is an array or not
      if (Array.isArray(action.payload)) {
        // If it's an array, assign it directly to filterIds
        filterIds = action.payload;
      } else {
        // If it's not an array, convert it to an array with a single element
        filterIds = [action.payload];
      }

      // Create a copy of the state's textFilter object
      const updatedTextFilter = { ...state.textFilter };

      // Iterate over each filterId
      const updatedLookup = Object.keys(state.matchedLookup).reduce(
        (acc, masterid) => {
          const master = state.matchedLookup[masterid];

          // Check if the current master's filterId exists in the filterIds array
          if (filterIds.includes(master.id)) {
            // Map over the mastervalues and set isChecked to false
            const updatedValues = master.mastervalues.map((value) => ({
              ...value,
              isChecked: false,
            }));
            // Update the masterid object with modified mastervalues
            acc[masterid] = {
              ...master,
              mastervalues: updatedValues,
            };
          } else {
            // If filterId doesn't match, keep the masterid object as it is
            acc[masterid] = master;
          }
          return acc;
        },
        {}
      );

      // Remove filterIds from textFilter
      filterIds.forEach((filterId) => {
        if (updatedTextFilter.hasOwnProperty(filterId)) {
          updatedTextFilter[filterId] = {
            ...updatedTextFilter[filterId],
            value: "",
          };
        }
      });

      // Return the updated state with modified matchedLookup and textFilter
      return {
        ...state,
        matchedLookup: updatedLookup,
        textFilter: updatedTextFilter,
      };
    }
    case types.CREATE_NEW_DATASET:
      return {
        ...state,
        newDataset: action.payload,
      };
    case types.EDIT_DATASET:
      console.log(action.payload);
      return {
        ...state,
        updateDataSet: action.payload,
      };
    case types.SORTED_COLUMN: {
      const { dataindex } = action.payload;
      console.log(dataindex);
      const { initialSortDirections } = state;
      console.log(initialSortDirections);
      // Determine the sorting direction for the current dataIndex
      const ascending =
        initialSortDirections[dataindex] === undefined
          ? true
          : !initialSortDirections[dataindex];

      // Update the initialSortDirections with the new sorting direction for the current dataIndex
      const updatedSortDirections = {
        ...initialSortDirections,
        [dataindex]: ascending,
      };

      // Determine the sorting direction based on the ascending flag
      const sortDirection = ascending ? "asc" : "desc";

      // Update postData with sorting information
      // const orderBy = `${dataindex} ${sortDirection}`;
      const updatedPostData = {
        ...state.postData,
        orderby: dataindex,
        orderbydir: sortDirection,
      };

      return {
        ...state,
        initialSortDirections: updatedSortDirections,
        postData: updatedPostData,
      };
    }
    case types.GET_NEW_DATASET_INFO_SUCCESS: {
      // const updatedDataSetList = state.dataSetList?.map((dataset) => ({
      //   ...dataset,
      //   isselected: dataset.datasetid === action.payload,
      // }));

      return {
        ...state,
        newDatasetID: action.payload,
        // dataSetID: action.payload,
        // dataSetList: updatedDataSetList,
        quickFilterData: [],
        addFilterData: [],
        matchedLookup: {},
        advMatchedLookup: {},
        createGroupByData: [],
        horizontalGroupBy: [],
        selectedFilters: [],
        additionalFilters: [],
        textFilter: {},
      };
    }
    case types.DELETE_DATASET_DB: {
      console.log(action.payload);

      const deleteDatasetID = action.payload;
      const index = state.dataSetList.findIndex(
        (data) => data.datasetid === deleteDatasetID
      );
      console.log(index);
      if (index !== -1) {
        var nextDatasetID = state.newDatasetID || "";

        if (index === state.dataSetList.length - 1) {
          // If the deleted dataset is the last one
          const falseDefaults = state.dataSetList.filter(
            (data) => !data.isdefault
          );
          const trueDefaults = state.dataSetList.filter(
            (data) => data.isdefault
          );

          if (falseDefaults.length === 1) {
            // If there's only one dataset with isdefault false
            nextDatasetID =
              trueDefaults.length > 0 ? trueDefaults[0].datasetid : "";
          } else if (falseDefaults.length > 1) {
            // If there are multiple datasets with isdefault false
            const nextIndex = falseDefaults.findIndex(
              (data) => data.datasetid !== deleteDatasetID
            );
            nextDatasetID =
              nextIndex !== -1 ? falseDefaults[nextIndex].datasetid : "";
          }
        } else {
          // If the deleted dataset is not the last one
          nextDatasetID = state.dataSetList[index + 1].datasetid;
        }

        console.log(nextDatasetID);
      }

      const updatedDataSetList = state.dataSetList.map((dataset) => ({
        ...dataset,
        isselected: dataset.datasetid === nextDatasetID,
      }));
      console.log(updatedDataSetList);
      // Remove the dataset with deleteDatasetID
      const filteredDataSetList = updatedDataSetList.filter(
        (dataset) => dataset.datasetid !== deleteDatasetID
      );
      console.log(filteredDataSetList);
      return {
        ...state,
        deleteDatasetID: action.payload,
        newDatasetID: nextDatasetID,
        dataSetID: nextDatasetID,
        dataSetList: filteredDataSetList,
        quickFilterData: [],
        addFilterData: [],
        matchedLookup: {},
        advMatchedLookup: {},
        createGroupByData: [],
        horizontalGroupBy: [],
        selectedFilters: [],
        additionalFilters: [],
        textFilter: {},
      };
    }
    case types.SET_ADV_DROPDOWN_CHECKED: {
      const { masterid, selectedValue, isChecked } = action.payload;
      console.log(masterid);
      console.log(selectedValue);
      console.log(isChecked);
      //const matchedLookup = state.matchedLookup;
      const advMatchedLookup = JSON.parse(
        JSON.stringify(state.advMatchedLookup)
      );
      console.log(advMatchedLookup);
      if (advMatchedLookup[masterid]) {
        if (advMatchedLookup.hasOwnProperty(String(masterid))) {
          const mastervalues = advMatchedLookup[String(masterid)].mastervalues;
          console.log(mastervalues);
          if (mastervalues) {
            for (let i = 0; i < mastervalues.length; i++) {
              if (mastervalues[i].optionid === selectedValue) {
                mastervalues[i].isChecked = isChecked;
              } else {
                // Set isChecked property of other optionIds
                mastervalues[i].isChecked = false;
              }
            }
          }
        }
      }

      return {
        ...state,
        advMatchedLookup: advMatchedLookup,
      };
    }
    case types.SET_ADV_MULTISELECT_CHECKED: {
      const { masterid, selectedValue, isChecked } = action.payload;
      console.log(masterid);
      console.log(selectedValue);
      console.log(isChecked);
      //const matchedLookup = state.matchedLookup;
      const advMatchedLookup = JSON.parse(
        JSON.stringify(state.advMatchedLookup)
      );
      console.log(advMatchedLookup);
      if (advMatchedLookup[masterid]) {
        // Check if mastervalues array exists
        if (advMatchedLookup[masterid].mastervalues) {
          // Iterate through mastervalues
          advMatchedLookup[masterid].mastervalues.forEach((option) => {
            // Check if the optionid exists in selectedValue array
            const isSelected = selectedValue.includes(option.optionid);
            // Set isChecked based on the existence of optionid in selectedValue
            option.isChecked = isSelected ? isChecked : false;
          });
        }
      } else {
        console.log("111");
      }

      return {
        ...state,
        advMatchedLookup: advMatchedLookup,
      };
    }
    case types.SET_NEW_LAYOUT:
      const updatedTotalColumn = [...state.totalColumns];

      const newLayout = action.payload.map((payloadItem) => {
        // Find the corresponding item in totalColumns based on api_name
        const totalColumnItem = updatedTotalColumn.find(
          (totalItem) =>
            totalItem.displayapiname?.toLowerCase() ===
            payloadItem.displayapiname
        );

        // If a matching item is found in totalColumns
        if (totalColumnItem) {
          // Extract id, columnsequence, and columnwidth
          const { id } = totalColumnItem;
          // Return a new object with extracted values
          return {
            listfieldid: id,
            columnsequence: payloadItem.columnsequence,
            columnwidth: payloadItem.columnwidth,
          };
        }
        return null;
      });
      const filteredNewLayout = newLayout.filter((item) => item !== null);
      return {
        ...state,
        newLayout: filteredNewLayout,
      };

    case types.SET_COLUMN_SEQ: {
      const updatedTotalColumn = [...state.totalColumns];

      const updatedSeq = action.payload.map((payloadItem) => {
        // Find the corresponding item in totalColumns based on api_name
        const totalColumnItem = updatedTotalColumn.find(
          (totalItem) =>
            totalItem.displayapiname?.toLowerCase() ===
            payloadItem.displayapiname
        );

        // If a matching item is found in totalColumns
        if (totalColumnItem) {
          // Extract id, columnsequence, and columnwidth
          const { id } = totalColumnItem;
          // Return a new object with extracted values
          return {
            listfieldid: id,
            columnsequence: payloadItem.columnsequence,
            columnwidth: payloadItem.columnwidth,
          };
        }
        return null;
      });
      const filteredupdatedSeq = updatedSeq.filter((item) => item !== null);

      return {
        ...state,
        columnSequence: filteredupdatedSeq,
        //  fieldsInfo: updatedFieldsInfo,
      };
    }
    default:
      return state;
  }
};

export default listpageReducer;
