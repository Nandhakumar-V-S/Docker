/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect, useContext } from "react";
//? Assets
import { masterDataInfo, subMasterDataInfo } from "@/redux/Execution/selector";
import { masterDataInfo as masterDataInfoTask } from "@/redux/Task/selector";
import { masterDataInfo as masterDataInfoFeature } from "@/redux/Features/selector";
import { masterDataInfo as masterDataInfoAdmin } from "@/redux/AdminSetting/selector";
import { masterDataInfo as masterDataInfoPlan } from "@/redux/Plan/selector";
import { masterDataInfo as masterDataInfoHome } from "@/redux/Home/selector";
import { masterDataInfo as masterDataInfoProject } from "@/redux/Project/selector";
import { masterDataInfo as masterDataInfoActivitylog } from "@/redux/Activitylog/selector";
import { masterDataInfofollowup } from "@/redux/Followup/selector";
import ArcTagInput from "@/components/arccomponents/ui-components/ArcTagInput/ArcTagInput";
import ArcTagInputV3 from "@/components/arccomponents/ui-components/ArcTagInput/ArcTagInputv3";
import { useSelector } from "react-redux";
import { format, getDay } from "date-fns";
import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
//? Components
// Common Inputa
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
import ArcRadioBtn from "@/components/arccomponents/ui-components/ArcRadioBtn/ArcRadioBtn";
import ArcProgressRangeInput from "@/components/arccomponents/ui-components/ArcRangeInput/ArcRangeInput";
import { getupdatelookupdetails } from "@/redux/getlookupdetails/getUpdateLookupDetails";
import ArcAddCustomTag from "@/components/arccomponents/ui-components/ArcCustomTag/ArcAddCustomTag";
import ArcTagAdd from "@/components/arccomponents/ui-components/ArcCustomTag/ArcTagAdd";
import ArcTagListEdit from "@/components/arccomponents/ui-components/ArcCustomTag/ArcTagListEdit";
import ArcAddLookupSingleSelect from "@/components/arccomponents/ui-components/ArcAutoComplete/ArcAddLookupSingleSelect";
import ArcUpdateLookupSingleSelect from "@/components/arccomponents/ui-components/ArcAutoComplete/ArcUpdateLookupSingleSelect";
import { ArcTaskAutoComplete } from "@/components/arccomponents/ui-components/ARc_Taskcomplete/ArcTaskAutoComplete";
import AutoCompleteOnChange from "../ui-components/ArcAutoComplete/Autocompleteonchange";
import ArcFilterPopup from "../ui-components/ArcTaskAutocompletesearch/ArcFilterPopup";
import { SelectedRowContext } from "@/context/SelectedRow/SelectedRowContext";
import { SortingWithoutDirection } from "@/utils/CommonFunctions";
import { masterDataInfo as masterDataInfoNotes } from "@/redux/Notes/selector";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import { ArcDropDownDefault } from "../ui-components/ArcDropDown/ArcDropDown";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import Usetemplate from "@/modules/ConversationModule/components/UseTemplate";
import ArcEmailEditor from "@/modules/ConversationModule/components/EmailEditor";
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
  selectedTagItem,
  setSelectedTagItem,
  TransactionId,
  UpdateselectedTagItem,
  setUpdateselectedTagItem,
  setistagedited,
  setSelectedTitleItem,
  selectedTitleItem,
  taskInfoPage,
  masterDataforPopup,
  // titleFieldValue,
  // setTitleFieldValue,
  Page,
  disabled,
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
  // ~ Arc  lookup  updated
  const [addlookupselectedItem, setaddlookupselectedItem] = useState(null);
  // ~ Arc  lookup  updated
  // ! Changed Master Data
  const [MasterDataUpdated, setMasterDataUpdated] = useState([]);
  const masterData = useSelector(masterDataInfo);
  const masterDataTaskPage = useSelector(masterDataInfoTask);
  const masterDataFeaturesPage = useSelector(masterDataInfoFeature);
  const masterDataTaskPlan = useSelector(masterDataInfoPlan);
  const masterDatafollowup = useSelector(masterDataInfofollowup);
  const submasterData = useSelector(subMasterDataInfo);
  const masterDataHome = useSelector(masterDataInfoHome);
  const masterDataAdmin = useSelector(masterDataInfoAdmin);
  const masterDataNotes = useSelector(masterDataInfoNotes);
  const masterDataactivitylog = useSelector(masterDataInfoActivitylog);
  const { setTitleFieldValue, titleFieldValue, setdropdownVisible } =
    useContext(SelectedRowContext);
  // ! Autocomplete Tag Update start
  console.log(masterDataactivitylog, "masterDataactivitylog");
  // ! Autocomplete Tag Update End
  const masterDataProject = useSelector(masterDataInfoProject);
  let location = useLocation();
  const currentPathName = location.pathname;

  const endsWithSpecificString = (str) => currentPathName.endsWith(str);
  const { task360followuptab } = useContext(ArcGlobalContextProvider);
  useEffect(() => {
    if (endsWithSpecificString("/360detail_v4")) {
      if (task360followuptab) {
        setMasterDataUpdated(masterDatafollowup);
      } else {
        setMasterDataUpdated(submasterData);
      }
    } else if (endsWithSpecificString("/followup")) {
      setMasterDataUpdated(masterDatafollowup);
    }
    //   else if (endsWithSpecificString("/entity360Page")) {
    //    setMasterDataUpdated(submasterData);
    //  }
    else if (endsWithSpecificString("/task")) {
      setMasterDataUpdated(masterDataTaskPage);
    } else if (endsWithSpecificString("/features")) {
      setMasterDataUpdated(masterDataFeaturesPage);
    } else if (endsWithSpecificString("/plan")) {
      setMasterDataUpdated(masterDataTaskPlan);
    } else if (endsWithSpecificString("/home")) {
      setMasterDataUpdated(masterDataHome);
    } else if (endsWithSpecificString("/adminsetting")) {
      setMasterDataUpdated(masterDataAdmin);
    } else if (endsWithSpecificString("/notes")) {
      setMasterDataUpdated(masterDataNotes);
    } else if (endsWithSpecificString("/project360")) {
      setMasterDataUpdated(masterDataforPopup);
    } else if (endsWithSpecificString("/createTicket")) {
      setMasterDataUpdated(masterDataactivitylog);
    } else if (endsWithSpecificString("/editticket")) {
      setMasterDataUpdated(masterDataactivitylog);
    }else if (endsWithSpecificString("/taskInfoPage")) {
      if (taskInfoPage) {
        setMasterDataUpdated(masterDataforPopup);
      } else {
        setMasterDataUpdated(masterDataProject);
      }
    } else {
      setMasterDataUpdated(masterData);
    }
  }, [
    currentPathName,
    masterData,
    submasterData,
    masterDataProject,
    masterDataTaskPage,
    masterDataFeaturesPage,
    masterDataTaskPlan,
    taskInfoPage,
    masterDataforPopup,
  ]);
  console.log("Updated Master Data", MasterDataUpdated);
  console.log("Master Data", masterData);
  console.log("Master Data Plan", masterDataTaskPlan);
  // ! Changed Master Data
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  // console.log(FieldList);
  useEffect(() => {
    validateField();
  }, [FieldList, inputValues]);

  const userobj = useSelector(userobjInfo);
  const userobjTask = useSelector(userobjInfoTask);
  const userobjPlan = useSelector(userobjInfoPlan);
  const [editTaskShow, setEditTaskShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);

  const [ArcFilterPopupshow, setArcFilterPopupshow] = useState(false);
  const [addTaskShow, setAddTaskShow] = useState(false);
  const { dropdownVisible } = useContext(SelectedRowContext);

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
    //   if(newValue.value ==="19000510703"){
    //     setdropdownVisible(true)
    //   }
    //   else(
    //     setdropdownVisible(false)
    // )

    if (newValue.value === "19000530724" && FieldList.api_name == "column4") {
      setdropdownVisible(true);
    } else if (
      FieldList.api_name == "column4" &&
      newValue.value != "19000510703"
    )
      setdropdownVisible(false);

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
  const format_Time = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);
    return `${hours}h ${remainingMinutes}m`;
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

  const autocompletehandleInputChange = (text) => {
    const originalValue = text;
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
    updateOrAddData(isChecked, FieldList);
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
    console.log(value);
    // Remove invalid characters
    value = value.replace(/[^0-9.hdwm]/g, "");

    // Check if there are multiple letters and remove all but the last one
    const letters = value.match(/[hdwm]/g);
    if (letters && letters.length >= 1) {
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
    //console.log(e);
    const convertedHours = convertToHours(e.target.value);
    //console.log(convertedHours);
    const newInputValues = {
      ...inputValues,
      [FieldList.api_name + FieldList.id]: convertedHours + "h",
    };
    let ConvertMinutes = Math.floor(convertedHours * 60).toString();
    //console.log(newInputValues);
    setInputValues(newInputValues);
    updateOrAddData(ConvertMinutes, FieldList);

    setError("");
  };
  // ! Spent Hours End
  // Function to update the specific field in the inputValues state
  const handleSetInputValue = (key, value) => {
    const UdatedValue = value?.optionid || "0";
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: value?.optionid || null,
      [key + "_RefLabel"]: value?.optionvalue || null,
      [key + "_value"]: value || null,
    }));
    updateOrAddData(UdatedValue, FieldList);
    setError("");
    console.log(loggedUserId);
  };

  const renderControl = (controlType) => {
    switch (controlType) {
      case "autocomplete":
        console.log("FieldList:", FieldList.labelkey);
        console.log("Page:", Page);

        return FieldList.lablekey === "lbl-Workitem-title" &&
          Page === "AddTask" ? (
          <>
            {inputValues[`${FieldList.api_name}${FieldList.id}`] &&
              FieldList.istitle && <>Search More...</>}
            <AutoCompleteOnChange
              Label={FieldList.label_text}
              ClassName=""
              PlaceHolder={`Select ${FieldList.label_text}`}
              Name={`Select ${FieldList.label_text}`}
              Required={FieldList.required}
              ReadOnly={false}
              lookupId="26B84156-CC30-416E-99D5-B37409B4D0BD"
              istitlefiled={1}
              setArcFilterPopupshow={setArcFilterPopupshow}
              Page={Page}
              // setTitleFieldValue={setTitleFieldValue}
              // titleFieldValue={titleFieldValue}
              handleAutoCompleteInputChange={autocompletehandleInputChange}
              newValue={inputValues[FieldList.api_name + FieldList.id] || null}
              selectedItem={
                inputValues[FieldList.api_name + FieldList.id + "_value"] ||
                null
              }
              setSelectedItem={(value) =>
                handleSetInputValue(
                  `${FieldList.api_name}${FieldList.id}`,
                  value
                )
              }
            />
            <ArcFilterPopup
              Title="Arc Filter Popup"
              ArcPopupshow={ArcFilterPopupshow}
              setArcPopupshow={setArcFilterPopupshow}
              BtnClassName="arc-btn-primary"
              PopupClassName=""
              centered={true}
              setEditShow={setEditTaskShow}
              setSelectedRow={setSelectedRow}
              setAddTaskShow={setAddTaskShow}
              titleFieldValue={titleFieldValue}
              setTitleFieldValue={setTitleFieldValue}
            />
            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        ) : (
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
        );

      case "textbox":
        console.log("FieldList:" + FieldList.lablekey);
        console.log("Page:" + Page);
        return FieldList.lablekey === "lbl-Workitem-title" &&
          Page === "AddTask" ? (
          <>
            {/* <ArcTextBox
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
            /> */}
            {inputValues[FieldList.api_name + FieldList.id] &&
              FieldList.istitle && <>Search More...</>}
            <AutoCompleteOnChange
              Label={FieldList.label_text}
              ClassName=""
              PlaceHolder={"Select " + FieldList.label_text}
              Name={"Select " + FieldList.label_text}
              Required={FieldList.required}
              ReadOnly={false}
              lookupId={"26B84156-CC30-416E-99D5-B37409B4D0BD"}
              istitlefiled={1}
              setArcFilterPopupshow={setArcFilterPopupshow}
              setTitleFieldValue={setTitleFieldValue}
              titleFieldValue={titleFieldValue}
              handleAutoCompleteInputChange={autocompletehandleInputChange}
              // selectedItem={addlookupselectedItem}
              // setSelectedItem={setaddlookupselectedItem}
              onChange={autocompletehandleInputChange}
              selectedItem={
                inputValues[FieldList.api_name + FieldList.id + "_value"] ||
                null
              }
              // Pass the handler function as setSelectedItem
              setSelectedItem={(value) =>
                handleSetInputValue(FieldList.api_name + FieldList.id, value)
              }
            />

            <ArcFilterPopup
              Title="Arc Filter Popup"
              ArcPopupshow={ArcFilterPopupshow}
              setArcPopupshow={setArcFilterPopupshow}
              BtnClassName="arc-btn-primary"
              PopupClassName=""
              centered={true}
              setEditShow={setEditTaskShow}
              setSelectedRow={setSelectedRow}
              setAddTaskShow={setAddTaskShow}
              titleFieldValue={titleFieldValue}
              setTitleFieldValue={setTitleFieldValue}
            ></ArcFilterPopup>
            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        ) : (
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
        );
      case "Textbox_time":
        console.log(FieldList.default_value / 60 + "h");
        const timeformatted = FieldList.default_value / 60;
        // Check if there is a fractional part
        const roundedTime =
          timeformatted % 1 !== 0
            ? timeformatted.toFixed(2)
            : timeformatted.toFixed(0);
        const roundedTimebind = roundedTime + "h";
        console.log(roundedTimebind);

        return (
          <>
            <ArcHourInput
              Label={FieldList.label_text}
              onChange={handleSpentHourChange}
              onBlur={handleSpentHourBlur}
              Value={
                inputValues[FieldList.api_name + FieldList.id] || undefined
              }
              DefaultValue={roundedTimebind || undefined}
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
              name={FieldList.name}
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
      case "onclickloaddropdown":
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
            if (masterId == 7037 && item.optionid == 613) {
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
        console.log(inputValues[FieldList.api_name + FieldList.id + "_value"]);
        return FieldList.islookup ? (
          <>
            <ArcAddLookupSingleSelect
              Label={FieldList.label_text}
              ClassName=""
              PlaceHolder={"Select " + FieldList.label_text}
              Name={"Select " + FieldList.label_text}
              Required={FieldList.required}
              ReadOnly={false}
              lookupId={FieldList.masterid}
              disabled={
                FieldList.id === "c78b7183-945c-4c5b-83fb-603e6d3f40fe" &&
                disabled
                  ? true
                  : false
              }
              // selectedItem={addlookupselectedItem}
              // setSelectedItem={setaddlookupselectedItem}

              selectedItem={
                inputValues[FieldList.api_name + FieldList.id + "_value"] ||
                null
              }
              // selectedItem={
              //   inputValues[FieldList.api_name + FieldList.id + "_RefLabel"] ||
              //   null
              // }
              // Pass the handler function as setSelectedItem
              setSelectedItem={(value) =>
                handleSetInputValue(FieldList.api_name + FieldList.id, value)
              }
            />
            {/* <ArcUpdateLookupSingleSelect
                  Label="Update Lookup Single Select"
                  ClassName=""
                  PlaceHolder="Search..."
                  Name="updatelookup"
                  Required={true}
                  ReadOnly={false}
                  lookupId={FieldList.masterid}
                  selectedItem={addlookupselectedItem}
                  // Pass the handler function as setSelectedItem
                  setSelectedItem={setaddlookupselectedItem}
                  selectedValue={
                    FieldList.default_value === "LoggedInUser"
                      ? loggedUserId
                      : FieldList.default_value
                  }
                /> */}
            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        ) : (
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
            />
            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        );

      case "dropdown":
      case "multiselect":
        // Find the matched master values by MasterId

        const MultimatchedData = MasterDataUpdated.find(
          (item) => item.masterid === FieldList.masterid
        );

        const MultimasterId = MultimatchedData ? MultimatchedData.masterid : [];
        // Get the master values array or an empty array if no match found
        const MultimasterValues = MultimatchedData
          ? MultimatchedData.mastervalues
          : [];
        console.log(MultimasterValues);

        const sortedValues = SortingWithoutDirection(
          MultimasterValues,
          "optionvalue"
        );
        console.log(MultimasterValues);
        console.log(sortedValues);
        const Multioptions = MultimasterValues.map((item) => {
          if (MultimasterId == 7037 && item.optionid == 613) {
            return {
              isDisabled: true,
              value: item.optionid,
              label: item.optionvalue,
            };
          }
          return {
            value: item.optionid,
            label: item.optionvalue,
            // isDisabled: masterId == 7037 && item.optionid == 613, //! Disable option
          };
        }).filter(Boolean);
        // Find the matched default value in Singleoptions
        // const Multioptions = sortedValues?.map((item) => ({
        //   value: item.optionid,
        //   label: item.optionvalue,
        // }));
        // Find the matched default value in Singleoptions
        const defaultValueMulti = Multioptions.find(
          (item) => item.value === FieldList.default_value
        );
        const defaultUserValueMulti = Multioptions.find(
          (item) =>
            item.value ===
            (userobj[0] || userobjTask[0] || userobjPlan[0])?.optionid
        );
        console.log(dropdownVisible);
        // let isvisibleclass = (FieldList.isVisible == false && FieldList.isBulkuploadproject == "444") ? true: false;

        return (
          <>
            {FieldList.isBulkuploadproject === "444" ? (
              <>
                {dropdownVisible ? (
                  <>
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
                                value:
                                  inputValues[
                                    FieldList.api_name + FieldList.id
                                  ],
                                label:
                                  inputValues[
                                    FieldList.api_name +
                                      FieldList.id +
                                      "_RefLabel"
                                  ],
                              }
                            : inputValues[FieldList.api_name + FieldList.id] ===
                                null
                              ? ""
                              : ["LoggedInUser"].includes(
                                    FieldList.default_value
                                  ) && defaultUserValueMulti
                                ? defaultUserValueMulti
                                : defaultValueMulti
                                  ? defaultValueMulti
                                  : ""
                        }
                        Required={true}
                        // ReadOnly={FieldList.field_read_only}
                        // isvisible={isvisibleclass}
                      />
                      <ErrorMessage
                        showErrors={showErrors}
                        validationErrors={validationErrors}
                        FieldList={FieldList}
                      />
                    </>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <>
                  <ArcSingleSelect
                    disabled={
                      FieldList.api_name == "column41" && disabled
                        ? disabled
                        : false
                    }
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
                            value:
                              inputValues[FieldList.api_name + FieldList.id],
                            label:
                              inputValues[
                                FieldList.api_name + FieldList.id + "_RefLabel"
                              ],
                          }
                        : inputValues[FieldList.api_name + FieldList.id] ===
                            null
                          ? ""
                          : ["LoggedInUser"].includes(
                                FieldList.default_value
                              ) && defaultUserValueMulti
                            ? defaultUserValueMulti
                            : defaultValueMulti
                              ? defaultValueMulti
                              : ""
                    }
                    Required={FieldList.required}
                    // ReadOnly={FieldList.field_read_only}
                    // isvisible={isvisibleclass}
                  />
                  <ErrorMessage
                    showErrors={showErrors}
                    validationErrors={validationErrors}
                    FieldList={FieldList}
                  />
                </>
              </>
            )}
          </>
        );
      case "Textarea":
        return (
          <>
            {" "}
            <ArcTextarea
              Label={FieldList.label_text}
              ClassName=""
              PlaceHolder={"Start writing"}
              Name={FieldList.api_name}
              Required={FieldList.required}
              onChange={handleInputChange}
              DefaultValue={
                "The user is experiencing slow performance on their laptop, which is affecting their productivity. The system takes an unusually long time to boot up, applications are slow to respond, and there are frequent system lags. The issue persists even after restarting the device multiple times. Additionally, the laptop tends to freeze during multitasking, and the fan runs at high speed, indicating potential overheating. The user has also noticed storage running low despite minimal new installations. Immediate assistance is required to diagnose the issue, check for potential hardware or software malfunctions, and implement necessary optimizations or repairs."
              }
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
        );
        case "DescriptionTextarea":
        return (
          <>
            {" "}
            <ArcTextarea
              Label={FieldList.label_text}
              ClassName=""
              PlaceHolder={"Start writing"}
              Name={FieldList.api_name}
              Required={FieldList.required}
              onChange={handleInputChange}
              // DefaultValue={
              //   "The user is experiencing slow performance on their laptop, which is affecting their productivity. The system takes an unusually long time to boot up, applications are slow to respond, and there are frequent system lags. The issue persists even after restarting the device multiple times. Additionally, the laptop tends to freeze during multitasking, and the fan runs at high speed, indicating potential overheating. The user has also noticed storage running low despite minimal new installations. Immediate assistance is required to diagnose the issue, check for potential hardware or software malfunctions, and implement necessary optimizations or repairs."
              // }
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
        );
      case "checkbox":
        return (
          <>
            <ArcToggle
              onChange={handleToggleChange}
              Label={FieldList.label_text}
              Name={FieldList.api_name}
              ClassName=""
              checked={inputValues[FieldList.api_name + FieldList.id]}
            />
            <ErrorMessage
              showErrors={showErrors}
              validationErrors={validationErrors}
              FieldList={FieldList}
            />
          </>
        );

      case "emaildropdown":
        const DropdownItemsWithURL = [
          { Title: "Asign to", Icon: <FaRegUser/>, Url: "/" },
          {
            Title: "Import Contact",
            Icon: <IoDocumentTextOutline />,
            Url: "/",
          },
          { Title: "Change Status", Icon: <LiaExchangeAltSolid />, Url: "/" },
          { Title: "Delete", Icon: <RiDeleteBinLine />, Url: "/" },
        ];
        return (
          <Usetemplate
            Title="Use Template"
            DropdownItems={DropdownItemsWithURL}
          />
        );
        case "emaileditor":
          return (
            <ArcEmailEditor
             />
          )
      case "groupdropdown":
        return (
          <>
            <ArcTagAdd
              selectedTagItem={selectedTagItem}
              setSelectedTagItem={setSelectedTagItem}
              Name={FieldList.name}
            />
            {/* <ArcAddCustomTag
              selectedItem={selectedTagItem}
              setSelectedItem={setSelectedTagItem}
              Name={FieldList.name}
            /> */}
          </>
        );
      case "arctaglistedit":
        return (
          <>
            <ArcTagListEdit
              RowId={TransactionId}
              UpdateselectedTagItem={UpdateselectedTagItem}
              setUpdateselectedTagItem={setUpdateselectedTagItem}
              setistagedited={setistagedited}
            />
          </>
        );
      case "datepicker":
        console.log(FieldList.default_value);
        // console.log(
        //   format(inputValues[FieldList.api_name + FieldList.id], "MM/dd/yyyy")
        // );
        const is_ValidDate = (date) => date instanceof Date && !isNaN(date);

        const get_SelectedDate = () => {
          const inputDate = new Date(
            inputValues[FieldList.api_name + FieldList.id]
          );
          const defaultDate =
            FieldList.default_value === "Today"
              ? new Date()
              : new Date(FieldList.default_value);

          if (is_ValidDate(inputDate)) {
            return inputDate;
          } else if (is_ValidDate(defaultDate)) {
            return defaultDate;
          } else {
            return new Date();
          }
        };
        return (
          <>
            <ArcDatepicker
              Label={FieldList.label_text}
              PlaceHolder={"Select " + FieldList.label_text}
              startDate={inputValues[FieldList.api_name + FieldList.id] || ""}
              onChange={(date) => handleDateInputChange(date)}
              dateFormat="MM/dd/yyyy"
              selected={get_SelectedDate()}
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
        );
      case "date":
      case "datepickers":
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
        return (
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
