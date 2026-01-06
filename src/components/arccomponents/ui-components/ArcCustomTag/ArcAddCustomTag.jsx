/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect, useRef } from "react";
//? Assets
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
//? Components
import { MdOutlineClear } from "react-icons/md";
import { ArcButtonWithIcon } from "@/components/arccomponents/ui-components/ArcButtons/ArcButtons";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import { getlookupdetails } from "@/redux/getlookupdetails/getlookupdetails";
//? Icons
import { IoMdClose } from "react-icons/io";
import { GrDrag } from "react-icons/gr";
import { TbReload } from "react-icons/tb";
// *******~ Import ~******** //

const ArcAddCustomTag = ({
  selectedItem,
  setSelectedItem,
  Name,
  searchBoxVisible,
  setSearchBoxVisible,
}) => {
  if (!selectedItem) {
    selectedItem = [];
  }
  const dispatch = useDispatch();
  // const [searchBoxVisible, setSearchBoxVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [mastervalues, setMastervalues] = useState([]);
  const [groupedMastervalues, setGroupedMastervalues] = useState([]);
  //   const [selectedItem, setSelectedItem] = useState([]);
  const [query, setQuery] = useState("");
  const [newTagShow, setNewTagShow] = useState(true);
  const limit = 10;
  // Handle search list
  const handleSearchList = () => {
    setSearchBoxVisible(true);
    setPage(1);
    // fetchUpdateLookupDetails(query, page, limit);
  };
  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(event.target.value);
    setPage(1);
    fetchUpdateLookupDetails(newQuery, page, limit);

    // Check if query matches any mastervalues or selectedItems optionvalue exactly
    const matchFoundInMastervalues = mastervalues.some(
      (item) => item.optionvalue.toLowerCase() === newQuery.toLowerCase()
    );
    const matchFoundInSelectedItems = selectedItem.some(
      (item) => item.optionvalue.toLowerCase() === newQuery.toLowerCase()
    );

    const matchFound = matchFoundInMastervalues || matchFoundInSelectedItems;

    setNewTagShow(!matchFound); // Update newTagShow based on match
  };

  // Fetch lookup details
  const fetchUpdateLookupDetails = (query, page, limit) => {
    const requestData = {
      entityId: "26B84156-CC30-416E-99D5-B37409B4D0BD",
      lookupId: "18A0DE1A-86BC-4733-B4DE-129CC6C360EF",
      limit: limit.toString(),
      page: page.toString(),
      q: query,
    };
    dispatch(getlookupdetails(requestData));
  };

  const getUpdateLookupDetailsData = useSelector(
    (state) => state.getlookupdetailsState.response?.result?.data
  );
  const getLookupDetailListCount =
    getUpdateLookupDetailsData?.lookupvalues[0]?.totalcount;

  useEffect(() => {
    if (getUpdateLookupDetailsData) {
      try {
        const parsedList = Array.isArray(
          getUpdateLookupDetailsData.lookupvalues[0].mastervalues
        )
          ? getUpdateLookupDetailsData.lookupvalues[0].mastervalues
          : JSON.parse(getUpdateLookupDetailsData.lookupvalues[0].mastervalues);

        if (page === 1) {
          setMastervalues(parsedList);
        } else {
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
  }, [page, getUpdateLookupDetailsData]);

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
    setHasMore(getLookupDetailListCount > mastervalues.length);
  }, [mastervalues]);

  useEffect(() => {
    if (selectedItem.length === 0) {
      const selected = groupedMastervalues
        .flatMap((group) => group.grouplist)
        .filter((item) => item.isselected)
        .filter(
          (item) =>
            !selectedItem.some(
              (selectedItemId) => selectedItemId.optionid === item.optionid
            )
        );

      // setSelectedItem((prevItems) => [...prevItems, ...selected]);
    }
  }, [groupedMastervalues]);

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSearchBoxVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="arc-custom-tag-input-section" ref={ref}>
      <div className="arc-custom-tag-input" onClick={handleSearchList}>
        <ArcTextBox
          Label={Name}
          ClassName=""
          PlaceHolder="Type to search"
          Required={false}
          ReadOnly={false}
          Value={query}
          onChange={handleChange}
          autoFocus={true}
        />
        {query && (
          <ArcToolTip
            as="span"
            className="clear-btn"
            HoverText="Clear"
            BtnName={<MdOutlineClear />}
            Placement="left"
            onClick={() => {
              setQuery("");
            }}
          />
        )}
      </div>
      {query.length !== 0 && searchBoxVisible && (
        <CustomSearchInput
          groupedMastervalues={groupedMastervalues}
          mastervalues={mastervalues}
          hasMore={hasMore}
          query={query}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          newTagShow={newTagShow}
          setQuery={setQuery}
          fetchUpdateLookupDetails={fetchUpdateLookupDetails}
          page={page}
          setPage={setPage}
          limit={limit}
        />
      )}
      {selectedItem?.length !== 0 && (
        <>
          {!searchBoxVisible ? null : (
            <SelectedItemsList
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          )}
        </>
      )}

      {/* <pre>{JSON.stringify(selectedItem, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(groupedMastervalues, null, 2)}</pre> */}
    </div>
  );
};

