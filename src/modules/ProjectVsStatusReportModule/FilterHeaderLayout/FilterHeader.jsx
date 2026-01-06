import React, { useState, useRef, useContext, useEffect } from "react";
import { useSelector } from "react-redux";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

//import HorizontalGrouping from "../components/HorizontalGrouping";
import { HorizontalGrouping } from "@/components/ProjectVsStatusReportComp/Filters/HorizontalGrouping";
import { CustomizeTable } from "@/components/ProjectVsStatusReportComp/Filters/CustomizeTable";
import { GroupByFilter } from "@/components/ProjectVsStatusReportComp/Filters/GroupbyFilter";
import { CustomFilters } from "@/components/ProjectVsStatusReportComp/Filters/CustomFilters";
import { ImTree } from "react-icons/im";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineTableChart } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import QuickFilterHeader from "@/components/ProjectVsStatusReportComp/Filters/QuickFilterHeader";

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
} from "@/redux/ProjectVsStatusReport/selector";

//Custom End
// ~ Filter List
import {
  FilterListHeader,
  HandleFilterList,
} from "@/components/arccomponents/utility/FilterList";
import { ListContext } from "@/modules/ProjectVsStatusReportModule/index";
import {
  selectedFiltersInfo,
  matchedLookupInfo,
  textFilterInfo,
  datePickerFilterInfo,
  weekFilterInfo,
  planWeekFilterInfo,
  planMonthFilterInfo,
  monthFilterInfo,
} from "@/redux/ProjectVsStatusReport/selector";
import { TbFilterDown } from "react-icons/tb";
import { TbFilterUp } from "react-icons/tb";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
// ~ Filter List
// ~ New GroupBy
// import { HorizontalGroupByComponent } from "@/components/TaskComp/Filters/HorizontalGroupby";
import { HorizontalGroupByComponent } from "@/components/arccomponents/utility/HorizontalGroupby";
import { horizontalGroupByMasterInfo } from "@/redux/ProjectVsStatusReport/selector";
import { loadingInfo } from "@/redux/ProjectVsStatusReport/selector";
import { setHorizontalGroupBy } from "@/redux/ProjectVsStatusReport/actions";
// ~ New GroupBy
export default function FilterHeader({ Tableloading, setTableLoading }) {
  const [overallTextFiter, setoverallTextFilter] = useState({});
  //   const translate = useLanguage();
  const { projectVsStatusReportIsGrouping } = useContext(
    ArcGlobalContextProvider
  );
  console.log(projectVsStatusReportIsGrouping);
  // ~ New GroupBy
  const loading = useSelector(loadingInfo);
  const horizontalGroupByMasterData = useSelector(horizontalGroupByMasterInfo);
  // ~ New GroupBy
  // ~ Filter list
  const { FilterDropdownShow, setFilterDropdownShow } = useContext(ListContext);
  const matchedLookup = useSelector(matchedLookupInfo);
  const selectedFilters = useSelector(selectedFiltersInfo);
  const selectedFiltersLength = selectedFilters.length;
  const textFilter = useSelector(textFilterInfo);
  const datePickerFilter = useSelector(datePickerFilterInfo);
  const weekFilter = useSelector(weekFilterInfo);
  const planWeekFilter = useSelector(planWeekFilterInfo);
  const planMonthFilter = useSelector(planMonthFilterInfo);
  const monthFilter = useSelector(monthFilterInfo);
  // ~ Filter list
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
  console.log(HorizontalGroupbyData, "HorizontalGroupbyData");
  console.log(HorizontalGroupbyMasterid, "HorizontalGroupbyMasterid");
  console.log(HorizontalGroupbyID, "HorizontalGroupbyID");

  const [CustomTabelPopup, setCustomTabelPopup] = useState(false);
  const [CustomFilterPopup, setCustomFilterPopup] = useState(false);
  const [GroupFilterPopup, setGroupFilterPopup] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

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
      <div
        className={`filter-section ${
          projectVsStatusReportIsGrouping ? "is-grouping" : null
        } ${
          FilterDropdownShow && selectedFiltersLength > 0
            ? "show-filter"
            : "hide-filter"
        }`}
      >
        <div className="filter-btn-group">
          {ScreenWidth > BreakpointSm ? (
            <>
              <div className="filter-btn-group-left">
                {/* <FilterComponent Tableloading={Tableloading} /> */}
                <QuickFilterHeader
                  Tableloading={Tableloading}
                  setSelectedOptions={setSelectedOptions}
                  selectedOptions={selectedOptions}
                  textValues={overallTextFiter}
                  setTextValues={setoverallTextFilter}
                />
                {/* Filter List */}
                <HandleFilterList
                  selectedFiltersLength={selectedFiltersLength}
                  FilterDropdownShow={FilterDropdownShow}
                  setFilterDropdownShow={setFilterDropdownShow}
                />
                {/* Filter List */}
              </div>
              <div className="filter-btn-group-right">
                <CustomFilters
                  CustomFilterPopup={CustomFilterPopup}
                  setCustomFilterPopup={setCustomFilterPopup}
                  CustomebuttonRef={CustomebuttonRef}
                  setquickSelectedOptions={setSelectedOptions}
                  quickSelectedOptions={selectedOptions}
                  // customtextValues={overallTextFiter}
                  setcustomTextValues={setoverallTextFilter}
                />

                {/* <button
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
                </button> */}
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
              <FilterListHeader
                FilterDropdownShow={FilterDropdownShow}
                selectedFiltersLength={selectedFiltersLength}
                matchedLookup={matchedLookup}
                textFilter={textFilter}
                setFilterDropdownShow={setFilterDropdownShow}
                datePickerFilter={datePickerFilter}
                weekFilter={weekFilter}
                planWeekFilter={planWeekFilter}
                planMonthFilter={planMonthFilter}
                monthFilter={monthFilter}
              />
            </>
          ) : (
            <>
              <div className="filter-btn-group-left">
                <OverlayTrigger
                  //   rootClose
                  trigger="click"
                  placement="auto"
                  // overlay={popover}
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

        {projectVsStatusReportIsGrouping ? (
          <HorizontalGrouping
            data={HorizontalGroupbyData}
            masterid={HorizontalGroupbyMasterid}
            optionid={HorizontalGroupbyOptionid}
            Tableloading={Tableloading}
            id={HorizontalGroupbyID}
          />
        ) : null}
        {/* {projectVsStatusReportIsGrouping ? (
          <HorizontalGroupByComponent
            data={HorizontalGroupbyData}
            masterid={HorizontalGroupbyMasterid}
            optionid={HorizontalGroupbyOptionid}
            Tableloading={loading}
            id={HorizontalGroupbyID}
            horizontalGroupByMasterData={horizontalGroupByMasterData}
            setHorizontalGroupBy={setHorizontalGroupBy}
            isAllDefault={true}
          />
        ) : null} */}

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
