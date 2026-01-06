import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { format, isSameDay } from "date-fns";
import Select from "react-select";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { MdOutlineFilterListOff } from "react-icons/md";
import {
  WeekFilterV2,
  ArcDateFilter,
} from "@/components/arccomponents/ui-components/ArcYearWeekPicker/ArcYearWeekPicker";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { MySkeleton } from "@/modules/loading-skeleton/listpage-table-loading";
import { APPLY_BUTTON_ENABLED } from "@/config/serverApiConfig";

import {
  masterDataInfo,
  quickFilterDataInfo,
  matchedLookupInfo,
  postDataInfo,
  selectedFiltersInfo,
  textFilterInfo,
  additionalFiltersInfo,
  dataSetIDInfo,
} from "@/redux/Project/selector";
import {
  setMatchedLookup,
  addSelectedFilter,
  setMultiselectChecked,
  setDropdownChecked,
  removeQuickFilter,
  removeAllFilters,
  setTextValue,
  resetCheckedValues,
  setDatepicker,
  setWeekfilter,
  resetDatefilters,
  changeMasterdata,
} from "@/redux/Project/actions";
import { json } from "react-router-dom";
import ArcFilterAutoComplete from "@/components/arccomponents/ui-components/ArcAutoComplete/ArcFilterAutoComplete";
import { SortingWithoutDirection } from "@/utils/CommonFunctions";

