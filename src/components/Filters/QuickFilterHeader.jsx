import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import Select from "react-select";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { MdOutlineFilterListOff } from "react-icons/md";

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
} from "@/redux/listpage/selector";
import {
  setMatchedLookup,
  addSelectedFilter,
  setMultiselectChecked,
  setDropdownChecked,
  removeQuickFilter,
  removeAllFilters,
  setTextValue,
  resetCheckedValues,
} from "@/redux/listpage/actions";

const QuickFilterHeader = ({ filters, Tableloading }) => {
  const dispatch = useDispatch();

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

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilterId, setActiveFilterId] = useState(null);
  const [optionSelected, setOptionSelected] = useState(null);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState({});
  const [textValues, setTextValues] = useState({});
  const [isFiltersCleared, setIsFiltersCleared] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  // const quickFilterData = useSelector(selectquickFilterData);
  const DataSetID = useSelector(dataSetIDInfo);

  // Define state to track popover visibility for each filter
  const [popoverVisibility, setPopoverVisibility] = useState({});
  // Function to toggle popover visibility for a specific filter
  const togglePopover = (filterId) => {
    setPopoverVisibility((prevState) => ({
      ...prevState,
      [filterId]: !prevState[filterId], // Toggle visibility
    }));
  };
  console.log(APPLY_BUTTON_ENABLED);

  const [IsFilter, setIsFilter] = useState(true);
  //const masterData = useSelector(selectlookupInfo);
  const textFilter = useSelector(textFilterInfo);
  console.group("options");
  console.log("selectedOptions", selectedOptions);
  console.log("selectedDropdownValue", selectedDropdownValue);
  console.log("textValues", textValues);
  console.log("textFilter", textFilter);
  console.groupEnd();
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
    dispatch(setMatchedLookup(""));
  }, [DataSetID]);

  useEffect(() => {
    // Check if any of the selectedOptions, selectedDropdownValue, or textValues have any value
    const hasValue =
      selectedOptions.length > 0 ||
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
            console.log(masterData);
            const matchingLookup = masterData.find(
              (lookup) => lookup.masterid === filter.masterid
            );
            console.log(matchingLookup);
            if (matchingLookup) {
              let newMatchingLookup = {};
              console.log(matchedLookup);
              if (Object.keys(matchedLookup).length === 0) {
                // If matchedLookup is empty, set matchingLookup directly to newMatchingLookup
                newMatchingLookup = matchingLookup;
              } else {
                const matchedObject = Object.values(matchedLookup).find(
                  (obj) => obj.masterid === matchingLookup.masterid
                );
                console.log(matchedObject);
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
              console.log(newMatchingLookup);
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
              const existingOptionIndex = updatedSelectedOptions.findIndex(
                (option) => option.id === item.id
              );

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
              dispatch(
                setMultiselectChecked(item.masterid, selectValues, true)
              );
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

      setSelectedOptions(updatedSelectedOptions);
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

            const selectedValueLength = filterOptions.filter(
              (option) => option.isChecked
            ).length;

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
                              handleRemoveFilter(e, filter.id);
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
                              handleRemoveFilter(e, filter.id);
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
        return (
          <>
            {mastervalues && (
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
                options={mastervalues.map((option) => ({
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
      } else if (filter.filtercontroltype === "multiselect") {
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
                            option.selectedValue.length === mastervalues.length
                        )
                      }
                    />
                    Select All
                  </label>
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
                              : selectedOptions.some(
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
      if (!filter.masterid) {
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
    }
    return 999;
  };

  // Function to handle select all checkbox
  const handleSelectAll = (event, filter, mastervalues) => {
    const isChecked = event.target.checked;
    const { id, api_name, filtercontroltype, filtercategory, masterid } =
      filter;
    const allOptionIds = mastervalues.map((option) => option.optionid);

    // Check if the object already exists in selectedOptions
    const existingIndex = selectedOptions.findIndex(
      (option) => option.id === id
    );

    if (existingIndex !== -1) {
      // Update selectedValue based on isChecked condition
      const updatedOptions = [...selectedOptions];
      updatedOptions[existingIndex].selectedValue = isChecked
        ? allOptionIds
        : [];
      setSelectedOptions(updatedOptions);
    } else {
      // If the object doesn't exist, push it as a new object to selectedOptions
      const newOption = {
        id: id,
        selectedValue: isChecked ? allOptionIds : [],
        masterid: masterid,
        api_name: api_name,
        filtercontroltype: filtercontroltype,
        filtercategory: filtercategory,
      };
      setSelectedOptions((prevState) => [...prevState, newOption]);
    }

    if (APPLY_BUTTON_ENABLED === "false") {
      const value = [];
      if (isChecked) {
        dispatch(setMultiselectChecked(masterid, allOptionIds, true));
      } else {
        dispatch(setMultiselectChecked(masterid, value, true));
      }
    }
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

  //new function for handleMultiselectChange
  const handleMultiselectChange = (filter, selectedOptionId) => {
    const { id, api_name, filtercontroltype, filtercategory, masterid } =
      filter;
    console.log(selectedOptionId);
    setSelectedOptions((prevState) => {
      // Clone the previous state to avoid mutating it directly
      let updatedSelectedOptions = [...prevState];

      // Check if the filterId already exists in the state
      const existingOptionIndex = updatedSelectedOptions.findIndex(
        (option) => option.id === id
      );

      if (existingOptionIndex !== -1) {
        // If the filterId exists, update its selectedValue or remove the selectedOptionId if it's already present
        const selectedOptionIndex =
          updatedSelectedOptions[existingOptionIndex].selectedValue.indexOf(
            selectedOptionId
          );

        if (selectedOptionIndex !== -1) {
          // If the selectedOptionId exists, remove it
          updatedSelectedOptions[existingOptionIndex] = {
            ...updatedSelectedOptions[existingOptionIndex],
            selectedValue: updatedSelectedOptions[
              existingOptionIndex
            ].selectedValue.filter((value) => value !== selectedOptionId),
          };
        } else {
          // If the selectedOptionId doesn't exist, add it
          updatedSelectedOptions[existingOptionIndex] = {
            ...updatedSelectedOptions[existingOptionIndex],
            selectedValue: [
              ...updatedSelectedOptions[existingOptionIndex].selectedValue,
              selectedOptionId,
            ],
          };
        }
      } else {
        // If the filterId doesn't exist, add it as a new object without removing existing objects
        updatedSelectedOptions.push({
          id: id,
          selectedValue: [selectedOptionId],
          masterid,
          api_name: api_name,
          filtercontroltype: filtercontroltype,
          filtercategory: filtercategory,
        });
      }
      return updatedSelectedOptions;
    });
    console.log(id);
  };
  useEffect(() => {
    // This code will be executed after selectedOptions state has been updated
    if (APPLY_BUTTON_ENABLED === "false") {
      console.log(selectedOptions);
      selectedOptions.forEach((selectedOption) => {
        const { id, api_name, selectedValue, masterid } = selectedOption;
        console.log(selectedOption);
        if (selectedValue) {
          console.log("it runs");
          const Value = selectedValue;
          console.log(Value);
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
      });
    }
  }, [selectedOptions]);

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
  const handleTextSubmit = (id, api_name, filtercontroltype, name) => {
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

  const handleRemoveFilter = (e, id) => {
    e.stopPropagation();

    // Dispatch the removeSelectedFilter action with the filterId as payload
    dispatch(removeQuickFilter(id));
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
    const filterIDs = quickFilterData      
      .map((item) => item.id);
      //.filter((item) => item.ismapped)

    // Collect unique filter IDs from selectedFilters
    const selectedFilterIDs = [
      ...new Set(selectedFilters.map((item) => item.filterid)),
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

    setSelectedOptions([]);
    setSelectedDropdownValue({});
    setTextValues({});
    setIsFiltersCleared(true); // Update state to indicate filters are cleared
    //  dispatch(clearSelectedItems(filterIDs));
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
