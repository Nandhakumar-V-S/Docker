/* eslint-disable react/prop-types */
import { useState } from "react";
import Form from "react-bootstrap/Form";

//! Import
export default function ArcProgressRangeInput({
  className,
  value,
  setValue,
  ShowLabel,
  step,
  onChange,
  name
}) {
  // const [value, setValue] = useState(50); // Initialize the state with a default value, e.g., 50

  // const handleRangeChange = (e) => {
  //   setValue(e.target.value);
  // };

  const rangeStyle = {
    [`--rangeWidth${className ? className : "default"}`]: `${value}%`,
  };
  const labelPosition =
    value > 50 ? (value / 100) * 100 - 15 : (value / 100) * 100;
  const labelStyle = {
    left: `${labelPosition}%`,
  };
  return (
    <>
      <style>
        {`
            .arc-custom-range${
              className ? "." + className : ".default"
            }::before {
              content: "";
              width: calc(var(--rangeWidth${
                className ? className : "default"
              }) + ${value > 50 ? "-2px" : "5px"}); 
            }
          `}
      </style>

      <div className="arc-progress-input">
        {ShowLabel && (
          <p className="set-progress">
           {name} -<span>{value}%</span>
          </p>
        )}
        <div className="arc-progress-input-inside">
          <Form.Range
            className={`arc-custom-range ${className ? className : "default"}`}
            value={value}
            onChange={onChange}
            style={rangeStyle}
            step={step}
          />
        </div>

        {/* <p className="slider-label" style={labelStyle}>
          {value}%
        </p> */}
      </div>
    </>
  );
}
