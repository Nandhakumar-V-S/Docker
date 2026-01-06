import React, { useState, useRef, useContext, useEffect } from "react";
import { useSelector } from "react-redux";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

//import HorizontalGrouping from "../components/HorizontalGrouping";
import { HorizontalGrouping } from "@/components/ResourceVsMonthWeekReportComp/Filters/HorizontalGrouping";
import { CustomizeTable } from "@/components/ResourceVsMonthWeekReportComp/Filters/CustomizeTable";
import { GroupByFilter } from "@/components/ResourceVsMonthWeekReportComp/Filters/GroupbyFilter";
import { CustomFilters } from "@/components/ResourceVsMonthWeekReportComp/Filters/CustomFilters";
import { ImTree } from "react-icons/im";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineTableChart } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import QuickFilterHeader from "@/components/ResourceVsMonthWeekReportComp/Filters/QuickFilterHeader";

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
} from "@/redux/ResourceVsMonthWeekReport/selector";

//Custom End
// ~ New GroupBy
// import { HorizontalGroupByComponent } from "@/components/TaskComp/Filters/HorizontalGroupby";
import { HorizontalGroupByComponent } from "@/components/arccomponents/utility/HorizontalGroupby";
import { horizontalGroupByMasterInfo } from "@/redux/ResourceVsMonthWeekReport/selector";
import { loadingInfo } from "@/redux/ResourceVsMonthWeekReport/selector";
import { setHorizontalGroupBy } from "@/redux/ResourceVsMonthWeekReport/actions";
// import {
//   weekFilterInfo,
//   monthFilterInfo,
// } from "@/redux/ResourceVsMonthWeekReport/selector";
// ~ New GroupBy
// ~ Filter List
import {
  FilterListHeader,
  HandleFilterList,
} from "@/components/arccomponents/utility/FilterList";
import { ListContext } from "@/modules/ResourceVsMonthWeekReportModule/index";
import {
  selectedFiltersInfo,
  matchedLookupInfo,
  textFilterInfo,
  datePickerFilterInfo,
  weekFilterInfo,
  monthFilterInfo,
} from "@/redux/ResourceVsMonthWeekReport/selector";

