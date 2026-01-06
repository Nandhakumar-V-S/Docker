/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "react-datepicker/dist/react-datepicker.css";
import ArcRadioBtn from "../ArcRadioBtn/ArcRadioBtn";
import "./Recurrence.scss";
import ArcCheckBoxBtn from "../ArcCheckBoxBtn/ArcCheckBoxBtn";
// import ArcToolTip from "../ArcTooltip/ArcTooltip";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdClose } from "react-icons/io"; 
import { Accordion, AccordionCollapse } from "react-bootstrap";

// *******~ Import ~******** //

export function RecurrencePopup({ ArcOffCanvaShow, setArcOffCanvaShow }) {
  const [recurrenceType, setRecurrenceType] = useState("daily");
  const [weekDays, setWeekDays] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: true,
    thursday: false,
    friday: false,
    saturday: false,
  });
  const [weeks, setWeeks] = useState(1);
  const [days, setDays] = useState(1);
  const [endType, setEndType] = useState("no_end");
  const [occurrences, setOccurrences] = useState(10);
  const [endDate, setEndDate] = useState("Wed 5/7/2025");
  const [autoSentInvoices, setAutoSentInvoices] = useState(false);
  const [startDate, setStartDate] = useState("Wed 3/5/2025");

  // Monthly options
  const [monthlyOption, setMonthlyOption] = useState("day");
  const [monthlyDay, setMonthlyDay] = useState(5);
  const [monthlyInterval, setMonthlyInterval] = useState(1);
  const [monthlyPosition, setMonthlyPosition] = useState("first");
  const [monthlyWeekday, setMonthlyWeekday] = useState("Wednesday");

  // Yearly options
  const [yearlyOption, setYearlyOption] = useState("on_date");
  const [yearlyInterval, setYearlyInterval] = useState(1);
  const [yearlyMonth, setYearlyMonth] = useState("March");
  const [yearlyDay, setYearlyDay] = useState(5);
  const [yearlyPosition, setYearlyPosition] = useState("first");
  const [yearlyWeekday, setYearlyWeekday] = useState("Wednesday");
  const [yearlyWeekdayMonth, setYearlyWeekdayMonth] = useState("March");

  const handleArcPopupClose = () => {
    setArcOffCanvaShow(false);
  };

  const handleWeekDayChange = (day) => {
    setWeekDays({
      ...weekDays,
      [day]: !weekDays[day],
    });
  };

  const handleRecurrenceTypeChange = (e) => {
    const newValue = e.target.value;
    setRecurrenceType(newValue);
  };

  const handleEndTypeChange = (type) => {
    setEndType(type);
  };

  // Helper function to get formatted date string
  const getFormattedDate = () => {
    const date = new Date();
    const options = {
      weekday: "short",
      month: "numeric",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  };

  const recurrenceTypeArr = [
    {
      Title: "Daily",
      Value: "daily",
    },
    {
      Title: "Weekly",
      Value: "weekly",
    },
    {
      Title: "Monthly",
      Value: "monthly",
    },
    {
      Title: "Yearly",
      Value: "yearly",
    },
  ];

  const Weekdays = [
    {
      Title: "Sunday",
      Value: "Sunday",
    },
    {
      Title: "Monday",
      Value: "Monday",
    },
    {
      Title: "Tuesday",
      Value: "Tuesday",
    },
    {
      Title: "Wednesday",
      Value: "Wednesday",
    },
    {
      Title: "Thursday",
      Value: "Thursday",
    },
    {
      Title: "Friday",
      Value: "Friday",
    },
    {
      Title: "Saturday",
      Value: "Saturday",
    },
  ];

  const monthPositions = ["first", "second", "third", "fourth", "last"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const CheckBtnData1 = [
    {
      Label: "Auto sent invoices",
      Value: "Auto sent invoices",
    },
  ];

  return (
    <React.Fragment>
      <Offcanvas
        show={ArcOffCanvaShow}
        onHide={handleArcPopupClose}
        className={`arc-off-canva-default search-filter`}
        placement="end"
        backdrop="static"
      >
        <div className="popup-body-content">
          <div className="popup-header">
            <h3>
              Recurring{" "}
              <div className="popup-close">
                <span onClick={handleArcPopupClose} className="close-btn">
                <IoMdClose />

                </span>
                {/* <ArcToolTip
                  HoverText="Close"
                  BtnName={<MdOutlineCancel />}
                  Placement="left"
                  onClick={handleArcPopupClose}
                  as="span"
                  className="close-btn"
                /> */}
              </div>
            </h3>
          </div>
          <div className="popup-main-recurrence-popup">
            <Accordion>
            <AccordionCollapse>
            <div className="recurrence-section">
              <h4>Recurrence Frequency</h4>
              <div className="recurrence-options">
                {/* <div className="recurrence-types"> */}
                {/* <div className="recurrence-option"> */}
                <ArcRadioBtn
                  RadioBtnData={recurrenceTypeArr}
                  id="recurrence"
                  Name="recurrence"
                  selectedValue={recurrenceType}
                  onChange={handleRecurrenceTypeChange}
                />
                {/* </div> */}
                {/* </div> */}
                <div className="recurrence-details">
                  {recurrenceType === "daily" && (
                    <div className="daily-options">
                      <div className="option-row">
                        <label>
                          <input
                            type="radio"
                            name="dailyOption"
                            checked={true}
                          />
                          <span>Every</span>
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={days}
                          onChange={(e) => setDays(e.target.value)}
                          className="number-input"
                        />
                        <span>day(s)</span>
                      </div>
                      <div className="option-row">
                        <label>
                          <input type="radio" name="dailyOption" />
                          <span>Every weekday</span>
                        </label>
                      </div>
                    </div>
                  )}
                  {recurrenceType === "weekly" && (
                    <div className="weekly-options">
                      <div className="weekly-freq">
                        <span>Recurrence every</span>
                        <input
                          type="number"
                          min="1"
                          value={weeks}
                          onChange={(e) => setWeeks(e.target.value)}
                          className="number-input"
                        />
                        <span>week(s) on:</span>
                      </div>
                      <div className="weekday-options">
                        <div className="weekday">
                          <ArcCheckBoxBtn
                            CheckBtnData={Weekdays}
                            onChange={() => handleWeekDayChange("sunday")}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {recurrenceType === "monthly" && (
                    <div className="monthly-options">
                      <div className="option-row">
                        <label>
                          <input
                            type="radio"
                            name="monthlyOption"
                            checked={monthlyOption === "day"}
                            onChange={() => setMonthlyOption("day")}
                          />
                          <span>Day</span>
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="31"
                          value={monthlyDay}
                          onChange={(e) => setMonthlyDay(e.target.value)}
                          className="number-input"
                        />
                        <span>of every</span>
                        <input
                          type="number"
                          min="1"
                          value={monthlyInterval}
                          onChange={(e) => setMonthlyInterval(e.target.value)}
                          className="number-input"
                        />
                        <span>month(s)</span>
                      </div>

                      <div className="option-row">
                        <label>
                          <input
                            type="radio"
                            name="monthlyOption"
                            checked={monthlyOption === "the"}
                            onChange={() => setMonthlyOption("the")}
                          />
                          <span>The</span>
                        </label>
                        <select
                          value={monthlyPosition}
                          onChange={(e) => setMonthlyPosition(e.target.value)}
                          className="select-input"
                        >
                          {monthPositions.map((pos) => (
                            <option key={pos} value={pos}>
                              {pos}
                            </option>
                          ))}
                        </select>

                        <select
                          value={monthlyWeekday}
                          onChange={(e) => setMonthlyWeekday(e.target.value)}
                          className="select-input"
                        >
                          {Weekdays.map((day) => (
                            <option key={day.Value} value={day.Value}>
                              {day.Value}
                            </option>
                          ))}
                        </select>

                        <span>of every</span>
                        <input
                          type="number"
                          min="1"
                          value={monthlyInterval}
                          onChange={(e) => setMonthlyInterval(e.target.value)}
                          className="number-input"
                        />
                        <span>month(s)</span>
                      </div>
                    </div>
                  )}

                  {recurrenceType === "yearly" && (
                    <div className="yearly-options">
                      <div className="option-row">
                        <span>Recurrence every</span>
                        <input
                          type="number"
                          min="1"
                          value={yearlyInterval}
                          onChange={(e) => setYearlyInterval(e.target.value)}
                          className="number-input"
                        />
                        <span>year(s)</span>
                      </div>

                      <div className="option-row">
                        <label>
                          <input
                            type="radio"
                            name="yearlyOption"
                            checked={yearlyOption === "on_date"}
                            onChange={() => setYearlyOption("on_date")}
                          />
                          <span>On:</span>
                        </label>
                        <select
                          value={yearlyMonth}
                          onChange={(e) => setYearlyMonth(e.target.value)}
                          className="select-input"
                        >
                          {months.map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>

                        <input
                          type="number"
                          min="1"
                          max="31"
                          value={yearlyDay}
                          onChange={(e) => setYearlyDay(e.target.value)}
                          className="number-input"
                        />
                      </div>

                      <div className="option-row">
                        <label>
                          <input
                            type="radio"
                            name="yearlyOption"
                            checked={yearlyOption === "on_the"}
                            onChange={() => setYearlyOption("on_the")}
                          />
                          <span>On the:</span>
                        </label>
                        <select
                          value={yearlyPosition}
                          onChange={(e) => setYearlyPosition(e.target.value)}
                          className="select-input"
                        >
                          {monthPositions.map((pos) => (
                            <option key={pos} value={pos}>
                              {pos}
                            </option>
                          ))}
                        </select>

                        <select
                          value={yearlyWeekday}
                          onChange={(e) => setYearlyWeekday(e.target.value)}
                          className="select-input"
                        >
                          {Weekdays.map((day) => (
                            <option key={day.Value} value={day.Value}>
                              {day.Value}
                            </option>
                          ))}
                        </select>

                        <span>of</span>
                        <select
                          value={yearlyWeekdayMonth}
                          onChange={(e) =>
                            setYearlyWeekdayMonth(e.target.value)
                          }
                          className="select-input"
                        >
                          {months.map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            </AccordionCollapse>
            <AccordionCollapse>
            <div className="recurrence-end-section">
              <h4>Range of recurrence</h4>
              <div className="recurrence-end-options">
                <div className="left-content">
                <div className="start-date">
                  <span>Start date:</span>
                  <input type="date" value={startDate} />
                </div>
                <div className="end-date">
                  <input type="checkbox" />
                  <label>Auto sent invoices</label>
                  {/* <ArcCheckBoxBtn
                    Label="Auto sent invoices"
                    CheckBtnData={CheckBtnData1}
                  /> */}
                </div>
                </div>
                <div className="end-options">
                  <div className="option-row">
                    <label>
                      <input
                        type="radio"
                        name="endOption"
                        checked={endType === "no_end"}
                        onChange={() => handleEndTypeChange("no_end")}
                      />
                      <span>No end date</span>
                    </label>
                  </div>

                  <div className="option-row">
                    <label>
                      <input
                        type="radio"
                        name="endOption"
                        checked={endType === "end_after"}
                        onChange={() => handleEndTypeChange("end_after")}
                      />
                      <span>End after</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={occurrences}
                      onChange={(e) => setOccurrences(e.target.value)}
                      disabled={endType !== "end_after"}
                      className="number-input"
                    />
                    <span>occurrences</span>
                  </div>
                  <div className="option-row">
                    <label>
                      <input
                        type="radio"
                        name="endOption"
                        checked={endType === "end_by"}
                        onChange={() => handleEndTypeChange("end_by")}
                      />
                      <span>End by</span>
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      // disabled={endType !== "end_by"}
                    />
                  </div>
                </div>
              </div>
            </div>
            </AccordionCollapse>
            </Accordion>
          </div>
          <div className="popup-footer">
            <button className="cancel" onClick={handleArcPopupClose}>
              Cancel
            </button>
            <button className="save" onClick={handleArcPopupClose}>
              Ok
            </button>
          </div>
        </div>
      </Offcanvas>
    </React.Fragment>
  );
}


 