const QuickFilterHeader = ({
  filters,
  Tableloading,
  setSelectedOptions,
  selectedOptions,
  textValues,
  setTextValues,
}) => {
  const dispatch = useDispatch();
  const loginstatus = useSelector((state) => state.auth.isLoggedIn);
  console.log(loginstatus);
  const quickFilterData = useSelector(quickFilterDataInfo);
  console.log(quickFilterData);
  const masterData = useSelector(masterDataInfo);
  console.log("masterData", masterData);

  const matchedLookup = useSelector(matchedLookupInfo);
  console.log("matchedLookup", matchedLookup);
  const postData = useSelector(postDataInfo);
  console.log("postData", postData);
  const selectedFilters = useSelector(selectedFiltersInfo);
  console.log("selectedFilters", selectedFilters);
  const additionalFilters = useSelector(additionalFiltersInfo);
  console.log("additionalFilters", additionalFilters);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilterId, setActiveFilterId] = useState(null);
  const [optionSelected, setOptionSelected] = useState(null);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState({});
  // const [textValues, setTextValues] = useState({});
  const [isFiltersCleared, setIsFiltersCleared] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [newstartDate, setnewStartDate] = useState();
  const HandleDateChange = (date, id, api_name) => {
    const name = "Plan date";
    console.log({ date, id, api_name });
    const formattedDate = format(new Date(date), "MM/dd/yyyy");
    const tempDate = format(new Date(date), "EEE, do MMM, yyyy");
    console.log(tempDate);
    const selectedValue = [formattedDate];
    setnewStartDate(date);
    dispatch(
      addSelectedFilter({
        id,
        selectedValue,
        api_name,
      })
    );
    dispatch(setDatepicker(id, api_name, name, tempDate, formattedDate));
  };
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((firstDayOfYear.getDay() + pastDaysOfYear) / 7);
  };
  const currentYear = new Date().getFullYear();
  const currentWeek = getWeekNumber(new Date());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const HandleWeekChange = (week, api_name, id, masterid) => {
    const name = "Plan week";
    console.log(week + 1, selectedYear, id, api_name);

    const selectedValue = [week + 1 + "$" + selectedYear];
    console.log(selectedValue);
    dispatch(
      addSelectedFilter({
        id,
        selectedValue,
        api_name,
      })
    );
    dispatch(setWeekfilter(id, api_name, name, week + 1, selectedYear));
    dispatch(changeMasterdata(masterid, api_name, week + 1, selectedYear));
  };

  const DataSetID = useSelector(dataSetIDInfo);

  // Define state to track popover visibility for each filter
  const [popoverVisibility, setPopoverVisibility] = useState({});
  // Function to toggle popover visibility for a specific filter
  const togglePopover = (filterId) => {
    setPopoverVisibility((prevState) => ({
      ...prevState,
      [filterId]: !prevState[filterId], // Toggle visibility
    }));
    setSearchTerm("");
  };
  console.log(APPLY_BUTTON_ENABLED);
  // const [startDate, setStartDate] = useState();
  const [IsFilter, setIsFilter] = useState(true);
  //const masterData = useSelector(selectlookupInfo);
  const textFilter = useSelector(textFilterInfo);

  console.log("selectedOptions", selectedOptions);
  console.log("selectedDropdownValue", selectedDropdownValue);
  console.log("textValues", textValues);
  console.log("textFilter", textFilter);

  const {
    ScreenWidth,
    BreakpointXs,
    BreakpointSm,
    BreakpointMd,
    Breakpointlg,
    BreakpointXl,
    BreakpointXxl,
  } = useContext(ContextWidthProvider);

  useEffect(() => {
    setSelectedOptions([]);
    setSelectedDropdownValue({});
    setTextValues({});
  }, [DataSetID, loginstatus]);

  useEffect(() => {
    // Check if any of the selectedOptions, selectedDropdownValue, or textValues have any value
    const hasValue =
      selectedOptions?.length > 0 ||
      Object.keys(selectedDropdownValue).length > 0 ||
      Object.keys(textValues).length > 0;

    // Update isFiltersCleared based on whether any of the values exist
    setIsFiltersCleared(!hasValue);
  }, [selectedOptions, selectedDropdownValue, textValues]);

  useEffect(() => {
    // Dispatch action to set matched lookup when quickFilterData     or masterData changes
    if (quickFilterData && masterData) {
      quickFilterData
        .filter(
          (filter) =>
            filter.isquickfilter &&
            filter.name !== null &&
            filter.masterid !== null
        )
        .forEach((filter) => {
          if (filter.masterid) {
            const matchingLookup = masterData.find(
              (lookup) => lookup.masterid === filter.masterid
            );

            if (matchingLookup) {
              let newMatchingLookup = {};

              if (Object.keys(matchedLookup).length === 0) {
                // If matchedLookup is empty, set matchingLookup directly to newMatchingLookup
                newMatchingLookup = matchingLookup;
              } else {
                const matchedObject = Object.values(matchedLookup).find(
                  (obj) => obj.masterid === matchingLookup.masterid
                );
                if (matchedObject) {
                  // Collect islookup, masterid, and mastervalues from the matched object
                  const { islookup, masterid, mastervalues } = matchedObject;

                  // Set collected values to newMatchingLookup
                  newMatchingLookup = {
                    islookup,
                    masterid,
                    mastervalues,
                  };
                }
              }

              if (newMatchingLookup) {
                // Split defaultvalue into individual values if it contains commas
                let defaultValues = [];

                // Filter matching mastervalues based on defaultValues
                const defaultOptionIds = matchingLookup.mastervalues
                  .filter((value) => defaultValues.includes(value.optionid))
                  .map((value) => value.optionid);

                const updatedMatchingLookup = {
                  ...newMatchingLookup,
                  name: filter.name,
                  masterid: filter.masterid,
                  filtercategory: filter.filtercategory,
                  filtercontroltype: filter.filtercontroltype,
                  id: filter.id,
                  api_name: filter.api_name,
                  defaultvalue:
                    defaultOptionIds.length === 1
                      ? defaultOptionIds[0]
                      : defaultOptionIds,
                };

                // Dispatch action to update matchingLookup
                console.log(updatedMatchingLookup);
                dispatch(setMatchedLookup(updatedMatchingLookup));
              }
            }
          }
        });
    }
  }, [quickFilterData, masterData]);

  useEffect(() => {
    if (
      quickFilterData &&
      quickFilterData.length > 0 &&
      masterData &&
      masterData.length > 0
    ) {
      var hasChecked;
      const updatedSelectedOptions = [...selectedOptions];
      const updatedTextValues = { ...textValues };
      quickFilterData.forEach((item) => {
        if (
          item.filtercontroltype === "multiselect" &&
          item.filtercategory !== "additional" &&
          item.masterid !== ""
        ) {
          const lookupDetail = masterData.find(
            (detail) => detail.masterid === item.masterid
          );
          console.log(lookupDetail);
          if (
            lookupDetail &&
            item.defaultvalue !== null &&
            item.defaultvalue !== ""
          ) {
            const defaultValues = item.defaultvalue
              .split(",")
              .map((value) => value.trim());
            console.log(defaultValues);
            const defaultOptions = lookupDetail.mastervalues.filter((value) =>
              defaultValues.includes(value.optionid)
            );
            console.log(defaultOptions);
            let selectValues = []; // Array to hold all selected values
            defaultOptions.forEach((defaultOption) => {
              selectValues.push(defaultOption.optionid);
              console.log(updatedSelectedOptions);
              const existingOptionIndex = updatedSelectedOptions.findIndex(
                (option) => option.id === item.id
              );
              console.log(existingOptionIndex);
              if (existingOptionIndex !== -1) {
                updatedSelectedOptions[existingOptionIndex].selectedValue =
                  Array.from(
                    new Set([
                      ...updatedSelectedOptions[existingOptionIndex]
                        .selectedValue,
                      defaultOption.optionid,
                    ])
                  );
              } else {
                updatedSelectedOptions.push({
                  id: item.id,
                  selectedValue: [defaultOption.optionid],
                  masterid: item.masterid,
                  api_name: item.api_name,
                  filtercontroltype: item.filtercontroltype,
                  filtercategory: item.filtercategory,
                });
              }
              console.log(updatedSelectedOptions);
              const matchedLookupItem =
                matchedLookup && matchedLookup[item.masterid];
              console.log(matchedLookupItem);
              var hasChecked =
                matchedLookupItem?.mastervalues.some((mv) => mv.isChecked) ||
                matchedLookupItem?.mastervalues.some((mv) => !mv.isChecked);
              console.log(hasChecked);
              if (!hasChecked) {
                dispatch(
                  setMultiselectChecked(item.masterid, selectValues, true)
                );
              }
            });
          }
        } else if (
          item.filtercontroltype === "textbox" &&
          item.defaultvalue !== null &&
          item.defaultvalue !== "" &&
          item.filtercategory !== "additional"
        ) {
          // Update textValues if control type is textbox and default value is not null or empty string
          updatedTextValues[item.id] = {
            value: item.defaultvalue,
            id: item.id,
            filtercontroltype: item.filtercontroltype,
            filtercategory: item.filtercategory,
            api_name: item.api_name,
            name: item.name,
          };
        }
      });
      console.log(updatedTextValues);
      dispatch(setTextValue(updatedTextValues));
      if (hasChecked && !hasChecked) {
        setSelectedOptions(updatedSelectedOptions);
      }
      setTextValues(updatedTextValues);

      setSelectedDropdownValue((prevState) => {
        let updatedSelectedOption = prevState ? { ...prevState } : {};

        quickFilterData.forEach((item) => {
          if (
            item.filtercontroltype === "dropdown" &&
            item.filtercategory !== "additional" &&
            item.masterid !== ""
          ) {
            const lookupDetail = masterData.find(
              (detail) => detail.masterid === item.masterid
            );

            if (
              lookupDetail &&
              item.defaultvalue !== null &&
              item.defaultvalue !== ""
            ) {
              //const defaultOption = lookupDetail.mastervalues.find(
              //    (option) => option.optionid === item.defaultvalue
              //);

              const defaultValues = item.defaultvalue.split(",");
              const firstDefaultValue = defaultValues[0].trim();

              const defaultOption = lookupDetail.mastervalues.find(
                (option) => option.optionid === firstDefaultValue
              );

              if (defaultOption) {
                updatedSelectedOption[item.masterid] = {
                  value: defaultOption.optionid,
                  label: defaultOption.optionvalue,
                };
              }
              console.log(defaultOption);
              if (defaultOption) {
                dispatch(
                  setDropdownChecked(
                    item.masterid,
                    defaultOption.optionid,
                    true
                  )
                );
              }
            }
          }
        });

        return { ...updatedSelectedOption };
      });
    }
  }, [quickFilterData, masterData]);

  useEffect(() => {
    if (quickFilterData?.length > 0) {
      quickFilterData.forEach((item) => {
        if (item.api_name === "workday") {
          if (item.defaultvalue === "") {
            setStartDate(new Date());
          } else {
            setStartDate(new Date(item.defaultvalue));
          }
        } else if (item.api_name === "workweek") {
          if (item.defaultvalue === "") {
            const currentYear = new Date().getFullYear();
            const currentWeek = getWeekNumber(new Date());
            setSelectedYear(currentYear);
            setSelectedWeek(currentWeek);
          } else {
            const [week, year] = item.defaultvalue.split("$");
            setSelectedYear(year);
            setSelectedWeek(week);
          }
        }
      });
    }
  }, [quickFilterData]);

  useEffect(() => {
    if (selectedFilters.length > 0) {
      const updatedOptions = selectedFilters.map((filter) => ({
        id: filter.filterid,
        selectedValue: filter.filtervalue.split(","),
      }));
      console.log(updatedOptions);
      // Only add new filters if they don't already exist in selectedOptions
      const newOptions = updatedOptions.filter(
        (option) =>
          !selectedOptions.some((existing) => existing.id === option.id)
      );
      console.log(selectedOptions);
      console.log(newOptions);
      setSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        ...newOptions,
      ]);
    }
  }, [selectedFilters]);

  useEffect(() => {
    if (selectedFilters.length > 0) {
      const updatedOptions = selectedFilters.filter(
        (filter) => filter.controltype === "textbox"
      );

      if (updatedOptions) {
        const resultObject = updatedOptions.reduce((accumulator, filter) => {
          accumulator[filter.filterid] = {
            value: filter.filtervalue,
            id: filter.filterid,
            api_name: filter.apiname,
            filtercontroltype: filter.controltype,
            filtercategory: filter.filtercategory,
            name: filter.filtername,
          };
          return accumulator;
        }, {});
        console.log(resultObject);
        setTextValues(resultObject);
        dispatch(setTextValue(resultObject));
      }

      console.log(updatedOptions);
      // ?.map((filter) => ({
      //   id: filter.filterid,
      //   selectedValue: filter.filtervalue.split(","),
      // }));
      // console.log(updatedOptions);
      // // Only add new filters if they don't already exist in selectedOptions
      // const newOptions = updatedOptions.filter(
      //   (option) =>
      //     !selectedOptions.some((existing) => existing.id === option.id)
      // );
      // console.log(selectedOptions);
      // console.log(newOptions);
      // setSelectedOptions((prevSelectedOptions) => [
      //   ...prevSelectedOptions,
      //   ...newOptions,
      // ]);
    }
  }, [selectedFilters]);

  const renderFilterButtons = () => {
    if (quickFilterData) {
      return quickFilterData
        .filter(
          (filter) =>
            filter.ismapped && filter.name !== null && filter.masterid !== null
        )
        .map((filter) => {
          if (
            //filter.ismapped &&
            filter.isquickfilter &&
            matchedLookup[filter.masterid]
          ) {
            const filterOptions =
              matchedLookup[filter.masterid].mastervalues || [];
            // ~ groupdropdown count
            const selectedTagValueLength = selectedFilters.filter(
              (option) => option.filterid === filter.id
            );
            const TotalTags = selectedTagValueLength[0]?.filtervalue.split(",");
            console.log(TotalTags);
            // ~ groupdropdown count

            const selectedValueLength =
              filter.filtercontroltype === "groupdropdown"
                ? TotalTags?.length
                : filterOptions.filter((option) => option.isChecked).length;

            // const selectedTagValueLength =
            //   filter.filtercontroltype === "groupdropdown"
            //     ? selectedFilters
            //     : selectedFilters;

            console.log(filterOptions);
            return ["datepicker"].includes(filter.filtercontroltype) ? (
              <>
                <ArcDateFilter
                  startDate={startDate}
                  setStartDate={setStartDate}
                  onChange={(date) => {
                    setStartDate(date);
                    HandleDateChange(date, filter.id, filter.api_name);
                  }}
                />
              </>
            ) : ["weekfilter"].includes(filter.filtercontroltype) ? (
              <>
                <div className="action-week-filter">
                  <WeekFilterV2
                    api_name={filter.api_name}
                    id={filter.id}
                    masterid={filter.masterid}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    selectedWeek={selectedWeek}
                    setSelectedWeek={setSelectedWeek}
                    HandleWeekChange={HandleWeekChange}
                  />
                </div>
              </>
            ) : ["dropdown", "multiselect"].includes(
                filter.filtercontroltype
              ) ? (
              // <>
              //   {/* <pre>{JSON.stringify(filter, null, 2)}</pre> */}
              //   <ArcFilterAutoComplete
              //     PlaceHolder="Search"
              //     Name={filter.name}
              //     datasetId={DataSetID}
              //     lookupId={filter.masterid}
              //     filterType={filter.filtercategory}
              //     filter={filter}
              //     selectedOptions={selectedOptions}
              //     setSelectedOptions={setSelectedOptions}
              //     handleCheckboxTagfilter={handleCheckboxTagfilter}
              //     handleRemoveFilter={handleRemoveFilter}
              //     selectedValueLength={selectedValueLength}
              //   />
              // </>
              <>
                <OverlayTrigger
                  key={filter.id}
                  trigger="click"
                  placement={
                    ScreenWidth > BreakpointSm ? "bottom-start" : "auto"
                  }
                  rootClose={true}
                  show={popoverVisibility[filter.id]} // Use individual popover visibility
                  onToggle={() => togglePopover(filter.id)} // Toggle popover visibility
                  overlay={
                    <Popover
                      id={`popover-positioned-auto`}
                      className="custom-multi-select"
                    >
                      <Popover.Body>
                        <div className="content">
                          <div className="input-control">
                            <div className="header">
                              <p>{filter.name}</p>
                              <ArcToolTip
                                HoverText="Close"
                                BtnName={<MdOutlineCancel />}
                                Placement="left"
                                onClick={() => {
                                  togglePopover(filter.id); // Close the popover
                                  setActiveFilterId(null); // Optionally reset active filter ID
                                }}
                                as="span"
                              />
                            </div>
                            <div className="pop-content">
                              <div className="checkbox-div">
                                {/* <pre>{JSON.stringify(filter, null, 2)}</pre> */}
                                {renderFilterOptions(filter)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  {selectedValueLength ? (
                    <button
                      className={`${activeFilterId === filter.id && "active"} ${
                        IsFilter && filter.name && "is-filter"
                      } ${Tableloading && "loading-btn"}`}
                    >
                      {Tableloading ? (
                        <LoadingBtn />
                      ) : (
                        <>
                          {IsFilter && filter.name && (
                            <span>({selectedValueLength})</span>
                          )}{" "}
                          {filter.name}
                          <span className="down-arrow">
                            <IoIosArrowDown />
                          </span>
                          {IsFilter && filter.name && (
                            <ArcToolTip
                              className="cancel-btn"
                              HoverText="Clear"
                              BtnName={<MdOutlineCancel />}
                              Placement="right"
                              onClick={(e) => {
                                handleRemoveFilter(
                                  e,
                                  filter.id,
                                  filter.filtercontroltype
                                );
                                setActiveFilterId(null);
                              }}
                              as="span"
                            />
                          )}
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      className={`${activeFilterId === filter.id && "active"}`}
                    >
                      {Tableloading ? (
                        <LoadingBtn />
                      ) : (
                        <>
                          {filter.name}
                          <span>
                            <IoIosArrowDown />
                          </span>
                        </>
                      )}
                    </button>
                  )}
                </OverlayTrigger>
              </>
            ) : filter.islookup &&
              ["onclickloadmultiselect"].includes(filter.filtercontroltype) ? (
              <>
                {/* <pre>{JSON.stringify(filter, null, 2)}</pre> */}
                <ArcFilterAutoComplete
                  PlaceHolder="Search"
                  Name={filter.name}
                  datasetId={DataSetID}
                  lookupId={filter.masterid}
                  filterType={filter.filtercategory}
                  filter={filter}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  handleCheckboxTagfilter={handleCheckboxTagfilter}
                  handleRemoveFilter={handleRemoveFilter}
                  selectedValueLength={selectedValueLength}
                />
              </>
            ) : (
              <>
                <OverlayTrigger
                  key={filter.id}
                  trigger="click"
                  placement={
                    ScreenWidth > BreakpointSm ? "bottom-start" : "auto"
                  }
                  rootClose={true}
                  show={popoverVisibility[filter.id]} // Use individual popover visibility
                  onToggle={() => togglePopover(filter.id)} // Toggle popover visibility
                  overlay={
                    <Popover
                      id={`popover-positioned-auto`}
                      className="custom-multi-select"
                    >
                      <Popover.Body>
                        <div className="content">
                          <div className="input-control">
                            <div className="header">
                              <p>{filter.name}</p>
                              <ArcToolTip
                                HoverText="Close"
                                BtnName={<MdOutlineCancel />}
                                Placement="left"
                                onClick={() => {
                                  togglePopover(filter.id); // Close the popover
                                  setActiveFilterId(null); // Optionally reset active filter ID
                                }}
                                as="span"
                              />
                            </div>
                            <div className="pop-content">
                              <div className="checkbox-div">
                                {/* <pre>{JSON.stringify(filter, null, 2)}</pre> */}
                                {renderFilterOptions(filter)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  {selectedValueLength ? (
                    <button
                      className={`${activeFilterId === filter.id && "active"} ${
                        IsFilter && filter.name && "is-filter"
                      } ${Tableloading && "loading-btn"}`}
                    >
                      {Tableloading ? (
                        <LoadingBtn />
                      ) : (
                        <>
                          {IsFilter && filter.name && (
                            <span>({selectedValueLength})</span>
                          )}{" "}
                          {filter.name}
                          <span className="down-arrow">
                            <IoIosArrowDown />
                          </span>
                          {IsFilter && filter.name && (
                            <ArcToolTip
                              className="cancel-btn"
                              HoverText="Clear"
                              BtnName={<MdOutlineCancel />}
                              Placement="right"
                              onClick={(e) => {
                                handleRemoveFilter(
                                  e,
                                  filter.id,
                                  filter.filtercontroltype
                                );
                                setActiveFilterId(null);
                              }}
                              as="span"
                            />
                          )}
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      className={`${activeFilterId === filter.id && "active"}`}
                    >
                      {Tableloading ? (
                        <LoadingBtn />
                      ) : (
                        <>
                          {filter.name}
                          <span>
                            <IoIosArrowDown />
                          </span>
                        </>
                      )}
                    </button>
                  )}
                </OverlayTrigger>
              </>
            );
          } else if (
            //  filter.ismapped === true &&
            filter.filtercategory !== "additional" &&
            filter.filtercontroltype === "textbox"
          ) {
            let selectedValueLength =
              textFilter && textFilter[filter.id]?.value ? 1 : 0;
            return (
              <OverlayTrigger
                key={filter.id}
                trigger="click"
                placement={ScreenWidth > BreakpointSm ? "bottom-start" : "auto"}
                rootClose={true}
                show={popoverVisibility[filter.id]} // Use individual popover visibility
                onToggle={() => togglePopover(filter.id)} // Toggle popover visibility
                overlay={
                  <Popover
                    id={`popover-positioned-auto`}
                    className="custom-multi-select"
                  >
                    <Popover.Body>
                      <div className="content">
                        <div className="input-control">
                          <div className="header">
                            <p>{filter.name}</p>

                            <ArcToolTip
                              HoverText="Close"
                              BtnName={<MdOutlineCancel />}
                              Placement="left"
                              onClick={() => {
                                togglePopover(filter.id); // Close the popover
                                setActiveFilterId(null); // Optionally reset active filter ID
                              }}
                              as="span"
                            />
                          </div>
                          <div className="pop-content">
                            <div className="checkbox-div">
                              {renderFilterOptions(filter)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popover.Body>
                  </Popover>
                }
              >
                {selectedValueLength ? (
                  <button
                    className={`${activeFilterId === filter.id && "active"} ${
                      IsFilter && filter.name && "is-filter"
                    } ${Tableloading && "loading-btn"}`}
                  >
                    {Tableloading ? (
                      <LoadingBtn />
                    ) : (
                      <>
                        {filter.name}
                        <span className="down-arrow">
                          <IoIosArrowDown />
                        </span>
                        {IsFilter && filter.name && (
                          <ArcToolTip
                            className="cancel-btn"
                            HoverText="Clear"
                            BtnName={<MdOutlineCancel />}
                            Placement="right"
                            onClick={(e) => {
                              handleRemoveFilter(
                                e,
                                filter.id,
                                filter.filtercontroltype
                              );
                              setActiveFilterId(null);
                            }}
                            as="span"
                          />
                        )}
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    className={`${activeFilterId === filter.id && "active"}`}
                  >
                    {Tableloading ? (
                      <LoadingBtn />
                    ) : (
                      <>
                        {filter.name}
                        <span>
                          <IoIosArrowDown />
                        </span>
                      </>
                    )}
                  </button>
                )}
              </OverlayTrigger>
            );
          }
          return null;
        });
    }
  };

  const renderFilterOptions = (filter) => {
    if (matchedLookup[filter.masterid]) {
      const mastervalues = matchedLookup[filter.masterid].mastervalues;
      if (filter.filtercontroltype === "dropdown") {
        const sortedValues = SortingWithoutDirection(
          mastervalues,
          "optionvalue"
        );

        console.log(sortedValues);

        return (
          <>
            {console.log(mastervalues)}
            {sortedValues && (
              <Select
                defaultValue={
                  isFiltersCleared ? "" : selectedDropdownValue[filter.id] || ""
                }
                onChange={(selectedOption) =>
                  handleOptionChange(filter, selectedOption)
                }
                //openMenuOnClick={false}
                isClearable
                // defaultMenuIsOpen
                menuIsOpen
                classNamePrefix="custom-single-select"
                options={sortedValues.map((option) => ({
                  value: option.optionid,
                  label: option.optionvalue,
                }))}
                placeholder={`Select ${filter.name}`}
              ></Select>
            )}
            {APPLY_BUTTON_ENABLED === "true" && (
              <div className="footer-content">
                <button
                  className="cancel"
                  onClick={() => {
                    setActiveFilterId(null);
                    togglePopover(filter.id);
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleSelectSubmit(
                      filter.id,
                      selectedDropdownValue[filter.id]?.value || "",
                      // selectedOptions.apioutputskey,
                      filter.masterid,
                      filter.api_name,
                      filter.filtercontroltype
                    );
                    togglePopover(filter.id);
                    setPopoverVisibility({});
                  }}
                >
                  Apply
                </button>
              </div>
            )}
          </>
        );
      } else if (filter.filtercontroltype === "groupdropdown") {
        return (
          <>
            {/* <pre>{JSON.stringify(filter, null, 2)}</pre> */}
            <ArcTagFilter
              selectedItem={selectedFilterItem}
              setSelectedItem={setselectedFilterItem}
              lookupId={filter.masterid}
              datasetId={DataSetID}
              filterId={filter.id}
              filter={filter}
              // Name={"Tag Filter"}
              ListDefault={true}
              handleCheckboxChange={handleCheckboxTagfilter}
              selectedOptions={selectedOptions}
              isGroup={true}
            />
            {/* <pre>{JSON.stringify(selectedOptions, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(filter, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(selectedFilterItem, null, 2)}</pre> */}
          </>
        );
      } else if (filter.filtercontroltype === "multiselect") {
        const handleSearchChange = (event) => {
          setSearchTerm(event.target.value);
        };

        const sortedValues = SortingWithoutDirection(
          mastervalues,
          "optionvalue"
        );

        console.log(sortedValues);

        return (
          <>
            <>
              {console.log(mastervalues)}

              {mastervalues && (
                <div className="multiselect">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {sortedValues.filter((option) =>
                    option.optionvalue
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ).length === 0 ? (
                    <p style={{ paddingLeft: "10px" }}>No data found</p>
                  ) : (
                    <label>
                      <input
                        type="checkbox"
                        onChange={(event) =>
                          handleSelectAll(event, filter, mastervalues)
                        }
                        checked={
                          selectedOptions &&
                          selectedOptions.some(
                            (option) =>
                              option.id === filter.id &&
                              option.selectedValue.length ===
                                mastervalues.length
                          )
                        }
                      />
                      Select All
                    </label>
                  )}

                  {sortedValues
                    .filter((option) =>
                      option.optionvalue
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((option) => (
                      <label key={option.optionid}>
                        <input
                          type="checkbox"
                          checked={
                            isFiltersCleared
                              ? false
                              : selectedOptions?.some(
                                  (selectedOption) =>
                                    selectedOption.id === filter.id &&
                                    selectedOption.selectedValue.includes(
                                      option.optionid
                                    )
                                )
                          }
                          onChange={() =>
                            handleMultiselectChange(filter, option.optionid)
                          }
                        />
                        {option.optionvalue}
                      </label>
                    ))}
                </div>
              )}
              {APPLY_BUTTON_ENABLED === "true" && (
                <div className="footer-content">
                  <button
                    className="cancel"
                    onClick={() => {
                      setActiveFilterId(null);
                      togglePopover(filter.id);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const selectedOption = selectedOptions.find(
                        (option) => option.filterId === filter.id
                      );
                      if (selectedOption && selectedOption.selectedValue) {
                        handleMultiSubmit(
                          filter.id,
                          selectedOption.apioutputskey,
                          selectedOption.selectedValue,
                          filter.masterid,
                          filter.api_name,
                          filter.filtercontroltype
                        );
                        togglePopover(filter.id);
                        setPopoverVisibility({});
                      } else {
                        console.error(
                          "Selected option not found or does not have selectedValue"
                        );
                      }
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}
            </>
          </>
        );
      } else if (filter.filtercontroltype === "onclickloadmultiselect") {
        const handleSearchChange = (event) => {
          setSearchTerm(event.target.value);
        };

        return (
          <>
            <>
              {mastervalues && (
                <div className="multiselect">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {mastervalues.filter((option) =>
                    option.optionvalue
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ).length === 0 ? (
                    <p style={{ paddingLeft: "10px" }}>No data found</p>
                  ) : (
                    <label>
                      <input
                        type="checkbox"
                        onChange={(event) =>
                          handleSelectAll(event, filter, mastervalues)
                        }
                        checked={
                          selectedOptions &&
                          selectedOptions.some(
                            (option) =>
                              option.id === filter.id &&
                              option.selectedValue.length ===
                                mastervalues.length
                          )
                        }
                      />
                      Select All
                    </label>
                  )}

                  {mastervalues
                    .filter((option) =>
                      option.optionvalue
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((option) => (
                      <label key={option.optionid}>
                        <input
                          type="checkbox"
                          checked={
                            isFiltersCleared
                              ? false
                              : selectedOptions?.some(
                                  (selectedOption) =>
                                    selectedOption.id === filter.id &&
                                    selectedOption.selectedValue.includes(
                                      option.optionid
                                    )
                                )
                          }
                          onChange={() =>
                            handleMultiselectChange(filter, option.optionid)
                          }
                        />
                        {option.optionvalue}
                      </label>
                    ))}
                </div>
              )}
              {APPLY_BUTTON_ENABLED === "true" && (
                <div className="footer-content">
                  <button
                    className="cancel"
                    onClick={() => {
                      setActiveFilterId(null);
                      togglePopover(filter.id);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const selectedOption = selectedOptions.find(
                        (option) => option.filterId === filter.id
                      );
                      if (selectedOption && selectedOption.selectedValue) {
                        handleMultiSubmit(
                          filter.id,
                          selectedOption.apioutputskey,
                          selectedOption.selectedValue,
                          filter.masterid,
                          filter.api_name,
                          filter.filtercontroltype
                        );
                        togglePopover(filter.id);
                        setPopoverVisibility({});
                      } else {
                        console.error(
                          "Selected option not found or does not have selectedValue"
                        );
                      }
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}
            </>
          </>
        );
      }
      return 200;
    } else if (filter.filtercontroltype === "textbox") {
      return (
        <>
          <input
            className="popup-input"
            type="text"
            defaultValue={
              isFiltersCleared ? "" : textValues[filter.id]?.value || ""
            }
            onChange={(e) => handleTextChange(filter, e.target.value)}
            placeholder="Enter filter name"
          />

          <div className="footer-content">
            <button
              className="cancel"
              onClick={() => {
                setActiveFilterId(null);
                togglePopover(filter.id);
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleTextSubmit(
                  filter.id,
                  filter.api_name,
                  filter.filtercontroltype,
                  filter.filtercategory,
                  filter.name
                );
                togglePopover(filter.id);
                setPopoverVisibility({});
              }}
            >
              Apply
            </button>
          </div>
        </>
      );
    }
    return 999;
  };

  // Function to handle select all checkbox

  // const handleSelectAll = (event, filter, mastervalues) => {
  //   const isChecked = event.target.checked;
  //   const { id, api_name, filtercontroltype, filtercategory, masterid } =
  //     filter;
  //   const allOptionIds = mastervalues.map((option) => option.optionid);

  //   // Check if the object already exists in selectedOptions
  //   const existingIndex = selectedOptions.findIndex(
  //     (option) => option.id === id
  //   );

  //   if (existingIndex !== -1) {
  //     // Update selectedValue based on isChecked condition
  //     const updatedOptions = [...selectedOptions];
  //     updatedOptions[existingIndex].selectedValue = isChecked
  //       ? allOptionIds
  //       : [];
  //     if (APPLY_BUTTON_ENABLED === "false") {
  //       const value = [];
  //       if (isChecked) {
  //         dispatch(
  //           addSelectedFilter({
  //             id,
  //             selectedValue: allOptionIds,
  //             api_name,
  //           })
  //         );
  //         dispatch(setMultiselectChecked(masterid, allOptionIds, true));
  //         setActiveFilterId(null);
  //       } else {
  //         dispatch(
  //           addSelectedFilter({
  //             id,
  //             selectedValue: value,
  //             api_name,
  //           })
  //         );
  //         dispatch(setMultiselectChecked(masterid, value, true));
  //       }
  //     }
  //     setSelectedOptions(updatedOptions);
  //   } else {
  //     // If the object doesn't exist, push it as a new object to selectedOptions
  //     const newOption = {
  //       id: id,
  //       selectedValue: isChecked ? allOptionIds : [],
  //       masterid: masterid,
  //       api_name: api_name,
  //       filtercontroltype: filtercontroltype,
  //       filtercategory: filtercategory,
  //     };

  //     if (APPLY_BUTTON_ENABLED === "false") {
  //       if (isChecked) {
  //         dispatch(
  //           addSelectedFilter({
  //             id,
  //             selectedValue: allOptionIds,
  //             api_name,
  //           })
  //         );
  //         dispatch(setMultiselectChecked(masterid, allOptionIds, true));
  //         setActiveFilterId(null);
  //       }
  //     }

  //     setSelectedOptions((prevState) => [...prevState, newOption]);
  //   }
  // };
  const handleSelectAll = (event, filter, mastervalues) => {
    const isChecked = event.target.checked;
    const { id, api_name, filtercontroltype, filtercategory, masterid } =
      filter;
    const allOptionIds = mastervalues.map((option) => option.optionid);

    // Clone the previous state to avoid mutating it directly
    let updatedSelectedOptions = [...selectedOptions];

    // Update selectedValue for all objects with the matching id
    updatedSelectedOptions = updatedSelectedOptions.map((option) => {
      if (option.id === id) {
        return {
          ...option,
          selectedValue: isChecked ? allOptionIds : [],
        };
      }
      return option;
    });

    // If no object with the matching id exists, add a new object
    if (!updatedSelectedOptions.some((option) => option.id === id)) {
      updatedSelectedOptions.push({
        id: id,
        selectedValue: isChecked ? allOptionIds : [],
        masterid,
        api_name,
        filtercontroltype,
        filtercategory,
      });
    }

    if (APPLY_BUTTON_ENABLED === "false") {
      const value = isChecked ? allOptionIds : [];
      dispatch(
        addSelectedFilter({
          id,
          selectedValue: value,
          api_name,
        })
      );
      dispatch(setMultiselectChecked(masterid, value, true));
      setActiveFilterId(null);
    }

    setSelectedOptions(updatedSelectedOptions);
  };

  const handleOptionChange = (filter, value) => {
    const { id, api_name, filtercontroltype, filtercategory, masterid } =
      filter;
    setSelectedDropdownValue((prevState) => {
      const updatedState = {
        ...prevState,
        [id]: value,
        api_name,
        filtercontroltype,
        filtercategory,
        isChecked: true,
      };

      // console.log(updatedState); // Check if the state is updated correctly
      return updatedState;
    });

    if (APPLY_BUTTON_ENABLED === "false") {
      const Value = value?.value || [];
      const selectedValue = Array.isArray(Value) ? Value : [Value];
      dispatch(
        addSelectedFilter({
          id,
          selectedValue,
          api_name,
        })
      );
      dispatch(setDropdownChecked(masterid, Value, true)); // Dispatch setOptionChecked with isChecked true
      togglePopover(id);
      setPopoverVisibility({});
    }
  };

  // !handleCheckboxTagfilter
  const handleCheckboxTagfilter = (mastervalue, filter) => {
    const { id, api_name, filtercontroltype, filtercategory, masterid } =
      filter;
    const selectedOptionId = mastervalue.optionid;

    // Toggle selection in selectedFilterItem
    setselectedFilterItem((prevSelectedItem) => {
      const isSelected = prevSelectedItem.some(
        (selected) => selected.optionid === selectedOptionId
      );

      if (isSelected) {
        return prevSelectedItem
          .filter((selected) => selected.optionid !== selectedOptionId)
          .map((item) => ({
            ...item,
            isChecked:
              item.optionid !== selectedOptionId ? item.isChecked : false,
          }));
      } else {
        return [
          ...prevSelectedItem,
          {
            ...mastervalue,
            isChecked: true,
          },
        ];
      }
    });
    // Clone selectedOptions state

    let updatedSelectedOptions = [...selectedOptions];

    // Function to update or remove selectedOptionId
    const updateSelectedOption = (option) => {
      const selectedOptionIndex =
        option.selectedValue.indexOf(selectedOptionId);
      if (selectedOptionIndex !== -1) {
        return {
          ...option,
          selectedValue: option.selectedValue.filter(
            (value) => value !== selectedOptionId
          ),
        };
      } else {
        return {
          ...option,
          selectedValue: [...option.selectedValue, selectedOptionId],
        };
      }
    };

    // Update selectedOptions with updatedSelectedOption
    updatedSelectedOptions = updatedSelectedOptions.map((option) => {
      if (option.id === id) {
        return updateSelectedOption(option);
      }
      return option;
    });

    // Add new object if no matching object found
    if (!updatedSelectedOptions.some((option) => option.id === id)) {
      updatedSelectedOptions.push({
        id: id,
        selectedValue: [selectedOptionId],
        masterid,
        api_name: api_name,
        filtercontroltype: filtercontroltype,
        filtercategory: filtercategory,
      });
    }

    // Dispatch actions if APPLY_BUTTON_ENABLED is false
    if (APPLY_BUTTON_ENABLED === "false") {
      const selectedOption = updatedSelectedOptions.find(
        (option) => option.id === id
      );
      if (selectedOption && selectedOption.selectedValue) {
        const selectedValueArray = Array.isArray(selectedOption.selectedValue)
          ? selectedOption.selectedValue
          : [selectedOption.selectedValue];
        dispatch(
          addSelectedFilter({
            id,
            selectedValue: selectedValueArray,
            api_name,
          })
        );
        dispatch(
          setMultiselectChecked(masterid, selectedOption.selectedValue, true)
        );
        setActiveFilterId(null);
      }
    }

    // Update state with setSelectedOptions
    setSelectedOptions(updatedSelectedOptions);
  };
  //new function for handleMultiselectChange

  const handleMultiselectChange = (filter, selectedOptionId) => {
    const { id, api_name, filtercontroltype, filtercategory, masterid } =
      filter;
    console.log(selectedOptionId);

    // Clone the previous state to avoid mutating it directly
    let updatedSelectedOptions = [...selectedOptions];

    // Function to update or remove selectedOptionId
    const updateSelectedOption = (option) => {
      const selectedOptionIndex =
        option.selectedValue.indexOf(selectedOptionId);

      if (selectedOptionIndex !== -1) {
        // If the selectedOptionId exists, remove it
        return {
          ...option,
          selectedValue: option.selectedValue.filter(
            (value) => value !== selectedOptionId
          ),
        };
      } else {
        // If the selectedOptionId doesn't exist, add it
        return {
          ...option,
          selectedValue: [...option.selectedValue, selectedOptionId],
        };
      }
    };

    // Update all matching objects' selectedValue
    updatedSelectedOptions = updatedSelectedOptions.map((option) => {
      if (option.id === id) {
        return updateSelectedOption(option);
      }
      return option;
    });

    // If no matching object is found, add it as a new object
    if (!updatedSelectedOptions.some((option) => option.id === id)) {
      updatedSelectedOptions.push({
        id: id,
        selectedValue: [selectedOptionId],
        masterid,
        api_name: api_name,
        filtercontroltype: filtercontroltype,
        filtercategory: filtercategory,
      });
    }

    console.log(updatedSelectedOptions);

    if (APPLY_BUTTON_ENABLED === "false") {
      const selectedOption = updatedSelectedOptions.find(
        (option) => option.id === id
      );
      console.log(selectedOption);
      if (selectedOption && selectedOption.selectedValue) {
        const Value = selectedOption.selectedValue;
        const selectedValueArray = Array.isArray(Value) ? Value : [Value];
        console.log(selectedValueArray);
        dispatch(
          addSelectedFilter({
            id,
            selectedValue: selectedValueArray,
            api_name,
          })
        );
        dispatch(setMultiselectChecked(masterid, Value, true));
        setActiveFilterId(null);
      }
    }

    setSelectedOptions(updatedSelectedOptions);
  };

  const handleTextChange = (filter, value) => {
    const { id, api_name, filtercontroltype, filtercategory, name } = filter;
    setTextValues((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        value: value,
        id: id,
        api_name: api_name || prevState[api_name]?.api_name,
        filtercontroltype: filtercontroltype,
        filtercategory: filtercategory,
        name: name,
      },
    }));
  };
  const handleTextSubmit = (id, api_name, controltype, category, name) => {
    let selectedValue =
      textValues && textValues[id] ? textValues[id].value : null;
    // Here you can use selectedValue and filterId as needed
    if (selectedValue !== null && !Array.isArray(selectedValue)) {
      selectedValue = [selectedValue];
    }

    if (selectedValue) {
      dispatch(
        addSelectedFilter({
          id,
          selectedValue,
          api_name,
          controltype,
          category,
          name,
        })
      );

      dispatch(setTextValue(textValues));
    } else {
      //dispatch(removeSelectedFilter(id));
      dispatch(setTextValue({}));
    }
  };
  const handleSelectSubmit = (
    filterId,
    optionId,
    masterid,
    screenfieldid,
    controltype
  ) => {
    const Value = selectedDropdownValue[filterId]?.value || [];
    const selectedValue = Array.isArray(Value) ? Value : [Value];

    // if (selectedValue.length > 0) {
    //   dispatch(
    //     addSelectedFilter({
    //       filterId,
    //       selectedValue,
    //       screenfieldid,
    //       controltype,
    //     })
    //   );
    //   dispatch(setOptionChecked(masterid, Value, true));
    // } else {
    //   dispatch(removeSelectedFilter(filterId));
    //   dispatch(setOptionChecked(masterid, Value, true));
    // }
  };

  const handleMultiSubmit = (
    filterId,
    apioutputskey,
    optionId,
    masterid,
    screenfieldid,
    controltype
  ) => {
    const selectedOption = selectedOptions.find(
      (option) => option.filterId === filterId
    );
    if (selectedOption && selectedOption.selectedValue) {
      const Value = selectedOption.selectedValue;
      const selectedValue = Array.isArray(Value) ? Value : [Value];

      //   if (selectedValue.length > 0) {
      //     dispatch(
      //       addSelectedFilter({
      //         filterId,
      //         selectedValue,
      //         screenfieldid,
      //         controltype,
      //       })
      //     );
      //     dispatch(setMultiOptionChecked(masterid, Value, true));
      //   } else {
      //     dispatch(removeSelectedFilter(filterId));
      //     dispatch(setMultiOptionChecked(masterid, Value, true));
      //   }
    }
  };

  const handleRemoveFilter = (e, id, controltype) => {
    e.stopPropagation();

    // Dispatch the removeSelectedFilter action with the filterId as payload
    dispatch(removeQuickFilter({ id, controltype }));
    dispatch(resetCheckedValues(id));

    // Remove filterId from selectedOptions if it's not empty
    setSelectedOptions((prevItems) =>
      prevItems?.filter((item) => item.id !== id)
    );

    // Remove filterId from selectedDropdownValue
    setSelectedDropdownValue((prevItems) => {
      // Create a copy of the previous selectedDropdownValue
      const updatedDropdownValue = { ...prevItems };
      // Remove the item with the specified filterId from selectedDropdownValue
      delete updatedDropdownValue[id];
      // Return the updated selectedDropdownValue
      return updatedDropdownValue;
    });

    // Update textValues if it's not empty
    setTextValues((prevTextValues) => {
      // Ensure textValues is initialized properly
      if (!prevTextValues) return {};

      // Create a copy of the previous textValues
      const updatedTextValues = { ...prevTextValues };
      // Remove the item with the specified filterId from textValues
      delete updatedTextValues[id];
      // Return the updated textValues
      return updatedTextValues;
    });
  };

  const clearFilters = () => {
    const filterIDs = quickFilterData.map((item) => item.id);
    //      .filter((item) => item.ismapped)

    // Collect unique filter IDs from selectedFilters
    const selectedFilterIDs = [
      ...new Set(
        selectedFilters
          .filter(
            (item) => item.apiname !== "workweek" && item.apiname !== "workday"
          )
          .map((item) => item.filterid)
      ),
    ];
    console.log(selectedFilterIDs);
    // Collect unique filter IDs from AdvancedFilters
    const advancedFilterIDs = [
      ...new Set(additionalFilters.map((item) => item.filterid)),
    ];
    console.log(advancedFilterIDs);
    // Merge both arrays of filter IDs and remove duplicates
    const allFilterIDs = [
      ...new Set([...selectedFilterIDs, ...advancedFilterIDs]),
    ];
    console.log(allFilterIDs);
    dispatch(removeAllFilters(allFilterIDs));
    // dispatch(removeAdvancedFilter(allFilterIDs));
    dispatch(resetCheckedValues(filterIDs));
    // dispatch(resetDatefilters());
    setStartDate(new Date());
    setSelectedYear(currentYear);
    setSelectedWeek(currentWeek);
    setSelectedOptions([]);
    setSelectedDropdownValue({});
    setTextValues({});
    setIsFiltersCleared(true); // Update state to indicate filters are cleared
    //  dispatch(clearSelectedItems(filterIDs));
    console.log("it runs");
  };

  return (
    <>
      {renderFilterButtons()}
      {Tableloading ? (
        <LoadingBtn />
      ) : (
        <>
          <button className="clear-filter" onClick={clearFilters}>
            <MdOutlineFilterListOff /> Clear Filter
          </button>
        </>
      )}
    </>
  );
};

export default QuickFilterHeader;

const LoadingBtn = () => {
  return <MySkeleton height={15} radius={0} width={100} clsnme="loading-btn" />;
};
