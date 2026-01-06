/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React

import React, { useState, useRef, useEffect } from "react";
//? Assets
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
//? Components
import { updateLookupDetail } from "@/redux/getlookupdetails/UpdateLookupDetails";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
//? CSS

//? Images

//? JSON File

//? Icons
import { TbReload } from "react-icons/tb";
import { MdOutlineClear } from "react-icons/md";
// *******~ Import ~******** //

const ArcUpdateLookupDetails = ({
  Label,
  ClassName,
  Type,
  PlaceHolder,
  Name,
  Required,
  DefaultValue,
  ReadOnly,
  Id,
  autoFocus,
}) => {
  const dispatch = useDispatch();
  // ! Autocomplete Start
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const Limit = 10;
  const [selectedItems, setSelectedItems] = useState([]);
  const [mastervalues, setMastervalues] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);
  //~ Redux state
  const GetlookupdetailsData = useSelector(
    (state) => state.updateLookupDetailState.response?.result?.data
  );
  const GetlookupdetailCount = useSelector(
    (state) =>
      state.updateLookupDetailState.response?.result?.data?.lookupvalues[0]
        ?.totalcount
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
  useEffect(() => {
    if (selectedItems.length === 0) {
      const selected = mastervalues
        .filter((item) => item.isselected) // Filter for isselected === true
        .filter(
          (item) =>
            !selectedItems.some(
              (selectedItem) => selectedItem.optionid === item.optionid
            )
        );

      setSelectedItems((prevItems) => [...prevItems, ...selected]);
    }
  }, [mastervalues]);

  //~ Update lookup details
  const FetchUpdatelookupdetails = (query, page) => {
    const RequestData = {
      selectedValue: "F48EF545-9995-4F8F-857D-DDDA2BC063CC",
      lookupId: "5CDC0F7A-0670-45A8-B87E-3B131390931C",
      limit: Limit.toString(),
      page: page.toString(),
      q: query,
      isDefaultValueNeeded: true,
    };
    dispatch(updateLookupDetail(RequestData));
  };

  //~ Handle input change
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setPage(1);
    FetchUpdatelookupdetails(newQuery, 1);
  };

  //~ Handle input focus
  const handleInputFocus = () => {
    if (!isFocused) {
      setPage(1);
      FetchUpdatelookupdetails(query, 1);
      setIsFocused(true);
    }
  };
  // ~ handle Checkbox Change
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
  };

  //~ Load more data
  const loadMoreData = () => {
    const newPage = page + 1;
    setPage(newPage);
    FetchUpdatelookupdetails(query, newPage);
  };

  //~ Remove selected item
  const removeSelectedItem = (item) => {
    setSelectedItems((prev) =>
      prev.filter((i) => i.optionid !== item.optionid)
    );
  };

  //~ Handle click outside
  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsFocused(false);
      setMastervalues([]);
      //   setSelectedItems([]);
      setPage(1);
      setQuery("");
      //   setnewTag([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div
        className="arc-input-control-lookup-details add-lookup"
        ref={containerRef}
      >
        <div className={`arc-input-control arc-textbox ${ClassName}  `}>
          {Label && (
            <Form.Label>
              {Label} {Required && <sup>*</sup>}
            </Form.Label>
          )}

          <div className="input-control-inside" onClick={handleInputFocus}>
            {selectedItems.length !== 0 && (
              <ul className="selected-list">
                {selectedItems.slice(0, 2).map((item, index) => (
                  <li key={index} className="selected-item">
                    <span className="value-span">{item.optionvalue}</span>
                    <span
                      onClick={() => removeSelectedItem(item)}
                      className="remove-item"
                    >
                      <MdOutlineClear />
                    </span>
                  </li>
                ))}
                {selectedItems.length >= 3 && (
                  <ArcToolTip
                    as="li"
                    Tooltipclass="addlookup"
                    className="selected-item"
                    HoverText={
                      <>
                        <ul>
                          {selectedItems.slice(2).map((item, index) => (
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
                        +<p>{selectedItems.length - 2}</p>
                      </span>
                    }
                    Placement="top"
                  />
                )}
              </ul>
            )}
            <Form.Control
              type={Type}
              placeholder={PlaceHolder}
              name={Name}
              defaultValue={DefaultValue}
              value={query}
              onChange={handleInputChange}
              required={Required}
              readOnly={ReadOnly}
              id={Id}
              autoFocus={autoFocus}
              // onFocus={handleInputFocus}
            />
            {isFocused && (
              <ArcToolTip
                as="span"
                className="clear-btn"
                HoverText="Clear"
                BtnName={<MdOutlineClear />}
                Placement="left"
                onClick={() => {
                  setSelectedItems([]);
                  setIsFocused(false);
                  setMastervalues([]);
                  setQuery("");
                  setPage(1);
                }}
              />
            )}
          </div>
        </div>
        {isFocused && (
          <>
            <div className="search-inputs">
              <ul className={`suggestions-list ${hasMore ? "" : "ishasmore"}`}>
                <>
                  {mastervalues.map((mastervalue, subIndex) => (
                    <React.Fragment key={subIndex}>
                      {MasterList(mastervalue)}
                    </React.Fragment>
                  ))}
                </>
                {/* <li className="suggestion-item not-found-item">Loading...</li> */}
                {mastervalues.length === 0 && query.length === 0 && (
                  <li className="suggestion-item not-found-item">Loading...</li>
                )}
              </ul>

              {mastervalues.length !== 0 && hasMore && (
                <div className="load-more-container">
                  <span onClick={loadMoreData}>
                    <TbReload /> Load More
                  </span>
                </div>
              )}
            </div>
          </>
        )}
        {/* <pre>{JSON.stringify(selectedItems, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(mastervalues, null, 2)}</pre> */}
      </div>
    </>
  );
  function MasterList(mastervalue) {
    return (
      <li className="suggestion-item no-inputs">
        <label htmlFor={mastervalue.optionid}>
          <input
            className="default"
            type="checkbox"
            name="tag"
            checked={selectedItems.some(
              (item) => item.optionid === mastervalue.optionid
            )}
            onChange={() => handleCheckboxChange(mastervalue)}
            id={mastervalue.optionid}
          />
          {mastervalue.optionvalue}
        </label>
      </li>
    );
  }
};
export default ArcUpdateLookupDetails;
