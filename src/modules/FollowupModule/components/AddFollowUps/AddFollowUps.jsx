/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect, useContext, useRef } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
//? Assets
import { format } from "date-fns";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import { FiPlus } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { ImTree } from "react-icons/im";
import "react-datepicker/dist/react-datepicker.css";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { IoIosArrowDown } from "react-icons/io";
import AccordionContext from "react-bootstrap/AccordionContext";
import { addLookupDetail } from "@/redux/getlookupdetails/AddLookupDetails";
import { IoMdPersonAdd } from "react-icons/io";
import {
  AddTaskDataValidation,
  resetValidationStatus,
} from "@/redux/AddTask/addTaskValidation";
import {
  updateLookupDetail,
  updateLookupid,
} from "@/redux/getlookupdetails/UpdateLookupDetails";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
// import AddTaskLocal_API from "./AddTask_API.json";
import DynamicInput from "@/components/arccomponents/DynamicInputs/DynamicInputs";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddMasterTaskFormFields } from "@/redux/Task/AddTask/addMasterTask";
//import { AddNotesData } from "./AddNotescall";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { loginUserIDobjInfo, userobjInfo } from "@/redux/Notes/selector";
import { loggedinuserinfo } from "@/redux/Notes/selector";
import ArcFilterPopup from "@/components/arccomponents/ui-components/ArcTaskAutocompletesearch/ArcFilterPopup";
import { SelectedRowContext } from "@/context/SelectedRow/SelectedRowContext";
import { useLocation, useNavigate } from "react-router-dom";

import AddNotes from "./AddFollowUps.json";
import { fetchFollowupScreenFields } from "@/redux/Execution/AddFollowup/AddFollowupFormFields";
import { AddFollowuplistdetails } from "./AddFollowuplistdetails";
import { masterDataInfo } from "@/redux/Notes/selector";
import { Tooltip } from "react-bootstrap";
// *******~ Import ~******** //

function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
}) {
  var openautosearch = function () {
    //setArcFilterPopupshow(true);
  };
  return (
    <div className="header-content">
      {/* <button onclick={openautosearch}>AutocompleteSearch</button> */}

      <h3>Add Followup</h3>
      <div className="view-option">
        <button
          className={GroupForm ? "active" : null}
          onClick={() => {
            setGroupForm((prevGroupForm) => !prevGroupForm);
            setKey([0]);
          }}
        >
          <ImTree /> Group
        </button>
      </div>
      <ArcToolTip
        HoverText="Close"
        BtnName={<MdOutlineCancel />}
        Placement="left"
        onClick={handleCancelButtonClick}
        as="span"
        className="close-btn"
      />
    </div>
  );
}

function FooterContent({
  handleCancelButtonClick,
  handleSaveButtonClick,
  buttonDisabled,
}) {
  return (
    <div className="footer-content">
      <button
        className="cancel"
        onClick={handleCancelButtonClick}
        title="Cancel"
      >
        Cancel
      </button>
      <button
        onClick={handleSaveButtonClick}
        disabled={buttonDisabled}
        title="Add"
      >
        Add
      </button>
    </div>
  );
}