// ~ Filter List
export default function FilterHeader({ Tableloading, setTableLoading }) {
  const [overallTextFiter, setoverallTextFilter] = useState({});
  //   const translate = useLanguage();
  const { resourceVsMonthWeekReportIsGrouping } = useContext(
    ArcGlobalContextProvider
  );
  console.log(resourceVsMonthWeekReportIsGrouping);
  // ~ Filter list
  const { FilterDropdownShow, setFilterDropdownShow } = useContext(ListContext);
  const matchedLookup = useSelector(matchedLookupInfo);
  const selectedFilters = useSelector(selectedFiltersInfo);
  const selectedFiltersLength = selectedFilters.length;
  const textFilter = useSelector(textFilterInfo);
  const datePickerFilter = useSelector(datePickerFilterInfo);
  console.log(datePickerFilter);
  const weekFilter = useSelector(weekFilterInfo);
  const monthFilter = useSelector(monthFilterInfo);
  console.log(weekFilter);
  // ~ Filter list
  // ! week filter
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((firstDayOfYear.getDay() + pastDaysOfYear) / 7);
  };
  const currentDate = new Date();
  const currentYear = new Date().getFullYear();
  const currentWeek = getWeekNumber(new Date());
  const currentMonth = currentDate.getMonth() + 1; // getMonth returns 0-11, so add 1 to get 1-12
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // ! week filter

  // ~ New GroupBy
  const [UpdatedGroupbyDataWeek, setUpdatedGroupbyDataWeek] = useState([]);
  const [UpdatedGroupbyDataMonth, setUpdatedGroupbyDataMonth] = useState([]);
  const loading = useSelector(loadingInfo);
  const horizontalGroupByMasterData = useSelector(horizontalGroupByMasterInfo);
  // const weekFilter = useSelector(weekFilterInfo);
  console.log(weekFilter);
  // const monthFilter = useSelector(monthFilterInfo);
  console.log(monthFilter);
  console.log(horizontalGroupByMasterData);
  // Helper functions
  const getDateOfWeek = (week, year) => {
    const date = new Date(year, 0, 1 + (week - 1) * 7);
    const day = date.getDay();
    const dayOffset = day <= 4 ? -day + 1 : 8 - day;
    return new Date(date.setDate(date.getDate() + dayOffset));
  };
  const formatDate = (date) => {
    console.log(date);
    const options = { month: "2-digit", day: "2-digit", year: "numeric" };
    return date?.toLocaleDateString("en-US", options);
  };
  function gtwknumyear(date) {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date - start + (start.getDay() + 1) * 24 * 60 * 60 * 1000;
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    return Math.ceil(diff / oneWeek);
  }

  function gtfrstwkNum(year, month) {
    // Adjust month for 0-based indexing (January is 0, February is 1, etc.)
    month -= 1;

    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);

    // Calculate the week number of the year for the first day of the month
    return gtwknumyear(firstDayOfMonth);
  }

  useEffect(() => {
    if (horizontalGroupByMasterData.length > 0) {
      const week = weekFilter[0]?.week || selectedWeek;
      const year = weekFilter[0]?.year || selectedYear;
      const startDate = getDateOfWeek(parseInt(week), parseInt(year));

      const newUpdatedGroupbyData = horizontalGroupByMasterData.map(
        (item, index) => {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + index);
          return { ...item, value: formatDate(date) };
        }
      );

      setUpdatedGroupbyDataWeek(newUpdatedGroupbyData);
    }
  }, [weekFilter, horizontalGroupByMasterData]);
  useEffect(() => {
    if (monthFilter.length > 0 && horizontalGroupByMasterData.length > 0) {
      const { year, month } = monthFilter[0];

      const firstWeekNumber = gtfrstwkNum(Number(year), Number(month));

      const newUpdatedMastervalues = horizontalGroupByMasterData.map(
        (value, index) => {
          const groupedValue = `${firstWeekNumber + index}$${year}`;
          return { ...value, value: groupedValue };
        }
      );

      setUpdatedGroupbyDataMonth(newUpdatedMastervalues);
    }
  }, [monthFilter, horizontalGroupByMasterData]);
  console.log(UpdatedGroupbyDataWeek);
  console.log(UpdatedGroupbyDataMonth);
  console.log(selectedYear, selectedWeek);
  // ~ New GroupBy
  useEffect(() => {
    if (weekFilter.length > 0) {
      const selectedweek = weekFilter[0].week;
      const selectedyear = weekFilter[0].year;
      console.log(selectedweek, selectedyear);
      setSelectedWeek(selectedweek);
      setSelectedYear(selectedyear);
    }
  }, [weekFilter]);
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

  const HorizontalGroupbyOptionid =
    horizontalGroupBy
      ?.map((item) => item.value)
      .filter(Boolean)
      .join(",") || "All";
  const HorizontalGroupbyID = horizontalGroupBy
    ?.map((item) => item.id)
    .join(",");
  console.log(HorizontalGroupbyData);
  console.log(HorizontalGroupbyMasterid);
  console.log(HorizontalGroupbyID);

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
          resourceVsMonthWeekReportIsGrouping ? "is-grouping" : null
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

        {resourceVsMonthWeekReportIsGrouping ? (
          <HorizontalGrouping
            data={HorizontalGroupbyData}
            masterid={HorizontalGroupbyMasterid}
            optionid={HorizontalGroupbyOptionid}
            Tableloading={Tableloading}
            id={HorizontalGroupbyID}
          />
        ) : null}
        {/* {resourceVsMonthWeekReportIsGrouping ? (
          <HorizontalGroupByComponent
            data={HorizontalGroupbyData}
            masterid={HorizontalGroupbyMasterid}
            optionid={HorizontalGroupbyOptionid}
            Tableloading={loading}
            id={HorizontalGroupbyID}
            horizontalGroupByMasterData={
              horizontalGroupBy[0]?.api_name === "workweek_Group"
                ? UpdatedGroupbyDataMonth
                : horizontalGroupBy[0]?.api_name === "workday_Group"
                  ? UpdatedGroupbyDataWeek
                  : horizontalGroupByMasterData
            }
            setHorizontalGroupBy={setHorizontalGroupBy}
            isAllDefault={true}
            isDateFilter={true}
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
