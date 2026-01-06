// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets

//? Components
// Common Input
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import ArcSingleSelect from "@/components/arccomponents/ui-components/ArcSingleSelect/ArcSingleSelect";
import ArcMultiSelect from "@/components/arccomponents/ui-components/ArcMultiSelect/ArcMultiSelect";
import ArcTextarea from "@/components/arccomponents/ui-components/ArcTextarea/ArcTextarea";
//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

const DynamicInput = ({ FieldList, inputValues, setInputValues }) => {
  //   const [inputValues, setInputValues] = useState({});
  const handleSelectInputChange = (newValue) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [FieldList.api_name]: newValue,
    }));
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value; // Assuming the new value comes from the input event
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [FieldList.api_name]: newValue,
    }));
  };
  const renderControl = (controlType) => {
    switch (controlType) {
      case "textbox":
        return FieldList.visible ? (
          <>
            <ArcTextBox
              Label={FieldList.label_text}
              ClassName=""
              Type={FieldList.data_type.toLowerCase()}
              PlaceHolder={"Enter " + FieldList.place_holder}
              Name={FieldList.api_name}
              Required={FieldList.required}
              Value={inputValues[FieldList.api_name] || ""}
              DefaultValue={FieldList.default_value}
              onChange={handleInputChange}
              ReadOnly={false}
              Id={"Arc_addlead_" + FieldList.id}
            />
            {FieldList.required && (
              <span style={{ color: "red" }}>
                {FieldList.label_text} is required
              </span>
            )}
          </>
        ) : null;
      case "dropdown":
        const Singleoptions = FieldList.masterlist_values.map((item) => ({
          value: item.optionid,
          label: item.optionvalue,
        }));
        return FieldList.visible ? (
          <ArcSingleSelect
            options={Singleoptions}
            Label={FieldList.label_text}
            PlaceHolder={"Select " + FieldList.place_holder}
            ClassName=""
            Id={"Arc_addlead_" + FieldList.id}
            onChange={handleSelectInputChange}
            Value={inputValues[FieldList.api_name] || ""}
          />
        ) : null;
      case "multidropdown":
        const Multioptions = FieldList.masterlist_values.map((item) => ({
          value: item.optionid,
          label: item.optionvalue,
        }));
        return FieldList.visible ? (
          <ArcMultiSelect
            options={Multioptions}
            Label={FieldList.label_text}
            PlaceHolder={"Select " + FieldList.place_holder}
            ClassName=""
            Id={"Arc_addlead_" + FieldList.id}
            onChange={handleSelectInputChange}
            Value={inputValues[FieldList.api_name] || ""}
          />
        ) : null;
      case "textarea":
        return FieldList.visible ? (
          <ArcTextarea
            Label={FieldList.label_text}
            ClassName=""
            PlaceHolder={"Enter " + FieldList.place_holder}
            Name={FieldList.api_name}
            Required={false}
            onChange={handleInputChange}
            Value={inputValues[FieldList.api_name] || ""}
            DefaultValue={FieldList.default_value}
            ReadOnly={false}
            Id={"Arc_addlead_" + FieldList.id}
          />
        ) : null;
      default:
        return null;
    }
  };

  return <>{renderControl(FieldList.controltype)}</>;
};

export default DynamicInput;
