/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React

import React, { useState, useRef, useEffect } from "react";
//? Assets
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
//? Components
import { addLookupDetail } from "@/redux/getlookupdetails/AddLookupDetails";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";

//? CSS

//? Images

//? JSON File

//? Icons
import { TbReload } from "react-icons/tb";
import { MdOutlineClear } from "react-icons/md";
// *******~ Import ~******** //

const ArcAddLookupSingleSelect = ({
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
  lookupId,
  selectedItem,
  setSelectedItem,
  istitlefiled,
  setArcFilterPopupshow,
  disabled,
}) => {
  const dispatch = useDispatch();
  // ! Autocomplete Start
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const Limit = 10;
  // const [selectedItem, setSelectedItem] = useState(null);
  const [mastervalues, setMastervalues] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  // Dropdown start
  const dropdownRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: "0px",
    left: "0px",
  });

  // Dropdown End

  //~ Redux state
  const GetlookupdetailsData = useSelector(
    (state) => state.addLookupDetailState.response?.result?.data
  );
  const GetlookupdetailsLoading = useSelector(
    (state) => state.addLookupDetailState.loading
  );
  const GetlookupdetailCount = useSelector(
    (state) =>
      state.addLookupDetailState.response?.result?.data?.lookupvalues[0]
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

  //~ Add lookup details
  const FetchAddlookupdetails = (query, page) => {
    const RequestData = {
      lookupId: lookupId,
      limit: Limit.toString(),
      page: page.toString(),
      q: query,
    };
    dispatch(addLookupDetail(RequestData));
  };

  //~ Handle input change
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setPage(1);
    FetchAddlookupdetails(newQuery, 1);
  };

  //~ Handle input focus
  const handleInputFocus = () => {
    if (!isFocused) {
      setPage(1);
      FetchAddlookupdetails(query, 1);
      setIsFocused(true);
    }
  };

  // ~ handle Checkbox Change
  const handleCheckboxChange = (mastervalue) => {
    if (selectedItem && selectedItem.optionid === mastervalue.optionid) {
      setSelectedItem(null); // Deselect if the same item is clicked again
    } else {
      setSelectedItem(mastervalue); // Set the selected item
      setIsFocused(false);
      setMastervalues([]);
      setPage(1);
      setQuery("");
    }
  };

  //~ Load more data
  // const loadMoreData = () => {
  //   istitlefiled === 1 ? (
  //   const newPage = page + 1,
  //   setPage(newPage),
  //   FetchAddlookupdetails(query, newPage)):(

  //       setArcFilterPopupshow(true);
  //       console.log("test");

  //   )
  // };

  const loadMoreData = () => {
    istitlefiled !== 1
      ? (() => {
          const newPage = page + 1;
          setPage(newPage);
          FetchAddlookupdetails(query, newPage);
        })()
      : (() => {
          setArcFilterPopupshow(true);
          console.log("test");
        })();
  };

  //~ Handle click outside

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsFocused(false);
      // setMastervalues([]);
      setPage(1);
      // setQuery("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dropdown start

  useEffect(() => {
    if (isFocused && containerRef.current && dropdownRef.current) {
      const inputRect = containerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;

      if (spaceBelow >= dropdownRect.height) {
        setDropdownPosition({
          top: `${inputRect.bottom}px`,
          left: `${inputRect.left}px`,
        });
      } else {
        setDropdownPosition({
          top: `${inputRect.top - dropdownRect.height}px`,
          left: `${inputRect.left}px`,
        });
      }
    }
  }, [isFocused]);

  // Dropdown end

  return (
    <>
      <div
        className="arc-input-control-lookup-details add-lookup"
        ref={containerRef}
      >
        <div
          className={`arc-input-control arc-textbox ${ClassName} ${
            Required ? "mandatory-field" : null
          }`}
        >
          {Label && (
            <Form.Label>
              {Label} {Required && <sup>*</sup>}
            </Form.Label>
          )}

          <div
            className={`input-control-inside ${disabled ? "disabled" : null}`}
            onClick={handleInputFocus}
          >
            {selectedItem ? (
              <ul className="selected-list">
                <li className="selected-item single-select">
                  <span className="value-span">{selectedItem.optionvalue}</span>
                  {/* <span className="value-span">{selectedItem.optionvalue ? selectedItem.optionvalue : selectedItem}</span> */}
                </li>
              </ul>
            ) : (
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
                autoComplete="off"
              />
            )}

            {isFocused && (
              <ArcToolTip
                as="span"
                className="clear-btn"
                HoverText="Clear"
                BtnName={<MdOutlineClear />}
                Placement="left"
                onClick={() => {
                  setSelectedItem(null);
                  setIsFocused(false);
                  setMastervalues([]);
                  setQuery("");
                  setPage(1);
                  console.log("ashojk");
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
                {!GetlookupdetailsLoading && mastervalues.length === 0 && (
                  <li className="suggestion-item not-found-item">Not Found</li>
                )}
                {GetlookupdetailsLoading && (
                  <li className="suggestion-item not-found-item">Loading...</li>
                )}
              </ul>

              {mastervalues.length !== 0 && hasMore && (
                <div className="load-more-container">
                  <span onClick={loadMoreData}>
                    <TbReload />
                    {istitlefiled !== 1 ? "Load More" : "Search More...."}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );

  function MasterList(mastervalue) {
    return (
      <li className="suggestion-item no-inputs single-select">
        <label
          htmlFor={mastervalue.optionid}
          className={
            selectedItem?.optionid === mastervalue.optionid ? "active" : null
          }
        >
          <input
            className="default"
            type="radio"
            name="lookup"
            checked={selectedItem?.optionid === mastervalue.optionid}
            onChange={() => handleCheckboxChange(mastervalue)}
            id={mastervalue.optionid}
          />
          {mastervalue.optionvalue}
        </label>
      </li>
    );
  }
};

export default ArcAddLookupSingleSelect;