export default function AddFollowups({ show, setShow }) {
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  // const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  const { setcheckboxRowValues, setSelectedcheckboxValues } =
    useContext(SelectedRowContext);
  const [inputValues, setInputValues] = useState({});
  const [allInputValues, setAllInputValues] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [key, setKey] = useState([0]);
  //const [show, setShow] = useState(false);
  const [GroupForm, setGroupForm] = useState(true);
  const previousInputValues = useRef(allInputValues);
  const [selectedTagItem, setSelectedTagItem] = useState([]);
  const [selectedTitleItem, setSelectedTitleItem] = useState([]);
  //const handleShow = () => setShow(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [UpdateTagItem, setUpdateTagItem] = useState([]);
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  const GlobalUser = JSON.parse(sessionStorage.getItem("GlobalUser"));
  let Globalid, fullName;
  if (GlobalUser !== null) {
    ({ Globalid, fullName } = GlobalUser);
  }
  const [formattedData, setFormattedData] = useState({});

  const { addTaskShow, setAddTaskShow, setTitleFieldValue, titleFieldValue } =
    useContext(SelectedRowContext);

  const { state } = useLocation();
  console.log(state);
  let showAddTask = state?.showAddTask || false;

  useEffect(() => {
    if (showAddTask) {
      setAddTaskShow(showAddTask);
      //GetAddForm();
    }
  }, [showAddTask]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFollowupScreenFields());
  }, [dispatch]);
  const handleShow = () => {
    setShow(true);
  };
  // Access the Redux state using useSelector
  const SessionDefaultInputs = useSelector(
    (state) => state.GetDefaultValuesState.DefaultFormValues
  );
  const FollowupScreenFields = useSelector(
    (state) => state.AddFollowup.screenFields
  );
  // ! Format Date
  const formatDate = (dateString) => {
    // Create a new Date object from the input date string
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    // Format the date using Intl.DateTimeFormat
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }).format(date);

    return formattedDate;
  };
  const [updatedSession, setUpdatedSession] = useState(FollowupScreenFields);
  useEffect(() => {
    const updateDefaultValues = () => {
      const updatedData = { ...FollowupScreenFields };

      SessionDefaultInputs?.result?.forEach((defaultValue) => {
        FollowupScreenFields?.result.groups.forEach((group) => {
          group.fields.forEach((field) => {
            if (field.id === defaultValue.id) {
              field.default_value =
                defaultValue.columntype === "datetime"
                  ? formatDate(defaultValue.value)
                  : defaultValue.value;
            }
          });
        });
      });

      setUpdatedSession(updatedData);
    };

    updateDefaultValues();
  }, [SessionDefaultInputs, show]);

  useEffect(() => {
    const FilterData = allInputValues.reduce((acc, item) => {
      if (item.apiname === "column16") {
        acc.push({
          filterid: "bb7f219e-d5aa-4aa3-ba78-2b942f6aed03",
          apiname: item.apiname,
          filtervalue: item.value,
          controltype: "textbox",
          condition: "OR",
        });
      }
      return acc;
    }, []);

    setTitleFieldValue(FilterData);
  }, [allInputValues]);

  // ! Update Tag Values
  useEffect(() => {
    const newTagItems = selectedTagItem.map((tag) => ({
      isnewtag: tag.isnewtag,
      tagid: tag.tagid,
      tagname: tag.optionvalue,
    }));
    setUpdateTagItem(newTagItems);
  }, [selectedTagItem]);
  const arcFormState = useSelector((state) => state.addMasterTask);

  const arcFormStateStatus = useSelector((state) => state.addMasterTask.status);
  const userobj = useSelector(userobjInfo);
  const loginUserIDobj = useSelector(loginUserIDobjInfo);

  console.log(userobj, "loginUserIDobj", loginUserIDobj);
  const { screenFields } = arcFormState;
  const LeadFormAPI = updatedSession?.result;
  console.log(LeadFormAPI);
  const PostLeadData = Object.fromEntries(
    Object.entries(inputValues).filter(
      ([key]) => !key.endsWith("_RefLabel") && !key.includes("_value")
    )
  );
  const addStatus = useSelector((state) => state.addTaskState.Addstatus);

  const validateFields = () => {
    let errors = {};
    LeadFormAPI?.groups.forEach((sectionlist) => {
      sectionlist.fields.forEach((FieldList) => {
        if (
          FieldList.required &&
          !inputValues[FieldList.api_name + FieldList.id]
        ) {
          errors[FieldList.api_name + FieldList.id] =
            `${FieldList.label_text} is required`;
        }
      });
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const [ErrorCount, setErrorCount] = useState(0);
  useEffect(() => {
    if (showErrors) {
      // Filter out null values from validationErrors
      const nonNullErrors = Object.entries(validationErrors)
        .filter(([field, error]) => error !== null)
        .reduce((acc, [field, error]) => {
          acc[field] = error;
          return acc;
        }, {});
      const count = Object.keys(nonNullErrors).length;
      console.log("Validation errors count:", count);
      setErrorCount(count); // Update the global ErrorCount variable
      console.log("Validation errors:", nonNullErrors);
    }
  }, [showErrors, validationErrors]);

  // ! Set default values start

  // ! Data Binding
  const createCommonObject = (FieldList) => {
    return {
      id: FieldList.id,
      tablename: FieldList.table_name,
      apiname: FieldList.api_name,
      value:
        ["Today"].includes(FieldList.default_value) &&
        ["date"].includes(FieldList.controltype)
          ? format(new Date(), "MM/dd/yyyy")
          : FieldList.default_value,
      columntype: FieldList.attributedatatype,
    };
  };
  const updateOrAddData = (FieldList) => {
    // Check if the ID already exists in allInputValues
    const existingIndex = allInputValues.findIndex(
      (input) => input.id === FieldList.id
    );

    if (existingIndex !== -1) {
      // If ID exists, update the data
      setAllInputValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[existingIndex] = createCommonObject(FieldList);
        return updatedValues;
      });
    } else {
      // If ID doesn't exist, add new data
      setAllInputValues((prevValues) => [
        ...prevValues,
        createCommonObject(FieldList),
      ]);
    }
  };
  const masterData = useSelector(masterDataInfo);
  const SetDefaultValues = () => {
    LeadFormAPI?.groups?.forEach((sectionlist) => {
      sectionlist?.fields?.forEach((FieldList) => {
        if (FieldList.default_value && FieldList.default_value != null) {
          console.log(FieldList);
          updateOrAddData(FieldList);
          if (
            FieldList.default_value === "Today" &&
            FieldList.controltype === "date"
          ) {
            setInputValues((prevState) => ({
              ...prevState,
              [FieldList.api_name + FieldList.id]: new Date(),
            }));
          }
        }
      });
    });
  };
  useEffect(() => {
    // Trigger the function when the component mounts
    SetDefaultValues();
  }, [SessionDefaultInputs, LeadFormAPI, show, updatedSession]);
  // ! Set default values end

  const handleSaveButtonClick = () => {
    const isValid = validateFields();

    if (isValid) {
      console.log("Enter data:", inputValues);
      console.log("Post data:", PostLeadData);
      console.log("All Post data:", allInputValues);
      dispatch(AddFollowuplistdetails(allInputValues));
      setInputValues({});
      setAllInputValues([]);
      setShowErrors(false);
      setShow(false);
    } else {
      setShowErrors(true);
      setShow(true);
      // Filter out null values from validationErrors
    }
  };
  const handleCancelButtonClick = () => {
    setShowErrors(false);
    setShow(false);
    setInputValues({});
    setErrorCount(0);
    setAllInputValues([]);
  };
  // ! Validation Status
  const TaskValidationStatus = useSelector(
    (state) => state.addTaskValidationState.status
  );
  const TaskValidationResponseStatus = useSelector(
    (state) => state.addTaskValidationState.response
  );
  const taskresponseresult = TaskValidationResponseStatus?.result;
  useEffect(() => {
    const formatted = allInputValues.reduce((acc, item) => {
      acc[item.apiname] = item.value;
      return acc;
    }, {});
    setFormattedData(formatted);
  }, [allInputValues]);

  useEffect(() => {
    if (taskresponseresult) {
      if (taskresponseresult?.response === "Task Not Exists.") {
        console.log(TaskValidationResponseStatus);
        console.log(TaskValidationStatus);
        const requestData = {
          entityid: "26B84156-CC30-416E-99D5-B37409B4D0BD",
          userid: loggedUserId,
          data: allInputValues,
          tag: UpdateTagItem,
        };

        dispatch(AddTaskData(requestData));
        setSelectedTagItem([]);
        setUpdateTagItem([]);
        dispatch(resetValidationStatus());
        setShow(false);
        setInputValues({});
        setAllInputValues([]);
        setShowErrors(false);
      } else if (taskresponseresult?.response === "Task Already Exists.") {
        console.log(TaskValidationResponseStatus?.result?.response);
        dispatch(resetValidationStatus());
        setButtonDisabled(false);
        // dispatch(resetValidationStatus());
      }
    }
  }, [TaskValidationResponseStatus]);
  // ! Validation Status
  console.log(inputValues);
  return (
    <>
      <button
        className="add-contact-btn"
        onClick={() => {
          // GetAddForm();
          handleShow();
        }}
        title="Add Followup"
      >
        {ScreenWidth > BreakpointSm ? (
          <>
            <FiPlus /> Add Followup
          </>
        ) : (
          <>
            <IoMdPersonAdd />
          </>
        )}
      </button>

      <Offcanvas
        show={show}
        onHide={handleCancelButtonClick}
        placement="end"
        backdrop="static"
        className={`${
          GroupForm ? "enable-group-tab" : null
        } add-contact-form-canva add-lead-form-canva new-lead-form`}
      >
        <Offcanvas.Body>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            transition={false}
          >
            {LeadFormAPI?.groups
              ?.slice()
              .sort((a, b) => a.seqno - b.seqno)
              .map((sectionlist, index) => (
                <Tab
                  key={index}
                  eventKey={index}
                  title={
                    <>
                      {sectionlist.name}
                      {ErrorCount === 0 ? undefined : <span>{ErrorCount}</span>}
                    </>
                  }
                >
                  <div className="add-contact-form add-lead-form">
                    <HeaderContent
                      GroupForm={GroupForm}
                      setGroupForm={setGroupForm}
                      handleCancelButtonClick={handleCancelButtonClick}
                      setKey={setKey}
                    ></HeaderContent>
                    <div className="main-content">
                      {/* <button
                        onClick={() => {
                          setArcFilterPopupshow(true);
                          console.log("test");
                        }}
                      >
                        Show Filter
                      </button> */}
                      <Form className={key}>
                        <Accordion defaultActiveKey="0">
                          <Form.Group className="form-group">
                            <CustomToggle eventKey="0">
                              <h4>{sectionlist.name}</h4>
                              <span>
                                <IoIosArrowDown />
                              </span>
                            </CustomToggle>
                            <Accordion.Collapse eventKey="0">
                              <>
                                {sectionlist.fields
                                  ?.slice()
                                  .sort((a, b) => a.seqno - b.seqno)
                                  .map((FieldList, index) => (
                                    <React.Fragment key={index}>
                                      <DynamicInput
                                        FieldList={FieldList}
                                        inputValues={inputValues}
                                        setInputValues={setInputValues}
                                        validationErrors={validationErrors}
                                        setValidationErrors={
                                          setValidationErrors
                                        }
                                        showErrors={showErrors}
                                        setShowErrors={setShowErrors}
                                        allInputValues={allInputValues}
                                        setAllInputValues={setAllInputValues}
                                        selectedTagItem={selectedTagItem}
                                        setSelectedTagItem={setSelectedTagItem}
                                        selectedTitleItem={selectedTitleItem}
                                        setSelectedTitleItem={
                                          setSelectedTitleItem
                                        }
                                        setTitleFieldValue={setTitleFieldValue}
                                        titleFieldValue={titleFieldValue}
                                        Page={"AddNotes"}
                                        // setArcFilterPopupshow={
                                        //   setArcFilterPopupshow
                                        // }
                                      />
                                    </React.Fragment>
                                  ))}
                              </>
                            </Accordion.Collapse>
                          </Form.Group>
                        </Accordion>
                      </Form>
                      {/* <pre>{JSON.stringify(allInputValues, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(inputValues, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(AttributeScreenFields, null, 2)}</pre> */}
                      {/* <button onClick={SetDefaultValues}>setDefault</button> */}
                      {/* <pre>{JSON.stringify(PostLeadData, null, 2)}</pre>
                      <pre>{JSON.stringify(allInputValues, null, 2)}</pre> */}
                    </div>
                    <FooterContent
                      handleCancelButtonClick={handleCancelButtonClick}
                      handleSaveButtonClick={handleSaveButtonClick}
                      buttonDisabled={buttonDisabled}
                      setButtonDisabled={setButtonDisabled}
                    ></FooterContent>
                  </div>
                </Tab>
              ))}
          </Tabs>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function CustomToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      className={`group-title ${isCurrentEventKey && "active"}`}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

const isEqual = (a, b) => {
  // Implement your deep comparison logic here
  return JSON.stringify(a) === JSON.stringify(b);
};
