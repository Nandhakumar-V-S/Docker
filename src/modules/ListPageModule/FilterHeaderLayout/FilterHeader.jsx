import React, { useState, useRef, useContext, useEffect } from "react";
import { useSelector } from "react-redux";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

//import HorizontalGrouping from "../components/HorizontalGrouping";
import { HorizontalGrouping } from "@/components/Filters/HorizontalGrouping";
import { CustomizeTable } from "@/components/Filters/CustomizeTable";
import { GroupByFilter } from "@/components/Filters/GroupbyFilter";
import { CustomFilters } from "@/components/Filters/CustomFilters";
import { ImTree } from "react-icons/im";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineTableChart } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import QuickFilterHeader from "@/components/Filters/QuickFilterHeader";

import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import {
  masterDataInfo,
  listInfo,
  listDataInfo,
  dataSetInfo,
  columnMasterDataInfo,
  filterMasterDataInfo,
  GroupByhorizontalInfo,
  createGroupByDataInfo,
} from "@/redux/listpage/selector";

//Custom End
export default function FilterHeader({ Tableloading, setTableLoading }) {
  //   const translate = useLanguage();
  const { isGrouping } = useContext(ArcGlobalContextProvider);
  console.log(isGrouping);

  const list = useSelector(listInfo);
  const dataSet = useSelector(dataSetInfo);
  console.log(dataSet);

  const masterData = useSelector(masterDataInfo);
  console.log({ masterData });
  const columnMasterData = useSelector(columnMasterDataInfo);
  console.log({ columnMasterData });
  const filterMasterData = useSelector(filterMasterDataInfo);
  console.log({ filterMasterData });
  const createGroupByData = useSelector(createGroupByDataInfo);
  console.log({ createGroupByData });

  const horizontalGroupBy = useSelector(GroupByhorizontalInfo);
  console.log(horizontalGroupBy);

  const HorizontalGroupbyData = horizontalGroupBy?.map(
    (item) => item.mastervalues
  );
  const HorizontalGroupbyMasterid = horizontalGroupBy
    ?.map((item) => item.masterid)
    .join(",");

  const HorizontalGroupbyOptionid = horizontalGroupBy
    ?.map((item) => item.value)
    .join(",");
  const HorizontalGroupbyID = horizontalGroupBy
    ?.map((item) => item.id)
    .join(",");
  console.log(HorizontalGroupbyData);
  console.log(HorizontalGroupbyMasterid);
  console.log(HorizontalGroupbyID);

  const [CustomTabelPopup, setCustomTabelPopup] = useState(false);
  const [CustomFilterPopup, setCustomFilterPopup] = useState(false);
  const [GroupFilterPopup, setGroupFilterPopup] = useState(false);

  const CustomebuttonRef = useRef(null);
  const CustomeTablebuttonRef = useRef(null);
  const GroupFilterButtonRef = useRef(null);
  const [showPopover, setShowPopover] = useState(false);
  console.log("Inside ListPage ListFilter");

  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);

  const [optionSelected, setOptionSelected] = useState(null);
  const HandleApply = () => {
    console.log("Options selected:", optionSelected);
  };
  const options = [
    { value: "Work 1", label: "Work 1" },
    { value: "Work 2", label: "Work 2" },
    { value: "Work 3", label: "Work 3" },
  ];
  console.log(HorizontalGroupbyData);
  console.log(HorizontalGroupbyMasterid);

  return (
    <>
      <div className={`filter-section ${isGrouping ? "is-grouping" : null}`}>
        <div className="filter-btn-group">
          {ScreenWidth > BreakpointSm ? (
            <>
              <div className="filter-btn-group-left">
                {/* <FilterComponent Tableloading={Tableloading} /> */}
                <QuickFilterHeader Tableloading={Tableloading} />
              </div>
              <div className="filter-btn-group-right">
                {/* <AllFilters
                  CustomFilterPopup={CustomFilterPopup}
                  setCustomFilterPopup={setCustomFilterPopup}
                  CustomebuttonRef={CustomebuttonRef}
                /> */}
                <CustomFilters
                  CustomFilterPopup={CustomFilterPopup}
                  setCustomFilterPopup={setCustomFilterPopup}
                  CustomebuttonRef={CustomebuttonRef}
                />

                <button
                  ref={GroupFilterButtonRef}
                  onClick={() =>
                    setGroupFilterPopup((prevShowPopover) => !prevShowPopover)
                  }
                  className={`${GroupFilterPopup && "active"}`}
                >
                  <span>
                    <ImTree />
                  </span>
                  Group by
                </button>
                <button
                  ref={CustomeTablebuttonRef}
                  onClick={() =>
                    setCustomTabelPopup((prevShowPopover) => !prevShowPopover)
                  }
                  className={`${CustomTabelPopup && "active"} custom-table`}
                >
                  <span>
                    <MdOutlineTableChart />
                  </span>
                  Customize Table
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="filter-btn-group-left">
                <OverlayTrigger
                  //   rootClose
                  trigger="click"
                  placement="auto"
                  overlay={popover}
                >
                  <button className="btn-parent">
                    <VscSettings /> Filter fields
                  </button>
                </OverlayTrigger>
              </div>
              <div className="filter-btn-group-right">
                <button
                  ref={CustomebuttonRef}
                  onClick={() =>
                    setCustomFilterPopup((prevShowPopover) => !prevShowPopover)
                  }
                  className={`${CustomFilterPopup ? "active" : ""} `}
                >
                  <span className="custom-filter-btn"></span>
                  <span>
                    <IoFilterSharp />
                  </span>
                </button>

                <button
                  ref={GroupFilterButtonRef}
                  onClick={() =>
                    setGroupFilterPopup((prevShowPopover) => !prevShowPopover)
                  }
                  className={`${GroupFilterPopup && "active"}`}
                >
                  <span>
                    <ImTree />
                  </span>
                </button>
                <button
                  ref={CustomeTablebuttonRef}
                  onClick={() =>
                    setCustomTabelPopup((prevShowPopover) => !prevShowPopover)
                  }
                  className={`${CustomTabelPopup && "active"} custom-table`}
                >
                  <span>
                    <MdOutlineTableChart />
                  </span>
                </button>
              </div>
            </>
          )}
        </div>

        {isGrouping ? (
          <HorizontalGrouping
            data={HorizontalGroupbyData}
            masterid={HorizontalGroupbyMasterid}
            optionid={HorizontalGroupbyOptionid}
            Tableloading={Tableloading}
            id={HorizontalGroupbyID}
          />
        ) : null}

        <CustomizeTable
          CustomTabelPopup={CustomTabelPopup}
          setCustomTabelPopup={setCustomTabelPopup}
          CustomeTablebuttonRef={CustomeTablebuttonRef}
        />

        <GroupByFilter
          GroupFilterPopup={GroupFilterPopup}
          setGroupFilterPopup={setGroupFilterPopup}
          GroupFilterButtonRef={GroupFilterButtonRef}
        />
      </div>
    </>
  );
}
// const popover = (
//   <Popover className="mobile-filter-popup">
//     <Popover.Body>
//       <LeadStage />
//       <LeadStage />
//     </Popover.Body>
//   </Popover>
// );
