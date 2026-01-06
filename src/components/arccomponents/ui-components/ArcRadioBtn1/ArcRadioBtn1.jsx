/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React

import React, { useState } from "react";
//? Assets
import Form from "react-bootstrap/Form";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

const ArcRadioBtn = ({
  RadioBtnData,
  onChange,
  Name,
  Label,
  Required,
  ClassName,
  disabled,
  selectedValue 
}) => {
  console.log(RadioBtnData, Name, Label, Required, ClassName);
  return (
    <>
      <div className={`arc-input-control arc-radiobtn ${ClassName}`}>
        {/* {Label && (
          <Form.Label>
            {Label} {Required && <sup>*</sup>}
          </Form.Label>
        )} */}
        {/* <Form.Label>Select Owner</Form.Label> */}
        <div className="radio-check-div">
          {RadioBtnData.map((data, index) => (
            <label key={index}>
              <input
                type="radio"
                name={Name}
                value={data.Value}
                onChange={onChange}
                disabled={disabled}
                checked={selectedValue === data.Value} 
               
              />
              {data.Title}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export const ArcRadioBtnv2 = ({
  RadioBtnData,
  onChange,
  Name,
  Label,
  Required,
  ClassName,
  selectedValue,
}) => {
  // console.log(RadioBtnData, Name, Label, Required, ClassName);
  // const [selectedValue, setSelectedValue] = useState("");

  // const handleRadioChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };
  return (
    <>
      <div className={`arc-input-control arc-radiobtn ${ClassName}`}>
        {/* {Label && (
          <Form.Label>
            {Label} {Required && <sup>*</sup>}
          </Form.Label>
        )} */}
        {/* <Form.Label>Select Owner</Form.Label> */}
        <div className="radio-check-div">
          {RadioBtnData.map((data, index) => (
            <label key={index}>
              <input
                type="radio"
                name={Name}
                value={data.Value}
                onChange={onChange}
                checked={selectedValue === data.Value}
                disabled={disabled}
                
              />
              {data.Title}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default ArcRadioBtn;
