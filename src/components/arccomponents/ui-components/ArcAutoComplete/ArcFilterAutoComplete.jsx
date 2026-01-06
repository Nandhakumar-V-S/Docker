/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect } from "react";
//? Assets
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
//? Components
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import {
  filterAutoComplete,
  resetstatus as ResetfilterAutoComplete,
} from "@/redux/getlookupdetails/FilterAutoComplete";
//? CSS

//? Images

//? JSON File

//? Icons
import { MdOutlineCancel } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { TbReload } from "react-icons/tb";
import { MdOutlineClear } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
// *******~ Import ~******** //

const ArcFilterAutoComplete = ({
  ClassName,
  Name,
  PlaceHolder,
  datasetId,
  lookupId,
  filterType,
  filter,
  selectedOptions,
  handleCheckboxTagfilter,
  handleRemoveFilter,
  selectedValueLength,
  handleMultiselectChange,
  handleRemoveCurrentFilter,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const handlePopoverClose = () => {
    setShowPopover(false);
    setIsFocused(false);
    setMastervalues([]);
    setQuery("");
    setPage(1);
    dispatch(ResetfilterAutoComplete(lookupId));
  };
  const dispatch = useDispatch();
  // ! Autocomplete Start
  const [query, setQuery] = useState("");
  console.log(query, "setQuery");
  const [page, setPage] = useState(1);
  const Limit = 10;
  const FetchDefault = true;
  const [selectedItems, setSelectedItems] = useState([]);
  const [mastervalues, setMastervalues] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  //~ Redux state
  const GetlookupdetailsData = useSelector(
    (state) => state.filterAutoCompleteState.responses[lookupId]?.result?.data
  );

  const GetlookupdetailCount = useSelector(
    (state) =>
      state.filterAutoCompleteState.responses[lookupId]?.result?.data
        ?.lookupvalues[0]?.totalcount
  );

  const filterAutoCompleteLoading = useSelector(
    (state) => state.filterAutoCompleteState.loading
  );
  console.log(GetlookupdetailsData, GetlookupdetailCount);
  //~ Redux state

  //   ! Set Master Values
  useEffect(() => {
    if (GetlookupdetailsData) {
      try {
        const parsedList = Array.isArray(
          GetlookupdetailsData.lookupvalues[0].mastervalues
        )
          ? GetlookupdetailsData.lookupvalues[0].mastervalues
          : JSON.parse(GetlookupdetailsData.lookupvalues[0].mastervalues);

        if (page === 1) {
          setMastervalues(parsedList);
        } else {
          // Combine existing mastervalues with new parsedList without duplicates
          setMastervalues((prev) => {
            const existingIds = prev.map((item) => item.optionid);
            const newValues = parsedList.filter(
              (item) => !existingIds.includes(item.optionid)
            );
            return [...prev, ...newValues];
          });
        }
      } catch (error) {
        console.error("Invalid JSON format:", error);
        setMastervalues([]);
      }
    }
  }, [page, GetlookupdetailsData]);

  useEffect(() => {
    setHasMore(GetlookupdetailCount > mastervalues.length);
  }, [mastervalues]);

  //   ! Set Master Values End

  //   ~ set Selected Values
  // useEffect(() => {
  //   if (selectedItems.length === 0) {
  //     const selected = mastervalues
  //       .filter((item) => item.isselected === "1") // Filter for isselected === true
  //       .filter(
  //         (item) =>
  //           !selectedItems.some(
  //             (selectedItem) => selectedItem.optionid === item.optionid
  //           )
  //       );

  //     setSelectedItems((prevItems) => [...prevItems, ...selected]);
  //   }
  // }, [mastervalues]);
  //   * Set Default Selected Values * //
  useEffect(() => {
    if (selectedItems.length === 0) {
      SetDefaultValues();
    }
  }, [mastervalues]);
  // ~ Clear All filter
  useEffect(() => {
    // Find the selectedValue for the given filter.id
    const selectedOption = selectedOptions?.find(
      (option) => option.id === filter.id
    );

    // Check if there's no matching option or if the selectedValue array is empty
    if (!selectedOption || selectedOption.selectedValue.length === 0) {
      setSelectedItems([]);
    }
  }, [selectedOptions, filter.id]);

  // ~ Set Default Values
  const SetDefaultValues = () => {
    // Find the selectedValue for the given FilterId
    const selectedOption = selectedOptions?.find(
      (option) => option.id === filter.id
    );
    console.log(selectedOption);
    console.log(selectedOption);
    if (selectedOption && selectedOption.selectedValue.length > 0) {
      const selectedValueIds = selectedOption.selectedValue;

      const selected = mastervalues
        .filter((item) => selectedValueIds.includes(item.optionid))
        .map((item) => ({
          ...item,
          isChecked: true,
        }));

      setSelectedItems(selected);
    } else {
      setSelectedItems([]);
    }
  };

  //~ Filter AutoComplete details
  const FetchFilterAutoComplete = async (query, page) => {
    await dispatch(ResetfilterAutoComplete(lookupId));
    const RequestData = {
      datasetId: datasetId,
      lookupId: lookupId,
      filterType: filterType,
      filterId: filter.id,
      limit: Limit.toString(),
      page: page.toString(),
      q: query,
      isDefaultValueNeeded: query.length === 0 ? true : false,
    };
    await dispatch(filterAutoComplete(RequestData));
  };

  //~ Handle input change
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    console.log(newQuery, "newQuery");
    setQuery(newQuery);
    setPage(1);
    FetchFilterAutoComplete(newQuery, 1);
  };

  //~ Handle input focus
  const handleInputFocus = () => {
    if (!isFocused) {
      setPage(1);
      FetchFilterAutoComplete(query, 1);
      setIsFocused(true);
    }
  };
  // ~ handle Checkbox Change
  const HandleCheckBoxControl = (mastervalue, filter) => {
    console.log(mastervalue, filter);

    if (filterType === "quick") {
      handleCheckboxTagfilter(mastervalue, filter);
    } else {
      handleMultiselectChange(filter, mastervalue.optionid);
    }
  };
  const handleCheckboxChange = (mastervalue) => {
    const alreadySelected = selectedItems.find(
      (item) => item.optionid === mastervalue.optionid
    );

    if (alreadySelected) {
      setSelectedItems((prev) =>
        prev.filter((item) => item.optionid !== mastervalue.optionid)
      );
    } else {
      setSelectedItems((prev) => [...prev, mastervalue]);
    }
    console.log(query, "mastervalue");
    setQuery("");
    const emptyStateForDropdownApiTrigger = "";
    FetchFilterAutoComplete(emptyStateForDropdownApiTrigger, 1);
  };

  //~ Load more data
  const loadMoreData = () => {
    const newPage = page + 1;
    setPage(newPage);
    FetchFilterAutoComplete(query, newPage);
  };

  //~ Remove selected item
  const handleCheckboxRemoveControl = (item, filter) => {
    if (filterType === "quick") {
      handleCheckboxTagfilter(item, filter);
    } else {
      handleMultiselectChange(filter, item.optionid);
    }
  };
  const removeSelectedItem = (item) => {
    setSelectedItems((prev) =>
      prev.filter((i) => i.optionid !== item.optionid)
    );
  };
  const RemoveAllFilters = (e) => {
    if (filterType === "quick") {
      handleRemoveFilter(e, filter.id);
    } else {
      handleRemoveCurrentFilter(filter.id);
    }
  };

  useEffect(() => {
    if (showPopover) {
      FetchFilterAutoComplete(query, 1);
      setPage(1);
      setIsFocused(true);
    }
  }, [showPopover]); // Empty dependency array ensures it runs only on mount
  // ~ Get data in default
  useEffect(() => {
    if (filterType !== "quick") {
      FetchFilterAutoComplete(query, 1);
      setPage(1);
      setIsFocused(true);
    }
  }, [lookupId]);
  console.log(lookupId);
  return (
    <>
      {filterType === "quick" ? (
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          rootClose
          show={showPopover}
          onToggle={(show) => setShowPopover(show)}
          overlay={
            <Popover className={`arc-popover filter-autocomplete`}>
              <Popover.Body>
                <div className="arc-popover-body">
                  <div className="arc-popover-header">
                    <h5>{filter.name}</h5>
                    <ArcToolTip
                      onClick={handlePopoverClose}
                      HoverText="Close"
                      BtnName={<ImCancelCircle />}
                      Placement="left"
                      as={"span"}
                    />
                  </div>
                  {/* <pre>{JSON.stringify(filter, null, 2)}</pre> */}
                  {/* <pre>{JSON.stringify(selectedOptions, null, 2)}</pre> */}
                  {RenderFunction()}
                  {/* <div className="arc-popover-footer">
                <button className="cancel" onClick={handlePopoverClose}>
                  Cancel
                </button>
                <button>Apply</button>
              </div> */}
                </div>
              </Popover.Body>
            </Popover>
          }
        >
          <button
            className={`arc-popover-button ${showPopover ? "active" : null} ${
              selectedValueLength > 0 && "is-filter"
            } filter-autocomplete`}
          >
            <div className="button-info">
              <span className="header-title">
                {selectedValueLength > 0 && (
                  <span className="count">({selectedValueLength})</span>
                )}
                {Name ? Name : "Filter"}{" "}
                <span className="down-arrow">
                  <IoIosArrowDown />
                </span>
                {selectedValueLength > 0 && (
                  <ArcToolTip
                    className="cancel-btn"
                    HoverText="Clear"
                    BtnName={<MdOutlineCancel />}
                    Placement="right"
                    onClick={(e) => {
                      handleRemoveFilter(e, filter.id);
                    }}
                    as="span"
                  />
                )}
              </span>
              <div className="info">
                {/* {selectedValueLength > 0 && (
                  <span className="count">({selectedValueLength})</span>
                )} */}
                {/* {Name ? Name : "Filter"} */}
                <ul className="selected-list">
                  {selectedItems.slice(0, 1).map((item, index) => (
                    <li key={index} className="selected-item">
                      <span className="value-span">{item.optionvalue}</span>
                      <span
                        // onClick={() => removeSelectedItem(item)}
                        onClick={() => {
                          handleCheckboxRemoveControl(item, filter);
                          removeSelectedItem(item);
                        }}
                        className="remove-item"
                      >
                        <MdOutlineClear />
                      </span>
                    </li>
                  ))}

                  {selectedItems.length >= 2 && (
                    <ArcToolTip
                      as="li"
                      Tooltipclass="addlookup"
                      className="selected-item"
                      HoverText={
                        <>
                          <ul>
                            {selectedItems.slice(1).map((item, index) => (
                              <li key={index} className="selected-item">
                                <span className="value-span">
                                  {item.optionvalue}
                                </span>
                                {/* <span
                          onClick={() => removeSelectedItem(item)}
                          className="remove-item"
                        >
                          <MdOutlineClear />
                        </span> */}
                              </li>
                            ))}
                          </ul>
                        </>
                      }
                      BtnName={
                        <span className="value-span with-other">
                          +<p className="number">{selectedItems.length - 1}</p>
                        </span>
                      }
                      Placement="top"
                    />
                  )}
                </ul>

                {/* <ArcToolTip
              className="tooltip-title"
              HoverText={
                <>
                  {selectedItems.length !== 0 && (
                    <>
                      <p>{Name ? Name : "Filter"}</p>
                      <ul className="selected-list">
                        {selectedItems.slice(0, 1).map((item, index) => (
                          <li key={index} className="selected-item">
                            <span className="value-span">
                              {item.optionvalue}
                            </span>
                          </li>
                        ))}
                        {selectedItems.length >= 2 && (
                          <span className="value-span with-other">
                            +<p>{selectedItems.length - 1}</p>
                          </span>
                        )}
                      </ul>
                    </>
                  )}
                </>
              }
              BtnName={Name ? Name : "Filter"}
              Placement="top"
              Tooltipclass={"class"}
              as="span"
            /> */}

                {/* <span className="down-arrow">
                  <IoIosArrowDown />
                </span> */}
                {/* {selectedValueLength > 0 && (
                  <ArcToolTip
                    className="cancel-btn"
                    HoverText="Clear"
                    BtnName={<MdOutlineCancel />}
                    Placement="right"
                    onClick={(e) => {
                      handleRemoveFilter(e, filter.id);
                    }}
                    as="span"
                  />
                )} */}
              </div>
            </div>
          </button>
        </OverlayTrigger>
      ) : (
        RenderFunction()
      )}
      {/* <pre>{JSON.stringify(mastervalues, null, 2)}</pre> */}
    </>
  );
  function RenderFunction() {
    return (
      <div className={`arc-popover-main ${filterType}`}>
        <div className={`arc-input-control arc-textbox ${ClassName}  `}>
          <div className="input-control-inside" onClick={handleInputFocus}>
            {selectedItems.length !== 0 && (
              <ul className="selected-list">
                {selectedItems.slice(0, 1).map((item, index) => (
                  <li key={index} className="selected-item">
                    <span className="value-span">{item.optionvalue}</span>
                    <span
                      // onClick={() => removeSelectedItem(item)}
                      onClick={() => {
                        handleCheckboxRemoveControl(item, filter);
                        removeSelectedItem(item);
                      }}
                      className="remove-item"
                    >
                      <MdOutlineClear />
                    </span>
                  </li>
                ))}
                {selectedItems.length >= 2 && (
                  <ArcToolTip
                    as="li"
                    Tooltipclass="addlookup"
                    className="selected-item"
                    HoverText={
                      <>
                        <ul>
                          {selectedItems.slice(1).map((item, index) => (
                            <li key={index} className="selected-item">
                              <span className="value-span">
                                {item.optionvalue}
                              </span>
                              {/* <span
                          onClick={() => removeSelectedItem(item)}
                          className="remove-item"
                        >
                          <MdOutlineClear />
                        </span> */}
                            </li>
                          ))}
                        </ul>
                      </>
                    }
                    BtnName={
                      <span className="value-span with-other">
                        +<p>{selectedItems.length - 1}</p>
                      </span>
                    }
                    Placement="top"
                  />
                )}
              </ul>
            )}
            <Form.Control
              type={"text"}
              placeholder={PlaceHolder}
              name={"filter"}
              value={query}
              onChange={handleInputChange}
              autoFocus={true}
            />
            {isFocused && (
              <>
                {selectedItems.length !== 0 && (
                  <ArcToolTip
                    as="span"
                    className="clear-btn"
                    HoverText="Clear"
                    BtnName={<MdOutlineClear />}
                    Placement="left"
                    onClick={(e) => {
                      setSelectedItems([]);
                      setIsFocused(false);
                      setMastervalues([]);
                      setQuery("");
                      setPage(1);
                      RemoveAllFilters(e, filter.id);
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
        {isFocused && (
          <>
            <div className="search-inputs">
              <ul className={`suggestions-list ${hasMore ? "" : "ishasmore"}`}>
                <>
                  {!filterAutoCompleteLoading && (
                    <>
                      {mastervalues.map((mastervalue, subIndex) => (
                        <React.Fragment key={subIndex}>
                          {MasterList(mastervalue)}
                        </React.Fragment>
                      ))}
                    </>
                  )}
                </>

                {!filterAutoCompleteLoading && mastervalues.length === 0 && (
                  <li className="suggestion-item not-found-item">Not Found</li>
                )}
                {filterAutoCompleteLoading && page === 1 && (
                  <li className="suggestion-item not-found-item">Loading...</li>
                )}
              </ul>
              {/* <pre>{JSON.stringify(selectedOptions, null, 2)}</pre> */}
              {mastervalues.length !== 0 && hasMore && (
                <div className="load-more-container">
                  <span onClick={loadMoreData}>
                    <TbReload />
                    {filterAutoCompleteLoading ? "loading..." : " Load More"}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  function MasterList(mastervalue) {
    return (
      <li className="suggestion-item no-inputs">
        <label htmlFor={mastervalue.optionid}>
          <input
            className="default"
            type="checkbox"
            name="tag"
            checked={selectedOptions?.some(
              (selectedOption) =>
                selectedOption.id === filter.id &&
                selectedOption.selectedValue.includes(mastervalue.optionid)
            )}
            // checked={selectedItems.some(
            //   (item) => item.optionid === mastervalue.optionid
            // )}
            onChange={() => {
              handleCheckboxChange(mastervalue);
              HandleCheckBoxControl(mastervalue, filter);
            }}
            id={mastervalue.optionid}
          />
          {mastervalue.optionvalue}
        </label>
      </li>
    );
  }
};

export default ArcFilterAutoComplete;
