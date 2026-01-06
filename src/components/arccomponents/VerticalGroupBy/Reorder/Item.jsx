import React from "react";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import Sorting from "@/style/images/sorting.png";
// import { useRaisedShadow } from "./use-raised-shadow";

import { TbGridDots } from "react-icons/tb";
import { GrDrag } from "react-icons/gr";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { MdOutlineCancel } from "react-icons/md";
const Item = ({
  item,
  handleRemove,
  handleSort,
  sortingShow,
  setSelectedColumnValue,
  selectedColumnValue,
}) => {
  const y = useMotionValue(0);
  //   const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();
  console.log(item);
  console.log(sortingShow);
  const matchingSort = sortingShow.find((sort) => sort.value === item.value);
  console.log(matchingSort);
  const renderedDirection = matchingSort ? matchingSort.direction : null;
  console.log(renderedDirection);

  const handleDirectionChange = (item) => {
    setSelectedColumnValue((prevColumns) => {
      return prevColumns.map((column) => {
        if (column.value === item.value) {
          return {
            ...column,
            direction: column.direction === "asc" ? "desc" : "asc",
          };
        }
        return column;
      });
    });
  };
  // const handleDirectionChange = (item) => {
  //   // Find the selected column
  //   const updateSortingDir = selectedColumnValue?.find(
  //     (data) => data.value === item.value
  //   );

  //   // Get all other columns
  //   const notSortedDir = selectedColumnValue?.filter(
  //     (data) => data.value !== item.value
  //   );

  //   if (updateSortingDir) {
  //     // Toggle the direction
  //     updateSortingDir.direction =
  //       updateSortingDir.direction === "asc" ? "desc" : "asc";

  //     // If you need to update the state, combine with other columns
  //     const newSelectedColumnValue = [...notSortedDir, updateSortingDir];

  //     // Update your state here if needed
  //     setSelectedColumnValue(newSelectedColumnValue);
  //   }
  // };

  return (
    <Reorder.Item
      value={item}
      id={item.value}
      style={y}
      dragListener={false}
      dragControls={dragControls}
    >
      {/* <span onPointerDown={(event) => dragControls.start(event)} style={{ cursor: "grab" }}>
        <TbGridDots />
      </span> */}
      <div className="selected-vertical-groupby">
        <span
          onPointerDown={(event) => dragControls.start(event)}
          style={{ cursor: "grab" }}
        >
          <GrDrag />
        </span>
        <p> {item.label}</p>
        {/* onClick={() => handleSort(item)} */}
        <span
          className="sorting-icon"
          onClick={() => handleDirectionChange(item)}
        >
          <img src={Sorting} className={`${item.direction}`} />
          <span>{item.direction}</span>
        </span>
      </div>
      <ArcToolTip
        HoverText="Remove"
        BtnName={<MdOutlineCancel />}
        Placement="left"
        className={"close"}
        onClick={() => handleRemove(item.value)}
        as="span"
      />

      {/* <p>{item}</p>
      <div className="checkbox-wrapper-2">
        <input type="checkbox" className="toogle-btn" />
      </div> */}
    </Reorder.Item>
  );
};

export { Item };
