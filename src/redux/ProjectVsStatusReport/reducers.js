import * as types from "./types";

const initialState = {
  entities: [],
  entityid: "26B84156-CC30-416E-99D5-B37409B4D0BD",
  listid: "0C68EE8D-2E21-4E25-85B2-4AFA61197F2E",
  userid: "",
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
    entityid: "26B84156-CC30-416E-99D5-B37409B4D0BD",
    listid: "0C68EE8D-2E21-4E25-85B2-4AFA61197F2E",
    start: 0,
    skip: 20,
    orderby: "",
    orderbydir: "",
    loggeduserid: "",
    sessionid: "",
    filterparams: [],
  },
  createGroupByData: [],
  horizontalGroupBy: [],
  horizontalGroupByMaster: [],
  selectedFilters: [],
  additionalFilters: [],
  newDataset: {},
  updateDataSet: {},
  textFilter: {},
  initialSortDirections: {},
  columnSequence: [],
  newLayout: [],
  datePickerFilter: [],
  weekFilter: [],
  planWeekFilter: [],
  planMonthFilter: [],
  monthFilter: [],
  username: "",
  userobj: {},
  loading: true,
  renderCount: 0,
  savedDatasetid: "",
  clearFilters: "",
  currentPage: 1,
  pageSize: 20,
  error: null,
  orderBy: "",
  orderByHeader: "",
};

const ProjectVsStatusReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PROJECTVSSTATUSREPORT_SET_CURRENTPAGE: {
      console.log(action.payload);
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    case types.PROJECTVSSTATUSREPORT_GET_USERNAME: {
      const { name, globalid } = action.payload;
      const updatedPostData = {
        ...state.postData,
        loggeduserid: globalid,
      };
      return {
        ...state,
        username: name,
        userid: globalid,
        postData: updatedPostData,
      };
    }
    case types.PROJECTVSSTATUSREPORT_FETCH_ENTITY_DATA_SUCCESS: {
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
    case types.PROJECTVSSTATUSREPORT_INCREMENT_COUNT:
      return {
        ...state,
        renderCount: state.renderCount + 1,
      };
    case types.PROJECTVSSTATUSREPORT_SET_DATASETID:
      return {
        ...state,
        savedDatasetid: action.payload,
      };
    case types.PROJECTVSSTATUSREPORT_SELECT_NEW_ENTITY: {
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
        start: 0,
        skip: 20,
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
        weekFilter: [],
        planWeekFilter: [],
        planMonthFilter: [],
        monthFilter: [],
        datePickerFilter: [],
      };
    }
    case types.PROJECTVSSTATUSREPORT_FETCH_MASTER_DATA_SUCCESS:
      const masterData = action.payload?.result?.data?.lookupvalues;
      // const parsedMasterData = masterData.map((item) => ({
      //   ...item,
      //   mastervalues: JSON.parse(item.mastervalues),
      // }));
      const parsedMasterData =
        masterData &&
        masterData.map((item) => {
          console.log(typeof item.mastervalues);

          return {
            ...item,
            mastervalues:
              typeof item.mastervalues != "object"
                ? JSON.parse(item.mastervalues)
                : "[]",
          };
        });
      console.log(parsedMasterData);
      return {
        ...state,
        masterData: parsedMasterData,
      };

    // case types.PROJECTVSSTATUSREPORT_FETCH_MASTER_DATA_SUCCESS:
    // const masterData = action.payload?.result?.data;
    // return {
    //   ...state,
    //   masterData: masterData,
    // };

    case types.PROJECTVSSTATUSREPORT_FETCH_LIST_FIELDS_SUCCESS:
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
      console.log(listfields);
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
    case types.PROJECTVSSTATUSREPORT_FETCH_LIST_DATA_SUCCESS:
      console.log(action.payload?.result);
      return {
        ...state,
        listData: action.payload?.result,
        horizontalGroupByMaster: action.payload?.result?.groupbydetails || [], // Ensure it's an array
      };
    case types.PROJECTVSSTATUSREPORT_SET_PAGINATION:
      const { firstPageIndex, pageSize } = action.payload;
      console.log(firstPageIndex, pageSize);
      return {
        ...state,
        postData: {
          ...state.postData,
          start: firstPageIndex,
          //skip: pageSize,
        },
      };
    case types.PROJECTVSSTATUSREPORT_SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload,
        postData: {
          ...state.postData,
          start: 0,
          skip: action.payload,
        },
      };
    case types.PROJECTVSSTATUSREPORT_FETCH_DATASET_SUCCESS: {
      console.log(action.payload);
      const { isdefault } = action.payload?.result;
      const { columns } = action.payload?.result;
      const { filters } = action.payload?.result;
      const { groupby } = action.payload?.result;
      const { id } = action.payload?.result;
      const updateweekFilter = [];
      const updatePlanWeekFilter = [];
      const updatedatePickerFilter = [];
      const updateMonthFilter = [];
      const updatedPlanMonthFilter = [];
      console.log(state.username);
      console.log(filters);
      const newColumnMasterData = [...state.columnMasterData];
      console.log(newColumnMasterData);
      const newfilterMasterData = [...state.filterMasterData];
      const newgroupMasterData = [...state.groupMasterData];

      console.log(newgroupMasterData);

      let updatedHorizontalGroupBy = [];
      const updatedPostData = {
        ...state.postData,
        start: 0,
        skip: 20,
        orderby: "",
        orderbydir: "",
        filterparams: [],
      };

      let updatedSelectedFilters = [];
      let updatedAdditionalFilters = [];
      //  let updatedFilterParams = [...updatedPostData.filterparams];

      let DataForColumn = [];

      const currentplanYear = new Date().getFullYear();
      const currentplanWeek = getWeekNumber(new Date());

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
          const {
            name,
            visible,
            displayapiname,
            istitle,
            isdate,
            controltype,
            masterid,
            inlineeditable,
          } = sortedItem;
          DataForColumn.push({
            name,
            visible,
            displayapiname,
            istitle,
            isdate,
            controltype,
            masterid,
            inlineeditable,
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
        console.log(QuickFilterData);
        AddFilterData = newfilterMasterData?.map((item) => ({
          ...item,
          defaultvalue: "",
          defaultvalall: "",
          filtercategory: "additional",
        }));
      } else {
        const sl = filters.filter(
          (filter) =>
            filter.defaultvalue !== null &&
            filter.defaultvalue !== undefined &&
            filter.defaultvalue !== "" &&
            filter.filtercategory === "quick" &&
            filter.filtercontroltype === "textbox"
        );
        console.log(sl);
        const selectedQuickTextFiltersToAdd = filters
          .filter(
            (filter) =>
              filter.defaultvalue !== null &&
              filter.defaultvalue !== undefined &&
              filter.defaultvalue !== "" &&
              filter.filtercategory === "quick" &&
              filter.filtercontroltype === "textbox"
          )
          .map((item) => ({
            filterid: item.id,
            apiname: item.filterid,
            filtervalue: item.defaultvalue,
            condition: "OR",
            filtercategory: "quick",
            controltype: item.filtercontroltype,
          }));
        const selectedAddTextFiltersToAdd = filters
          .filter(
            (filter) =>
              filter.defaultvalue !== null &&
              filter.defaultvalue !== undefined &&
              filter.defaultvalue !== "" &&
              filter.filtercategory === "additional" &&
              filter.filtercontroltype === "textbox"
          )
          .map((item) => ({
            filterid: item.id,
            apiname: item.filterid,
            filtervalue: item.defaultvalue,
            condition: "OR",
            filtercategory: "additional",
            controltype: item.filtercontroltype,
            name: item.filterdisplayname,
          }));
        const selectedFiltersToAdd = filters
          .filter(
            (filter) =>
              filter.defaultvalue !== null &&
              filter.defaultvalue !== undefined &&
              filter.defaultvalue !== "" &&
              filter.filtercontroltype !== "textbox"
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
          ...selectedQuickTextFiltersToAdd,
          ...selectedAddTextFiltersToAdd,
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
          .map((item) => {
            console.log(item);
            return {
              filterid: item.id,
              apiname: item.filterid,
              filtervalue: item.defaultvalue,
              controltype: item.filtercontroltype,
              filtercategory: item.filtercategory ?? null,
              filtername: item.filterdisplayname ?? null,
            };
          });

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
            filtercategory: item.filtercategory ?? null,
            name: item.filterdisplayname ?? null,
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
              if (filterMatch.filtercontroltype === "textbox") {
                return {
                  ...item,
                  defaultvalue: filterMatch.defaultvalue,
                  defaultvalall: "",
                  ismapped: true,
                  filtercategory: "quick",
                };
              } else {
                return {
                  ...item,
                  defaultvalue: filterMatch.defaultvalue,
                  defaultvalall: filterMatch.defaultvalall,
                  ismapped: true,
                  filtercategory: "quick",
                };
              }
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
            if (addfilterMatch.filtercontroltype === "textbox") {
              return {
                ...item,
                defaultvalue: addfilterMatch.defaultvalue,
                defaultvalall: "",
                filtercategory: "additional",
              };
            } else {
              return {
                ...item,
                defaultvalue: addfilterMatch.defaultvalue,
                defaultvalall: addfilterMatch.defaultvalall,
                filtercategory: "additional",
              };
            }
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
      var userobj = [];
      const updatednewQuickFilterData = QuickFilterData?.map((filter) => {
        if (filter.name === "Resource" && filter.defaultvalall === "") {
          console.log(filter);
          const matchedMasterData = state.masterData?.find(
            (master) => master.masterid === filter.masterid
          );
          console.log(matchedMasterData);
          if (matchedMasterData) {
            const matchingOption = matchedMasterData.mastervalues.find(
              (value) =>
                value?.optionvalue?.toLowerCase() ===
                state.username?.toLowerCase()
            );
            console.log(matchingOption);
            if (matchingOption) {
              const newselectedFilterToAdd = {
                filterid: filter.id,
                apiname: filter.api_name,
                filtervalue: matchingOption.optionid,
                condition: "AND",
              };
              console.log(newselectedFilterToAdd);
              // Update filterparams with the created object
              updatedPostData.filterparams.push(newselectedFilterToAdd);
              updatedSelectedFilters.push(newselectedFilterToAdd);
              userobj.push(matchingOption);
              return {
                ...filter,
                defaultvalue: matchingOption.optionid,
                defaultvalall: matchingOption.optionid,
              };
            }
          }
        } else if (filter.name === "Resource" && filter.defaultvalall) {
          const matchedMasterData = state.masterData?.find(
            (master) => master.masterid === filter.masterid
          );
          console.log(matchedMasterData);
          console.log(filter.defaultvalall);
          if (matchedMasterData) {
            const matchingOption = matchedMasterData.mastervalues.find(
              (value) => value.optionid === filter.defaultvalall
            );
            console.log(matchingOption);
            userobj.push(matchingOption);
          }
        }

        // For other filters, return them as they are
        return filter;
      });
      console.log(updatednewQuickFilterData);
      console.log(userobj);
      console.log(AddFilterData);
      const sortedQuickFilter = updatednewQuickFilterData?.sort(
        (a, b) => a.seqno - b.seqno
      );
      console.log(sortedQuickFilter);

      const sortedAddFilter = AddFilterData?.sort((a, b) => a.seqno - b.seqno);

      const totalColumns = [...sortedColumn, ...sortedUnMappedColumns];
      console.log(totalColumns);

      let newgroupbydata = [];

      // if (groupby.length === 0) {
      //   // Case 2: If groupby length is 0
      //   newgroupbydata = newgroupMasterData.map((item) => ({
      //     ...item,
      //     defaultvalue: "",
      //   }));
      // } else {
      //   // Case 1: If groupby length is greater than 0
      //   newgroupbydata = newgroupMasterData
      //     .map((groupItem) => {
      //       const groupById = groupby.find((item) => item.id === groupItem.id);
      //       if (groupById) {
      //         console.log(groupItem.api_name);
      //         // Extract type, direction, and defaultvalue from groupby array
      //         const { type, direction, defaultvalue } = groupById;
      //         return {
      //           ...groupItem,
      //           type,
      //           direction,
      //           defaultvalue,
      //         };
      //       }
      //     })
      //     .filter(Boolean);
      // }

      console.log(id);
      const newdatasetArray = [...state.dataSetList];
      console.log(newdatasetArray);
      const applycustomWeekFilter = newdatasetArray.filter(
        (data) => data.datasetid === id
      );
      console.log(applycustomWeekFilter);
      if (applycustomWeekFilter) {
        const { owner } = applycustomWeekFilter[0];
        console.log(owner);
        if (owner === "system") {
          if (filters?.length > 0) {
            console.log(filters);
            let weekfilterdata = [];
            let planWeekFilterData = [];
            console.log(newfilterMasterData);
            console.log(filters);
            filters
              ?.filter((filter) => filter.filterid === "planweek")
              .forEach((filter) => {
                const sortedItem = newfilterMasterData.find(
                  (item) => item.id === filter.id
                );
                console.log(sortedItem);
                if (sortedItem) {
                  // If match found, collect required properties
                  const { masterid } = sortedItem;
                  planWeekFilterData.push({
                    masterid,
                    ismapped: true,
                    ...filter,
                  });
                }
              });
            console.log(planWeekFilterData);

            if (planWeekFilterData.length > 0) {
              console.log(state.masterData);
              var updatedMasterData = state.masterData?.map((masterItem) => {
                var weekFilterItem = planWeekFilterData.find(
                  (item) => item.masterid === masterItem.masterid
                );
                console.log(weekFilterItem);
                if (weekFilterItem && weekFilterItem.defaultvalue !== null) {
                  let startDate;
                  if (weekFilterItem.defaultvalue === "") {
                    const today = new Date();
                    const currentWeek = getWeek(today);
                    const currentYear = today.getFullYear();
                    startDate = getDateOfWeek(currentWeek, currentYear);
                  } else {
                    const [week, year] = weekFilterItem.defaultvalue.split("$");
                    startDate = getDateOfWeek(parseInt(week), parseInt(year));
                  }
                  console.log(startDate);
                  var updatedMastervalues = masterItem.mastervalues.map(
                    (value, index) => {
                      const date = new Date(startDate);
                      date.setDate(startDate.getDate() + index);
                      return { ...value, value: formatDate(date) };
                    }
                  );
                  console.log(updatedMastervalues);
                  return { ...masterItem, mastervalues: updatedMastervalues };
                }
                console.log(masterItem);
                return masterItem;
              });
              console.log(updatedMasterData);
            }

            const currentYear = new Date().getFullYear();
            const currentWeek = getWeekNumber(new Date());

            const selectedValue = currentWeek + "$" + currentYear;
            console.log(selectedValue);
            const selectedFiltersToAdd = filters
              .filter(
                (filter) =>
                  filter.filterid === "planweek" &&
                  filter.defaultvalue !== null &&
                  filter.defaultvalue !== undefined &&
                  filter.defaultvalue == ""
              )
              .map((item) => ({
                filterid: item.id,
                apiname: item.filterid,
                filtervalue: selectedValue,
                condition: "AND",
              }));
            const today = new Date();
            const groupValue = formatDate(today);
            console.log(groupValue);
            const defaultGroup = groupby
              .filter((item) => item.api_name === "workweek_Group")
              .map((item) => ({
                filterid: item.id,
                apiname: item.api_name,
                filtervalue:
                  item.defaultvalue === "" ? groupValue : item.defaultvalue,
                condition: "AND",
              }));
            console.log(defaultGroup);
            // Update filterparams and selectedFilters
            const updatedFilterParams = [
              ...updatedPostData.filterparams,
              ...selectedFiltersToAdd,
              ...defaultGroup,
            ];
            updatedPostData.filterparams = updatedFilterParams;
            updatedSelectedFilters.push(...selectedFiltersToAdd);

            const defaultweekFilter = filters
              .filter(
                (filter) =>
                  filter.filterid === "planweek" &&
                  filter.defaultvalue !== null &&
                  filter.defaultvalue !== undefined &&
                  filter.defaultvalue == ""
              )
              .map((item) => ({
                id: item.id,
                api_name: item.filterid,
                name: "Plan week",
                week: currentWeek,
                year: currentYear,
              }));
            updatePlanWeekFilter.push(...defaultweekFilter);

            const customWeekFilters = filters
              .filter(
                (filter) =>
                  filter.filterid === "planweek" &&
                  filter.defaultvalue !== null &&
                  filter.defaultvalue !== undefined &&
                  filter.defaultvalue !== ""
              )
              .map((item) => {
                const [week, year] = item.defaultvalue.split("$");
                return {
                  id: item.id,
                  api_name: item.filterid,
                  name: "Plan week",
                  week: parseInt(week),
                  year: parseInt(year),
                };
              });

            updatePlanWeekFilter.push(...customWeekFilters);
          }
          if (filters?.length > 0) {
            console.log(filters);
            let weekfilterdata = [];
            console.log(newfilterMasterData);
            console.log(filters);
            filters
              ?.filter((filter) => filter.filterid === "workweek")
              .forEach((filter) => {
                const sortedItem = newfilterMasterData.find(
                  (item) => item.id === filter.id
                );
                console.log(sortedItem);
                if (sortedItem) {
                  // If match found, collect required properties
                  const { masterid } = sortedItem;
                  weekfilterdata.push({
                    masterid,
                    ismapped: true,
                    ...filter,
                  });
                }
              });
            console.log(weekfilterdata);

            if (weekfilterdata.length > 0) {
              console.log(state.masterData);
              var updatedMasterData = state.masterData?.map((masterItem) => {
                var weekFilterItem = weekfilterdata.find(
                  (item) => item.masterid === masterItem.masterid
                );
                console.log(weekFilterItem);
                if (weekFilterItem && weekFilterItem.defaultvalue !== null) {
                  let startDate;
                  if (weekFilterItem.defaultvalue === "") {
                    const today = new Date();
                    const currentWeek = getWeek(today);
                    const currentYear = today.getFullYear();
                    startDate = getDateOfWeek(currentWeek, currentYear);
                  } else {
                    const [week, year] = weekFilterItem.defaultvalue.split("$");
                    startDate = getDateOfWeek(parseInt(week), parseInt(year));
                  }
                  console.log(startDate);
                  var updatedMastervalues = masterItem.mastervalues.map(
                    (value, index) => {
                      const date = new Date(startDate);
                      date.setDate(startDate.getDate() + index);
                      return { ...value, value: formatDate(date) };
                    }
                  );
                  console.log(updatedMastervalues);
                  return { ...masterItem, mastervalues: updatedMastervalues };
                }
                console.log(masterItem);
                return masterItem;
              });
              console.log(updatedMasterData);
            }

            const currentYear = new Date().getFullYear();
            const currentWeek = getWeekNumber(new Date());

            const selectedValue = currentWeek + "$" + currentYear;
            console.log(selectedValue);
            const selectedFiltersToAdd = filters
              .filter(
                (filter) =>
                  filter.filterid === "workweek" &&
                  filter.defaultvalue !== null &&
                  filter.defaultvalue !== undefined &&
                  filter.defaultvalue == ""
              )
              .map((item) => ({
                filterid: item.id,
                apiname: item.filterid,
                filtervalue: selectedValue,
                condition: "AND",
              }));
            const today = new Date();
            const groupValue = formatDate(today);
            console.log(groupValue);
            const defaultGroup = groupby
              .filter((item) => item.api_name === "workweek_Group")
              .map((item) => ({
                filterid: item.id,
                apiname: item.api_name,
                filtervalue:
                  item.defaultvalue === "" ? groupValue : item.defaultvalue,
                condition: "AND",
              }));
            console.log(defaultGroup);
            // Update filterparams and selectedFilters
            const updatedFilterParams = [
              ...updatedPostData.filterparams,
              ...selectedFiltersToAdd,
              ...defaultGroup,
            ];
            updatedPostData.filterparams = updatedFilterParams;
            updatedSelectedFilters.push(...selectedFiltersToAdd);

            const defaultweekFilter = filters
              .filter(
                (filter) =>
                  filter.filterid === "workweek" &&
                  filter.defaultvalue !== null &&
                  filter.defaultvalue !== undefined &&
                  filter.defaultvalue == ""
              )
              .map((item) => ({
                id: item.id,
                api_name: item.filterid,
                name: "Work week",
                week: currentWeek,
                year: currentYear,
              }));
            updateweekFilter.push(...defaultweekFilter);

            const customWeekFilters = filters
              .filter(
                (filter) =>
                  filter.filterid === "workweek" &&
                  filter.defaultvalue !== null &&
                  filter.defaultvalue !== undefined &&
                  filter.defaultvalue !== ""
              )
              .map((item) => {
                const [week, year] = item.defaultvalue.split("$");
                return {
                  id: item.id,
                  api_name: item.filterid,
                  name: "Work week",
                  week: parseInt(week),
                  year: parseInt(year),
                };
              });

            updateweekFilter.push(...customWeekFilters);
          }
          if (filters?.length > 0) {
            let monthFilterData = [];
            let planMonthFilterData = [];

            filters
              ?.filter((filter) => filter.filterid === "planmonth")
              .forEach((filter) => {
                const sortedItem = newfilterMasterData.find(
                  (item) => item.id === filter.id
                );
                console.log(sortedItem);
                if (sortedItem) {
                  // If match found, collect required properties
                  const { masterid } = sortedItem;
                  planMonthFilterData.push({
                    masterid,
                    ismapped: true,
                    ...filter,
                  });
                }
              });
            console.log(planMonthFilterData);

            if (planMonthFilterData.length > 0) {
              console.log(state.masterData);
              var updatedMasterData = state.masterData?.map((masterItem) => {
                var monthFilterItem = planMonthFilterData.find(
                  (item) => item.masterid === masterItem.masterid
                );
                console.log(monthFilterItem);
                if (monthFilterItem && monthFilterItem.defaultvalue !== null) {
                  let startDate;
                  if (monthFilterItem.defaultvalue === "") {
                    const today = new Date();
                    const currentWeek = getWeek(today);
                    const currentYear = today.getFullYear();
                    startDate = getDateOfWeek(currentWeek, currentYear);
                  } else {
                    const [week, year] =
                      monthFilterItem.defaultvalue.split("$");
                    startDate = getDateOfWeek(parseInt(week), parseInt(year));
                  }
                  console.log(startDate);
                  var updatedMastervalues = masterItem.mastervalues.map(
                    (value, index) => {
                      const date = new Date(startDate);
                      date.setDate(startDate.getDate() + index);
                      return { ...value, value: formatDate(date) };
                    }
                  );
                  console.log(updatedMastervalues);
                  return { ...masterItem, mastervalues: updatedMastervalues };
                }
                console.log(masterItem);
                return masterItem;
              });
              console.log(updatedMasterData);
            }

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = new Date().getFullYear();
            // const currentWeek = getWeekNumber(new Date());

            const selectedValue = currentMonth + "$" + currentYear;
            console.log(selectedValue);
            const selectedFiltersToAdd = filters
              .filter(
                (filter) =>
                  filter.filterid === "planmonth" &&
                  filter.defaultvalue !== null &&
                  filter.defaultvalue !== undefined &&
                  filter.defaultvalue == ""
              )
              .map((item) => ({
                filterid: item.id,
                apiname: item.filterid,
                filtervalue: selectedValue,
                condition: "AND",
              }));
            // const today = new Date();
            // const groupValue = formatDate(today);
            // console.log(groupValue);
            // const defaultGroup = groupby
            //   .filter((item) => item.api_name === "workweek_Group")
            //   .map((item) => ({
            //     filterid: item.id,
            //     apiname: item.api_name,
            //     filtervalue:
            //       item.defaultvalue === "" ? groupValue : item.defaultvalue,
            //     condition: "AND",
            //   }));
            // console.log(defaultGroup);
            // Update filterparams and selectedFilters
            const updatedFilterParams = [
              ...updatedPostData.filterparams,
              ...selectedFiltersToAdd,
              // ...defaultGroup,
            ];
            updatedPostData.filterparams = updatedFilterParams;
            updatedSelectedFilters.push(...selectedFiltersToAdd);

            const defaultMonthFilter = filters
              .filter(
                (filter) =>
                  filter.filterid === "planmonth" &&
                  filter.defaultvalue !== null &&
                  filter.defaultvalue !== undefined &&
                  filter.defaultvalue == ""
              )
              .map((item) => ({
                id: item.id,
                api_name: item.filterid,
                name: "Plan Month ",
                month: currentMonth,
                year: currentYear,
              }));
            updatedPlanMonthFilter.push(...defaultMonthFilter);

            const customMonthFilter = filters
              .filter(
                (filter) =>
                  filter.filterid === "planmonth" &&
                  filter.defaultvalue !== null &&
                  filter.defaultvalue !== undefined &&
                  filter.defaultvalue !== ""
              )
              .map((item) => {
                const [month, year] = item.defaultvalue.split("$");
                return {
                  id: item.id,
                  api_name: item.filterid,
                  name: "Plan Month",
                  month: parseInt(month),
                  year: parseInt(year),
                };
              });

            updatedPlanMonthFilter.push(...customMonthFilter);
          }
          if (filters?.length > 0) {
            let monthFilterData = [];

            filters
              ?.filter((filter) => filter.filterid === "workmonth")
              .forEach((filter) => {
                const sortedItem = newfilterMasterData.find(
                  (item) => item.id === filter.id
                );
                console.log(sortedItem);
                if (sortedItem) {
                  // If match found, collect required properties
                  const { masterid } = sortedItem;
                  monthFilterData.push({
                    masterid,
                    ismapped: true,
                    ...filter,
                  });
                }
              });
            console.log(monthFilterData);

            if (monthFilterData.length > 0) {
              console.log(state.masterData);
              var updatedMasterData = state.masterData?.map((masterItem) => {
                var monthFilterItem = monthFilterData.find(
                  (item) => item.masterid === masterItem.masterid
                );
                console.log(monthFilterItem);
                if (monthFilterItem && monthFilterItem.defaultvalue !== null) {
                  let startDate;
                  if (monthFilterItem.defaultvalue === "") {
                    const today = new Date();
                    const currentWeek = getWeek(today);
                    const currentYear = today.getFullYear();
                    startDate = getDateOfWeek(currentWeek, currentYear);
                  } else {
                    const [week, year] =
                      monthFilterItem.defaultvalue.split("$");
                    startDate = getDateOfWeek(parseInt(week), parseInt(year));
                  }
                  console.log(startDate);
                  var updatedMastervalues = masterItem.mastervalues.map(
                    (value, index) => {
                      const date = new Date(startDate);
                      date.setDate(startDate.getDate() + index);
                      return { ...value, value: formatDate(date) };
                    }
                  );
                  console.log(updatedMastervalues);
                  return { ...masterItem, mastervalues: updatedMastervalues };
                }
                console.log(masterItem);
                return masterItem;
              });
              console.log(updatedMasterData);
            }

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = new Date().getFullYear();
            // const currentWeek = getWeekNumber(new Date());

            const selectedValue = currentMonth + "$" + currentYear;
            console.log(selectedValue);
            const selectedFiltersToAdd = filters
              .filter(
                (filter) =>
                  filter.filterid === "workmonth" &&
                  filter.defaultvalue !== null &&
                  filter.defaultvalue !== undefined &&
                  filter.defaultvalue == ""
              )
              .map((item) => ({
                filterid: item.id,
                apiname: item.filterid,
                filtervalue: selectedValue,
                condition: "AND",
              }));
            // const today = new Date();
            // const groupValue = formatDate(today);
            // console.log(groupValue);
            // const defaultGroup = groupby
            //   .filter((item) => item.api_name === "workweek_Group")
            //   .map((item) => ({
            //     filterid: item.id,
            //     apiname: item.api_name,
            //     filtervalue:
            //       item.defaultvalue === "" ? groupValue : item.defaultvalue,
            //     condition: "AND",
            //   }));
            // console.log(defaultGroup);
            // Update filterparams and selectedFilters
            const updatedFilterParams = [
              ...updatedPostData.filterparams,
              ...selectedFiltersToAdd,
              // ...defaultGroup,
            ];
            updatedPostData.filterparams = updatedFilterParams;
            updatedSelectedFilters.push(...selectedFiltersToAdd);

            const defaultMonthFilter = filters
              .filter(
                (filter) =>
                  filter.filterid === "workmonth" &&
                  filter.defaultvalue !== null &&
                  filter.defaultvalue !== undefined &&
                  filter.defaultvalue == ""
              )
              .map((item) => ({
                id: item.id,
                api_name: item.filterid,
                name: "Work Month",
                month: currentMonth,
                year: currentYear,
              }));
            updateMonthFilter.push(...defaultMonthFilter);

            const customMonthFilter = filters
              .filter(
                (filter) =>
                  filter.filterid === "workmonth" &&
                  filter.defaultvalue !== null &&
                  filter.defaultvalue !== undefined &&
                  filter.defaultvalue !== ""
              )
              .map((item) => {
                const [month, year] = item.defaultvalue.split("$");
                return {
                  id: item.id,
                  api_name: item.filterid,
                  name: "Work Month",
                  month: parseInt(month),
                  year: parseInt(year),
                };
              });

            updateMonthFilter.push(...customMonthFilter);
          }
        } else {
          if (filters?.length > 0) {
            let weekfilterdata = [];
            filters
              ?.filter((filter) => filter.filterid === "workweek")
              .forEach((filter) => {
                const sortedItem = newfilterMasterData.find(
                  (item) => item.id === filter.id
                );
                console.log(sortedItem);
                if (sortedItem) {
                  // If match found, collect required properties
                  const { masterid } = sortedItem;
                  weekfilterdata.push({
                    masterid,
                    ismapped: true,
                    ...filter,
                  });
                }
              });
            console.log(weekfilterdata);

            if (weekfilterdata.length > 0) {
              console.log(state.masterData);
              var updatedMasterData = state.masterData?.map((masterItem) => {
                var weekFilterItem = weekfilterdata.find(
                  (item) => item.masterid === masterItem.masterid
                );
                console.log(weekFilterItem);
                if (weekFilterItem && weekFilterItem.defaultvalue !== null) {
                  let startDate;
                  if (weekFilterItem.defaultvalue === "") {
                    const today = new Date();
                    const currentWeek = getWeek(today);
                    const currentYear = today.getFullYear();
                    startDate = getDateOfWeek(currentWeek, currentYear);
                  } else {
                    const [week, year] = weekFilterItem.defaultvalue.split("$");
                    startDate = getDateOfWeek(parseInt(week), parseInt(year));
                  }
                  console.log(startDate);
                  var updatedMastervalues = masterItem.mastervalues.map(
                    (value, index) => {
                      const date = new Date(startDate);
                      date.setDate(startDate.getDate() + index);
                      return { ...value, value: formatDate(date) };
                    }
                  );
                  console.log(updatedMastervalues);
                  return { ...masterItem, mastervalues: updatedMastervalues };
                }
                console.log(masterItem);
                return masterItem;
              });
              console.log(updatedMasterData);
            }

            const currentYear = new Date().getFullYear();
            const currentWeek = getWeekNumber(new Date());

            const selectedValue = currentWeek + "$" + currentYear;
            console.log(selectedValue);
            // const selectedFiltersToAdd = filters
            //   .filter(
            //     (filter) =>
            //       filter.filterid === "workweek" &&
            //       filter.defaultvalue !== null &&
            //       filter.defaultvalue !== undefined &&
            //       filter.defaultvalue == ""
            //   )
            //   .map((item) => ({
            //     filterid: item.id,
            //     apiname: item.filterid,
            //     filtervalue: selectedValue,
            //     condition: "AND",
            //   }));
            const today = new Date();
            const groupValue = formatDate(today);
            console.log(groupValue);
            const defaultGroup = groupby
              .filter((item) => item.api_name === "workweek_Group")
              .map((item) => ({
                filterid: item.id,
                apiname: item.api_name,
                filtervalue:
                  item.defaultvalue === "" ? groupValue : item.defaultvalue,
                condition: "AND",
              }));
            console.log(defaultGroup);
            // Update filterparams and selectedFilters
            const updatedFilterParams = [
              ...updatedPostData.filterparams,
              // ...selectedFiltersToAdd,
              ...defaultGroup,
            ];
            updatedPostData.filterparams = updatedFilterParams;
            // updatedSelectedFilters.push(...selectedFiltersToAdd);

            // const defaultweekFilter = filters
            //   .filter(
            //     (filter) =>
            //       filter.filterid === "workweek" &&
            //       filter.defaultvalue !== null &&
            //       filter.defaultvalue !== undefined &&
            //       filter.defaultvalue == ""
            //   )
            //   .map((item) => ({
            //     id: item.id,
            //     api_name: item.filterid,
            //     name: "Plan week",
            //     week: currentWeek,
            //     year: currentYear,
            //   }));
            // updateweekFilter.push(...defaultweekFilter);

            const customWeekFilters = filters
              .filter(
                (filter) =>
                  filter.filterid === "workweek" &&
                  filter.defaultvalue !== null &&
                  filter.defaultvalue !== undefined &&
                  filter.defaultvalue !== ""
              )
              .map((item) => {
                const [week, year] = item.defaultvalue.split("$");
                return {
                  id: item.id,
                  api_name: item.filterid,
                  name: "Work week",
                  week: parseInt(week),
                  year: parseInt(year),
                };
              });

            updateweekFilter.push(...customWeekFilters);
          }

          if (filters?.length > 0) {
            let monthFilterData = [];

            filters
              ?.filter((filter) => filter.filterid === "workmonth")
              .forEach((filter) => {
                const sortedItem = newfilterMasterData.find(
                  (item) => item.id === filter.id
                );
                console.log(sortedItem);
                if (sortedItem) {
                  // If match found, collect required properties
                  const { masterid } = sortedItem;
                  monthFilterData.push({
                    masterid,
                    ismapped: true,
                    ...filter,
                  });
                }
              });
            console.log(monthFilterData);

            if (monthFilterData.length > 0) {
              console.log(state.masterData);
              var updatedMasterData = state.masterData?.map((masterItem) => {
                var monthFilterItem = monthFilterData.find(
                  (item) => item.masterid === masterItem.masterid
                );
                console.log(monthFilterItem);
                if (monthFilterItem && monthFilterItem.defaultvalue !== null) {
                  let startDate;
                  if (monthFilterItem.defaultvalue === "") {
                    const today = new Date();
                    const currentWeek = getWeek(today);
                    const currentYear = today.getFullYear();
                    startDate = getDateOfWeek(currentWeek, currentYear);
                  } else {
                    const [week, year] =
                      monthFilterItem.defaultvalue.split("$");
                    startDate = getDateOfWeek(parseInt(week), parseInt(year));
                  }
                  console.log(startDate);
                  var updatedMastervalues = masterItem.mastervalues.map(
                    (value, index) => {
                      const date = new Date(startDate);
                      date.setDate(startDate.getDate() + index);
                      return { ...value, value: formatDate(date) };
                    }
                  );
                  console.log(updatedMastervalues);
                  return { ...masterItem, mastervalues: updatedMastervalues };
                }
                console.log(masterItem);
                return masterItem;
              });
              console.log(updatedMasterData);
            }

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = new Date().getFullYear();
            // const currentWeek = getWeekNumber(new Date());

            const selectedValue = currentMonth + "$" + currentYear;
            console.log(selectedValue);
            // const selectedFiltersToAdd = filters
            //   .filter(
            //     (filter) =>
            //       filter.filterid === "workmonth" &&
            //       filter.defaultvalue !== null &&
            //       filter.defaultvalue !== undefined &&
            //       filter.defaultvalue == ""
            //   )
            //   .map((item) => ({
            //     filterid: item.id,
            //     apiname: item.filterid,
            //     filtervalue: selectedValue,
            //     condition: "AND",
            //   }));
            // const today = new Date();
            // const groupValue = formatDate(today);
            // console.log(groupValue);
            // const defaultGroup = groupby
            //   .filter((item) => item.api_name === "workweek_Group")
            //   .map((item) => ({
            //     filterid: item.id,
            //     apiname: item.api_name,
            //     filtervalue:
            //       item.defaultvalue === "" ? groupValue : item.defaultvalue,
            //     condition: "AND",
            //   }));
            // console.log(defaultGroup);
            // Update filterparams and selectedFilters
            const updatedFilterParams = [
              ...updatedPostData.filterparams,
              // ...selectedFiltersToAdd,
              // ...defaultGroup,
            ];
            updatedPostData.filterparams = updatedFilterParams;
            // updatedSelectedFilters.push(...selectedFiltersToAdd);

            // const defaultMonthFilter = filters
            //   .filter(
            //     (filter) =>
            //       filter.filterid === "workmonth" &&
            //       filter.defaultvalue !== null &&
            //       filter.defaultvalue !== undefined &&
            //       filter.defaultvalue == ""
            //   )
            //   .map((item) => ({
            //     id: item.id,
            //     api_name: item.filterid,
            //     name: "Month Filter",
            //     month: currentMonth,
            //     year: currentYear,
            //   }));
            // updateMonthFilter.push(...defaultMonthFilter);

            const customMonthFilter = filters
              .filter(
                (filter) =>
                  filter.filterid === "workmonth" &&
                  filter.defaultvalue !== null &&
                  filter.defaultvalue !== undefined &&
                  filter.defaultvalue !== ""
              )
              .map((item) => {
                const [month, year] = item.defaultvalue.split("$");
                return {
                  id: item.id,
                  api_name: item.filterid,
                  name: "Work Month",
                  month: parseInt(month),
                  year: parseInt(year),
                };
              });

            updateMonthFilter.push(...customMonthFilter);
          }

          if (filters?.length > 0) {
            let weekfilterdata = [];
            let planWeekFilterData = [];
            filters
              ?.filter((filter) => filter.filterid === "planweek")
              .forEach((filter) => {
                const sortedItem = newfilterMasterData.find(
                  (item) => item.id === filter.id
                );
                console.log(sortedItem);
                if (sortedItem) {
                  // If match found, collect required properties
                  const { masterid } = sortedItem;
                  planWeekFilterData.push({
                    masterid,
                    ismapped: true,
                    ...filter,
                  });
                }
              });
            console.log(planWeekFilterData);

            if (planWeekFilterData.length > 0) {
              console.log(state.masterData);
              var updatedMasterData = state.masterData?.map((masterItem) => {
                var weekFilterItem = planWeekFilterData.find(
                  (item) => item.masterid === masterItem.masterid
                );
                console.log(weekFilterItem);
                if (weekFilterItem && weekFilterItem.defaultvalue !== null) {
                  let startDate;
                  if (weekFilterItem.defaultvalue === "") {
                    const today = new Date();
                    const currentWeek = getWeek(today);
                    const currentYear = today.getFullYear();
                    startDate = getDateOfWeek(currentWeek, currentYear);
                  } else {
                    const [week, year] = weekFilterItem.defaultvalue.split("$");
                    startDate = getDateOfWeek(parseInt(week), parseInt(year));
                  }
                  console.log(startDate);
                  var updatedMastervalues = masterItem.mastervalues.map(
                    (value, index) => {
                      const date = new Date(startDate);
                      date.setDate(startDate.getDate() + index);
                      return { ...value, value: formatDate(date) };
                    }
                  );
                  console.log(updatedMastervalues);
                  return { ...masterItem, mastervalues: updatedMastervalues };
                }
                console.log(masterItem);
                return masterItem;
              });
              console.log(updatedMasterData);
            }

            const currentYear = new Date().getFullYear();
            const currentWeek = getWeekNumber(new Date());

            const selectedValue = currentWeek + "$" + currentYear;
            console.log(selectedValue);
            // const selectedFiltersToAdd = filters
            //   .filter(
            //     (filter) =>
            //       filter.filterid === "workweek" &&
            //       filter.defaultvalue !== null &&
            //       filter.defaultvalue !== undefined &&
            //       filter.defaultvalue == ""
            //   )
            //   .map((item) => ({
            //     filterid: item.id,
            //     apiname: item.filterid,
            //     filtervalue: selectedValue,
            //     condition: "AND",
            //   }));
            const today = new Date();
            const groupValue = formatDate(today);
            console.log(groupValue);
            const defaultGroup = groupby
              .filter((item) => item.api_name === "workweek_Group")
              .map((item) => ({
                filterid: item.id,
                apiname: item.api_name,
                filtervalue:
                  item.defaultvalue === "" ? groupValue : item.defaultvalue,
                condition: "AND",
              }));
            console.log(defaultGroup);
            // Update filterparams and selectedFilters
            const updatedFilterParams = [
              ...updatedPostData.filterparams,
              // ...selectedFiltersToAdd,
              ...defaultGroup,
            ];
            updatedPostData.filterparams = updatedFilterParams;
            // updatedSelectedFilters.push(...selectedFiltersToAdd);

            // const defaultweekFilter = filters
            //   .filter(
            //     (filter) =>
            //       filter.filterid === "workweek" &&
            //       filter.defaultvalue !== null &&
            //       filter.defaultvalue !== undefined &&
            //       filter.defaultvalue == ""
            //   )
            //   .map((item) => ({
            //     id: item.id,
            //     api_name: item.filterid,
            //     name: "Plan week",
            //     week: currentWeek,
            //     year: currentYear,
            //   }));
            // updateweekFilter.push(...defaultweekFilter);

            const customWeekFilters = filters
              .filter(
                (filter) =>
                  filter.filterid === "planweek" &&
                  filter.defaultvalue !== null &&
                  filter.defaultvalue !== undefined &&
                  filter.defaultvalue !== ""
              )
              .map((item) => {
                const [week, year] = item.defaultvalue.split("$");
                return {
                  id: item.id,
                  api_name: item.filterid,
                  name: "Plan week",
                  week: parseInt(week),
                  year: parseInt(year),
                };
              });

            updatePlanWeekFilter.push(...customWeekFilters);
          }
          if (filters?.length > 0) {
            let monthFilterData = [];
            let planMonthFilterData = [];

            filters
              ?.filter((filter) => filter.filterid === "planmonth")
              .forEach((filter) => {
                const sortedItem = newfilterMasterData.find(
                  (item) => item.id === filter.id
                );
                console.log(sortedItem);
                if (sortedItem) {
                  // If match found, collect required properties
                  const { masterid } = sortedItem;
                  planMonthFilterData.push({
                    masterid,
                    ismapped: true,
                    ...filter,
                  });
                }
              });
            console.log(planMonthFilterData);

            if (planMonthFilterData.length > 0) {
              console.log(state.masterData);
              var updatedMasterData = state.masterData?.map((masterItem) => {
                var monthFilterItem = planMonthFilterData.find(
                  (item) => item.masterid === masterItem.masterid
                );
                console.log(monthFilterItem);
                if (monthFilterItem && monthFilterItem.defaultvalue !== null) {
                  let startDate;
                  if (monthFilterItem.defaultvalue === "") {
                    const today = new Date();
                    const currentWeek = getWeek(today);
                    const currentYear = today.getFullYear();
                    startDate = getDateOfWeek(currentWeek, currentYear);
                  } else {
                    const [week, year] =
                      monthFilterItem.defaultvalue.split("$");
                    startDate = getDateOfWeek(parseInt(week), parseInt(year));
                  }
                  console.log(startDate);
                  var updatedMastervalues = masterItem.mastervalues.map(
                    (value, index) => {
                      const date = new Date(startDate);
                      date.setDate(startDate.getDate() + index);
                      return { ...value, value: formatDate(date) };
                    }
                  );
                  console.log(updatedMastervalues);
                  return { ...masterItem, mastervalues: updatedMastervalues };
                }
                console.log(masterItem);
                return masterItem;
              });
              console.log(updatedMasterData);
            }

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = new Date().getFullYear();
            // const currentWeek = getWeekNumber(new Date());

            const selectedValue = currentMonth + "$" + currentYear;
            console.log(selectedValue);
            // const selectedFiltersToAdd = filters
            //   .filter(
            //     (filter) =>
            //       filter.filterid === "workmonth" &&
            //       filter.defaultvalue !== null &&
            //       filter.defaultvalue !== undefined &&
            //       filter.defaultvalue == ""
            //   )
            //   .map((item) => ({
            //     filterid: item.id,
            //     apiname: item.filterid,
            //     filtervalue: selectedValue,
            //     condition: "AND",
            //   }));
            // const today = new Date();
            // const groupValue = formatDate(today);
            // console.log(groupValue);
            // const defaultGroup = groupby
            //   .filter((item) => item.api_name === "workweek_Group")
            //   .map((item) => ({
            //     filterid: item.id,
            //     apiname: item.api_name,
            //     filtervalue:
            //       item.defaultvalue === "" ? groupValue : item.defaultvalue,
            //     condition: "AND",
            //   }));
            // console.log(defaultGroup);
            // Update filterparams and selectedFilters
            const updatedFilterParams = [
              ...updatedPostData.filterparams,
              // ...selectedFiltersToAdd,
              // ...defaultGroup,
            ];
            updatedPostData.filterparams = updatedFilterParams;
            // updatedSelectedFilters.push(...selectedFiltersToAdd);

            // const defaultMonthFilter = filters
            //   .filter(
            //     (filter) =>
            //       filter.filterid === "workmonth" &&
            //       filter.defaultvalue !== null &&
            //       filter.defaultvalue !== undefined &&
            //       filter.defaultvalue == ""
            //   )
            //   .map((item) => ({
            //     id: item.id,
            //     api_name: item.filterid,
            //     name: "Month Filter",
            //     month: currentMonth,
            //     year: currentYear,
            //   }));
            // updateMonthFilter.push(...defaultMonthFilter);

            const customMonthFilter = filters
              .filter(
                (filter) =>
                  filter.filterid === "planmonth" &&
                  filter.defaultvalue !== null &&
                  filter.defaultvalue !== undefined &&
                  filter.defaultvalue !== ""
              )
              .map((item) => {
                const [month, year] = item.defaultvalue.split("$");
                return {
                  id: item.id,
                  api_name: item.filterid,
                  name: "Plan Month",
                  month: parseInt(month),
                  year: parseInt(year),
                };
              });

            updatedPlanMonthFilter.push(...customMonthFilter);
          }
        }
      }

      if (filters.length > 0) {
        filters
          ?.filter((filter) => filter.filterid === "column30")
          .forEach((filter) => {
            if (filter.defaultvalue === "") {
              const today = new Date();
              const selectedValue = formatDate(today);
              console.log(selectedValue);
              const tempDate = formatDateday(new Date(), "EEE, do MMM, yyyy");
              const selectedFiltersToAdd = filters
                .filter(
                  (filter) =>
                    filter.filterid === "column30" &&
                    filter.defaultvalue !== null &&
                    filter.defaultvalue !== undefined &&
                    filter.defaultvalue == ""
                )
                .map((item) => ({
                  filterid: item.id,
                  apiname: item.filterid,
                  filtervalue: selectedValue,
                  condition: "AND",
                }));

              const updatedFilterParams = [
                ...updatedPostData.filterparams,
                ...selectedFiltersToAdd,
              ];
              updatedPostData.filterparams = updatedFilterParams;
              updatedSelectedFilters.push(...selectedFiltersToAdd);

              const defaultDatepicker = filters
                .filter(
                  (filter) =>
                    filter.filterid === "column30" &&
                    filter.defaultvalue !== null &&
                    filter.defaultvalue !== undefined &&
                    filter.defaultvalue == ""
                )
                .map((item) => ({
                  id: item.id,
                  api_name: item.filterid,
                  name: "Due date",
                  date: tempDate,
                  formattedDate: selectedValue,
                }));
              updatedatePickerFilter.push(...defaultDatepicker);
            } else {
              const tempDate = formatdefaultDate(
                filter.defaultvalue,
                "EEE, do MMM, yyyy"
              );
              console.log(tempDate);
              const defaultDatepicker = filters
                .filter(
                  (filter) =>
                    filter.filterid === "column30" &&
                    filter.defaultvalue !== null &&
                    filter.defaultvalue !== undefined
                )
                .map((item) => ({
                  id: item.id,
                  api_name: item.filterid,
                  name: "Due date",
                  date: tempDate,
                  formattedDate: item.defaultvalue,
                }));
              updatedatePickerFilter.push(...defaultDatepicker);
            }
          });
      }

      console.log(groupby);
      if (groupby.length > 0) {
        const defaultGroup = groupby
          .filter((item) => item.api_name === "column11")
          .map((item) => {
            console.log("123");
            const masterMatch = state.masterData?.find(
              (data) => data.masterid === item.masterid
            );
            console.log(masterMatch);
            const groupByMastervalues = masterMatch?.mastervalues;
            const sortedMastervalues = groupByMastervalues
              ? [...groupByMastervalues].sort((a, b) => {
                  if (item.direction === "asc") {
                    return a?.optionvalue?.localeCompare(b?.optionvalue);
                  } else {
                    return b?.optionvalue?.localeCompare(a?.optionvalue);
                  }
                })
              : null;
            console.log(sortedMastervalues);

            return {
              filterid: item.id,
              apiname: item.api_name,
              filtervalue:
                item.defaultvalue === ""
                  ? sortedMastervalues[0]?.optionid
                  : item.defaultvalue,
              condition: "AND",
            };
          });

        const updatedFilterParams = [
          ...updatedPostData.filterparams,
          ...defaultGroup,
        ];
        console.log(updatedFilterParams);
        updatedPostData.filterparams = updatedFilterParams;
      }

      if (groupby.length > 0) {
        if (groupby.some((item) => item.api_name === "PlanTimeline")) {
          updatedHorizontalGroupBy = groupby
            .filter((item) => item.api_name === "PlanTimeline")
            .map((item) => {
              console.log(state.masterData);
              const masterMatch = state.masterData?.find(
                (data) => data.masterid === item.masterid
              );
              console.log(masterMatch);
              const groupByMastervalues = masterMatch?.mastervalues;
              const sortedMastervalues = groupByMastervalues
                ? [...groupByMastervalues].sort((a, b) => {
                    if (item.direction === "asc") {
                      return a?.optionvalue?.localeCompare(b?.optionvalue);
                    } else {
                      return b?.optionvalue?.localeCompare(a?.optionvalue);
                    }
                  })
                : null;
              console.log(sortedMastervalues);

              return {
                api_name: item.api_name,
                masterid: item.masterid,
                mastervalues: sortedMastervalues,
                value: item.defaultvalue === "" ? "" : item.defaultvalue,
                id: item.id,
              };
            });
          console.log(updatedHorizontalGroupBy);
        }

        if (groupby.some((item) => item.api_name === "column6")) {
          updatedHorizontalGroupBy = groupby
            .filter((item) => item.api_name === "column6")
            .map((item) => {
              console.log(state.masterData);
              const masterMatch = state.masterData?.find(
                (data) => data.masterid === item.masterid
              );
              console.log(masterMatch);
              const groupByMastervalues = masterMatch?.mastervalues;
              const sortedMastervalues = groupByMastervalues
                ? [...groupByMastervalues].sort((a, b) => {
                    if (item.direction === "asc") {
                      return a?.optionvalue?.localeCompare(b?.optionvalue);
                    } else {
                      return b?.optionvalue?.localeCompare(a?.optionvalue);
                    }
                  })
                : null;
              const allOpentask = [
                { optionid: "0", optionvalue: "All Open Task" },
              ];
              console.log(sortedMastervalues);
              // const combinedArray = [...allOpentask, ...sortedMastervalues];
              const combinedArray = [...sortedMastervalues];
              console.log(combinedArray);
              return {
                api_name: item.api_name,
                masterid: item.masterid,
                mastervalues: combinedArray,
                value: item.defaultvalue === "" ? "0" : item.defaultvalue,
                id: item.id,
              };
            });
          console.log(updatedHorizontalGroupBy);
        }

        if (groupby.some((item) => item.api_name === "column11")) {
          updatedHorizontalGroupBy = groupby
            .filter((item) => item.api_name === "column11")
            .map((item) => {
              console.log(state.masterData);
              const masterMatch = state.masterData?.find(
                (data) => data.masterid === item.masterid
              );
              console.log(masterMatch);
              const groupByMastervalues = masterMatch?.mastervalues;
              const sortedMastervalues = groupByMastervalues
                ? [...groupByMastervalues].sort((a, b) => {
                    return a?.optionvalue?.localeCompare(b?.optionvalue);
                    // if (item.direction === "asc") {
                    //   return a?.optionvalue?.localeCompare(b?.optionvalue);
                    // } else {
                    //   return b?.optionvalue?.localeCompare(a?.optionvalue);
                    // }
                  })
                : null;
              console.log(sortedMastervalues);
              const combinedArray = [...sortedMastervalues];
              console.log(combinedArray);
              return {
                api_name: item.api_name,
                masterid: item.masterid,
                mastervalues: combinedArray,
                value:
                  item.defaultvalue === ""
                    ? combinedArray[0]?.optionid
                    : item.defaultvalue,
                id: item.id,
              };
            });
          console.log(updatedHorizontalGroupBy);
        }
      }

      console.log(updatedPostData);
      console.log(updatedHorizontalGroupBy);

      if (updatedMasterData !== undefined) {
        return {
          ...state,
          masterData: updatedMasterData,
          dataSet: action.payload.result,
          dataForColumn: sortedColumn,
          unMappedColumns: sortedUnMappedColumns,
          quickFilterData: sortedQuickFilter,
          addFilterData: sortedAddFilter,
          totalColumns: totalColumns,
          postData: updatedPostData,
          selectedFilters: updatedSelectedFilters,
          additionalFilters: updatedAdditionalFilters,
          // newgroupbydata: newgroupbydata,
          horizontalGroupBy: updatedHorizontalGroupBy,
          weekFilter: updateweekFilter,
          monthFilter: updateMonthFilter,
          userobj: userobj,
          planWeekFilter: updatePlanWeekFilter,
          planMonthFilter: updatedPlanMonthFilter,
        };
      } else {
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
          // newgroupbydata: newgroupbydata,
          horizontalGroupBy: updatedHorizontalGroupBy,
          datePickerFilter: updatedatePickerFilter,
          userobj: userobj,
          planWeekFilter: updatePlanWeekFilter,
          planMonthFilter: updatedPlanMonthFilter,
        };
      }
    }
    case types.PROJECTVSSTATUSREPORT_SET_ADV_MATCHED_LOOKUP:
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
    case types.PROJECTVSSTATUSREPORT_SET_MATCHED_LOOKUP:
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

    case types.PROJECTVSSTATUSREPORT_TOGGLE_COLUMN_ISMAPPING: {
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
    case types.PROJECTVSSTATUSREPORT_TOGGLE_FILTER_ISMAPPING: {
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

    case types.PROJECTVSSTATUSREPORT_CREATE_HOR_GROUPBYDATA: {
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

      updatedPostData.start = 0;
      updatedPostData.skip = state.pageSize;

      return {
        ...state,
        createGroupByData: updatedCreateGroupByData,
        postData: updatedPostData,
        horizontalGroupBy: updatedHorizontalGroupBy,
        currentPage: 1,
      };
    }
    case types.PROJECTVSSTATUSREPORT_CHANGE_HORIZONTAL_GROUPBY: {
      const { id, optionid } = action.payload;
      console.log(id, optionid);
      const updatedPostData = { ...state.postData };
      const updatedCreateGroupByData = [...state.createGroupByData];
      const updatedhorizontalGroupBy = [...state.horizontalGroupBy];

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

      const groupByHorIndex = updatedhorizontalGroupBy.findIndex(
        (group) => group.id === id
      );
      if (groupByHorIndex !== -1) {
        updatedhorizontalGroupBy[groupByHorIndex] = {
          ...updatedhorizontalGroupBy[groupByHorIndex],
          value: optionid.toString(), // Assuming optionid is a string
        };
      }
      console.log(updatedPostData);
      updatedPostData.start = 0;
      updatedPostData.skip = state.pageSize;
      return {
        ...state,
        postData: updatedPostData,
        createGroupByData: updatedCreateGroupByData,
        horizontalGroupBy: updatedhorizontalGroupBy,
        currentPage: 1,
      };
    }
    case types.PROJECTVSSTATUSREPORT_SELECTED_FILTER_VALUE: {
      const { id, selectedValue, api_name, category, controltype, name } =
        action.payload;
      console.log(id, selectedValue, api_name);

      const updatedPostData = { ...state.postData };
      let updatedSelectedFilters = [...state.selectedFilters];
      const updatedAdditionalFilters = [...state.additionalFilters];
      let updatedFilterParams = [...updatedPostData.filterparams];
      let updSelectedFilters;

      if (controltype === "textbox") {
        const existingSelectedFilterIndex = updatedSelectedFilters.findIndex(
          (filter) => filter.filterid === id
        );
        console.log(existingSelectedFilterIndex);
        if (existingSelectedFilterIndex !== -1) {
          // If the filter already exists, update filtervalue in both updatedFilterParams and updatedSelectedFilters

          if (
            selectedValue.length === 0 ||
            selectedValue[0] === "" ||
            selectedValue === ""
          ) {
            let textFilterDatas = updatedFilterParams.filter(
              (filter) => filter.filtercategory === "quick"
            );
            let otherFilterDatas = updatedFilterParams.filter(
              (filter) => filter.filtercategory !== "quick"
            );
            console.log(otherFilterDatas);
            console.log(textFilterDatas);
            updatedFilterParams = textFilterDatas.filter((filter) => {
              console.log(filter);
              return (
                filter.filterid === id && filter.filtercategory !== "quick"
              );
            });
            console.log(updatedFilterParams);
            let finalFilterParams = [
              ...otherFilterDatas,
              ...updatedFilterParams,
            ];
            updatedFilterParams = finalFilterParams;

            // // If selectedValue is an empty string, remove the filter from both updatedFilterParams and updatedSelectedFilters
            // updatedFilterParams = updatedFilterParams.filter(
            //   (filter) =>
            //     filter.filterid == id && filter.filtercategory !== category
            // );
            updatedSelectedFilters = updatedSelectedFilters.filter(
              (filter) => filter.filterid !== id
            );
          } else {
            console.log(updatedPostData);
            console.log(updatedSelectedFilters, "updatedselectedfilters");
            updatedFilterParams = updatedPostData.filterparams.map((filter) => {
              if (
                filter.filterid === id &&
                filter.filtercategory === category
              ) {
                return {
                  ...filter,
                  filtervalue: selectedValue[0]
                    ? selectedValue[0]
                    : selectedValue,
                };
              }
              return filter;
            });
            // Update selectedFilters
            updatedSelectedFilters = updatedSelectedFilters.map((filter) => {
              if (filter.filterid === id) {
                return {
                  ...filter,
                  filtervalue: selectedValue[0]
                    ? selectedValue[0]
                    : selectedValue,
                };
              }
              return filter;
            });
          }
        } else {
          // If the filter does not exist, add it as a new object to both updatedFilterParams and updatedSelectedFilters
          console.log(selectedValue);
          if (selectedValue.length > 0) {
            const newFilter = {
              filterid: id,
              apiname: api_name,
              filtervalue: selectedValue[0],
              filtercategory: category,
              controltype: controltype,
              filtername: name,
              condition: "OR",
            };
            updatedFilterParams = [...updatedFilterParams, newFilter];
            updatedSelectedFilters.push(newFilter);
          }
        }
      } else {
        const additionalFilterIndex = updatedAdditionalFilters.findIndex(
          (filter) => filter.filterid === id
        );

        if (additionalFilterIndex !== -1) {
          // If there is a match in additionalFilters
          const existingFilter =
            updatedAdditionalFilters[additionalFilterIndex];
          const existingFilterValue = existingFilter.filtervalue || "";
          console.log(existingFilterValue);
          let updatedFilterValue;
          if (
            selectedValue.length === 0 ||
            (Array.isArray(selectedValue) &&
              selectedValue.every((val) => val === "")) ||
            selectedValue[0] === ""
          ) {
            // If selectedValue is an empty array or an array containing only empty strings
            updatedFilterValue = existingFilterValue;
            updSelectedFilters = updatedSelectedFilters.filter(
              (filter) => filter.filterid !== id
            );
          } else {
            updatedFilterValue = existingFilterValue
              ? `${existingFilterValue},${selectedValue.join(",")}`
              : selectedValue.join(",");
          }
          // const updatedFilterValue = existingFilterValue
          //   ? `${existingFilterValue},${selectedValue.join(",")}`
          //   : selectedValue;
          console.log(updatedFilterValue);
          console.log(typeof updatedFilterValue);
          // let convertedArr = Array.from(updatedFilterValue);
          let convertedArr = updatedFilterValue.split("");
          console.log(convertedArr);
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
              filtervalue: convertedArr.join(","),
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
          console.log(existingSelectedFilterIndex);
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
              updatedFilterParams = updatedPostData.filterparams.map(
                (filter) => {
                  if (filter.filterid === id) {
                    return { ...filter, filtervalue: selectedValue.join(",") };
                  }
                  return filter;
                }
              );

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

            console.log(selectedValue);
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
      }
      console.log(updatedFilterParams);
      console.log(updatedSelectedFilters);

      return {
        ...state,
        postData: {
          ...updatedPostData,
          filterparams: updatedFilterParams,
          start: 0,
          skip: state.pageSize,
        },
        selectedFilters: updSelectedFilters ?? updatedSelectedFilters,
        currentPage: 1,
      };
    }

    case types.PROJECTVSSTATUSREPORT_ADD_ADDITIONAL_FILTER: {
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
          const additionalFilterIndex = updatedAdditionalFilters.findIndex(
            (filter) => filter.filterid === textValue.id
          );
          const filterIndex = updatedFilterParams.findIndex(
            (filter) =>
              filter.filterid === textValue.id &&
              filter.filtercategory === textValue.filtercategory
          );
          console.log(additionalFilterIndex);
          console.log(updatedFilterParams);
          console.log(textValue);
          console.log(filterIndex);
          if (additionalFilterIndex !== -1) {
            if (textValue.value !== "") {
              updatedFilterParams[filterIndex] = {
                ...updatedFilterParams[filterIndex],
                filtervalue: textValue.value,
              };
              updatedAdditionalFilters[additionalFilterIndex] = {
                ...updatedAdditionalFilters[additionalFilterIndex],
                filtervalue: textValue.value,
              };
            } else {
              // updatedAdditionalFilters.splice(filterIndex, 1);
              updatedFilterParams = updatedFilterParams.filter(
                (filter, index) => index !== filterIndex
              );
            }
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
              filtercategory: textValue.filtercategory,
              name: textValue.name,
            });
            updatedFilterParams.push({
              filterid: textValue.id,
              apiname: textValue.api_name,
              filtervalue: textValue.value,
              condition: "OR",
              filtercategory: textValue.filtercategory,
              filtercontroltype: textValue.filtercontroltype,
            });
          }
        });
      }
      updatedPostData = {
        ...updatedPostData,
        filterparams: updatedFilterParams,
        start: 0,
        skip: state.pageSize,
      };
      console.log(updatedPostData);
      console.log(updatedAdditionalFilters);
      return {
        ...state,
        postData: updatedPostData,
        additionalFilters: updatedAdditionalFilters,
      };
    }
    case types.PROJECTVSSTATUSREPORT_SET_DROPDOWN_CHECKED: {
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
    case types.PROJECTVSSTATUSREPORT_SET_MULTISELECT_CHECKED: {
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

    case types.PROJECTVSSTATUSREPORT_REMOVE_ALL_FILTER: {
      console.log(action.payload);
      let filterIdsToRemove = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      console.log(filterIdsToRemove);
      const updatedAdditionalFilters = [];
      let updatedFilters = [...state.selectedFilters];
      let newdatePickerFilter = [...state.datePickerFilter];
      let newweekFilter = [...state.weekFilter];
      let newPlanWeekFilter = [...state.planWeekFilter];
      let newMonthFilter = [...state.monthFilter];
      let newPlanMonthFilter = [...state.planMonthFilter];
      let updatedPostData = { ...state.postData };
      // const clearFilters = "clear";
      let clearFilter;
      if (state.clearFilters === "clear") {
        clearFilter = "cleared";
      } else {
        clearFilter = "clear";
      }
      // Remove filter parameters from postData.filterparams
      updatedPostData.filterparams = updatedPostData.filterparams.filter(
        (filter) => !filterIdsToRemove.includes(filter.filterid)
      );

      updatedFilters = updatedFilters.filter(
        (filter) => !filterIdsToRemove.includes(filter.filterid)
      );

      updatedPostData.filterparams = updatedPostData.filterparams.map(
        (filter) => {
          if (filter.apiname === "column30") {
            return {
              ...filter,
              filtervalue: formatDate(new Date()),
            };
            // } else if (filter.apiname === "workweek") {
            //   const currentYear = new Date().getFullYear();
            //   const currentWeek = getWeekNumber(new Date());

            //   const selectedValue = currentWeek + "$" + currentYear;
            //   return {
            //     ...filter,
            //     filtervalue: "",
            //   };
            // }
          } else if (filter.apiname === "workmonth") {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = new Date().getFullYear();
            // const currentWeek = getWeekNumber(new Date());

            const selectedValue = currentMonth + "$" + currentYear;
            return {
              ...filter,
              filtervalue: selectedValue,
            };
          }
          return filter;
        }
      );

      newdatePickerFilter = newdatePickerFilter.map((filter) => {
        if (filter.api_name === "column30") {
          const selectedValue = formatDate(new Date());

          const tempDate = formatDateday(new Date(), "EEE, do MMM, yyyy");
          return {
            ...filter,
            date: tempDate,
            formattedDate: selectedValue,
          };
        }
      });

      newweekFilter = newweekFilter.map((filter) => {
        if (filter.api_name === "workweek") {
          const currentYear = new Date().getFullYear();
          const currentWeek = getWeekNumber(new Date());
          return {
            ...filter,
            week: "",
            // parseInt(currentWeek),
            // year: "",
            year: parseInt(currentYear),
          };
        }
      });
      newPlanWeekFilter = newPlanWeekFilter.map((filter) => {
        if (filter.api_name === "planweek") {
          const currentYear = new Date().getFullYear();
          const currentWeek = getWeekNumber(new Date());
          return {
            ...filter,
            week: "",
            // parseInt(currentWeek),
            // year: "",
            year: parseInt(currentYear),
          };
        }
      });
      newMonthFilter = newMonthFilter.map((filter) => {
        if (filter.api_name === "workmonth") {
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1;
          const currentYear = new Date().getFullYear();
          return {
            ...filter,
            month: "",
            year: parseInt(currentYear),
          };
        }
      });
      newPlanMonthFilter = newPlanMonthFilter.map((filter) => {
        if (filter.api_name === "planmonth") {
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1;
          const currentYear = new Date().getFullYear();
          return {
            ...filter,
            month: "",
            year: parseInt(currentYear),
          };
        }
      });

      updatedPostData.start = 0;
      updatedPostData.skip = state.pageSize;

      return {
        ...state,
        selectedFilters: updatedFilters,
        additionalFilters: updatedAdditionalFilters,
        postData: updatedPostData,
        datePickerFilter: newdatePickerFilter,
        weekFilter: newweekFilter,
        monthFilter: newMonthFilter,
        planWeekFilter: newPlanWeekFilter,
        planMonthFilter: newPlanMonthFilter,
        clearFilters: clearFilter,
        currentPage: 1,
      };
    }

    case types.PROJECTVSSTATUSREPORT_REMOVE_QUICK_FILTER: {
      const { id, controltype } = action.payload;
      console.log(action.payload);
      // const { payload: idToRemove } = action;

      const updatedAdditionalFilters = [...state.additionalFilters];
      let updatedFilters = [...state.selectedFilters];
      console.log(updatedAdditionalFilters);
      console.log(updatedFilters);
      let updatedFilterParams = [...state.postData.filterparams];
      let updatedPostData = { ...state.postData };
      console.log(updatedPostData);

      if (controltype === "textbox") {
        updatedFilters = updatedFilters.filter(
          (filter) => filter.filterid !== id
        );
        let textFilterDatas = updatedFilterParams.filter(
          (filter) => filter.filtercategory === "quick"
        );
        let otherFilterDatas = updatedFilterParams.filter(
          (filter) => filter.filtercategory !== "quick"
        );
        console.log(otherFilterDatas);
        console.log(textFilterDatas);
        updatedFilterParams = textFilterDatas.filter((filter) => {
          console.log(filter);
          return filter.filterid === id && filter.filtercategory !== "quick";
        });
        console.log(updatedFilterParams);
        let finalFilterParams = [...otherFilterDatas, ...updatedFilterParams];
        updatedPostData.filterparams = finalFilterParams;
        // let postData;
        // postData = updatedPostData.filterparams.filter(
        //   (filter) =>
        //     filter.filterid === id && filter.filtercategory !== "quick"
        // );
        // console.log(postData);
      } else {
        // Check if the ID exists in additionalFilters
        const filterIndex = updatedAdditionalFilters.findIndex(
          (filter) => filter.filterid === id
        );

        // Case 1: ID exists in additionalFilters
        if (filterIndex !== -1) {
          const filterToUpdateIndex = updatedPostData.filterparams.findIndex(
            (filter) => filter.filterid === id
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
            (filter) => filter.filterid !== id
          );
        } else {
          // Case 2: ID does not exist in additionalFilters
          updatedPostData.filterparams = updatedPostData.filterparams.filter(
            (filter) => filter.filterid !== id
          );
          updatedFilters = updatedFilters.filter(
            (filter) => filter.filterid !== id
          );
        }
      }

      console.log(updatedPostData);
      console.log(updatedFilters);

      updatedPostData.start = 0;
      updatedPostData.skip = state.pageSize;
      return {
        ...state,
        selectedFilters: updatedFilters,
        postData: updatedPostData,
        currentPage: 1,
      };
    }
    case types.PROJECTVSSTATUSREPORT_REMOVE_ADVANCED_FILTER: {
      console.log(action.payload);
      const { filtercontroltype, filterid, filtercategory } = action.payload;

      let updatedAdditionalFilters = [...state.additionalFilters];
      const updatedFilters = [...state.selectedFilters];

      console.log(updatedAdditionalFilters);
      console.log(updatedFilters);
      let updatedPostData = { ...state.postData };
      let updatedFilterParams = [...state.postData.filterparams];

      if (filtercontroltype === "textbox") {
        let textFilterDatas = updatedFilterParams.filter(
          (filter) => filter.filtercategory === "additional"
        );
        let otherFilterDatas = updatedFilterParams.filter(
          (filter) => filter.filtercategory !== "additional"
        );
        console.log(otherFilterDatas);
        console.log(textFilterDatas);
        updatedFilterParams = textFilterDatas.filter((filter) => {
          console.log(filter);
          return (
            filter.filterid === filterid &&
            filter.filtercategory !== "additional"
          );
        });
        console.log(updatedFilterParams);
        let finalFilterParams = [...otherFilterDatas, ...updatedFilterParams];
        updatedPostData.filterparams = finalFilterParams;

        // updatedPostData.filterparams = updatedPostData.filterparams.filter(
        //   (filter) =>
        //     filter.filterid === filterid &&
        //     filter.filtercategory !== filtercategory
        // );
        updatedAdditionalFilters = updatedAdditionalFilters.filter(
          (filter) =>
            filter.filterid !== filterid &&
            filter.filtercategory !== filtercategory
        );
      } else {
        const filterIndex = updatedFilters.findIndex(
          (filter) => filter.filterid === filterid
        );

        // Case 1: ID exists in additionalFilters
        if (filterIndex !== -1) {
          const filterToUpdateIndex = updatedPostData.filterparams.findIndex(
            (filter) => filter.filterid === filterid
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
            (filter) => filter.filterid !== filterid
          );
        } else {
          // Case 2: ID does not exist in additionalFilters
          updatedPostData.filterparams = updatedPostData.filterparams.filter(
            (filter) => filter.filterid !== filterid
          );
          updatedAdditionalFilters = updatedAdditionalFilters.filter(
            (filter) => filter.filterid !== filterid
          );
        }
      }

      console.log(updatedPostData);
      console.log(updatedAdditionalFilters);

      return {
        ...state,
        additionalFilters: updatedAdditionalFilters,
        postData: updatedPostData,
      };
    }
    case types.PROJECTVSSTATUSREPORT_QUICK_TEXT_VALUE: {
      console.log(action.payload);
      return {
        ...state,
        textFilter: action.payload,
      };
    }
    case types.PROJECTVSSTATUSREPORT_RESET_QUICK_FILTER_VALUES: {
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
    case types.PROJECTVSSTATUSREPORT_CREATE_NEW_DATASET:
      return {
        ...state,
        newDataset: action.payload,
      };
    case types.PROJECTVSSTATUSREPORT_EDIT_DATASET:
      console.log(action.payload);
      return {
        ...state,
        updateDataSet: action.payload,
      };
    case types.PROJECTVSSTATUSREPORT_SORTED_COLUMN: {
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
        orderByHeader: dataindex,
        orderBy: sortDirection,
      };
    }
    case types.PROJECTVSSTATUSREPORT_GET_NEW_DATASET_INFO_SUCCESS: {
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
        weekFilter: [],
        monthFilter: [],
        datePickerFilter: [],
        newLayout: [],
        currentPage: 1,
      };
    }
    case types.PROJECTVSSTATUSREPORT_DELETE_DATASET_DB: {
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
        currentPage: 1,
        selectedFilters: [],
        additionalFilters: [],
        textFilter: {},
        weekFilter: [],
        monthFilter: [],
        datePickerFilter: [],
        newLayout: [],
      };
    }
    case types.PROJECTVSSTATUSREPORT_SET_ADV_DROPDOWN_CHECKED: {
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
    case types.PROJECTVSSTATUSREPORT_SET_ADV_MULTISELECT_CHECKED: {
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
    case types.PROJECTVSSTATUSREPORT_SET_NEW_LAYOUT:
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

    case types.PROJECTVSSTATUSREPORT_SET_COLUMN_SEQ: {
      const updatedTotalColumn = [...state.totalColumns];
      console.log(action.payload);
      const payloadMap = new Map(
        action.payload.map((item) => [item.displayapiname.toLowerCase(), item])
      );
      console.log(payloadMap);

      const matchedItems = updatedTotalColumn.filter((column) =>
        payloadMap.has(column.displayapiname.toLowerCase())
      );
      console.log(matchedItems);

      const unmatchedItems = updatedTotalColumn.filter(
        (column) => !payloadMap.has(column.displayapiname.toLowerCase())
      );
      console.log(unmatchedItems);

      const updatedMatchedItems = matchedItems.map((totalColumnItem) => {
        const payloadItem = action.payload.find(
          (payload) =>
            payload.displayapiname.toLowerCase() ===
            totalColumnItem.displayapiname.toLowerCase()
        );
        if (payloadItem) {
          return {
            ...totalColumnItem,
            seqno: payloadItem.columnsequence,
            columnwidth: payloadItem.columnwidth,
          };
        }
        return totalColumnItem;
      });
      console.log(updatedMatchedItems);

      // // Update seq for unmatched items
      let seq =
        Math.max(...action.payload.map((item) => item.columnsequence), 0) + 1;

      console.log(seq);
      const updatedUnmatched = unmatchedItems.map((item) => ({
        ...item,
        seqno: seq++,
      }));
      console.log(updatedUnmatched);

      // Concatenate updated matched and unmatched items
      const updatednewtotalcol = [...updatedMatchedItems, ...updatedUnmatched];
      console.log(updatednewtotalcol);

      const updatedSeq = action.payload.map((payloadItem) => {
        // Find the corresponding item in totalColumns based on api_name
        const totalColumnItem = updatedTotalColumn.find(
          (totalItem) =>
            totalItem.displayapiname.toLowerCase() ===
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
        totalColumns: updatednewtotalcol,
      };
    }
    case types.PROJECTVSSTATUSREPORT_SET_DATEPICKER_VALUE: {
      const { id, api_name, name, date, formattedDate } = action.payload;

      const existingIndex = state.datePickerFilter.findIndex(
        (item) => item.id === id
      );

      let updatedDatePickerFilter;

      if (existingIndex !== -1) {
        updatedDatePickerFilter = [...state.datePickerFilter];
        updatedDatePickerFilter[existingIndex] = {
          id,
          api_name,
          name,
          date,
          formattedDate,
        };
      } else {
        updatedDatePickerFilter = [
          ...state.datePickerFilter,
          { id, api_name, name, date, formattedDate },
        ];
      }

      return {
        ...state,
        datePickerFilter: updatedDatePickerFilter,
      };
    }
    case types.PROJECTVSSTATUSREPORT_SET_WEEKFILTER_VALUE: {
      const { id, api_name, name, week, year } = action.payload;

      const existingIndex = state.weekFilter.findIndex(
        (item) => item.id === id
      );

      let updatedWeekFilter;

      if (existingIndex !== -1) {
        updatedWeekFilter = [...state.weekFilter];
        updatedWeekFilter[existingIndex] = { id, api_name, name, week, year };
      } else {
        updatedWeekFilter = [
          ...state.weekFilter,
          { id, api_name, name, week, year },
        ];
      }

      return {
        ...state,
        weekFilter: updatedWeekFilter,
      };
    }
    case types.PROJECTVSSTATUSREPORT_SET_PLANWEEKFILTER_VALUE: {
      const { id, api_name, name, week, year } = action.payload;

      const existingIndex = state.planWeekFilter.findIndex(
        (item) => item.id === id
      );

      let updatedWeekFilter;

      if (existingIndex !== -1) {
        updatedWeekFilter = [...state.planWeekFilter];
        updatedWeekFilter[existingIndex] = { id, api_name, name, week, year };
      } else {
        updatedWeekFilter = [
          ...state.planWeekFilter,
          { id, api_name, name, week, year },
        ];
      }

      return {
        ...state,
        planWeekFilter: updatedWeekFilter,
      };
    }
    case types.PROJECTVSSTATUSREPORT_SET_MONTHFILTER_VALUE: {
      const { id, api_name, name, month, year } = action.payload;

      const existingIndex = state.monthFilter.findIndex(
        (item) => item.id === id
      );

      let updatedMonthFilter;

      if (existingIndex !== -1) {
        updatedMonthFilter = [...state.monthFilter];
        updatedMonthFilter[existingIndex] = { id, api_name, name, month, year };
      } else {
        updatedMonthFilter = [
          ...state.monthFilter,
          { id, api_name, name, month, year },
        ];
      }

      return {
        ...state,
        monthFilter: updatedMonthFilter,
      };
    }
    case types.PROJECTVSSTATUSREPORT_SET_PLANMONTHFILTER_VALUE: {
      const { id, api_name, name, month, year } = action.payload;

      const existingIndex = state.planMonthFilter.findIndex(
        (item) => item.id === id
      );

      let updatedMonthFilter;

      if (existingIndex !== -1) {
        updatedMonthFilter = [...state.planMonthFilter];
        updatedMonthFilter[existingIndex] = { id, api_name, name, month, year };
      } else {
        updatedMonthFilter = [
          ...state.planMonthFilter,
          { id, api_name, name, month, year },
        ];
      }

      return {
        ...state,
        planMonthFilter: updatedMonthFilter,
      };
    }
    case types.PROJECTVSSTATUSREPORT_RESET_DATE_FILTERS: {
      console.log("it runs");
      return initialState;
    }
    case types.PROJECTVSSTATUSREPORT_CHANGE_MASTER_DATA: {
      const { masterid, api_name, week, selectedYear } = action.payload;

      let changedMasterdata = state.masterData?.map((masterItem) => {
        if (masterItem.masterid === masterid) {
          const startDate = getDateOfWeek(
            parseInt(week),
            parseInt(selectedYear)
          );

          // Update mastervalues based on the startDate
          const updatedMastervalues = masterItem.mastervalues.map(
            (value, index) => {
              const date = new Date(startDate);
              date.setDate(startDate.getDate() + index);
              return { ...value, value: formatDate(date) };
            }
          );
          console.log(updatedMastervalues);
          // Return the updated masterItem
          return { ...masterItem, mastervalues: updatedMastervalues };
        }

        // Return unchanged masterItem if masterid does not match
        return masterItem;
      });
      console.log(changedMasterdata);
      return {
        ...state,
        masterData: changedMasterdata,
      };
    }

    case types.PROJECTVSSTATUSREPORT_SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default:
      return state;
  }
};

export default ProjectVsStatusReportReducer;

// Helper functions
const getDateOfWeek = (week, year) => {
  const date = new Date(year, 0, 1 + (week - 1) * 7);
  const day = date.getDay();
  const dayOffset = day <= 4 ? -day + 1 : 8 - day;
  return new Date(date.setDate(date.getDate() + dayOffset));
};

const formatDate = (date) => {
  console.log(date);
  const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  return date?.toLocaleDateString("en-US", options);
};

const formatDateday = (date) => {
  console.log(date);
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return date?.toLocaleDateString("en-US", options);
};

const getWeek = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((firstDayOfYear.getDay() + pastDaysOfYear) / 7);
};

const formatdefaultDate = (dateString) => {
  const dateParts = dateString.split("/");
  const year = parseInt(dateParts[2]);
  const month = parseInt(dateParts[0]) - 1; // Month is zero-based in JavaScript Date
  const day = parseInt(dateParts[1]);

  const date = new Date(year, month, day);

  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};
