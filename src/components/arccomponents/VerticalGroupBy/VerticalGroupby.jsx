import React, { useEffect, useState } from "react";
import Select from "react-select";
import ReorderWidget from "./Reorder/Reorder";
import { useDispatch } from "react-redux";

function VerticalGroupby({
  verticalgroupbyOptions,
  verticalGroupbyColumns,
  sortingShow,
  setSortingShow,
  selectedColumnValue,
  setSelectedColumnValue,
  setVerticalGroupbyDir,
  GroupFilterPopup,
}) {
  const dispatch = useDispatch();
  const [selectedVerticalValueGroup, setSelectedVerticalValueGroup] =
    useState(null);
  const [groupbyDropdownOptions, setGroupbyDropdownOptions] = useState([]);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (verticalgroupbyOptions.length > 0) {
      setGroupbyDropdownOptions(verticalgroupbyOptions);
      console.log(verticalgroupbyOptions);
    }
  }, [verticalgroupbyOptions]);

  // useEffect(() => {
  //   if (verticalgroupbyOptions.length > 0) {
  //     if (Object.keys(verticalGroupbyColumns).length > 0) {
  //       let updatedGroupby = [];
  //       let updatedSorting = {};
  //       const { columns, sorting } = verticalGroupbyColumns;

  //       if (columns?.length > 0) {
  //         console.log(verticalgroupbyOptions);
  //         console.log(columns);
  //         updatedGroupby = verticalgroupbyOptions?.filter((data) => {
  //           return !columns.some((item) => data.ismapped == true && item.id === data.id);
  //         });
  //         // setGroupbyDropdownOptions(filteredOptions);
  //       }
  //       // if (sorting?.length > 0) {
  //       //   setSortingShow(sorting);
  //       // }
  //       const data = {
  //         columns: updatedGroupby,
  //         sorting: updatedSorting
  //       };
  //       console.log(data);
  //       dispatch(updateVerticalGroupbyData(data));
  //     }
  //     console.log(verticalgroupbyOptions);
  //   }
  // }, [verticalgroupbyOptions]);

  useEffect(() => {
    if (GroupFilterPopup) {
      if (Object.keys(verticalGroupbyColumns).length > 0) {
        const { columns, sorting } = verticalGroupbyColumns;
        if (columns?.length > 0) {
          setSelectedColumnValue(columns);
          console.log(verticalgroupbyOptions);
          console.log(columns);
          const filteredOptions = verticalgroupbyOptions.filter((data) => {
            // Check if the current data.id is not in the selected columns
            return !columns.some((item) => item.value === data.id);
          });
          setGroupbyDropdownOptions(filteredOptions);
          console.log(filteredOptions);
        }
        if (sorting?.length > 0) {
          setSortingShow(sorting);
        }
      }
    }
  }, [GroupFilterPopup, verticalGroupbyColumns]);

  const handleRemove = (id) => {
    console.log(id);

    // Use functional updates to get the latest state
    setSelectedColumnValue((prevSelected) => {
      const filteredResults = prevSelected.filter((item) => item.value !== id);

      const dropdownDatas = verticalgroupbyOptions?.filter((item) => {
        return !filteredResults.some((data) => data.value === item.id);
      });

      console.log(dropdownDatas);
      setGroupbyDropdownOptions(dropdownDatas);
      const filteredData = sortingShow.filter((item) => item.value !== id);
      setSortingShow(filteredData);

      return filteredResults; // Return the new state
    });

    // Toggle updating state
    // setUpdating((prev) => !prev);
  };

  const handleSort = (item) => {
    console.log(item);

    setSortingShow((prev) => {
      console.log(prev);
      // Check if the item is already in the sorting state
      const existingSort = prev.find((sort) => sort.value === item.value);
      console.log(existingSort);

      if (existingSort) {
        // If the item is already sorted, toggle the direction
        const newDirection = existingSort.direction === "asc" ? "desc" : "asc";
        return prev.map((sort) =>
          sort.value === item.value
            ? { ...sort, direction: newDirection }
            : sort
        );
      } else {
        // If the item is not sorted, create a new entry with default direction "asc"
        return [{ orderby: item.binding, direction: "asc", value: item.value }];
      }
    });
    console.log(sortingShow);
  };
  console.log(sortingShow);
  const updateSelectedColumnValue = (newOrder) => {
    setSelectedColumnValue(newOrder);
  };

  const [direction, setDirection] = useState("asc");
  return (
    <div className="group-div vertical">
      <div className="title">
        <p>Vertical Group By</p>
        <span>
          <button
            className={direction === "asc" ? "active" : ""}
            onClick={() => {
              setDirection("asc");
              dispatch(
                setVerticalGroupbyDir({
                  direction: "asc",
                })
              );
            }}
          >
            asc
          </button>{" "}
          |{" "}
          <button
            className={direction === "desc" ? "active" : ""}
            onClick={() => {
              setDirection("desc");
              dispatch(
                setVerticalGroupbyDir({
                  direction: "desc",
                })
              );
            }}
          >
            desc
          </button>
        </span>
      </div>
      <GroupByDropDownVertical
        // type='Vertical'
        // onSelect={handleSelectVerticalGroupby}
        selectedValue={selectedVerticalValueGroup}
        setSelectedValue={setSelectedVerticalValueGroup}
        masterData={groupbyDropdownOptions}
        setSelectedColumnValue={setSelectedColumnValue}
        selectedColumnValue={selectedColumnValue}
        options={options}
        setOptions={setOptions}
        direction={direction}
        // updating={updating}

        // GroupFilterPopup={GroupFilterPopup}
      />
      {selectedColumnValue?.length > 0 && (
        <div className="selected-values-container">
          {/* <p>selected verticalgroupby</p> */}
          <div className="selected-values">
            {console.log(selectedColumnValue)}
            <ReorderWidget
              data={selectedColumnValue}
              onReorder={updateSelectedColumnValue}
              handleRemove={handleRemove}
              handleSort={handleSort}
              sortingShow={sortingShow}
              setSelectedColumnValue={setSelectedColumnValue}
              selectedColumnValue={selectedColumnValue}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default VerticalGroupby;

export const GroupByDropDownVertical = ({
  // type,
  // onSelect,
  selectedValue,
  setSelectedValue,
  masterData,
  selectedColumnValue,
  setSelectedColumnValue,
  options,
  setOptions,
  direction,
  // updating
}) => {
  console.log(masterData);
  // const [options, setOptions] = useState([]);
  useEffect(() => {
    let newOptions = [];
    console.log(masterData);
    if (masterData?.length > 0) {
      masterData.map((item) => {
        const option = {
          value: item.id,
          label: item.name,
          binding: item.displayname?.toLowerCase(),
          apiname: item.api_name,
        };
        newOptions.push(option);
      });
      setOptions(newOptions);
    }
  }, [masterData]);

  // useEffect(() => {
  //   const filteredOptions = options?.filter(
  //     (item) => item.value !== selectedOption.value
  //   );
  //   setOptions(filteredOptions);
  // }, []);

  const handleSelect = (selectedOption) => {
    console.log(selectedOption);
    const filteredOptions = options?.filter(
      (item) => item.value !== selectedOption.value
    );
    console.log(filteredOptions);
    if (selectedColumnValue?.length > 0) {
      const lastObject = selectedColumnValue[selectedColumnValue.length - 1];
      const withSeqno = {
        ...selectedOption,
        seqno: lastObject?.seqno + 1,
        direction: direction,
        type: "vertical",
      };
      setSelectedColumnValue((prev) => [...prev, withSeqno]);
      setSelectedValue(withSeqno);
    } else {
      const withSeqno = {
        ...selectedOption,
        seqno: 1,
        direction: direction,
        type: "vertical",
      };
      setSelectedColumnValue((prev) => [...prev, withSeqno]);
      setSelectedValue(withSeqno);
    }
    // setSelectedColumnValue((prev) => [...prev, selectedOption]);
    setOptions(filteredOptions);
    // setSelectedValue(selectedOption);
  };
  console.log(selectedColumnValue);
  console.log(selectedValue);
  return (
    <div className="input-control">
      <div className="select-div">
        <Select
          options={options}
          value={[]}
          classNamePrefix="add-contact-select"
          onChange={handleSelect}
          // isClearable
          placeholder="Select Vertical Group by"
        />
        {/* <pre>{JSON.stringify(options, null, 2)}</pre> */}
      </div>
    </div>
  );
};
