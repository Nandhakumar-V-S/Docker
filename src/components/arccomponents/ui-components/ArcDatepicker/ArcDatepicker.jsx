// *******~ Import ~******** //
//? React
import React, { forwardRef } from "react";
//? Assets
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, getDay } from "date-fns";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons
import { CiCalendar } from "react-icons/ci";
// *******~ Import ~******** //

const ArcDatepicker = ({
  ClassName,
  Label,
  Required,
  PlaceHolder,
  onChange,
  selected,
}) => {
  // const isWeekday = (date) => {
  //   const day = getDay(date);
  //   return day !== 0 && day !== 6;
  // };
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="arc-custom-date-input-dynamic" onClick={onClick} ref={ref}>
      <span className="date-icon">
        <CiCalendar />
      </span>
      {value}
    </div>
  ));
  return (
    <>
      <div
        className={`arc-input-control arc-datepicker ${ClassName} ${
          Required ? "mandatory-field" : null
        }`}
      >
        {Label && (
          <Form.Label>
            {Label} {Required && <sup>*</sup>}
          </Form.Label>
        )}
        <DatePicker
          customInput={<ExampleCustomInput />}
          selected={selected}
          onChange={onChange}
          placeholderText={PlaceHolder}
          showIcon={false}
          icon={<CiCalendar />}
          closeOnScroll={true}
          isClearable={false}
          // filterDate={isWeekday}
          // showWeekNumbers
          className="date-input"
        />
      </div>
    </>
  );
};

export default ArcDatepicker;
