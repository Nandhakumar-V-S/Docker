/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect } from "react";
//? Assets
import { masterDataInfo } from "@/redux/Execution/selector";
import { useSelector } from "react-redux";
//? Components
// Common Input
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import ArcSingleSelect from "@/components/arccomponents/ui-components/ArcSingleSelect/ArcSingleSelect";
import ArcMultiSelect from "@/components/arccomponents/ui-components/ArcMultiSelect/ArcMultiSelect";
import ArcTextarea from "@/components/arccomponents/ui-components/ArcTextarea/ArcTextarea";
import ArcDatepicker from "@/components/arccomponents/ui-components/ArcDatepicker/ArcDatepicker";
import ArcCheckBoxBtn from "@/components/arccomponents/ui-components/ArcCheckBoxBtn/ArcCheckBoxBtn";
import ArcToggle from "@/components/arccomponents/ui-components/ArcToggle/arctoggle";
import ArcRadioBtn from "@/components/arccomponents/ui-components/ArcRadioBtn/ArcRadioBtn";
//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

const DynamicInput = ({
  FieldList,
  inputValues,
  setInputValues,
  validationErrors,
  setValidationErrors,
  showErrors,
  setShowErrors,
}) => {
  //   const [inputValues, setInputValues] = useState({});
  const [error, setError] = useState("");
  const masterData = useSelector(masterDataInfo);
  // var LeadFirstName = inputValues.FirstName ? inputValues.FirstName : "";
  // var LeadLastName = inputValues.LastName ? inputValues.LastName : "";
  console.log(FieldList);
  useEffect(() => {
    validateField();
  }, [FieldList, inputValues]);
  const handleSelectInputChange = (newValue) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [FieldList.api_name]: newValue ? newValue.value : null,
      [FieldList.api_name + "_RefLabel"]: newValue ? newValue.label : null,
    }));
    // setError("");
  };
  // ?Remove Space
  const handleInputChange = (event) => {
    let newValue = event.target.value;

    if (FieldList.api_name === "DisplayName") {
      // Remove all spaces from the value
      newValue = newValue.replace(/\s+/g, "");
    }

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [FieldList.api_name]: newValue,
    }));

    setError("");
  };
  // const handleInputChange = (event) => {
  //   const newValue = event.target.value;

  //   setInputValues((prevInputValues) => ({
  //     ...prevInputValues,

  //     [FieldList.api_name]: newValue,
  //   }));
  //   setError("");
  // };
  const handleToggleChange = (event) => {
    const isChecked = event.target.checked;

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [FieldList.api_name]: isChecked,
    }));

    setError("");
  };
  const handleDateInputChange = (date) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [FieldList.api_name]: date,
    }));
    setError("");
  };
  const validateField = () => {
    if (showErrors && FieldList.required && !inputValues[FieldList.api_name]) {
      setError(`${FieldList.label_text} is required`);
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [FieldList.api_name]: `${FieldList.label_text} is required`,
      }));
    } else {
      setError("");
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [FieldList.api_name]: null,
      }));
    }
  };

  const renderControl = (controlType) => {
    switch (controlType) {
      case "textbox":
        return (
          <>
            <ArcTextBox
              Label={FieldList.label_text}
              ClassName={
                showErrors &&
                validationErrors[FieldList.api_name] &&
                "invalid-input"
              }
              Type={FieldList.controltype}
              PlaceHolder={"Enter " + FieldList.label_text}
              Name={FieldList.api_name}
              Required={FieldList.required}
              // Value={inputValues[FieldList.api_name] || ""}
              Value={inputValues[FieldList.api_name] || ""}
              DefaultValue={FieldList.default_value}
              onChange={handleInputChange}
              ReadOnly={FieldList.api_name === "LeadName" ? true : false}
              Id={"Arc_addlead_" + FieldList.id}
            />
            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        );
      case "dropdown":
        // Find the matched master values by MasterId
        console.log(masterData);
        console.log(FieldList.masterid);
        // console.log(matchedData);
        const matchedData = masterData?.find(
          (item) => item.masterid === FieldList.masterid
        );

        // Get the master values array or an empty array if no match found
        const masterValues = matchedData ? matchedData.mastervalues : [];
        const Singleoptions = masterValues.map((item) => ({
          value: item.optionid,
          label: item.optionvalue,
        }));
        return (
          <>
            <ArcSingleSelect
              options={Singleoptions}
              Label={FieldList.label_text}
              PlaceHolder={"Select " + FieldList.label_text}
              ClassName={
                showErrors &&
                validationErrors[FieldList.api_name] &&
                "invalid-input"
              }
              Id={"Arc_addlead_" + FieldList.id}
              onChange={handleSelectInputChange}
              Value={
                inputValues[FieldList.api_name]
                  ? {
                      value: inputValues[FieldList.api_name],
                      label: inputValues[FieldList.api_name + "_RefLabel"],
                    }
                  : ""
              }
              Required={FieldList.required}
            />
            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        );
      case "multiselect":
        // Find the matched master values by MasterId
        const MultimatchedData = masterData.find(
          (item) => item.masterid === FieldList.masterid
        );
        // Get the master values array or an empty array if no match found
        const MultimasterValues = MultimatchedData
          ? MultimatchedData.mastervalues
          : [];
        const Multioptions = MultimasterValues.map((item) => ({
          value: item.optionid,
          label: item.optionvalue,
        }));

        return (
          <>
            {/* <ArcMultiSelect
              options={Multioptions}
              Label={FieldList.label_text}
              PlaceHolder={"Select " + FieldList.label_text}
              ClassName={
                showErrors &&
                validationErrors[FieldList.api_name] &&
                "invalid-input"
              }
              Required={FieldList.required}
              Id={"Arc_addlead_" + FieldList.id}
              onChange={handleSelectInputChange}
              Value={inputValues[FieldList.api_name] || ""}
            /> */}
            <ArcSingleSelect
              options={Multioptions}
              Label={FieldList.label_text}
              PlaceHolder={"Select " + FieldList.label_text}
              ClassName={
                showErrors &&
                validationErrors[FieldList.api_name] &&
                "invalid-input"
              }
              Id={"Arc_addlead_" + FieldList.id}
              onChange={handleSelectInputChange}
              Value={
                inputValues[FieldList.api_name]
                  ? {
                      value: inputValues[FieldList.api_name],
                      label: inputValues[FieldList.api_name + "_RefLabel"],
                    }
                  : ""
              }
              Required={FieldList.required}
            />
            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        );
      case "textarea":
        return (
          <>
            {" "}
            <ArcTextarea
              Label={FieldList.label_text}
              ClassName=""
              PlaceHolder={"Enter " + FieldList.label_text}
              Name={FieldList.api_name}
              Required={FieldList.required}
              onChange={handleInputChange}
              Value={inputValues[FieldList.api_name] || ""}
              DefaultValue={FieldList.default_value}
              ReadOnly={false}
              Id={"Arc_addlead_" + FieldList.id}
            />
            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        );
      case "checkbox":
        const CheckBtnData = [
          {
            Title: FieldList.label_text,
            Value: FieldList.label_text,
          },
        ];
        return (
          <>
            {/* <ArcCheckBoxBtn
              Label={`${FieldList.label_text}`}
              Required={FieldList.required}
              Name={FieldList.api_name}
              CheckBtnData={RadioBtnData}
              Id={"Arc_addlead_" + FieldList.id}
              ClassName=""
            /> */}

            <ArcToggle
              onChange={handleToggleChange}
              Label={FieldList.label_text}
              Name={FieldList.api_name}
              ClassName=""
              checked={inputValues[FieldList.api_name]}
            />
            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        );
      // case "radiobutton":
      //   const RadioBtnData = [
      //     {
      //       Title: FieldList.label_text,
      //       Value: FieldList.label_text,
      //     }

      //   ];
      //   return (
      //     <>
      //       {/* <ArcCheckBoxBtn
      //           Label={`${FieldList.label_text}`}
      //           Required={FieldList.required}
      //           Name={FieldList.api_name}
      //           CheckBtnData={RadioBtnData}
      //           Id={"Arc_addlead_" + FieldList.id}
      //           ClassName=""
      //         /> */}
      //       <ArcRadioBtn
      //         RadioBtnData={RadioBtnData}
      //         onChange={handleToggleChange}
      //         // Label={FieldList.label_text}
      //         Name={FieldList.radiogrpname}
      //         ClassName=""
      //         Required={FieldList.required}
      //       />
      //       <ErrorMessage
      //         showErrors={showErrors}
      //         validationErrors={validationErrors}
      //         FieldList={FieldList}
      //       />
      //     </>
      //   );
      case "date":
        return (
          <>
            <ArcDatepicker
              Label={FieldList.label_text}
              PlaceHolder={"Select " + FieldList.label_text}
              startDate={inputValues[FieldList.api_name] || ""}
              onChange={(date) => handleDateInputChange(date)}
              selected={inputValues[FieldList.api_name] || ""}
              ClassName={
                showErrors &&
                validationErrors[FieldList.api_name] &&
                "invalid-input"
              }
              Id={"Arc_addlead_" + FieldList.id}
            />
            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        );
      default:
        return null;
    }
  };

  return <>{renderControl(FieldList.controltype)}</>;
};

export default DynamicInput;

const ErrorMessage = ({ showErrors, validationErrors, FieldList }) => {
  return (
    <>
      {showErrors && validationErrors[FieldList.api_name] && (
        <span className="error-message" style={{ color: "red" }}>
          {validationErrors[FieldList.api_name]}
        </span>
      )}
    </>
  );
};
