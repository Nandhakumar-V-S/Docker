/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect, useRef } from "react";
//? Assets

import { v4 as uuidv4 } from "uuid";
//? Components
import { MdOutlineClear } from "react-icons/md";
import { ArcButtonWithIcon } from "@/components/arccomponents/ui-components/ArcButtons/ArcButtons";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";

import { getupdatelookupdetails } from "@/redux/getlookupdetails/getUpdateLookupDetails";

//? Icons
import { IoMdClose } from "react-icons/io";
import { GrDrag } from "react-icons/gr";
import { TbReload } from "react-icons/tb";
// *******~ Import ~******** //

const ArcCustomTag = ({
  selectedItem,
  setSelectedItem,
  Name,
  fetchUpdateLookupDetails,
  getUpdateLookupDetailsData,
  transactionId,
  setistagedited,
}) => {
  if (!selectedItem) {
    selectedItem = [];
  }

  const [searchBoxVisible, setSearchBoxVisible] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [mastervalues, setMastervalues] = useState([]);
  const [groupedMastervalues, setGroupedMastervalues] = useState([]);
  //   const [selectedItem, setSelectedItem] = useState([]);
  const [query, setQuery] = useState("");
  const [newTagShow, setNewTagShow] = useState(true);
  // const transactionId = "01DF8C21-014F-44CA-8BD1-F69B8A916836";
  const limit = 10;

  // Handle search list
  const handleSearchList = () => {
    setSearchBoxVisible(true);
    // setPage(1);
    // const IsDefault = true;
    // fetchUpdateLookupDetails(query, page, limit, transactionId, IsDefault);
  };
  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(event.target.value);
    setPage(1);
    const IsDefault = false;
    fetchUpdateLookupDetails(newQuery, page, limit, transactionId, IsDefault);

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
  // const fetchUpdateLookupDetails = (
  //   query,
  //   page,
  //   limit,
  //   transactionId,
  //   IsDefault
  // ) => {
  //   const requestData = {
  //     entityId: "26B84156-CC30-416E-99D5-B37409B4D0BD",
  //     lookupId: "18A0DE1A-86BC-4733-B4DE-129CC6C360EF",
  //     transactionId: transactionId,
  //     IsDefaultValueNeeded: IsDefault,
  //     limit: limit.toString(),
  //     page: page.toString(),
  //     q: query,
  //   };
  //   dispatch(getupdatelookupdetails(requestData));
  // };

  // const getUpdateLookupDetailsData = useSelector(
  //   (state) => state.getupdatelookupdetailsState.response?.result?.data
  // );
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

      setSelectedItem((prevItems) => [...prevItems, ...selected]);
    }
  }, [groupedMastervalues]);

  // const ref = useRef(null);

  // const handleClickOutside = (event) => {
  //   if (ref.current && !ref.current.contains(event.target)) {
  //     setSearchBoxVisible(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  console.log(mastervalues);
  console.log(groupedMastervalues);
  console.log(selectedItem);
  return (
    <div className="arc-custom-tag-input-section">
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
            transactionId={transactionId}
            setistagedited={setistagedited}
          />
        )}
      </div>

      {selectedItem?.length !== 0 && (
        <>
          {!searchBoxVisible ? null : (
            <SelectedItemsList
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              setistagedited={setistagedited}
            />
          )}
          {/* <pre>{JSON.stringify(selectedItem, null, 2)}</pre> */}
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
  transactionId,
  setistagedited,
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
    const IsDefault = false;
    fetchUpdateLookupDetails(newQuery, page, limit, transactionId, IsDefault);
    setistagedited(true);
  };
  const handleSelectItem = (item) => {
    const newObject = {
      optionid: item.optionid,
      optionvalue: item.optionvalue,
      isnewtag: false,
      tagid: item.optionid,
      tagname: item.optionvalue,
      colorcode: item.colorcode,
      groupvalue: item.groupvalue,
    };
    setSelectedItem((prevSelectedItem) => [...prevSelectedItem, newObject]);
    setistagedited(true);
  };
  // Load more data
  const loadMoreData = () => {
    const newPage = page + 1;
    setPage(newPage);
    const IsDefault = false;
    fetchUpdateLookupDetails(query, newPage, limit, transactionId, IsDefault);
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

const SelectedItemsList = ({
  selectedItem,
  setSelectedItem,
  setistagedited,
}) => {
  const [groupedItems, setGroupedItems] = useState([]);
  useEffect(() => {
    const grouped = selectedItem.reduce((acc, item) => {
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

    setGroupedItems(groupedArray);
  }, [selectedItem]);
  // Remove selected item
  const removeSelectedItem = (item) => {
    setSelectedItem((prev) => prev.filter((i) => i.optionid !== item.optionid));
    setistagedited(true);
  };
  return (
    <>
      <div className="search-list with-selected-item">
        <ul className="list-items">
          {groupedItems.map((groupedItem, index) => {
            return (
              <React.Fragment key={index}>
                <p className="tag-title">
                  {groupedItem.groupname === "undefined"
                    ? "Unassigned"
                    : groupedItem.groupname}
                </p>
                {groupedItem.grouplist.map((mastervalue) => (
                  <React.Fragment key={mastervalue.optionid}>
                    <SelectedMasterList
                      mastervalue={mastervalue}
                      removeSelectedItem={removeSelectedItem}
                    />
                  </React.Fragment>
                ))}
              </React.Fragment>
            );
          })}
        </ul>
      </div>
      {/* <div className="search-list with-selected-item">
        <ul className="list-items">
          {selectedItem.map((item, index) => (
            <React.Fragment key={item.optionid}>
              <SelectedMasterList
                mastervalue={item}
                subIndex={index}
                removeSelectedItem={removeSelectedItem}
              />
            </React.Fragment>
          ))}
        </ul>
      </div> */}
    </>
  );
};

const SelectedMasterList = ({ mastervalue, removeSelectedItem }) => {
  return (
    <li className="search-item">
      {/* <pre>{JSON.stringify(mastervalue, null, 2)}</pre> */}
      <span className="icons drag">
        <GrDrag />
      </span>
      <label className={`with-groupname tag-color-${mastervalue.colorcode}`}>
        {/* <span>{mastervalue.groupvalue || "Unassigned"}:</span>{" "} */}
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

export default ArcCustomTag;
