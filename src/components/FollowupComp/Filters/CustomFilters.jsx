import React, { useContext, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";

import { IoFilterSharp } from "react-icons/io5";

import { MdOutlineCancel } from "react-icons/md";
import ArcAlertPopup from "@/components/arccomponents/ui-components/ArcAlertPopup/ArcAlertPopup";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";

import {
  selectedFiltersInfo,
  additionalFiltersInfo,
  weekFilterInfo,
} from "@/redux/Followup/selector";

import Form from "react-bootstrap/Form";

import { GrDrag } from "react-icons/gr";

import { RiListSettingsLine } from "react-icons/ri";

import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

//Custom 1

import { Dropdown, DropdownButton } from "react-bootstrap";

import { FiPlusCircle } from "react-icons/fi";

import Select from "react-select";

import { PiArrowBendRightUpThin } from "react-icons/pi";
import {
  addFilterDataInfo,
  masterDataInfo,
  advMatchedLookupInfo,
  // additionalFiltersInfo,
  dataSetIDInfo,
  dataSetInfo,
  quickFilterDataInfo,
  matchedLookupInfo,
  textFilterInfo,
  clearFiltersInfo,
} from "@/redux/Followup/selector";
import {
  setAdvMatchedLookup,
  addSelectedCustomFilter,
  setAdvMultiOptionChecked,
  setAdvOptionChecked,
  toggleFilterMapping,
  removeAdvancedFilter,
  addSelectedFilter,
  setMultiselectChecked,
} from "@/redux/Followup/actions";
import ArcFilterAutoComplete from "@/components/arccomponents/ui-components/ArcAutoComplete/ArcFilterAutoComplete";

export const CustomFilters = ({
  CustomFilterPopup,
  setCustomFilterPopup,
  CustomebuttonRef,
  updateSelectedItemsLength,
  setquickSelectedOptions,
  quickSelectedOptions,
  setcustomTextValues,
}) => {
  const [ArcOffCanvaShow, setArcOffCanvaShow] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const handleArcOffCanvaClose = () => {
    setArcOffCanvaShow(false);
    setSearchTerm("");
  };

  // const handleArcOffCanvaClose = () => setArcOffCanvaShow(false);
  const handleArcOffCanvaShow = () => setArcOffCanvaShow(true);

  const filterData = useSelector(quickFilterDataInfo);
  console.log(filterData);

  const dataSet = useSelector(dataSetInfo);
  console.log(dataSet);
  //const {}

  const [ArcPopupshow, setArcPopupshow] = useState(false);
  const [CurrentAttribute, setCurrentAttribute] = useState([]);
  // const filterData = useSelector(selectfilterdata);

  const textFilter = useSelector(textFilterInfo);
  //const datePickerFilter = useSelector(datePickerFilterInfo);
  //  console.log(datePickerFilter);
  const weekFilter = useSelector(weekFilterInfo);
  console.log(weekFilter);

  const matchedLookup = useSelector(matchedLookupInfo);
  console.log(matchedLookup);

  const clearFilters = useSelector(clearFiltersInfo);
  const selectedFilters = useSelector(selectedFiltersInfo);
  const selectedFiltersLength = selectedFilters.length;

  const [mappedCheckboxes, setMappedCheckboxes] = useState({}); // State to track mapped checkboxes
  const [unmappedCheckboxes, setUnmappedCheckboxes] = useState({});

  const payloadMap = selectedFilters?.map((item) => item.filterid);
  console.log(payloadMap);

  useEffect(() => {
    const initialMappedCheckboxes = {};
    const initialUnmappedCheckboxes = {};

    filterData.forEach((item) => {
      if (item.ismapped !== undefined) {
        if (item.ismapped) {
          initialMappedCheckboxes[item.id] = item.ismapped;
        } else {
          initialUnmappedCheckboxes[item.id] = false;
        }
      }
    });

    setMappedCheckboxes(initialMappedCheckboxes);
    setUnmappedCheckboxes(initialUnmappedCheckboxes);
  }, [ArcOffCanvaShow, filterData]);

  console.log(mappedCheckboxes);
  console.log(unmappedCheckboxes);
  const handleCheckboxChangeMapped = (id, isChecked) => {
    console.log(id);
    setMappedCheckboxes((prevState) => ({
      ...prevState,
      [id]: isChecked,
    }));
  };

  const handleCheckboxChangeUnmapped = (id, isChecked) => {
    console.log(id);
    setUnmappedCheckboxes((prevState) => ({
      ...prevState,
      [id]: isChecked,
    }));
  };

  const handleArcAlertPopup = () => {
    console.log(CurrentAttribute);

    payloadMap.forEach((currentAttrId) => {
      // Find the matched object in matchedLookup based on the payloadMap
      CurrentAttribute.forEach((id) => {
        const matchedObject = Object.values(matchedLookup).find(
          (obj) => obj.id === id
        );
        console.log(matchedObject);
        if (matchedObject) {
          const { id, api_name, masterid, filtercontroltype, filtercategory } =
            matchedObject;
          const value = [];

          dispatch(
            addSelectedFilter({
              id,
              selectedValue: value,
              api_name,
              controltype: filtercontroltype,
              category: filtercategory,
            })
          );
          const removeSelectedOptions = quickSelectedOptions.filter(
            (filter) => filter.id !== id
          );
          console.log(removeSelectedOptions);
          setquickSelectedOptions(removeSelectedOptions);

          dispatch(setMultiselectChecked(masterid, value, true));
        }
        if (textFilter != {}) {
          console.log(textFilter);
          console.log(Object.keys(textFilter));
          const matchedText = Object.values(textFilter)?.find(
            (obj) => obj.id === id
          );
          console.log(matchedText);
          if (matchedText) {
            const { id, api_name, filtercategory, filtercontroltype } =
              matchedText;
            const value = "";
            //dispatch(clearTextFilter({ id }));
            dispatch(
              addSelectedFilter({
                id,
                selectedValue: value,
                api_name,
                category: filtercategory,
                controltype: filtercontroltype,
              })
            );
            // dispatch(resetTextFilter());
            setcustomTextValues({});
            // dispatch(clearTextFilter());
          }
        }

        // if (matchedText) {
        //   const { id, api_name, masterid } = matchedText;
        //   const value = "";
        //   dispatch(
        //     addSelectedFilter({
        //       id,
        //       selectedValue: value,
        //       api_name,
        //     })
        //   );
        // }

        // if (textFilter.hasOwnProperty(id)) {
        //   console.log(textFilter);
        //   const { id, api_name } = textFilter;
        //   console.log("Removing filter:", id);
        //   // delete textFilter[id]; // Removing filter from the local textFilter object

        //   // Dispatch action to update filter status
        //   dispatch(addSelectedFilter({ id, api_name, selectedValue: "" }));
        // }
      });
    });
    dispatch(toggleFilterMapping(CurrentAttribute));
    setArcPopupshow(false);
    handleArcOffCanvaClose();
  };
  const handleApplyButtonClick = () => {
    const selectedMappedAttributes = Object.keys(mappedCheckboxes).filter(
      (id) => mappedCheckboxes[id] === false
    );

    const selectedUnmappedAttributes = Object.keys(unmappedCheckboxes).filter(
      (id) => unmappedCheckboxes[id] === true
    );

    const selectedAttributes = [
      ...selectedMappedAttributes,
      ...selectedUnmappedAttributes,
    ];
    console.log(selectedAttributes);
    setCurrentAttribute(selectedAttributes);
    const existingFilters = selectedMappedAttributes.filter((id) =>
      payloadMap?.includes(id)
    );
    console.log(existingFilters);
    if (existingFilters.length > 0) {
      setArcPopupshow(true);
    } else {
      dispatch(toggleFilterMapping(selectedAttributes));
      handleArcOffCanvaClose();
    }
    //  dispatch(toggleFilterMapping(selectedAttributes));
  };

  const quickFilters = useSelector(selectedFiltersInfo);
  const quickFiltersLength = quickFilters.length;

  const additionalFilters = useSelector(additionalFiltersInfo);
  const additionalFiltersLength = additionalFilters.length;

  const totalFiltersApplied = quickFiltersLength + additionalFiltersLength;

  const dispatch = useDispatch();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState([]);
  const [textValues, setTextValues] = useState({});

  const filterAddData = useSelector(addFilterDataInfo);
  console.log(filterAddData);

  const DataSetID = useSelector(dataSetIDInfo);
  const masterData = useSelector(masterDataInfo);

  const advMatchedLookup = useSelector(advMatchedLookupInfo);
  console.log("advMatchedLookup", advMatchedLookup);

  //const additionalFilters = useSelector(additionalFiltersInfo);
  const AdvancedFiltersLength = additionalFilters?.length;
  const [selectedItems, setSelectedItems] = useState([]);
  const handleCustomFilterPopup = () => {
    console.log("it runs");
    setCustomFilterPopup(false);
    setArcOffCanvaShow(false);
    setSearchTerm("");
  };

  useEffect(() => {
    console.log("it runs");
    setSelectedItems([]);
    setSelectedDropdown([]);
    setSelectedOptions([]);
    setTextValues({});
  }, [DataSetID, clearFilters]);

  const handleItemClick = (item) => {
    console.log("it runs");
    // Check if the item is already present in selectedItems
    const isItemAlreadySelected = selectedItems.some(
      (selectedItem) => selectedItem.id === item.id
    );

    // If the item is not already selected, update selectedItems
    if (!isItemAlreadySelected) {
      setSelectedItems((prevSelectedItems) => [item, ...prevSelectedItems]);
    }
  };

  //   console.log("ADVtextFilter", advTextFilter);
  console.log("ADVselectedItems", selectedItems);
  console.log("ADVtextValues", textValues);
  console.log("ADVselectedOptions", selectedOptions);
  console.log("ADVselectedDropdown", selectedDropdown);

  useEffect(() => {
    if (
      filterAddData &&
      filterAddData.length > 0 &&
      masterData &&
      masterData.length > 0
    ) {
      console.log("it runs");
      console.log(filterAddData);
      // Create a map to store unique filters based on filterid
      const uniqueFiltersMap = new Map();

      // Iterate over each object in filterDataList
      filterAddData.forEach((filter) => {
        if (
          !uniqueFiltersMap.has(filter.id) ||
          (filter.filtercategory === "additional" &&
            uniqueFiltersMap.get(filter.id).filtercategory !== "additional")
        ) {
          uniqueFiltersMap.set(filter.id, filter);
        }
      });
      console.log(uniqueFiltersMap);
      // Iterate over the unique filters and process each one
      uniqueFiltersMap.forEach((filter) => {
        if (filter.masterid) {
          const matchingLookup = masterData.find(
            (lookup) => lookup.masterid === filter.masterid
          );
          console.log(matchingLookup);
          if (matchingLookup) {
            let newMatchingLookup = {};

            if (Object.keys(advMatchedLookup).length === 0) {
              // If matchedLookup is empty, set matchingLookup directly to newMatchingLookup
              newMatchingLookup = matchingLookup;
            } else {
              const matchedObject = Object.values(advMatchedLookup).find(
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
            console.log(newMatchingLookup);
            if (newMatchingLookup) {
              // Split defaultvalue into individual values if it contains commas
              let defaultValues = [];

              if (
                filter.filtercategory !== "quick" &&
                filter.defaultvalue !== null
              ) {
                defaultValues = filter.defaultvalue
                  .split(",")
                  .map((value) => value.trim());
              }
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
              dispatch(setAdvMatchedLookup(updatedMatchingLookup));
            }
          }
        }
      });
    }
  }, [filterAddData, masterData]);

  useEffect(() => {
    if (
      filterAddData &&
      filterAddData.length > 0 &&
      masterData &&
      masterData.length > 0
    ) {
      console.log("it runs");
      const updatedSelectedOptions = [...selectedOptions];
      const updatedTextValues = { ...textValues };
      filterAddData.forEach((item) => {
        if (
          item.filtercontroltype === "multiselect" &&
          item.filtercategory !== "quick" &&
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
            const defaultValues = item.defaultvalue
              .split(",")
              .map((value) => value.trim());

            const defaultOptions = lookupDetail.mastervalues.filter((value) =>
              defaultValues.includes(value.optionid)
            );

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
                  api_name: item.api_name,
                  filtercontroltype: item.filtercontroltype,
                });
              }

              dispatch(
                setAdvMultiOptionChecked(item.masterid, selectValues, true)
              );
            });
          }
        } else if (
          item.filtercontroltype === "textbox" &&
          item.defaultvalue !== null &&
          item.defaultvalue !== "" &&
          item.filtercategory !== "quick"
        ) {
          let filterValues = {};
          // Update textValues if control type is textbox and default value is not null or empty string
          updatedTextValues[item.id] = {
            value: item.defaultvalue,
            id: item.id,
            api_name: item.api_name,
            filtercontroltype: item.filtercontroltype,
          };
          if (item.defaultvalue) {
            filterValues[item.id] = {
              value: item.defaultvalue,
              id: item.id,
              api_name: item.api_name,
              filtercontroltype: item.filtercontroltype,
            };
            console.log(filterValues);
            // dispatch(setAdvTextValue(filterValues));
          }
        }
      });

      setSelectedOptions(updatedSelectedOptions);
      setTextValues(updatedTextValues);
      setSelectedDropdown((prevState) => {
        let updatedSelectedOption = prevState ? { ...prevState } : {};

        filterAddData.forEach((item) => {
          if (
            item.filtercontroltype === "dropdown" &&
            item.filtercategory !== "quick" &&
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
              if (defaultOption) {
                dispatch(
                  setAdvOptionChecked(
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
  }, [filterAddData, masterData]);

  useEffect(() => {
    if (advMatchedLookup) {
      setSelectedItems((prevSelectedItems) => {
        let updatedSelectedItems = [...prevSelectedItems];

        let updatedOptions = [...selectedOptions];

        Object.values(advMatchedLookup).forEach((lookup) => {
          // Check if the lookup object contains masterid and mastervalues

          if (lookup.masterid && lookup.mastervalues) {
            if (lookup.mastervalues.some((value) => value.isChecked === true)) {
              if (Array.isArray(prevSelectedItems)) {
                const existingItemIndex = prevSelectedItems.findIndex(
                  (item) => item.masterid === lookup.masterid
                );
                if (existingItemIndex !== -1) {
                  const existingItem = prevSelectedItems[existingItemIndex];
                  const hasValueChanged =
                    JSON.stringify(existingItem.mastervalues) !==
                    JSON.stringify(lookup.mastervalues);

                  if (hasValueChanged) {
                    updatedSelectedItems[existingItemIndex] = lookup;
                  }
                } else {
                  updatedSelectedItems.push(lookup);
                }

                // Update selectedOptions
                const selectedValue = lookup.mastervalues
                  .filter((value) => value.isChecked)
                  .map((value) => value.optionid);

                const existingOptionIndex = updatedOptions.findIndex(
                  (option) => option.filterId === lookup.filterid
                );
                if (selectedValue !== "") {
                  if (existingOptionIndex !== -1) {
                    updatedOptions[existingOptionIndex] = {
                      id: lookup.id,
                      selectedValue: selectedValue,
                      api_name: lookup.api_name,
                      filtercontroltype: lookup.filtercontroltype,
                    };
                  } else {
                    updatedOptions.push({
                      id: lookup.id,
                      selectedValue: selectedValue,
                      api_name: lookup.api_name,
                      filtercontroltype: lookup.filtercontroltype,
                    });
                  }
                }
                if (selectedValue.length > 0) {
                  const filterValues = {
                    id: lookup.id,
                    selectedValue: selectedValue,
                    api_name: lookup.api_name,
                    filtercontroltype: lookup.filtercontroltype,
                  };

                  // Dispatch the object to addSelectedFilter
                  //dispatch(setDefaultAdvSelectedFilter(filterValues));
                }
              } else {
                console.log(lookup);
                updatedSelectedItems.push(lookup);
              }
            }
          }
        });

        //  setSelectedOptions(updatedOptions);
        console.log(updatedSelectedItems);
        return updatedSelectedItems;
      });
    }
  }, [advMatchedLookup]);

  useEffect(() => {
    if (filterAddData && filterAddData.length > 0) {
      setSelectedItems((prevSelectedItems) => {
        // Create a copy of selectedItems to ensure the latest version
        let updatedSelectedItems = [...prevSelectedItems];

        // Filter out objects based on conditions
        const filteredItems = filterAddData.filter((item) => {
          return (
            item.filtercontroltype === "textbox" &&
            item.filtercategory === "additional" &&
            item.defaultvalue !== "" &&
            item.defaultvalue !== null
          );
        });

        // Set filtered items in updatedSelectedItems
        updatedSelectedItems = filteredItems;

        // Return updatedSelectedItems to set as the new state
        return updatedSelectedItems;
      });
    }
  }, [filterAddData]);

  useEffect(() => {
    if (additionalFilters.length > 0) {
      const updatedOptions = additionalFilters
        .filter((filter) => filter.filtercontroltype !== "textbox")
        .map((filter) => ({
          id: filter.filterid,
          selectedValue: [filter.filtervalue],
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

      let updatedSelectedItems = [...selectedItems];

      additionalFilters.forEach((filter) => {
        const matchedObject = Object.values(advMatchedLookup).find(
          (lookup) => lookup.id === filter.filterid
        );
        console.log(matchedObject);
        if (
          matchedObject &&
          !updatedSelectedItems.some((item) => item.id === matchedObject.id)
        ) {
          updatedSelectedItems.push(matchedObject);
        }
      });

      console.log(updatedSelectedItems);
      setSelectedItems(updatedSelectedItems);
    }
  }, [additionalFilters]);

  useEffect(() => {
    if (additionalFilters.length > 0) {
      const updatedTextFilter = additionalFilters
        .filter((filter) => filter.filtercontroltype === "textbox")
        .map((item) => ({
          id: item.filterid,
          api_name: item.apiname,
          name: item.name,
          filtercategory: item.filtercategory,
          filtercontroltype: item.filtercontroltype,
          value: item.filtervalue,
        }));
      console.log(updatedTextFilter);
      console.log(selectedItems);
      const updTxtFilter = selectedItems.filter((item) => {
        console.log(item);
        console.log(updatedTextFilter);
        const newTextFilter = updatedTextFilter.filter(
          (filter) =>
            filter.id !== item.id && filter.filtercontroltype === "textbox"
        );
        console.log(newTextFilter);
        return newTextFilter;
      });
      console.log(updTxtFilter);
      console.log(textValues);
      if (updTxtFilter.length === 0 && Object.keys(textValues).length === 0) {
        setSelectedItems((prev) => [...prev, ...updatedTextFilter]);
        if (updatedTextFilter) {
          const resultObject = updatedTextFilter.reduce(
            (accumulator, filter) => {
              accumulator[filter.id] = {
                value: filter.value,
                id: filter.id,
                api_name: filter.api_name,
                filtercontroltype: filter.filtercontroltype,
                filtercategory: filter.filtercategory,
                name: filter.name,
              };
              return accumulator;
            },
            {}
          );
          console.log(resultObject);
          setTextValues(resultObject);
          // dispatch(setTextValue(resultObject));
        }
      }

      // const newOptions = updatedTextFilter.filter(
      //   (option) =>
      //     !selectedOptions.some((existing) => existing.id === option.id)
      // );
      // setsele
    }
  }, [additionalFilters]);

  const renderCustomFilterOptions = (filter) => {
    console.log("it runs");
    if (advMatchedLookup[filter.masterid]) {
      const mastervalues = advMatchedLookup[filter.masterid].mastervalues;

      if (filter.filtercontroltype === "dropdown") {
        let defaultSelectValue = [];
        const getDefaultSelectValue = (filterId, mastervalues) => {
          if (mastervalues && mastervalues.length > 0) {
            const selectedOption = selectedOptions.find(
              (option) => option.id === filterId
            );

            if (selectedOption && selectedOption.selectedValue.length > 0) {
              return selectedOption.selectedValue.map((value) => ({
                value: value,
                label:
                  mastervalues.find((option) => option.optionid === value)
                    ?.optionvalue || "",
              }));
            } else {
              // Return null if selectedOption is not found or has no selected value
              return [];
            }
          }
        };

        defaultSelectValue = getDefaultSelectValue(filter.id, mastervalues);

        return (
          <>
            {mastervalues && (
              <Select
                value={defaultSelectValue || ""}
                onChange={(selectedOption) =>
                  handleOptionChange(filter, selectedOption)
                }
                classNamePrefix="add-contact-select"
                options={mastervalues.map((option) => ({
                  value: option.optionid,
                  label: option.optionvalue,
                }))}
              ></Select>
            )}
          </>
        );
      } else if (filter.filtercontroltype === "multiselect") {
        return (
          <>
            {mastervalues && (
              <>
                <div className="multiselect">
                  {mastervalues.map((option) => (
                    <label key={option.optionid}>
                      <input
                        type="checkbox"
                        checked={selectedOptions.some(
                          (selectedOption) =>
                            selectedOption.id === filter.id &&
                            selectedOption.selectedValue.includes(
                              option.optionid
                            )
                        )}
                        onChange={() =>
                          handleMultiselectChange(filter, option.optionid)
                        }
                      />
                      {option.optionvalue}
                    </label>
                  ))}
                </div>
              </>
            )}
          </>
        );
      } else if (filter.filtercontroltype === "onclickloadmultiselect") {
        return (
          <>
            {mastervalues && (
              <>
                {filter.islookup ? (
                  <>
                    {/* <pre>{JSON.stringify(filter, null, 2)}</pre> */}
                    {/* <pre>{JSON.stringify(selectedOptions, null, 2)}</pre> */}
                    <ArcFilterAutoComplete
                      key={filter.masterid}
                      PlaceHolder="Search"
                      Name={filter.name}
                      datasetId={DataSetID}
                      lookupId={filter.masterid}
                      filterType={filter.filtercategory}
                      filter={filter}
                      selectedOptions={selectedOptions}
                      setSelectedOptions={setSelectedOptions}
                      // handleCheckboxTagfilter={handleCheckboxTagfilter}
                      // handleRemoveFilter={handleRemoveFilter}
                      handleMultiselectChange={handleMultiselectChange}
                      selectedValueLength={10}
                      handleRemoveCurrentFilter={handleRemoveItem}
                    />
                  </>
                ) : (
                  <div className="multiselect">
                    {mastervalues.map((option) => (
                      <label key={option.optionid}>
                        <input
                          type="checkbox"
                          checked={selectedOptions.some(
                            (selectedOption) =>
                              selectedOption.id === filter.id &&
                              selectedOption.selectedValue.includes(
                                option.optionid
                              )
                          )}
                          onChange={() =>
                            handleMultiselectChange(filter, option.optionid)
                          }
                        />
                        {option.optionvalue}
                      </label>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        );
      }
    } else if (filter.filtercontroltype === "textbox") {
      if (!filter.masterid) {
        return (
          <input
            className="popup-input"
            type="text"
            value={
              textValues[filter.id] !== undefined
                ? textValues[filter.id].value
                : ""
            }
            onChange={(e) => handleTextChange(filter, e.target.value)}
            placeholder="Enter filter name"
          />
        );
      }
    }
    return 123;
  };

  const handleTextChange = (filter, value) => {
    const { id, api_name, filtercontroltype, filtercategory, name } = filter;
    console.log(filter);
    setTextValues((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        value: value,
        id: id,
        api_name: api_name || api_name[id]?.api_name,
        filtercontroltype,
        filtercategory,
        name,
      },
    }));
  };

  const handleOptionChange = (filter, selectedOption) => {
    setSelectedOptions((prevState) => {
      let updatedState = Array.isArray(prevState) ? [...prevState] : [];

      const { id, api_name, filtercontroltype, filtercategory } = filter;

      // Check if the filterId already exists in selectedOptions
      const existingFilterIndex = updatedState.findIndex(
        (item) => item.id === id
      );

      // Create a new filter object
      const newFilter = {
        id: id,
        selectedValue: [selectedOption.value],
        api_name: api_name,
        filtercontroltype,
      };

      // If the filterId exists, update its selectedValue and screenfieldid
      if (existingFilterIndex !== -1) {
        updatedState[existingFilterIndex] = newFilter;
      } else {
        // If the filterId doesn't exist, add it to selectedOptions array
        updatedState.push(newFilter);
      }

      return updatedState;
    });

    setSelectedDropdown((prevState) => {
      let updatedState = Array.isArray(prevState) ? [...prevState] : [];

      const { id, api_name, filtercontroltype, filtercategory } = filter;

      // Check if the filterId already exists in selectedOptions
      const existingFilterIndex = updatedState.findIndex(
        (item) => item.filterId === id
      );

      // Create a new filter object
      const newFilter = {
        id: id,
        selectedValue: [selectedOption.value],
        api_name: api_name,
        filtercontroltype: filtercontroltype,
        filtercategory: filtercategory,
      };

      // If the filterId exists, update its selectedValue and screenfieldid
      if (existingFilterIndex !== -1) {
        updatedState[existingFilterIndex] = newFilter;
      } else {
        // If the filterId doesn't exist, add it to selectedOptions array
        updatedState.push(newFilter);
      }

      return updatedState;
    });
  };

  const handleMultiselectChange = (filter, selectedOptionId) => {
    setSelectedOptions((prevState) => {
      let updatedState = Array.isArray(prevState) ? [...prevState] : [];

      const { id, api_name, filtercontroltype, filtercategory } = filter;

      // Check if the filterId already exists in selectedOptions
      const existingFilterIndex = updatedState.findIndex(
        (item) => item.id === id
      );

      // Create a new filter object
      const newFilter = {
        id: id,
        selectedValue: [],
        api_name: api_name,
        filtercontroltype,
      };

      // If the filterId exists, update its selectedValue and screenfieldid
      if (existingFilterIndex !== -1) {
        const filterToUpdate = updatedState[existingFilterIndex];
        const selectedValues = filterToUpdate.selectedValue;

        // Toggle the selection of the selected option
        if (selectedValues.includes(selectedOptionId)) {
          filterToUpdate.selectedValue = selectedValues.filter(
            (id) => id !== selectedOptionId
          );
        } else {
          filterToUpdate.selectedValue = [...selectedValues, selectedOptionId];
        }
      } else {
        // If the filterId doesn't exist, add it to selectedOptions array
        newFilter.selectedValue.push(selectedOptionId);
        updatedState.push(newFilter);
      }

      return updatedState;
    });
  };

  const handleRemoveItem = (filterId, controltype, filtercategory) => {
    // Dispatch the removeSelectedFilter action with the filterId as payload
    dispatch(
      removeAdvancedFilter({
        filterid: filterId,
        filtercontroltype: controltype,
        filtercategory,
      })
    );
    // dispatch(resetCheckedValues(filterId));

    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== filterId)
    );

    if (controltype !== "textbox") {
      setSelectedOptions((prevItems) => {
        if (Array.isArray(prevItems)) {
          return prevItems.filter((item) => item.id !== filterId);
        } else {
          // Handle the case where prevItems is not an array
          return [];
        }
      });
    }

    setSelectedDropdown((prevItems) => {
      if (Array.isArray(prevItems)) {
        return prevItems.filter((item) => item.id !== filterId);
      } else {
        // Handle the case where prevItems is not an array
        return [];
      }
    });

    setTextValues((prevTextValues) => {
      // Create a copy of the previous textValues
      const updatedTextValues = { ...prevTextValues };
      // Remove the item with the specified filterId from textValues
      delete updatedTextValues[filterId];
      // Return the updated textValues
      return updatedTextValues;
    });
  };

  const handleCustomFilterSubmit = (selectedOptions, textValues) => {
    if (
      selectedOptions &&
      textValues &&
      (selectedOptions.length > 0 || Object.keys(textValues).length > 0)
    ) {
      // Dispatch the selectedOptions to the addSelectedFilter action
      dispatch(addSelectedCustomFilter(selectedOptions, textValues));
      //   dispatch(setAdvTextValue(textValues));
      //   dispatch(setCustomOptionChecked(selectedOptions));
    }
  };
  const handleCustomRemoveItems = (selectedOptions, textValues) => {
    // Iterate over selectedOptions
    selectedOptions.forEach((option) => {
      // Check if selectedValue is an empty array
      if (
        Array.isArray(option.selectedValue) &&
        option.selectedValue.length === 0
      ) {
        // Capture the filterId of the option with an empty selectedValue array
        const filterIdToRemove = option.filterId;

        // Find the index of the item in selectedItems with matching filterId
        setSelectedItems((prevItems) =>
          prevItems.filter((item) => item.filterid !== filterIdToRemove)
        );
        dispatch(removeAdvancedFilter(filterIdToRemove));
      }
    });

    const emptyFilterIds = [];

    // Iterate over the textValues object
    for (const filterId in textValues) {
      if (Object.hasOwnProperty.call(textValues, filterId)) {
        const { value } = textValues[filterId];

        // Check if the value is an empty string
        if (typeof value === "string" && value.trim() === "") {
          emptyFilterIds.push(filterId);
        }
      }
    }

    if (emptyFilterIds.length > 0) {
      const filterId = emptyFilterIds.join(",");

      setTextValues((prevTextValues) => {
        // Create a copy of the previous textValues
        const updatedTextValues = { ...prevTextValues };
        // Remove the item with the specified filterId from textValues
        delete updatedTextValues[filterId];
        // Return the updated textValues
        return updatedTextValues;
      });
      setSelectedItems((prevItems) =>
        prevItems.filter((item) => item.filterid !== filterId)
      );
      dispatch(removeAdvancedFilter(filterId));
    }
  };
  const relevantFilters = ["workweek", "workday"];
  return (
    <>
      <ArcAlertPopup
        ArcPopupshow={ArcPopupshow}
        setArcPopupshow={setArcPopupshow}
        Title="Quick filter setting"
        handleArcAlertPopup={handleArcAlertPopup}
      />
      <button onClick={handleArcOffCanvaShow}>
        {totalFiltersApplied === 0 ? (
          <>
            <span>
              <IoFilterSharp />
            </span>
            Filters
          </>
        ) : (
          <>
            <span className="custom-filter-btn"></span>
            <span>
              <IoFilterSharp />
            </span>
            {totalFiltersApplied} Filters Applied
          </>
        )}
      </button>
      <Offcanvas
        show={ArcOffCanvaShow}
        onHide={handleArcOffCanvaClose}
        className={`arc-off-canva-default header-filter-canva`}
        placement="end"
        backdrop="static"
      >
        <Offcanvas.Body>
          <div className="off-canva-body-content">
            <div className="off-canva-header">
              <h3>All Filters</h3>

              <ArcToolTip
                className="close-btn"
                HoverText="Close"
                BtnName={<MdOutlineCancel />}
                Placement="left"
                onClick={handleArcOffCanvaClose}
                as="span"
              />
            </div>
            <div className="off-canva-main">
              <Accordion>
                <Accordion.Collapse eventKey="0">
                  <div className="quickfilter with-setting">
                    <div className="quickfilter-header">
                      <h3>Quick Filter Setting</h3>
                      <ContextAwareToggle eventKey="0">
                        <RiListSettingsLine />
                      </ContextAwareToggle>
                    </div>
                    <div className="quickfilter-content">
                      {/* <Accordion.Collapse eventKey="0"> */}
                      <>
                        <div className="filter-header">
                          <Form.Control
                            className="search-contact"
                            type="text"
                            placeholder="Search fields"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <div className="content quick-filter">
                          <div className="checkbox-div visible-data">
                            {filterData
                              .filter(
                                (item) =>
                                  item.ismapped &&
                                  item.isquickfilter &&
                                  item.name
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                              )
                              .map(
                                (item, index) =>
                                  // Rendering displayname if ismapped is true
                                  item.ismapped && (
                                    <label key={index}>
                                      <GrDrag />{" "}
                                      <input
                                        type="checkbox"
                                        value={item.name}
                                        onChange={(e) =>
                                          handleCheckboxChangeMapped(
                                            item.id,
                                            e.target.checked
                                          )
                                        }
                                        checked={
                                          mappedCheckboxes[item.id] ?? false
                                        }
                                        disabled={relevantFilters.includes(
                                          item.api_name
                                        )}
                                      />
                                      {item.name}
                                    </label>
                                  )
                              )}

                            <span>Below fields not shown in filter</span>
                          </div>
                          {/* <p>Fields not shown in table</p> */}
                          <div className="checkbox-div not-visible-data">
                            {filterData
                              .filter(
                                (item) =>
                                  !item.ismapped &&
                                  item.isquickfilter &&
                                  item.name
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                              )
                              .map(
                                (item, index) =>
                                  // Rendering displayname if ismapped is false
                                  !item.ismapped && (
                                    <label key={index}>
                                      <GrDrag />
                                      <input
                                        type="checkbox"
                                        onChange={(e) =>
                                          handleCheckboxChangeUnmapped(
                                            item.id,
                                            e.target.checked
                                          )
                                        }
                                        checked={
                                          unmappedCheckboxes[item.id] ?? false
                                        }
                                        disabled={relevantFilters.includes(
                                          item.api_name
                                        )}
                                      />
                                      {item.name}
                                    </label>
                                  )
                              )}
                          </div>
                        </div>
                        <div className="footer-div">
                          <button
                            onClick={handleArcOffCanvaClose}
                            className="cancel"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={() => {
                              handleApplyButtonClick();
                              // handleArcOffCanvaClose();
                            }}
                          >
                            Apply
                          </button>
                        </div>{" "}
                      </>
                    </div>
                  </div>
                </Accordion.Collapse>
                <div className="quickfilter">
                  {/* {numLiTags === 0 ? "true" : "false"} */}
                  <div className="quickfilter-header">
                    <h3>
                      Quick Filter <span>({selectedFiltersLength})</span>
                    </h3>

                    <ContextAwareToggle eventKey="0">
                      <RiListSettingsLine />
                    </ContextAwareToggle>
                  </div>

                  <div className="quickfilter-content filters-applied">
                    {selectedFiltersLength === 0 ? (
                      <p className="empty-quick-filter">
                        This view has no quick filters.
                      </p>
                    ) : null}
                    <ul>
                      {Object.values(matchedLookup).map((filter) => {
                        const { name, mastervalues } = filter;

                        // Filter mastervalues with isChecked true
                        const checkedValues = mastervalues?.filter(
                          (value) => value.isChecked
                        );

                        if (checkedValues?.length === 0) return null;

                        // Construct the display format
                        let displayText = "";
                        if (checkedValues?.length === 1) {
                          displayText = (
                            <span>{checkedValues[0].optionvalue}</span>
                          );
                        } else if (checkedValues?.length === 2) {
                          displayText = (
                            <>
                              <span>{checkedValues[0].optionvalue}</span> or{" "}
                              <span>{checkedValues[1].optionvalue}</span>
                            </>
                          );
                        } else if (checkedValues?.length > 2) {
                          displayText = checkedValues
                            .slice(0, -1)
                            .map((value) => (
                              <span>
                                {value.optionvalue}
                                {", "}
                              </span>
                            ));
                          displayText.push(
                            <>
                              {" "}
                              or{" "}
                              <span>
                                {checkedValues?.slice(-1)[0].optionvalue}
                              </span>
                            </>
                          );
                        }

                        return (
                          <li key={filter.id}>
                            <p>
                              <span className="filter-title">{name}</span> is
                              any of {displayText}
                            </p>
                          </li>
                        );
                      })}
                      {Object.values(textFilter).map((filter) => {
                        const { value, name } = filter;

                        if (!value) return null;

                        return (
                          <li key={filter.id}>
                            <p>
                              <span className="filter-title">{name}</span> is
                              any of <span>{value}</span>
                            </p>
                          </li>
                        );
                      })}
                      {/* {datePickerFilter?.map((filter) => {
                        const { id, name, date } = filter;
                        return (
                          <li key={id}>
                            <p>
                              <span className="filter-title">{name}</span> is{" "}
                              {""}
                              <span>{date}</span>
                            </p>
                          </li>
                        );
                      })} */}
                      {weekFilter?.map((filter) => {
                        const { id, name, week, year } = filter;
                        return (
                          <li key={id}>
                            <p>
                              <span className="filter-title">{name}</span> is{" "}
                              {""}
                              <span>W{week}</span> of <span>{year}</span>
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </Accordion>
              {/* <QuickFilter
                CustomFilterPopup={CustomFilterPopup}
                setCustomFilterPopup={setCustomFilterPopup}
                CustomebuttonRef={CustomebuttonRef}
                setArcOffCanvaShow={setArcOffCanvaShow}
              /> */}
              {/* <AdditionalFilter
                CustomFilterPopup={CustomFilterPopup}
                setCustomFilterPopup={setCustomFilterPopup}
                setArcOffCanvaShow={setArcOffCanvaShow}
                CustomebuttonRef={CustomebuttonRef}
              /> */}
              <div className="additional-filter">
                <div className="filter-header">
                  <h3>
                    Additional Filter <span>({AdvancedFiltersLength})</span>
                  </h3>
                  <Dropdown align="end">
                    <Dropdown.Toggle id="dropdown-basic">
                      <FiPlusCircle /> Add Filter
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <>
                        {filterAddData.map((item) => {
                          return (
                            <Dropdown.Item
                              key={item.id}
                              onClick={() => handleItemClick(item)}
                            >
                              {item.name}
                            </Dropdown.Item>
                          );
                        })}
                      </>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                {selectedItems.length === 0 ? (
                  <>
                    <div className="content added-values no-filter-div">
                      <span>
                        <PiArrowBendRightUpThin />
                      </span>
                      <p className="no-filter">
                        Add filters to arrow down the <br /> contacts you want
                        to see.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="content added-values">
                      <Accordion defaultActiveKey={0}>
                        <ul>
                          {selectedItems.map((selectedItem, index) => (
                            <li key={index}>
                              <div className="selected-item">
                                <FieldTitle>
                                  <ContextAwareToggle
                                    eventKey={index}
                                    className={"field-title-btn"}
                                  >
                                    {selectedItem.name}
                                  </ContextAwareToggle>
                                </FieldTitle>
                                <ArcToolTip
                                  className="close-btn"
                                  HoverText="Clear Filter"
                                  BtnName={
                                    <MdOutlineCancel
                                      onClick={() => {
                                        console.log(selectedItem);
                                        handleRemoveItem(
                                          selectedItem.id,
                                          selectedItem.filtercontroltype,
                                          selectedItem.filtercategory
                                        );
                                        // handleArcOffCanvaClose();
                                      }}
                                    />
                                  }
                                  Placement="left"
                                  as="span"
                                />
                              </div>
                              <Accordion.Collapse eventKey={index}>
                                <div className="added-value-group">
                                  {renderCustomFilterOptions(selectedItem)}
                                  {/* <MultiSelect /> */}
                                </div>
                              </Accordion.Collapse>
                            </li>
                          ))}
                        </ul>
                      </Accordion>
                    </div>
                  </>
                )}
                <div className="additional-filter-footer-div">
                  <button onClick={handleCustomFilterPopup} className="cancel">
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleCustomFilterSubmit(selectedOptions, textValues);
                      // handleCustomRemoveItems(selectedOptions, textValues);
                      handleCustomFilterPopup();
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

//export default CustomFilters;

function ContextAwareToggle({ children, eventKey, callback, className }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      className={`${isCurrentEventKey ? "active" : null} ${className}`}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

export const FieldTitle = ({ children }) => {
  const [selectedValue, setSelectedValue] = useState("contains"); // Initial value

  const handleSelect = (eventKey) => {
    setSelectedValue(eventKey);
  };
  return (
    <>
      <div className="field-title">
        {children}
{/* 
        <DropdownButton
          id="dropdown-item-button"
          title={selectedValue}
          onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="contains" as="button">
            contains
          </Dropdown.Item>
          {/* <Dropdown.Item eventKey="does not contain" as="button">
              does not contain
            </Dropdown.Item>
            <Dropdown.Item eventKey="is not empty (has any value)" as="button">
              is not empty (has any value)
            </Dropdown.Item>
            <Dropdown.Item eventKey="is empty" as="button">
              is empty
            </Dropdown.Item> *
        </DropdownButton> */}
      </div>
    </>
  );
};
