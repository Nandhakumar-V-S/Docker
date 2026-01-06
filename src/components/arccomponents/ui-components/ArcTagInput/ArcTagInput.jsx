/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { MdOutlineClear } from "react-icons/md";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { getlookupdetails } from "@/redux/getlookupdetails/getlookupdetails";
import { ArcButtonWithIcon } from "@/components/arccomponents/ui-components/ArcButtons/ArcButtons";
import { TbReload } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";
const ArcTagInput = ({
  Label,
  Required,
  PlaceHolder,
  query,
  setQuery,
  page,
  setPage,
  Limit,
  selectedItems,
  setSelectedItems,
  type,
  isGroup,
}) => {
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  // Redux state
  const GetlookupdetailsData = useSelector(
    (state) => state.getlookupdetailsState.response?.result?.data
  );
  const GetlookupdetailListCount =
    GetlookupdetailsData?.lookupvalues[0]?.totalcount;
  const GetlookupdetailsDatastatus = useSelector(
    (state) => state.getlookupdetailsState.status
  );

  // State for mastervalues
  const [mastervalues, setMastervalues] = useState([]);
  const [groupedMastervalues, setGroupedMastervalues] = useState([]);
  const [newTag, setnewTag] = useState([]);
  const [newTagShow, setNewTagShow] = useState(true);

  // Fetch lookup details
  const Fetchlookupdetails = (query, page) => {
    const RequestData = {
      // entityId: "F48EF545-9995-4F8F-857D-DDDA2BC063CC",
      entityId: "26B84156-CC30-416E-99D5-B37409B4D0BD",
      lookupId: "18A0DE1A-86BC-4733-B4DE-129CC6C360EF",
      limit: Limit.toString(),
      page: page.toString(),
      q: query,
    };
    dispatch(getlookupdetails(RequestData));
  };

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

  // Effect to update groupedMastervalues when mastervalues changes
  useEffect(() => {
    const grouped = mastervalues.reduce((acc, item) => {
      const { groupvalue } = item;
      if (!acc[groupvalue]) {
        acc[groupvalue] = [];
      }
      acc[groupvalue].push(item);
      return acc;
    }, {});

    const groupedArray = Object.keys(grouped).map((groupname) => ({
      groupname,
      grouplist: grouped[groupname],
    }));

    setGroupedMastervalues(groupedArray);
    setHasMore(GetlookupdetailListCount > mastervalues.length);
  }, [mastervalues]);

  // Handle input focus
  const handleInputFocus = () => {
    if (!isFocused) {
      setPage(1);
      Fetchlookupdetails(query, 1);
      setIsFocused(true);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setPage(1);
    Fetchlookupdetails(newQuery, 1);
    // Check if query matches any mastervalues optionvalue exactly
    const matchFound = mastervalues.some(
      (item) => item.optionvalue.toLowerCase() === newQuery.toLowerCase()
    );
    setNewTagShow(!matchFound); // Update newTagShow based on match
  };

  // Handle checkbox change
  const handleNewTag = (query) => {
    const newTag = {
      optionid: uuidv4(),
      optionvalue: query,
      groupvalue: query,
      newtag: true,
    };
    // setnewTag((prev) => [...prev, newTag]);
    setSelectedItems((prev) => [...prev, newTag]);
    setQuery(""); // Clear query after adding new tag
    const newQuery = "";
    Fetchlookupdetails(newQuery, page);
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
  };

  // Load more data
  const loadMoreData = () => {
    const newPage = page + 1;
    setPage(newPage);
    Fetchlookupdetails(query, newPage);
  };

  // Remove selected item
  const removeSelectedItem = (item) => {
    setSelectedItems((prev) =>
      prev.filter((i) => i.optionid !== item.optionid)
    );
  };

  // Handle click outside
  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsFocused(false);
      setMastervalues([]);
      setGroupedMastervalues([]);
      setSelectedItems([]);
      setPage(1);
      setQuery("");
      setnewTag([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Type2 = type === "type-2";
  console.log(mastervalues);
  console.log(groupedMastervalues);
  return (
    <React.Fragment>
      <div
        className="arc-input-control-autocomplete-container"
        ref={containerRef}
      >
        <div className="arc-input-control arc-textbox with-autocomplete">
          {Label && (
            <Form.Label>
              {Label} {Required && <sup>*</sup>}
            </Form.Label>
          )}
          <div
            className={`input-control-inside ${type}`}
            onClick={handleInputFocus}
          >
            <ul className="selected-items">
              {(Type2
                ? selectedItems.slice(0, 1).reverse()
                : selectedItems.reverse()
              ).map((item, index) => (
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
              {!Type2 && (
                <Form.Control
                  type="text"
                  placeholder={PlaceHolder}
                  value={query}
                  onChange={handleInputChange}
                  className={`${
                    selectedItems.length === 0 ? "not-selected" : "selected"
                  } form-control`}
                />
              )}
              {Type2 && selectedItems.length >= 2 && (
                <li className="selected-item">
                  <span className="value-span with-other">
                    +<p>{selectedItems.length - 1}</p>
                  </span>
                </li>
              )}
            </ul>
            {Type2 && (
              <React.Fragment>
                <Form.Control
                  type="text"
                  placeholder={PlaceHolder}
                  value={query}
                  onChange={handleInputChange}
                  className={`${
                    selectedItems.length === 0 ? "not-selected" : "selected"
                  } form-control ${type}`}
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
                      setnewTag([]);
                    }}
                  />
                )}
              </React.Fragment>
            )}
          </div>
        </div>
        {isFocused && (
          <div className="suggestions-dropdown-main">
            {/* <span>{newTagShow ? "true" : "false"}</span> */}
            <div className="suggestions-dropdown">
              <ul className={`suggestions-list ${hasMore ? "" : "ishasmore"}`}>
                {/* {newTagShow && (
                  <>
                    {query && (
                      <li className="suggestion-item add-new-tag">
                        <button onClick={() => handleNewTag(query)}>
                          add <span>&quot;{query}&quot;</span>
                        </button>
                      </li>
                    )}
                  </>
                )} */}
                {isGroup ? (
                  <>
                    {groupedMastervalues.map((groupedMastervalue, index) => (
                      <React.Fragment key={index}>
                        <p className="tag-title">
                          {groupedMastervalue.groupname == "undefined"
                            ? "Unassigned"
                            : groupedMastervalue.groupname}
                        </p>
                        {groupedMastervalue.grouplist.map(
                          (mastervalue, subIndex) => (
                            <React.Fragment key={subIndex}>
                              {MasterList(mastervalue)}
                            </React.Fragment>
                          )
                        )}
                      </React.Fragment>
                    ))}
                  </>
                ) : (
                  <>
                    {mastervalues.map((mastervalue, subIndex) => (
                      <React.Fragment key={subIndex}>
                        {MasterList(mastervalue)}
                      </React.Fragment>
                    ))}
                  </>
                )}

                {mastervalues.length === 0 && query.length === 0 && (
                  <li className="suggestion-item not-found-item">Loading...</li>
                )}
              </ul>

              {mastervalues.length !== 0 && hasMore && (
                <div className="load-more-container">
                  <ArcButtonWithIcon
                    ClassName=""
                    BtnText="Load More"
                    OnClick={loadMoreData}
                    Icon={
                      <>
                        <TbReload />
                      </>
                    }
                  />
                </div>
              )}
            </div>
            {/* <div className="footer-div">
              <button
                className="cancel"
                onClick={() => {
                  setIsFocused(false);
                }}
              >
                Cancel
              </button>
              <button>Apply</button>
            </div> */}
          </div>
        )}
        {/* <pre>{JSON.stringify(mastervalues, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(selectedItems, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(groupedMastervalues, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(GetlookupdetailListCount, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(newTag, null, 2)}</pre> */}
      </div>
    </React.Fragment>
  );

  function MasterList(mastervalue) {
    return (
      <li className="suggestion-item">
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

export default ArcTagInput;
