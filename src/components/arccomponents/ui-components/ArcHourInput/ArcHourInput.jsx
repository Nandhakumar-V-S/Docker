/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
const ArcHourInput = ({
  Value,
  onChange,
  onBlur,
  Required,
  Label,
  Name,
  ReadOnly,
  Id,
  DefaultValue,
}) => {
  //   const [input, setInput] = useState("");

  //   const handleInputChange = (e) => {
  //     setInput(e.target.value);
  //   };

  const convertToHours = (inputValue) => {
    if (inputValue.trim() === "") {
      return "0h"; // Return "0h" if input is empty
    }

    const regex = /^(\d*\.?\d*)([hwdm]?)$/; // Regular expression to match numerical value and unit
    const match = inputValue.match(regex);
    if (!match) {
      return "0h"; // Return "0h" if input is invalid
    }
    const value = parseFloat(match[1]);
    const unit = match[2];

    let convertedHours;
    switch (unit) {
      case "d":
        // Convert days to working hours (8 hours per day)
        convertedHours = value * 8;
        break;
      case "w":
        // Convert weeks to working hours (5 days per week, 8 hours per day)
        convertedHours = value * 5 * 8;
        break;
      case "m":
        // Convert minutes to hours
        convertedHours = Math.floor(value / 60);
        break;
      default:
        // Assume input is already in hours
        convertedHours = value;
    }

    // Check if convertedHours is NaN
    if (isNaN(convertedHours)) {
      return "0h"; // Return "0h" if conversion result is NaN
    }

    const roundedTime =
      convertedHours % 1 !== 0
        ? convertedHours.toFixed(2)
        : convertedHours.toFixed(0);
    const roundedTimebind = roundedTime + "h";

    return Number.isInteger(convertedHours) ? roundedTimebind : roundedTimebind;
  };

  //   const handleInputBlur = () => {
  //     const convertedHours = convertToHours(input);
  //     setInput(convertedHours);
  //   };

  return (
    <React.Fragment>
      <div
        className={`arc-input-control arc-textbox ${
          Required ? "mandatory-field" : null
        }`}
      >
        {Label && (
          <Form.Label>
            {Label} {Required && <sup>*</sup>}
          </Form.Label>
        )}
        <Form.Control
          type="text"
          placeholder="e.g., 30m, 2h, 2d, 2w,"
          value={Value}
          defaultValue={DefaultValue}
          //   onChange={handleInputChange}
          //   onBlur={handleInputBlur}
          onChange={onChange}
          onBlur={onBlur}
          name={Name}
          readOnly={ReadOnly}
          id={Id}
        />
      </div>
    </React.Fragment>
  );
};

export default ArcHourInput;

export const TimeInput = ({
  hours,
  setHours,
  minutes,
  setMinutes,
  onBlurHour,
  onBlurMinutes,
  spendhours,
  setTotalMinutes,
  TotalMinutes,
  Label,
  Required,
  ClassName,
  onMouseLeaveMinutes,
  onMouseLeaveHour,
}) => {
  // Initialize default values
  let Defaulthours = 0;
  let Defaultminutes = 0;

  // Regular expressions to match hours and minutes
  const regexHoursMinutes = /(\d+)h\s*(\d+)m/;
  const regexMinutesOnly = /(\d+)m/;
  const regexHoursOnly = /(\d+)h/;

  // Check if spendhours is empty or "-"
  if (spendhours === "" || spendhours === "-") {
    // Set defaults to 0
    Defaulthours = 0;
    Defaultminutes = 0;
  } else if (regexHoursMinutes.test(spendhours)) {
    // Format: 1h 30m
    const match = spendhours.match(regexHoursMinutes);
    Defaulthours = parseInt(match[1], 10); // parse hours
    Defaultminutes = parseInt(match[2], 10); // parse minutes
  } else if (regexMinutesOnly.test(spendhours)) {
    // Format: 30m
    const match = spendhours.match(regexMinutesOnly);
    Defaultminutes = parseInt(match[1], 10); // parse minutes
  } else if (regexHoursOnly.test(spendhours)) {
    // Format: 1h
    const match = spendhours.match(regexHoursOnly);
    Defaulthours = parseInt(match[1], 10); // parse hours
  }
  const handleHoursChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0) {
      setHours(value);
    } else {
      setHours(0);
    }
  };
  const handleMinutesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0) {
      setMinutes(value);
    } else {
      setMinutes(0);
    }
  };
  useEffect(() => {
    setMinutes(Defaultminutes);
    setHours(Defaulthours);
  }, [spendhours]);
  // ! Time Input start
  // const [hours, setHours] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [TotalMinutes, setTotalMinutes] = useState(0);

  // const handleHoursChange = (e) => {
  //   const value = parseInt(e.target.value, 10);
  //   if (value >= 0) {
  //     setHours(value);
  //   } else {
  //     setHours(0);
  //   }
  // };

  // const handleMinutesChange = (e) => {
  //   const value = parseInt(e.target.value, 10);
  //   // if (/^\d*$/.test(value) && value >= 0 && value < 60) {
  //   //   setMinutes(value);
  //   // }
  //   if (value >= 0) {
  //     setMinutes(value);
  //   } else {
  //     setMinutes(0);
  //   }
  // };

  // const onBlurMinutes = () => {
  //   const total = hours * 60 + parseInt(minutes, 10);
  //   setTotalMinutes(total);
  // };

  // const onBlurHour = () => {
  //   const total = parseInt(hours, 10) * 60 + minutes;
  //   setTotalMinutes(total);
  // };
  // ! Time Input End
  return (
    <div
      className={`arc-input-control arc-textbox ${
        Required ? "mandatory-field" : null
      }`}
    >
      {Label && (
        <Form.Label>
          {Label} {Required && <sup>*</sup>}
        </Form.Label>
      )}
      <div className="hours-minutes">
        <div className="input-section">
          <Form.Control
            type="text"
            value={hours || undefined}
            onChange={handleHoursChange}
            defaultValue={hours}
            onBlur={onBlurHour}
            onMouseLeave={onMouseLeaveHour}
            placeholder={"Hours"}
          />{" "}
          <p>h</p>
        </div>
        <div className="input-section">
          <Form.Control
            type="text"
            value={minutes || undefined}
            onChange={handleMinutesChange}
            defaultValue={minutes}
            onBlur={onBlurMinutes}
            onMouseLeave={onMouseLeaveMinutes}
            placeholder={"Minutes"}
          />{" "}
          <p>m</p>
        </div>
      </div>
    </div>
  );
};
