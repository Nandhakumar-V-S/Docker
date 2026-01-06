/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect } from "react";
//? Assets
import { masterDataInfo, subMasterDataInfo } from "@/redux/Execution/selector";
import { masterDataInfo as masterDataInfoTask } from "@/redux/Task/selector";
import { masterDataInfo as masterDataInfoAdmin } from "@/redux/AdminSetting/selector";
import { masterDataInfo as masterDataInfoPlan } from "@/redux/Plan/selector";
import { masterDataInfo as masterDataInfoHome } from "@/redux/Home/selector";
import { masterDataInfofollowup } from "@/redux/Followup/selector";
import { useSelector } from "react-redux";
import { format, getDay } from "date-fns";
import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
//? Components
// Common Input
import { userobjInfo } from "@/redux/Execution/selector";
import { userobjInfo as userobjInfoTask } from "@/redux/Task/selector";
import { userobjInfo as userobjInfoPlan } from "@/redux/Plan/selector";
import ArcHourInput from "@/components/arccomponents/ui-components/ArcHourInput/ArcHourInput";
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import ArcSingleSelect from "@/components/arccomponents/ui-components/ArcSingleSelect/ArcSingleSelect";
import ArcMultiSelect from "@/components/arccomponents/ui-components/ArcMultiSelect/ArcMultiSelect";
import ArcTextarea from "@/components/arccomponents/ui-components/ArcTextarea/ArcTextarea";
import ArcDatepicker from "@/components/arccomponents/ui-components/ArcDatepicker/ArcDatepicker";
import ArcCheckBoxBtn from "@/components/arccomponents/ui-components/ArcCheckBoxBtn/ArcCheckBoxBtn";
import ArcToggle from "@/components/arccomponents/ui-components/ArcToggle/arctoggle";
import ArcRadioBtn from "@/components/arccomponents/ui-components/ArcRadioBtn1/ArcRadioBtn1";
import ArcProgressRangeInput from "@/components/arccomponents/ui-components/ArcRangeInput/ArcRangeInput";
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
  allInputValues,
  setAllInputValues,
}) => {
  //   const [inputValues, setInputValues] = useState({});
  const [error, setError] = useState("");

  // // ! Changed Master Data
  // const [MasterDataUpdated, setMasterDataUpdated] = useState([]);
  // const masterData = useSelector(masterDataInfo);
  // const submasterData = useSelector(subMasterDataInfo);
  // let location = useLocation();
  // const currentPathName = location.pathname;

  // const endsWithSpecificString = (str) => currentPathName.endsWith(str);

  // useEffect(() => {
  //   if (endsWithSpecificString("/360detail_v4")) {
  //     setMasterDataUpdated(submasterData);
  //   } else {
  //     setMasterDataUpdated(masterData);
  //   }
  // }, [currentPathName, masterData, submasterData]);
  // console.log("Updated Master Data", MasterDataUpdated);
  // // ! Changed Master Data

  // ! Changed Master Data
  const [MasterDataUpdated, setMasterDataUpdated] = useState([]);
  const masterData = useSelector(masterDataInfo);
  const masterDataTaskPage = useSelector(masterDataInfoTask);
  const masterDataTaskPlan = useSelector(masterDataInfoPlan);
  const masterDatafollowup = useSelector(masterDataInfofollowup);
  const submasterData = useSelector(subMasterDataInfo);
  const masterDataHome = useSelector(masterDataInfoHome);
  const masterDataAdmin = useSelector(masterDataInfoAdmin);
  let location = useLocation();
  const currentPathName = location.pathname;

  const endsWithSpecificString = (str) => currentPathName.endsWith(str);

  useEffect(() => {
    if (endsWithSpecificString("/360detail_v4")) {
      setMasterDataUpdated(submasterData);
    } else if (endsWithSpecificString("/followup")) {
      setMasterDataUpdated(masterDatafollowup);}
    else if (endsWithSpecificString("/entity360Page")) {
      setMasterDataUpdated(submasterData);
    } else if (endsWithSpecificString("/task")) {
      setMasterDataUpdated(masterDataTaskPage);
    } else if (endsWithSpecificString("/plan")) {
      setMasterDataUpdated(masterDataTaskPlan);
    } else if (endsWithSpecificString("/home")) {
      setMasterDataUpdated(masterDataHome);    
    } else if (endsWithSpecificString("/adminsetting")) {
      setMasterDataUpdated(masterDataAdmin);
    } else {
      setMasterDataUpdated(masterData);
    }
  }, [currentPathName, masterData, submasterData]);
  console.log("Updated Master Data", MasterDataUpdated);
  console.log("Master Data", masterData);
  console.log("Master Data Plan", masterDataTaskPlan);
  // ! Changed Master Data

  // console.log(FieldList);
  useEffect(() => {
    validateField();
  }, [FieldList, inputValues]);

  const userobj = useSelector(userobjInfo);
  const userobjTask = useSelector(userobjInfoTask);
  const userobjPlan = useSelector(userobjInfoPlan);

  console.log(userobj);
  console.log(userobjTask);
  console.log(userobjPlan);
  // ! Data Binding
  const createCommonObject = (FieldList, value) => ({
    // [FieldList.api_name]: value,
    // label: FieldList.label_text,
    id: FieldList.id,
    tablename: FieldList.table_name,
    apiname: FieldList.api_name,
    value: value,
    columntype: FieldList.attributedatatype,
  });
  const updateOrAddData = (value, FieldList) => {
    // Check if the ID already exists in allInputValues
    const existingIndex = allInputValues.findIndex(
      (input) => input.id === FieldList.id
    );

    if (existingIndex !== -1) {
      // If ID exists, update the data
      setAllInputValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[existingIndex] = createCommonObject(FieldList, value);
        return updatedValues;
      });
    } else {
      // If ID doesn't exist, add new data
      setAllInputValues((prevValues) => [
        ...prevValues,
        createCommonObject(FieldList, value),
      ]);
    }
  };
  // ! Data Binding End

  const handleSelectInputChange = (newValue) => {
    console.log(newValue);
    // ! Check Null Values
    const UdatedValue =
      newValue === null
        ? FieldList.attributedatatype === "numeric"
          ? "0"
          : newValue
        : newValue.value;
    // ! Check Null Values
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [FieldList.api_name + FieldList.id]: newValue ? newValue.value : null,
      [FieldList.api_name + FieldList.id + "_RefLabel"]: newValue
        ? newValue.label
        : null,
    }));
    console.log(UdatedValue);
    updateOrAddData(UdatedValue, FieldList);
    // setError("");
  };

  const handleInputChange = (event) => {
    const originalValue = event.target.value;
    let newValue = originalValue.trim() === "" ? "" : originalValue;

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [FieldList.api_name + FieldList.id]: newValue,
    }));

    updateOrAddData(newValue, FieldList);
    setError("");
  };

  const handleToggleChange = (event) => {
    const isChecked = event.target.checked;

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [FieldList.api_name + FieldList.id]: isChecked,
    }));
    updateOrAddData(isChecked.toString(), FieldList);
    setError("");
  };
  const handleDateInputChange = (date) => {
    const newInputValues = {
      ...inputValues,
      [FieldList.api_name + FieldList.id]: date,
    };

    setInputValues(newInputValues);
    updateOrAddData(format(date, "MM/dd/yyyy"), FieldList);

    setError("");
  };

  const handleRangeChange = (e) => {
    const newValue = e.target.value;
    const newInputValues = {
      ...inputValues,
      [FieldList.api_name + FieldList.id]: newValue,
    };
    setInputValues(newInputValues);
    updateOrAddData(newValue, FieldList);

    setError("");
  };

  // ! Validation start
  const validateField = () => {
    if (
      showErrors &&
      FieldList.required &&
      !inputValues[FieldList.api_name + FieldList.id]
    ) {
      setError(`${FieldList.label_text} is required`);
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [FieldList.api_name + FieldList.id]:
          `${FieldList.label_text} is required`,
      }));
    } else {
      setError("");
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [FieldList.api_name + FieldList.id]: null,
      }));
    }
  };
  // ! Validation End
  // ! Spent Hours Start
  const handleSpentHourChange = (e) => {
    let value = e.target.value;

    // Remove invalid characters
    value = value.replace(/[^0-9.hdwm]/g, "");

    // Check if there are multiple letters and remove all but the last one
    const letters = value.match(/[hdwm]/g);
    if (letters && letters.length > 1) {
      value = value.replace(/[hdwm]/g, ""); // Remove all letters
      value += letters[letters.length - 1]; // Append only the last letter
    }

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [FieldList.api_name + FieldList.id]: value,
    }));
    setError("");
  };
  // const handleSpentHourChange = (e) => {
  //   // setInput(e.target.value);

  //   setInputValues((prevInputValues) => ({
  //     ...prevInputValues,
  //     [FieldList.api_name + FieldList.id]: e.target.value,
  //   }));
  //   setError("");
  // };

  const convertToHours = (inputValue) => {
    if (inputValue.trim() === "") {
      return "0"; // Return "0h" if input is empty
    }

    const regex = /^(\d*\.?\d*)([hwdm]?)$/; // Regular expression to match numerical value and unit
    const match = inputValue.match(regex);
    if (!match) {
      return "0"; // Return "0h" if input is invalid
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
        convertedHours = value / 60;
        break;
      default:
        // Assume input is already in hours
        convertedHours = value;
    }

    // Check if convertedHours is NaN
    if (isNaN(convertedHours)) {
      return "0"; // Return "0h" if conversion result is NaN
    }

    return Number.isInteger(convertedHours)
      ? convertedHours.toString()
      : convertedHours.toFixed(2);
  };

  const handleSpentHourBlur = (e) => {
    const convertedHours = convertToHours(e.target.value);
    const newInputValues = {
      ...inputValues,
      [FieldList.api_name + FieldList.id]: convertedHours + "h",
    };
    let ConvertMinutes = (convertedHours * 60).toString();
    setInputValues(newInputValues);
    updateOrAddData(ConvertMinutes, FieldList);

    setError("");
  };
  // ! Spent Hours End

  const renderControl = (controlType) => {
    switch (controlType) {
      case "textbox":
        
        return FieldList.visible ?  (
          <>
            <ArcTextBox
              Label={FieldList.label_text}
              ClassName={
                showErrors &&
                validationErrors[FieldList.api_name + FieldList.id] &&
                "invalid-input"
              }
              Type={FieldList.controltype}
              PlaceHolder={"Enter " + FieldList.label_text}
              Name={FieldList.api_name}
              Required={FieldList.required}
              // Value={inputValues[FieldList.api_name] || ""}
              Value={
                inputValues[FieldList.api_name + FieldList.id] || undefined
              }
              DefaultValue={
                (FieldList.default_value && FieldList.default_value) || ""
              }
              onChange={handleInputChange}
              // ReadOnly={FieldList.api_name === "LeadName" ? true : false}
              Id={"Arc_addlead_" + FieldList.id}
            />

            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        ): null;
      case "Textbox_time":
        console.log(FieldList.default_value / 60 + "h");
        return (
          <>
            <ArcHourInput
              Label={FieldList.label_text}
              onChange={handleSpentHourChange}
              onBlur={handleSpentHourBlur}
              Value={
                inputValues[FieldList.api_name + FieldList.id] || undefined
              }
              DefaultValue={
                (FieldList.default_value &&
                  (FieldList.default_value / 60).toFixed(2) + "h") ||
                undefined
              }
              Name={FieldList.api_name}
              Required={FieldList.required}
              Id={"Arc_addlead_" + FieldList.id}
              
            />

            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        );
      case "Progressbar":
        console.log(FieldList.default_value);
        return (
          <>
            <ArcProgressRangeInput
              className="dynamic-input"
              value={
                inputValues[FieldList.api_name + FieldList.id] ||
                (FieldList.default_value && FieldList.default_value) ||
                0
              }
              ShowLabel={true}
              step={10}
              onChange={handleRangeChange}
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
        console.log(MasterDataUpdated);
        console.log(FieldList.masterid);
        // console.log(matchedData);
        const matchedData = MasterDataUpdated?.find(
          (item) => item.masterid === FieldList.masterid
        );

        // Get the master values array or an empty array if no match found
        const masterValues = matchedData ? matchedData.mastervalues : [];
        const masterId = matchedData ? matchedData.masterid : [];
        const Singleoptions = masterValues
          .map((item) => {
            if((masterId == 7037 && item.optionid == 613)||(masterId == 7034 && item.optionid == 607) || (masterId ==7035 && item.optionid == 19000510668)||(masterId =='5CDC0F7A-0670-45A8-B87E-3B131390931C' && item.optionid == 19000510668))  {
              return null; // Skip this iteration by returning null              
            }
            return {
              value: item.optionid,
              label: item.optionvalue,
              // isDisabled: masterId == 7037 && item.optionid == 613, //! Disable option
            };
          })
          .filter(Boolean);
        // Find the matched default value in Singleoptions
        const defaultValue = Singleoptions.find(
          (item) => item.value === FieldList.default_value
        );
        const defaultUserValue = Singleoptions.find(
          (item) =>
            item.value ===
            (userobj[0] || userobjTask[0] || userobjPlan[0])?.optionid
        );
        console.log(defaultValue);
        console.log(defaultUserValue);
        console.log(inputValues[FieldList.api_name + FieldList.id]);
        return FieldList.visible ? (
          <>
            <ArcSingleSelect
              options={Singleoptions}
              Label={FieldList.label_text}
              PlaceHolder={"Select " + FieldList.label_text}
              ClassName={
                showErrors &&
                validationErrors[FieldList.api_name + FieldList.id] &&
                "invalid-input"
              }
              Id={"Arc_addlead_" + FieldList.id}
              onChange={handleSelectInputChange}
              isClearable={true}
              defaultValue={
                ["LoggedInUser"].includes(FieldList.default_value) &&
                defaultUserValue
                  ? defaultUserValue
                  : defaultValue
                    ? defaultValue
                    : ""
              }
              Value={
                inputValues[FieldList.api_name + FieldList.id]
                  ? {
                      value: inputValues[FieldList.api_name + FieldList.id],
                      label:
                        inputValues[
                          FieldList.api_name + FieldList.id + "_RefLabel"
                        ],
                    }
                  : inputValues[FieldList.api_name + FieldList.id] === null
                    ? ""
                    : ["LoggedInUser"].includes(FieldList.default_value) &&
                        defaultUserValue
                      ? defaultUserValue
                      : defaultValue
                        ? defaultValue
                        : ""
              }
              Required={FieldList.required}
              disabled={(FieldList.id=="6489aa0a-21e5-41bb-a367-45d885250ac0"||FieldList.id=="a8743207-f8c0-4498-a678-62b503405797"||FieldList.id=="732f7e32-d8fc-4fb1-be8c-3cda3fb6d1f6"||FieldList.id=="32125431-dea8-426b-832e-793f3136296c")?true:false}
            />
            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        ): null;
      case "multiselect":
        // Find the matched master values by MasterId
        const MultimatchedData = MasterDataUpdated.find(
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
        // Find the matched default value in Singleoptions
        const defaultValueMulti = Multioptions.find(
          (item) => item.value === FieldList.default_value
        );
        const defaultUserValueMulti = Multioptions.find(
          (item) =>
            item.value ===
            (userobj[0] || userobjTask[0] || userobjPlan[0])?.optionid
        );
        console.log(defaultValueMulti);
        return FieldList.visible ?(
          <>
            <ArcSingleSelect
              options={Multioptions}
              Label={FieldList.label_text}
              PlaceHolder={"Select " + FieldList.label_text}
              ClassName={
                showErrors &&
                validationErrors[FieldList.api_name + FieldList.id] &&
                "invalid-input"
              }
              Id={"Arc_addlead_" + FieldList.id}
              onChange={handleSelectInputChange}
              defaultValue={
                ["LoggedInUser"].includes(FieldList.default_value) &&
                defaultUserValueMulti
                  ? defaultUserValueMulti
                  : defaultValueMulti
                    ? defaultValueMulti
                    : ""
              }
              Value={
                inputValues[FieldList.api_name + FieldList.id]
                  ? {
                      value: inputValues[FieldList.api_name + FieldList.id],
                      label:
                        inputValues[
                          FieldList.api_name + FieldList.id + "_RefLabel"
                        ],
                    }
                  : inputValues[FieldList.api_name + FieldList.id] === null
                    ? ""
                    : ["LoggedInUser"].includes(FieldList.default_value) &&
                        defaultUserValueMulti
                      ? defaultUserValueMulti
                      : defaultValueMulti
                        ? defaultValueMulti
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
        ): null;
      case "Textarea":
        return FieldList.visible ? (
          <>
            {" "}
            <ArcTextarea
              Label={FieldList.label_text}
              ClassName=""
              PlaceHolder={"Enter " + FieldList.label_text}
              Name={FieldList.api_name}
              Required={FieldList.required}
              onChange={handleInputChange}
              Value={
                inputValues[FieldList.api_name + FieldList.id]?.length === 0
                  ? ""
                  : inputValues[FieldList.api_name + FieldList.id] || undefined
              }
              ReadOnly={false}
              Id={"Arc_addlead_" + FieldList.id}
            />
            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        ) : null;
      case "checkbox":
        return (
          <>
            <ArcToggle
              onChange={handleToggleChange}
              Label={FieldList.label_text}
              Name={FieldList.api_name}
              ClassName=""
              checked={inputValues[FieldList.api_name + FieldList.id]}
             // defaultChecked={FieldList.default_value === "True"? true : false}
              defaultChecked={"True" === FieldList.default_value ? true : false}
            />
            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        );
      case "date":
        console.log(FieldList.default_value);
        // console.log(
        //   format(inputValues[FieldList.api_name + FieldList.id], "MM/dd/yyyy")
        // );
        const isValidDate = (date) => date instanceof Date && !isNaN(date);

        const getSelectedDate = () => {
          const inputDate = new Date(
            inputValues[FieldList.api_name + FieldList.id]
          );
          const defaultDate =
            FieldList.default_value === "Today"
              ? new Date()
              : new Date(FieldList.default_value);

          if (isValidDate(inputDate)) {
            return inputDate;
          } else if (isValidDate(defaultDate)) {
            return defaultDate;
          } else {
            return new Date();
          }
        };
        return FieldList.visible ?(
          <>
            <ArcDatepicker
              Label={FieldList.label_text}
              PlaceHolder={"Select " + FieldList.label_text}
              startDate={inputValues[FieldList.api_name + FieldList.id] || ""}
              onChange={(date) => handleDateInputChange(date)}
              dateFormat="MM/dd/yyyy"
              selected={getSelectedDate()}
              ClassName={
                showErrors &&
                validationErrors[FieldList.api_name + FieldList.id] &&
                "invalid-input"
              }
              Id={"Arc_addlead_" + FieldList.id}
              Required={FieldList.required}
            />
            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        ) :null;
        case "radiobutton":
  return (
    <>
      {[
        "5e1f197e-24bc-4f3c-a548-3ee66dc9d52e",
        "4ee37d99-96fc-4c0b-8fcb-f8ed68f9d833",
      ].includes(FieldList.id) && FieldList.visible ? (
        <>                
          <ArcRadioBtn
            RadioBtnData={[
              {
                Title: FieldList.label_text,
                Value: FieldList.label_text,
              },
            ]}
            Name={FieldList.radiogrpname}
            Label={FieldList.label_text}
            Required={FieldList.required}
            ClassName=""
            disabled={(FieldList.id=="5e1f197e-24bc-4f3c-a548-3ee66dc9d52e" || FieldList.id=="4ee37d99-96fc-4c0b-8fcb-f8ed68f9d833")?true:false}
            selectedValue={FieldList.default_value === "True" ? FieldList.label_text : ""} // Use selectedValue based on FieldList.default_value
 
          />
          <ErrorMessage
            showErrors={showErrors}
            validationErrors={validationErrors}
            FieldList={FieldList}
          />
        </>
      ) : null}
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
      {showErrors && validationErrors[FieldList.api_name + FieldList.id] && (
        <span className="error-message" style={{ color: "red" }}>
          {validationErrors[FieldList.api_name + FieldList.id]}
        </span>
      )}
    </>
  );
};
