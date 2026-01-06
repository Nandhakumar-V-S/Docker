/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect, forwardRef } from "react";
import Form from "react-bootstrap/Form";
import { format, isSameDay } from "date-fns";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { CiCalendar } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
export default function ArcYearWeekPicker() {
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((firstDayOfYear.getDay() + pastDaysOfYear) / 7);
  };
  const currentYear = new Date().getFullYear();
  const currentWeek = getWeekNumber(new Date());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const handleSelect = (eventKey) => {
    setSelectedWeek(parseInt(eventKey, 10)); // Convert eventKey to integer and set state
  };

  const handlePreviousYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };
  return (
    <React.Fragment>
      <div className="arc-year-week-dropdown">
        <DropdownButton
          className="year-week-dropdown"
          title={
            <>
              Week {selectedWeek}
              <span>
                <IoMdArrowDropdown />
              </span>
            </>
          } // Title displays the current selected week
          onSelect={handleSelect} // Event handler to update the state on selection
        >
          {[...Array(52)].map((_, index) => (
            <Dropdown.Item
              className={selectedWeek === index + 1 ? "active" : "null"}
              as="button"
              eventKey={index + 1} // This is passed to the handleSelect function
              key={index + 1}
            >
              W{index + 1} {/* Displaying week number */}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <div className="select-input-group">
          <button
            className="previous-btn"
            type="button"
            onClick={handlePreviousYear}
          >
            <IoIosArrowBack />
          </button>
          <Form.Control type="text" value={`${selectedYear}`} readOnly />
          <button className="next-btn" type="button" onClick={handleNextYear}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export function ArcYearWeekPickerV2() {
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((firstDayOfYear.getDay() + pastDaysOfYear) / 7);
  };
  const currentYear = new Date().getFullYear();
  const currentWeek = getWeekNumber(new Date());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const handleSelect = (eventKey) => {
    setSelectedWeek(parseInt(eventKey, 10)); // Convert eventKey to integer and set state
  };

  const handlePreviousYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };
  return (
    <React.Fragment>
      <div className="arc-year-week-dropdown with-v2">
        <DropdownButton
          className="year-week-dropdown"
          align="start"
          title={
            <>
              W{selectedWeek}
              {/* <span>
                <IoMdArrowDropdown />
              </span> */}
            </>
          } // Title displays the current selected week
          onSelect={handleSelect} // Event handler to update the state on selection
        >
          {[...Array(52)].map((_, index) => (
            <Dropdown.Item
              className={selectedWeek === index + 1 ? "active" : "null"}
              as="button"
              eventKey={index + 1}
              key={index + 1}
            >
              W{index + 1} {/* Displaying week number */}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <span className="of-span">of</span>
        <DropdownButton
          className="year-week-dropdown"
          align="end"
          title={
            <>
              {selectedYear}
              {/* <span>
                <IoMdArrowDropdown />
              </span> */}
            </>
          } // Title displays the current selected week
        >
          {[...Array(21)].map((_, index) => {
            const year = currentYear - 10 + index;
            return (
              <Dropdown.Item
                className={selectedYear === year ? "active" : ""}
                onClick={() => setSelectedYear(year)}
                key={year}
              >
                {year}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </div>
    </React.Fragment>
  );
}

export function ArcYearWeekPickerV3() {
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((firstDayOfYear.getDay() + pastDaysOfYear) / 7);
  };
  const currentYear = new Date().getFullYear();
  const currentWeek = getWeekNumber(new Date());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const handleSelect = (eventKey) => {
    setSelectedWeek(parseInt(eventKey, 10)); // Convert eventKey to integer and set state
  };

  const handlePreviousYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };
  return (
    <React.Fragment>
      <div className="arc-year-week-dropdown with-v2 with-v3">
        <DropdownButton
          className="year-week-dropdown"
          align="start"
          title={
            <>
              W{selectedWeek}
              {/* <span>
                <IoMdArrowDropdown />
              </span> */}
            </>
          } // Title displays the current selected week
          onSelect={handleSelect} // Event handler to update the state on selection
        >
          {[...Array(52)].map((_, index) => (
            <Dropdown.Item
              className={selectedWeek === index + 1 ? "active" : "null"}
              as="button"
              eventKey={index + 1}
              key={index + 1}
            >
              W{index + 1} {/* Displaying week number */}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <span className="of-span">of</span>
        <DropdownButton
          className="year-week-dropdown"
          align="end"
          title={
            <>
              {selectedYear}
              {/* <span>
                <IoMdArrowDropdown />
              </span> */}
            </>
          } // Title displays the current selected week
        >
          {[...Array(21)].map((_, index) => {
            const year = currentYear - 10 + index;
            return (
              <Dropdown.Item
                className={selectedYear === year ? "active" : ""}
                onClick={() => setSelectedYear(year)}
                key={year}
              >
                {year}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </div>
    </React.Fragment>
  );
}

export const WeekFilter = () => {
  const [showPopover, setShowPopover] = useState(false);
  const handlePopoverClose = () => {
    setShowPopover(false);
    setTempSelectedYear(selectedYear);
    setTempSelectedWeek(selectedWeek);
  };

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((firstDayOfYear.getDay() + pastDaysOfYear) / 7);
  };
  const currentYear = new Date().getFullYear();
  const currentWeek = getWeekNumber(new Date());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const [TempselectedYear, setTempSelectedYear] = useState(currentYear);
  const [TempselectedWeek, setTempSelectedWeek] = useState(currentWeek);
  const HandleApply = () => {
    setSelectedYear(TempselectedYear);
    setSelectedWeek(TempselectedWeek);
    setShowPopover(false);
  };
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      rootClose
      show={showPopover}
      onToggle={(show) => setShowPopover(show)}
      overlay={
        <Popover className={`arc-popover w-y-filter-popover`}>
          <Popover.Body>
            <div className="arc-popover-body">
              <div className="arc-popover-header">
                <h5>
                  W{TempselectedWeek} of {TempselectedYear}
                </h5>
                <ArcToolTip
                  onClick={handlePopoverClose}
                  HoverText="Close"
                  BtnName={<ImCancelCircle />}
                  Placement="left"
                  as="span"
                />
              </div>
              <div className="arc-popover-main">
                <div className="filter-group">
                  <div className="filter-box week-filter">
                    <p className="title">Week</p>
                    <ul>
                      {[...Array(52)].map((_, index) => (
                        <li
                          className={
                            TempselectedWeek === index + 1 ? "active" : ""
                          }
                          onClick={() => setTempSelectedWeek(index + 1)}
                          key={index + 1}
                        >
                          W{index + 1}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="filter-box  year-filter">
                    <p className="title">Year</p>
                    <ul>
                      {[...Array(21)].map((_, index) => {
                        const year = currentYear - 10 + index;
                        return (
                          <li
                            className={
                              TempselectedYear === year ? "active" : ""
                            }
                            onClick={() => setTempSelectedYear(year)}
                            key={year}
                          >
                            {year}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="arc-popover-footer">
                <button className="cancel" onClick={handlePopoverClose}>
                  Cancel
                </button>
                <button onClick={HandleApply}>Apply</button>
              </div>
            </div>
          </Popover.Body>
        </Popover>
      }
    >
      <button className={`arc-popover-button ${showPopover ? "active" : null}`}>
        W{selectedWeek} <p>of</p> {selectedYear}
        <span>
          <MdKeyboardArrowDown />
        </span>
      </button>
    </OverlayTrigger>
  );
};

export const WeekFilterV2 = ({
  selectedYear,
  setSelectedYear,
  selectedWeek,
  setSelectedWeek,
  HandleWeekChange,
  api_name,
  id,
  masterid,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  console.log(selectedWeek, selectedYear);
  // ! Scroll top the active list
  const ulRef = useRef(null);
  useEffect(() => {
    const scrollToActive = () => {
      if (ulRef.current) {
        const activeLi = ulRef.current.querySelector(".active");
        console.log("Active element:", activeLi);
        if (activeLi) {
          ulRef.current.scrollTop = activeLi.offsetTop - 100; // Adjusting for 50px offset
          console.log("Scroll top set to:", activeLi.offsetTop - 100);
        }
      }
    };

    // Set a timeout to ensure the element is rendered before scrolling
    const timeoutId = setTimeout(scrollToActive, 0);

    // Clear timeout if the component unmounts before the timeout completes
    return () => clearTimeout(timeoutId);
  }, [selectedWeek, showPopover]);
  // ! Scroll top the active list
  const handlePopoverClose = () => {
    setShowPopover(false);
  };

  // const getWeekNumber = (date) => {
  //   const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  //   const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  //   return Math.ceil((firstDayOfYear.getDay() + pastDaysOfYear) / 7);
  // };
  // const currentYear = new Date().getFullYear();
  // const currentWeek = getWeekNumber(new Date());
  // const [selectedYear, setSelectedYear] = useState(currentYear);
  // const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const handlePreviousYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      rootClose
      show={showPopover}
      onToggle={(show) => setShowPopover(show)}
      overlay={
        <Popover className={`arc-popover w-y-filter-popover filter-option-v2`}>
          <Popover.Body>
            <div className="arc-popover-body">
              <div className="arc-popover-header">
                <h5>
                  W{selectedWeek} - {selectedYear}
                </h5>
                <ArcToolTip
                  onClick={handlePopoverClose}
                  HoverText="Close"
                  BtnName={<ImCancelCircle />}
                  Placement="left"
                  as="span"
                />
              </div>
              <div className="arc-popover-main">
                <div className="select-input-group">
                  <button
                    className="previous-btn"
                    type="button"
                    onClick={handlePreviousYear}
                  >
                    <IoIosArrowBack />
                  </button>
                  <Form.Control
                    type="text"
                    value={`${selectedYear}`}
                    readOnly
                  />
                  <button
                    className="next-btn"
                    type="button"
                    onClick={handleNextYear}
                  >
                    <IoIosArrowForward />
                  </button>
                </div>
                <div className="filter-group">
                  <div className="filter-box filter-option-v2 week-filter">
                    {/* <p className="title">Week</p> */}
                    <ul ref={ulRef}>
                      {[...Array(53)].map((_, index) => (
                        <li
                          className={selectedWeek == index + 1 ? "active" : ""}
                          onClick={() => {
                            setSelectedWeek(index + 1);
                            setShowPopover(false);
                            HandleWeekChange(index, api_name, id, masterid);
                          }}
                          key={index + 1}
                        >
                          W{index + 1}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Popover.Body>
        </Popover>
      }
    >
      <button
        className={`arc-popover-button filter-option-v2 ${
          showPopover ? "active" : null
        }`}
      >
        W{selectedWeek} <p>-</p> {selectedYear}
        <span>
          <MdKeyboardArrowDown />
        </span>
      </button>
    </OverlayTrigger>
  );
};

export const ArcDateFilter = ({ startDate, setStartDate, onChange }) => {
  // const [startDate, setStartDate] = useState(new Date());
  const isToday = startDate && isSameDay(new Date(), startDate);
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="arc-custom-date-input" onClick={onClick} ref={ref}>
      <span>
        <CiCalendar />
      </span>
      {isToday ? "Today" : value}
    </button>
  ));
  return (
    <React.Fragment>
      <div className="actions with-date-filter">
        <div className="arc-date-filter">
          <div
            className={`arc-input-control arc-datepicker ${
              isToday && "active-today"
            }`}
          >
            <DatePicker
              customInput={<ExampleCustomInput />}
              selected={startDate}
              // onChange={(date) => setStartDate(date)}
              onChange={onChange}
              toggleCalendarOnIconClick
              showIcon={false}
              icon={
                <span>
                  <CiCalendar />
                  {isToday && <>Today</>}
                </span>
              }
              closeOnScroll={true}
              isClearable={false}
              className="date-input"
              popperClassName="some-custom-class"
              popperPlacement="top-end"
              // readOnly
              popperModifiers={[
                {
                  name: "myModifier",
                  fn(state) {
                    // Do something with the state
                    return state;
                  },
                },
              ]}
            />
          </div>
        </div>
        {/* <span>{isToday ? "Today" : format(startDate, "MM/dd/yyyy")}</span> */}
      </div>
    </React.Fragment>
  );
};

export const MonthFilterV2 = ({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  handleMonthChange,
  api_name,
  id,
  masterid,
  displayName,
}) => {
  const [showPopover, setShowPopover] = useState(false);

  // ! Scroll top the active list
  const ulRef = useRef(null);
  useEffect(() => {
    const scrollToActive = () => {
      if (ulRef.current) {
        const activeLi = ulRef.current.querySelector(".active");
        console.log("Active element:", activeLi);
        if (activeLi) {
          ulRef.current.scrollTop = activeLi.offsetTop - 100; // Adjusting for 50px offset
          console.log("Scroll top set to:", activeLi.offsetTop - 100);
        }
      }
    };

    // Set a timeout to ensure the element is rendered before scrolling
    const timeoutId = setTimeout(scrollToActive, 0);

    // Clear timeout if the component unmounts before the timeout completes
    return () => clearTimeout(timeoutId);
  }, [selectedMonth, showPopover]);

  const handlePopoverClose = () => {
    setShowPopover(false);
  };

  // const getWeekNumber = (date) => {
  //   const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  //   const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  //   return Math.ceil((firstDayOfYear.getDay() + pastDaysOfYear) / 7);
  // };

  const handlePreviousYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };
  // const currentDate = new Date();
  // const currentYear = currentDate.getFullYear();
  // const currentWeek = getWeekNumber(currentDate);
  // const currentMonth = currentDate.getMonth() + 1; // getMonth returns 0-11, so add 1 to get 1-12

  // const [selectedYear, setSelectedYear] = useState(currentYear);
  // const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // ! Scroll top the active list
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      rootClose
      show={showPopover}
      onToggle={(show) => setShowPopover(show)}
      overlay={
        <Popover className={`arc-popover w-y-filter-popover filter-option-v2`}>
          <Popover.Body>
            <div className="arc-popover-body">
              <div className="arc-popover-header">
                <h5>
                  M{selectedMonth} - {selectedYear}
                </h5>
                <ArcToolTip
                  onClick={handlePopoverClose}
                  HoverText="Close"
                  BtnName={<ImCancelCircle />}
                  Placement="left"
                  as="span"
                />
              </div>
              <div className="arc-popover-main">
                <div className="select-input-group">
                  <button
                    className="previous-btn"
                    type="button"
                    onClick={handlePreviousYear}
                  >
                    <IoIosArrowBack />
                  </button>
                  <Form.Control
                    type="text"
                    value={`${selectedYear}`}
                    readOnly
                  />
                  <button
                    className="next-btn"
                    type="button"
                    onClick={handleNextYear}
                  >
                    <IoIosArrowForward />
                  </button>
                </div>
                <div className="filter-group">
                  <div className="filter-box filter-option-v2 week-filter">
                    {/* <p className="title">Week</p> */}
                    <ul ref={ulRef}>
                      {[...Array(12)].map((_, index) => (
                        <li
                          className={
                            selectedMonth === index + 1 ? "active" : ""
                          }
                          onClick={() => {
                            setSelectedMonth(index + 1);
                            setShowPopover(false);
                            handleMonthChange(index, api_name, id, masterid);
                          }}
                          key={index + 1}
                        >
                          M{index + 1}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Popover.Body>
        </Popover>
      }
    >
      <button
        className={`arc-popover-button ${
          selectedMonth != "" ? "filter-option-v2" : null
        }  ${showPopover ? "active" : null}`}
      >
        {selectedMonth != ""
          ? ` M${selectedMonth} - ${selectedYear}`
          : displayName}

        <span>
          <MdKeyboardArrowDown />
        </span>
      </button>
    </OverlayTrigger>
  );
};

export const WeekFilterV3 = ({
  selectedYear,
  setSelectedYear,
  selectedWeek,
  setSelectedWeek,
  HandleWeekChange,
  api_name,
  id,
  masterid,
  displayName,
}) => {
  console.log(selectedYear);
  const [showPopover, setShowPopover] = useState(false);
  // ! Scroll top the active list
  const ulRef = useRef(null);
  useEffect(() => {
    const scrollToActive = () => {
      if (ulRef.current) {
        const activeLi = ulRef.current.querySelector(".active");
        console.log("Active element:", activeLi);
        if (activeLi) {
          ulRef.current.scrollTop = activeLi.offsetTop - 100; // Adjusting for 50px offset
          console.log("Scroll top set to:", activeLi.offsetTop - 100);
        }
      }
    };

    // Set a timeout to ensure the element is rendered before scrolling
    const timeoutId = setTimeout(scrollToActive, 0);

    // Clear timeout if the component unmounts before the timeout completes
    return () => clearTimeout(timeoutId);
  }, [selectedWeek, showPopover]);
  // ! Scroll top the active list
  const handlePopoverClose = () => {
    setShowPopover(false);
  };

  // const getWeekNumber = (date) => {
  //   const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  //   const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  //   return Math.ceil((firstDayOfYear.getDay() + pastDaysOfYear) / 7);
  // };
  // const currentYear = new Date().getFullYear();
  // const currentWeek = getWeekNumber(new Date());
  // const [selectedYear, setSelectedYear] = useState(currentYear);
  // const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const handlePreviousYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      rootClose
      show={showPopover}
      onToggle={(show) => setShowPopover(show)}
      overlay={
        <Popover className={`arc-popover w-y-filter-popover filter-option-v2`}>
          <Popover.Body>
            <div className="arc-popover-body">
              <div className="arc-popover-header">
                <h5>
                  W{selectedWeek} - {selectedYear}
                </h5>
                <ArcToolTip
                  onClick={handlePopoverClose}
                  HoverText="Close"
                  BtnName={<ImCancelCircle />}
                  Placement="left"
                  as="span"
                />
              </div>
              <div className="arc-popover-main">
                <div className="select-input-group">
                  <button
                    className="previous-btn"
                    type="button"
                    onClick={handlePreviousYear}
                  >
                    <IoIosArrowBack />
                  </button>
                  <Form.Control
                    type="text"
                    value={`${selectedYear}`}
                    readOnly
                  />
                  <button
                    className="next-btn"
                    type="button"
                    onClick={handleNextYear}
                  >
                    <IoIosArrowForward />
                  </button>
                </div>
                <div className="filter-group">
                  <div className="filter-box filter-option-v2 week-filter">
                    {/* <p className="title">Week</p> */}
                    <ul ref={ulRef}>
                      {[...Array(52)].map((_, index) => (
                        <li
                          className={selectedWeek == index + 1 ? "active" : ""}
                          onClick={() => {
                            setSelectedWeek(index + 1);
                            setShowPopover(false);
                            HandleWeekChange(index, api_name, id, masterid);
                          }}
                          key={index + 1}
                        >
                          W{index + 1}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Popover.Body>
        </Popover>
      }
    >
      <button
        className={`arc-popover-button ${
          selectedWeek !== "" ? "filter-option-v2" : null
        }  ${showPopover ? "active" : null}`}
      >
        {selectedWeek !== ""
          ? `  W${selectedWeek} - ${selectedYear}`
          : displayName}
        {/* {selectedWeek} <p>-</p> {selectedYear} */}
        <span>
          <MdKeyboardArrowDown />
        </span>
      </button>
    </OverlayTrigger>
  );
};
