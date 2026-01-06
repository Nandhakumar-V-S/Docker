/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useRef, useEffect } from "react";
//? Assets
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
//? Components
import {
  updateLookupDetail,
  updateLookupid,
} from "@/redux/getlookupdetails/UpdateLookupDetails";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
//? CSS

//? Images

//? JSON File

//? Icons
import { TbReload } from "react-icons/tb";
import { MdOutlineClear } from "react-icons/md";
// *******~ Import ~******** //

const ArcUpdateLookupSingleSelect = ({
  Label,
  ClassName,
  Type,
  PlaceHolder,
  Name,
  Required,
  DefaultValue,
  ReadOnly,
  Id,
  lookupId,
  selectedItem,
  setSelectedItem,
  selectedValue,
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
  //~ Redux state
  const CurrentLookupId = useSelector(
    (state) => state.updateLookupDetailState.LookupId
  );
  const GetlookupdetailsLoading = useSelector(
    (state) => state.updateLookupDetailState.loading
  );
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

  //   ~ Set Selected Value
  useEffect(() => {
    if (!selectedItem && CurrentLookupId === lookupId) {
      const selected = mastervalues.find((item) => item.isselected);
      if (selected) {
        setSelectedItem(selected);
      }
    }
  }, [mastervalues]);

  console.log(lookupId);
  console.log(CurrentLookupId);
  console.log(CurrentLookupId === lookupId);
  //~ Update lookup details
  const FetchUpdatelookupdetails = (query, page) => {
    const RequestData = {
      selectedValue: selectedValue,
      lookupId: lookupId,
      limit: Limit.toString(),
      page: page.toString(),
      q: query,
      isDefaultValueNeeded: query.length === 0 ? true : false,
    };
    dispatch(updateLookupDetail(RequestData));
  };

  //~ Handle input change
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setPage(1);
    FetchUpdatelookupdetails(newQuery, 1);
    setIsFocused(true);
  };

  //~ Handle input focus
  const handleInputFocus = () => {
    if (!isFocused) {
      setPage(1);
      FetchUpdatelookupdetails(query, 1);
      dispatch(updateLookupid(lookupId));
      setIsFocused(true);
    }
  };

  //~ Handle item selection
  const handleSelectionChange = (mastervalue) => {
    setSelectedItem(mastervalue);
    setIsFocused(false);
    setMastervalues([]);
    setPage(1);
    setQuery("");
  };

  //~ Load more data
  const loadMoreData = () => {
    const newPage = page + 1;
    setPage(newPage);
    FetchUpdatelookupdetails(query, newPage);
  };

  //~ Remove selected item
  const removeSelectedItem = () => {
    setSelectedItem(null);
  };

  //~ Handle click outside
  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsFocused(false);
      setMastervalues([]);
      setPage(1);
      setQuery("");
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
            {selectedItem ? (
              <ul className="selected-list">
                <li className="selected-item single-select">
                  <span className="value-span">{selectedItem.optionvalue}</span>
                  {/* <span
                    onClick={() => removeSelectedItem(item)}
                    className="remove-item"
                  >
                    <MdOutlineClear />
                  </span> */}
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
                autoFocus={true}
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
                    {/* <TbReload /> */}
                    Load More
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
            name="tag"
            checked={selectedItem?.optionid === mastervalue.optionid}
            onChange={() => {
              handleSelectionChange(mastervalue);
            }}
            id={mastervalue.optionid}
          />
          {mastervalue.optionvalue}
        </label>
      </li>
    );
  }
};
export default ArcUpdateLookupSingleSelect;
