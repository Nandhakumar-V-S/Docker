/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect, useRef } from "react";
//? Assets
import { useDispatch, useSelector } from "react-redux";
//? Components
import { MdOutlineClear } from "react-icons/md";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import { gettagfilterlookup } from "@/redux/getlookupdetails/getTagFilterLookup";
//? Icons
import { TbReload } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { GrDrag } from "react-icons/gr";
// *******~ Import ~******** //

const ArcTagFilter = ({
  selectedItem,
  setSelectedItem,
  Name,
  lookupId,
  datasetId,
  filterId,
  ListDefault,
  handleCheckboxChange,
  filter,
  selectedOptions,
  isGroup,
}) => {
  console.log(lookupId, datasetId, filterId, filter);
  if (!selectedItem) {
    selectedItem = [];
  }
  const dispatch = useDispatch();
  const [searchBoxVisible, setSearchBoxVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [mastervalues, setMastervalues] = useState([]);
  const [groupedMastervalues, setGroupedMastervalues] = useState([]);
  //   const [selectedItem, setSelectedItem] = useState([]);
  const [query, setQuery] = useState("");
  const limit = 10;

  const fetchUpdateLookupDetails = (
    query,
    page,
    limit,
    lookupId,
    datasetId,
    filterId,
    IsDefault
  ) => {
    const requestData = {
      entityId: "26B84156-CC30-416E-99D5-B37409B4D0BD",
      lookupId: lookupId,
      limit: limit.toString(),
      page: page.toString(),
      q: query,
      datasetId: datasetId,
      filterId: filterId,
      filterType: "quick",
      isDefaultValueNeeded: IsDefault,
    };
    dispatch(gettagfilterlookup(requestData));
  };
  const getUpdateLookupDetailsData = useSelector(
    (state) => state.gettagfilterlookupState.response?.result?.data
  );


  console.log(getUpdateLookupDetailsData);


  
  const getUpdateLookupDetailsDataLoading = useSelector(
    (state) => state.gettagfilterlookupState.loading
  );

  useEffect(() => {
    if (ListDefault) {
      const IsDefault = true;
      fetchUpdateLookupDetails(
        query,
        page,
        limit,
        lookupId,
        datasetId,
        filterId,
        IsDefault
      );
    }
  }, [dispatch]);

  //* Handle search list
  const handleSearchList = () => {
    setSearchBoxVisible(true);
    if (!searchBoxVisible) {
      setPage(1);
      const IsDefault = true;
      fetchUpdateLookupDetails(
        query,
        page,
        limit,
        lookupId,
        datasetId,
        filterId,
        IsDefault
      );
    }
  };
  //* Handle search list //

  //   * Handle Change * //
  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(event.target.value);
    setPage(1);
    const IsDefault = false;
    fetchUpdateLookupDetails(
      newQuery,
      page,
      limit,
      lookupId,
      datasetId,
      filterId,
      IsDefault
    );
  };
  //   * Handle Change * //

  //   * Parse JSON * //
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
  //   * Parse JSON * //

  //   * Set Group Values * //
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
  //   * Set Group Values * //
  console.log(groupedMastervalues);
  //   * Set Default Selected Values * //
  useEffect(() => {
    if (selectedItem.length === 0) {
      // Find the selectedValue for the given FilterId
      const selectedOption = selectedOptions.find(
        (option) => option.id === filterId
      );

      if (selectedOption && selectedOption.selectedValue.length > 0) {
        const selectedValueIds = selectedOption.selectedValue;

        const selected = groupedMastervalues
          .flatMap((group) => group.grouplist)
          .filter((item) => selectedValueIds.includes(item.optionid))
          .map((item) => ({
            ...item,
            isChecked: true,
          }));

        setSelectedItem(selected);
      }
    }
  }, [groupedMastervalues, selectedOptions]);

  //   * Set Default Selected Values * //

  const HandleCloseText = () => {
    const newQuery = "";
    setQuery("");
    const IsDefault = true;
    fetchUpdateLookupDetails(
      newQuery,
      page,
      limit,
      lookupId,
      datasetId,
      filterId,
      IsDefault
    );
  };

  //   * handleClickOutside * //
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSearchBoxVisible(false);
      // setMastervalues([]);
      // setGroupedMastervalues([]);
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
          autoFocus={false}
        />
        {query && (
          <ArcToolTip
            as="span"
            className="clear-btn"
            HoverText="Clear"
            BtnName={<MdOutlineClear />}
            Placement="left"
            onClick={HandleCloseText}
          />
        )}
      </div>

      {searchBoxVisible && (
        <CustomSearchInput
          groupedMastervalues={groupedMastervalues}
          mastervalues={mastervalues}
          hasMore={hasMore}
          query={query}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setQuery={setQuery}
          fetchUpdateLookupDetails={fetchUpdateLookupDetails}
          page={page}
          setPage={setPage}
          limit={limit}
          lookupId={lookupId}
          datasetId={datasetId}
          filterId={filterId}
          loading={getUpdateLookupDetailsDataLoading}
          handleCheckboxChange={handleCheckboxChange}
          filter={filter}
          selectedOptions={selectedOptions}
          isGroup={isGroup}
        />
      )}
      {selectedOptions.length !== 0 && (
        <CustomSelectedInput
          groupedMastervalues={groupedMastervalues}
          mastervalues={mastervalues}
          hasMore={hasMore}
          query={query}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setQuery={setQuery}
          fetchUpdateLookupDetails={fetchUpdateLookupDetails}
          page={page}
          setPage={setPage}
          limit={limit}
          lookupId={lookupId}
          datasetId={datasetId}
          filterId={filterId}
          loading={getUpdateLookupDetailsDataLoading}
          handleCheckboxChange={handleCheckboxChange}
          filter={filter}
          selectedOptions={selectedOptions}
          isGroup={isGroup}
        />
      )}
      {/* <pre>{JSON.stringify(getUpdateLookupDetailsData, null, 2)}</pre> */}
    </div>
  );
};
const CustomSearchInput = ({
  query,
  groupedMastervalues,
  selectedItem,
  setSelectedItem,
  fetchUpdateLookupDetails,
  page,
  setPage,
  limit,
  mastervalues,
  hasMore,
  lookupId,
  datasetId,
  filterId,
  loading,
  handleCheckboxChange,
  filter,
  selectedOptions,
  isGroup,
}) => {
  const loadMoreData = () => {
    const newPage = page + 1;
    setPage(newPage);
    const IsDefault = false;
    fetchUpdateLookupDetails(
      query,
      newPage,
      limit,
      lookupId,
      datasetId,
      filterId,
      IsDefault
    );
  };

  return (
    <div className="search-list with-selected-item">
      <ul className="list-items">
        {groupedMastervalues.length === 0 && (
          <li className="search-item">
            <label>Not found</label>
          </li>
        )}
        {loading ? (
          <li className="search-item text-center justify-content-center">
            <label>Loading...</label>
          </li>
        ) : (
          <>
            {isGroup ? (
              <>
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
                              filter={filter}
                              onSelect={handleCheckboxChange}
                              isSelected={selectedOptions?.some(
                                (selectedOption) =>
                                  selectedOption.id === filter.id &&
                                  selectedOption.selectedValue.includes(
                                    mastervalue.optionid
                                  )
                              )}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  );
                })}
              </>
            ) : (
              <>
                {query.length === 0 && (
                  <>
                    {selectedItem.map((mastervalue) => (
                      <React.Fragment key={mastervalue.optionid}>
                        <SearchMasterList
                          mastervalue={mastervalue}
                          filter={filter}
                          onSelect={handleCheckboxChange}
                          isSelected={selectedOptions?.some(
                            (selectedOption) =>
                              selectedOption.id === filter.id &&
                              selectedOption.selectedValue.includes(
                                mastervalue.optionid
                              )
                          )}
                        />
                      </React.Fragment>
                    ))}
                  </>
                )}

                {mastervalues.map((mastervalue) => (
                  <React.Fragment key={mastervalue.optionid}>
                    {!selectedOptions?.some(
                      (selectedOption) =>
                        selectedOption.id === filter.id &&
                        selectedOption.selectedValue.includes(
                          mastervalue.optionid
                        )
                    ) && (
                      <SearchMasterList
                        mastervalue={mastervalue}
                        filter={filter}
                        onSelect={handleCheckboxChange}
                        isSelected={selectedOptions?.some(
                          (selectedOption) =>
                            selectedOption.id === filter.id &&
                            selectedOption.selectedValue.includes(
                              mastervalue.optionid
                            )
                        )}
                      />
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          </>
        )}
      </ul>
      {!loading && (
        <>
          {mastervalues.length !== 0 && hasMore && (
            <div className="load-more-container">
              <span onClick={loadMoreData}>
                <TbReload />
                Load More
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const SearchMasterList = ({ mastervalue, onSelect, isSelected, filter }) => {
  return (
    <li className="search-item " onClick={() => onSelect(mastervalue, filter)}>
      <label>{mastervalue.optionvalue}</label>
    </li>
  );
};

const CustomSelectedInput = ({
  query,
  groupedMastervalues,
  selectedItem,
  setSelectedItem,
  fetchUpdateLookupDetails,
  page,
  setPage,
  limit,
  mastervalues,
  hasMore,
  lookupId,
  datasetId,
  filterId,
  loading,
  handleCheckboxChange,
  filter,
  selectedOptions,
  isGroup,
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
  return (
    <div className="search-list with-selected-item and-static-filter">
      <ul className="list-items">
        <>
          {!isGroup ? (
            <>
              {groupedMastervalues.map((groupedMastervalue, index) => {
                const hasVisibleItems = groupedMastervalue.grouplist.some(
                  (mastervalue) =>
                    !selectedItem.some(
                      (item) => item.optionid === mastervalue.optionid
                    )
                );
                return (
                  <React.Fragment key={index}>
                    {!hasVisibleItems && (
                      <p className="tag-title">
                        {groupedMastervalue.groupname === "undefined"
                          ? "Unassigned"
                          : groupedMastervalue.groupname}
                      </p>
                    )}
                    {groupedMastervalue.grouplist.map((mastervalue) => (
                      <React.Fragment key={mastervalue.optionid}>
                        {selectedOptions?.some(
                          (selectedOption) =>
                            selectedOption.id === filter.id &&
                            selectedOption.selectedValue.includes(
                              mastervalue.optionid
                            )
                        ) && (
                          <SelectedMasterList
                            mastervalue={mastervalue}
                            filter={filter}
                            onSelect={handleCheckboxChange}
                            isSelected={selectedOptions?.some(
                              (selectedOption) =>
                                selectedOption.id === filter.id &&
                                selectedOption.selectedValue.includes(
                                  mastervalue.optionid
                                )
                            )}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            <>
              {/* <pre>{JSON.stringify(groupedItems, null, 2)}</pre> */}
              <>
                {/* {selectedItem.map((mastervalue) => (
                  <React.Fragment key={mastervalue.optionid}>
                    <SelectedMasterList
                      mastervalue={mastervalue}
                      filter={filter}
                      onSelect={handleCheckboxChange}
                      isSelected={selectedOptions?.some(
                        (selectedOption) =>
                          selectedOption.id === filter.id &&
                          selectedOption.selectedValue.includes(
                            mastervalue.optionid
                          )
                      )}
                    />
                  </React.Fragment>
                ))} */}
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
                            filter={filter}
                            onSelect={handleCheckboxChange}
                            isSelected={selectedOptions?.some(
                              (selectedOption) =>
                                selectedOption.id === filter.id &&
                                selectedOption.selectedValue.includes(
                                  mastervalue.optionid
                                )
                            )}
                          />
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  );
                })}
              </>
            </>
          )}
        </>
      </ul>
    </div>
  );
};
const SelectedMasterList = ({ mastervalue, onSelect, isSelected, filter }) => {
  return (
    <li className="search-item ">
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
        onClick={() => onSelect(mastervalue, filter)}
      />
    </li>
  );
};

export default ArcTagFilter;
