/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MySkeleton } from "@/modules/loading-skeleton/listpage-table-loading";
import {
  SortingWithDirection,
  SortingWithoutDirection,
} from "@/utils/CommonFunctions";

// import { horizontalGroupByDirInfo } from "@/redux/Task/selector";

export const HorizontalGroupByComponent = ({
  data,
  optionid,
  Tableloading,
  id,
  horizontalGroupByMasterData,
  setHorizontalGroupBy,
  isDateFilter,
  isAllDefault,
  Direction,
}) => {
  const dispatch = useDispatch();
  // const Direction = useSelector(horizontalGroupByDirInfo);
  const [HorizontalGroupByList, setHorizontalGroupByList] = useState([]);
  useEffect(() => {
    let newData;

    if (Direction === "asc" || Direction === "desc") {
      // newData = [...horizontalGroupByMasterData].sort((a, b) => {
      //   if (Direction === "asc") {
      //     return a.groupbytext.localeCompare(b.groupbytext);
      //   } else if (Direction === "desc") {
      //     return b.groupbytext.localeCompare(a.groupbytext);
      //   }
      // });

      newData = SortingWithDirection(
        horizontalGroupByMasterData,
        Direction,
        "groupbytext"
      );
    } else {
      // If Direction is neither "asc" nor "desc", don't sort the data
      newData = [...horizontalGroupByMasterData];
    }

    setHorizontalGroupByList(newData);
  }, [dispatch, horizontalGroupByMasterData, Direction]);
  console.log(HorizontalGroupByList);
  console.log(Direction);
  const prevDataRef = useRef(HorizontalGroupByList);
  const [activeOptionId, setActiveOptionId] = useState(optionid);
  const [selectedValue, setSelectedValue] = useState({
    groupbyid: "",
    groupbytext: "",
  });

  console.log(data);
  console.log(data[0]);
  console.log(horizontalGroupByMasterData);
  console.log(HorizontalGroupByList);
  console.log(optionid);
  useEffect(() => {
    if (
      HorizontalGroupByList &&
      prevDataRef.current.length > 0 &&
      HorizontalGroupByList !== prevDataRef.current
    ) {
      console.log("different mastervalues");
      setActiveOptionId(optionid);
      setSelectedValue({
        groupbyid: "",
        groupbytext: "",
      });
      prevDataRef.current = HorizontalGroupByList;
    }
  }, [HorizontalGroupByList, optionid]);

  //added by gomathi

  useEffect(() => {
    //  console.log("different mastervalues");

    setSelectedValue({
      groupbyid: "",
      groupbytext: "",
    });
  }, [id]);

  const handleClick = (groupbyid) => {
    console.log(groupbyid);
    setActiveOptionId(groupbyid);
    console.log(groupbyid);
    if (isDateFilter) {
      dispatch(setHorizontalGroupBy(HorizontalGroupByList, id, groupbyid));
      console.log(groupbyid);
    } else {
      dispatch(setHorizontalGroupBy(id, groupbyid));
      console.log(groupbyid);
    }
  };

  const handleSelect = (eventKey) => {
    const selectedItem =
      HorizontalGroupByList &&
      HorizontalGroupByList?.slice(3).find(
        (item) => item.groupbyid === eventKey
      );
    setActiveOptionId(eventKey);
    console.log(eventKey);
    if (isDateFilter) {
      dispatch(setHorizontalGroupBy(HorizontalGroupByList, id, eventKey));
    } else {
      dispatch(setHorizontalGroupBy(id, eventKey));
    }

    if (selectedItem) {
      setSelectedValue({
        groupbyid: selectedItem.groupbyid,
        groupbytext: selectedItem.groupbytext,
      });
    }
  };
  const selectedItem = HorizontalGroupByList?.slice(4).find(
    (item) => item.groupbyid === activeOptionId
  );

  const truncateText = (text) => {
    return text && text.length > 13 ? text.slice(0, 13) + "..." : text;
  };
  console.log(activeOptionId.length === 0);
  console.log(activeOptionId);
  console.log(Tableloading);
  return (
    <>
      <div className="grouping-tabs">
        {/* <p>{optionid}</p> */}
        {isAllDefault && (
          <button
            className={`grouping-btn ${
              optionid === "All" || HorizontalGroupByList.length === 0
                ? "active"
                : ""
            } activeOptionId ${Tableloading ? "is-loading" : null}`}
            onClick={() => handleClick("All")}
          >
            {Tableloading ? <LoadingBtn /> : "All"}
          </button>
        )}

        {HorizontalGroupByList?.slice(0, 4).map((item) => (
          <button
            key={item.groupbyid}
            title={item.groupbytext}
            className={`${
              item.groupbyid === optionid ? "active" : ""
            } grouping-btn  ${Tableloading ? "is-loading" : null}`}
            onClick={() => handleClick(item.groupbyid)}
          >
            {Tableloading ? (
              <LoadingBtn />
            ) : item.groupbytext.length > 12 ? (
              item.groupbytext.slice(0, 12) + "..."
            ) : (
              item.groupbytext
            )}
            {/* {optionid} */}
          </button>
        ))}
        {HorizontalGroupByList?.length > 4 && (
          <>
            {!Tableloading && (
              <DropdownButton
                id="dropdown-item-button"
                title={
                  <span
                    title={
                      selectedValue.groupbytext ||
                      selectedItem?.groupbytext ||
                      HorizontalGroupByList?.[4]?.groupbytext
                    }
                  >
                    {truncateText(
                      selectedValue.groupbytext ||
                        selectedItem?.groupbytext ||
                        HorizontalGroupByList?.[4]?.groupbytext
                    )}
                    <BsThreeDotsVertical />
                  </span>
                }
                onSelect={handleSelect}
                className={`${
                  (optionid.length !== 0 &&
                    selectedValue.groupbyid === optionid) ||
                  selectedItem?.groupbytext
                    ? "active"
                    : ""
                }`}
              >
                <div className="item-div">
                  {HorizontalGroupByList?.slice(4).map((item, index) => (
                    <Dropdown.Item
                      eventKey={item.groupbyid}
                      as="button"
                      className={`${
                        item.groupbyid === optionid ? "active" : ""
                      }`}
                      key={index}
                    >
                      {item.groupbytext}
                    </Dropdown.Item>
                  ))}
                </div>
              </DropdownButton>
            )}
          </>
        )}
      </div>
    </>
  );
};

const LoadingBtn = () => {
  return <MySkeleton height={15} radius={2} width={100} clsnme="loading-btn" />;
};