const CustomSearchInput = ({
  query,
  groupedMastervalues,
  selectedItem,
  setSelectedItem,
  newTagShow,
  setQuery,
  fetchUpdateLookupDetails,
  page,
  setPage,
  limit,
  mastervalues,
  hasMore,
}) => {
  // Handle checkbox change
  const handleNewTag = (query) => {
    const newTag = {
      optionid: uuidv4(),
      optionvalue: query,
      isnewtag: true,
      tagid: null,
      tagname: query,
      colorcode: 6,
    };
    // setnewTag((prev) => [...prev, newTag]);
    setSelectedItem((prev) => [...prev, newTag]);
    setQuery(""); // Clear query after adding new tag
    const newQuery = "";
    fetchUpdateLookupDetails(newQuery, page, limit);
  };
  const handleSelectItem = (item) => {
    const newObject = {
      optionid: item.optionid,
      optionvalue: item.optionvalue,
      isnewtag: false,
      tagid: item.optionid,
      tagname: item.optionvalue,
      colorcode: item.colorcode,
    };
    setSelectedItem((prevSelectedItem) => [...prevSelectedItem, newObject]);
  };
  // Load more data
  const loadMoreData = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchUpdateLookupDetails(query, newPage, limit);
  };

  return (
    <div className="search-list">
      <ul className="list-items">
        {newTagShow ? (
          query && (
            <li className="search-item add-new-tag">
              <button onClick={() => handleNewTag(query)}>
                add <span>&quot;{query}&quot;</span>
              </button>
            </li>
          )
        ) : (
          <li className="search-item add-new-tag">
            <label className="already-select">
              can't select <span>&quot;{query}&quot;</span>
            </label>
          </li>
        )}
        {groupedMastervalues.map((groupedMastervalue, index) => {
          const hasVisibleItems = groupedMastervalue.grouplist.some(
            (mastervalue) =>
              !selectedItem.some(
                (item) => item.optionid === mastervalue.optionid
              )
          );
          return (
            <React.Fragment key={index}>
              {hasVisibleItems && (
                <p className="tag-title">
                  {groupedMastervalue.groupname === "undefined"
                    ? "Unassigned"
                    : groupedMastervalue.groupname}
                </p>
              )}
              {groupedMastervalue.grouplist.map((mastervalue) => (
                <React.Fragment key={mastervalue.optionid}>
                  {!selectedItem.some(
                    (item) => item.optionid === mastervalue.optionid
                  ) && (
                    <SearchMasterList
                      mastervalue={mastervalue}
                      onSelect={handleSelectItem}
                    />
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          );
        })}
      </ul>
      {mastervalues.length !== 0 && hasMore && (
        <div className="load-more-container">
          <span onClick={loadMoreData}>
            <TbReload />
            Load More
          </span>
        </div>
      )}
    </div>
  );
};
const SearchMasterList = ({ mastervalue, onSelect }) => {
  return (
    <li className="search-item" onClick={() => onSelect(mastervalue)}>
      {/* <span className="icons drag">
        <GrDrag />
      </span> */}
      <label>{mastervalue.optionvalue}</label>
    </li>
  );
};

const SelectedItemsList = ({ selectedItem, setSelectedItem }) => {
  // Remove selected item
  const removeSelectedItem = (item) => {
    setSelectedItem((prev) => prev.filter((i) => i.optionid !== item.optionid));
  };
  return (
    <div className="search-list with-selected-item">
      <ul className="list-items">
        {selectedItem.map((item, index) => (
          <React.Fragment key={item.optionid}>
            {item.groupname && (
              <p className="tag-title">
                {item.groupname === "undefined" ? "Unassigned" : item.groupname}
              </p>
            )}
            <SelectedMasterList
              mastervalue={item}
              subIndex={index}
              removeSelectedItem={removeSelectedItem}
            />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

const SelectedMasterList = ({ mastervalue, removeSelectedItem }) => {
  return (
    <li className="search-item">
      <span className="icons drag">
        <GrDrag />
      </span>
      <label className={`tag-color-${mastervalue.colorcode}`}>
        {mastervalue.optionvalue}
      </label>
      <ArcToolTip
        as="span"
        className="icons close"
        HoverText="Cancel"
        BtnName={<IoMdClose />}
        Placement="left"
        onClick={() => removeSelectedItem(mastervalue)}
      />
    </li>
  );
};

export default ArcAddCustomTag;
