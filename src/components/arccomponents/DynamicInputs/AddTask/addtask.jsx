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
import { ArcFaild } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";
import { IoMdPersonAdd } from "react-icons/io";

import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import AddTaskLocal_API from "./AddTask_API.json";
import DynamicInput from "@/components/arccomponents/DynamicInputs/DynamicInputs";

import { useDispatch, useSelector } from "react-redux";
import { fetchAddTaskFormFields } from "@/redux/AddTask/AddTaskFormFields";
import { AddTaskData } from "@/redux/AddTask/addTaskData";
import {
  AddTaskDataValidation,
  resetValidationStatus,
} from "@/redux/AddTask/addTaskValidation";

import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { userobjInfo } from "@/redux/Execution/selector";
import { SelectedRowContext } from "@/context/SelectedRow/SelectedRowContext";
import { useLocation, useNavigate } from "react-router-dom";
// *******~ Import ~******** //

function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
}) {
  return (
    <div className="header-content">
      <h3>Add Plan</h3>
      <div className="view-option">
        {/* <Link to={"/addlead"}>
          <TbLayoutBottombarExpand />
        </Link> */}
        <button
          className={GroupForm ? "active" : null}
          onClick={() => {
            setGroupForm((prevGroupForm) => !prevGroupForm);
            setKey("all");
          }}
        >
          <ImTree /> Group
        </button>
      </div>
      {/* <span onClick={handleCancelButtonClick} className="close-btn">
        <MdOutlineCancel />
      </span> */}
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
      <button className="cancel" onClick={handleCancelButtonClick}>
        Cancel
      </button>
      <button onClick={handleSaveButtonClick} disabled={buttonDisabled}>
        Add
      </button>
    </div>
  );
}

export default function LeadForm({
  setArcFilterPopupshow,
  show,
  setShow,
  // setTitleFieldValue,
  // titleFieldValue,
}) {
  const { setTitleFieldValue, titleFieldValue } =
    useContext(SelectedRowContext);
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  const [selectedTitleItem, setSelectedTitleItem] = useState([]);
  const [allInputValues, setAllInputValues] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [formattedData, setFormattedData] = useState({});
  const [key, setKey] = useState(["all"]);
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  // const [show, setShow] = useState(false);
  const [GroupForm, setGroupForm] = useState(true);
  const previousInputValues = useRef(allInputValues);

  const { state } = useLocation();
  console.log(state);
  let showAddTask = state?.showAddTask || false;

  useEffect(() => {
    if (showAddTask) {
      handleShow();
      GetAddForm();
    }
  }, [showAddTask]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location.state);
    if (location.state) {
      // Clear the state by replacing the current entry in the history
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  const handleShow = () => {
    //added by Venkatesh R
    setShowErrors(false);
    setInputValues({});
    setErrorCount(0);
    setAllInputValues([]);
    //added by Venkatesh R
    setShow(true);
  };
  // ! API Function
  // ? Get Form Details
  const dispatch = useDispatch();
  const GetAddForm = () => {
    dispatch(fetchAddTaskFormFields());
  };
  // Fetch data when the component mounts
  // useEffect(() => {
  //   dispatch(fetchAddTaskFormFields());
  // }, [dispatch]);

  // Access the Redux state using useSelector
  const arcFormState = useSelector((state) => state.addTask);
  const arcFormStateStatus = useSelector((state) => state.addTask.status);
  const userobj = useSelector(userobjInfo);

  console.log(userobj);

  // Extract the relevant data from the state
  const { screenFields } = arcFormState;

  const LeadFormAPI = screenFields?.result;
  // const LeadFormAPI = updatedScreenFieldsResult;
  console.log(LeadFormAPI);

  // updatedLeadFormAPI now contains the updated or unchanged LeadFormAPI

  const PostLeadData = Object.fromEntries(
    Object.entries(inputValues).filter(([key]) => !key.endsWith("_RefLabel"))
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
  const GlobalUser = JSON.parse(sessionStorage.getItem("GlobalUser"));
  let Globalid, fullName;
  if (GlobalUser !== null) {
    ({ Globalid, fullName } = GlobalUser);
  }
  // ! Data Binding
  const createCommonObject = (FieldList) => ({
    id: FieldList.id,
    tablename: FieldList.table_name,
    apiname: FieldList.api_name,
    value:
      ["Today"].includes(FieldList.default_value) &&
      ["date"].includes(FieldList.controltype)
        ? format(new Date(), "MM/dd/yyyy")
        : ["LoggedInUser"].includes(FieldList.default_value)
          ? Globalid
          : FieldList.default_value,

    columntype: FieldList.attributedatatype,
  });
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
  // ! Data Binding End
  const SetDefaultValues = async () => {
    const promises = LeadFormAPI?.groups?.map(async (sectionlist) => {
      return Promise.all(
        sectionlist.fields.map(async (FieldList) => {
          if (FieldList.default_value && FieldList.default_value !== null) {
            console.log(FieldList);
            updateOrAddData(FieldList);

            if (
              FieldList.default_value === "Today" &&
              ["date", "datepicker"].includes(FieldList.controltype)
            ) {
              setInputValues((prevState) => ({
                ...prevState,
                [FieldList.api_name + FieldList.id]: new Date(),
              }));
            }

            if (
              ["dropdown", "multiselect", "onclickloaddropdown"].includes(
                FieldList.controltype
              ) &&
              FieldList.islookup
            ) {
              console.log(FieldList.controltype);
              if (["LoggedInUser"].includes(FieldList.default_value)) {
                const UserOptions = {
                  optionid: Globalid,
                  optionvalue: fullName,
                };
                setInputValues((prevState) => ({
                  ...prevState,
                  [FieldList.api_name + FieldList.id]: Globalid,
                  [FieldList.api_name + FieldList.id + "_RefLabel"]: fullName,
                  [FieldList.api_name + FieldList.id + "_value"]:
                    UserOptions || null,
                }));
              } else {
                const Options = {
                  optionid: FieldList.default_value,
                  optionvalue: FieldList.default_value_text,
                };
                setInputValues((prevValues) => ({
                  ...prevValues,
                  [FieldList.api_name + FieldList.id]:
                    FieldList.default_value || null,
                  [FieldList.api_name + FieldList.id + "_RefLabel"]:
                    FieldList.default_value_text || null,
                  [FieldList.api_name + FieldList.id + "_value"]:
                    Options || null,
                }));
              }
            }
            if (
              ["dropdown", "multiselect"].includes(FieldList.controltype) &&
              FieldList.islookup
            ) {
              console.log(FieldList.controltype);
              if (["LoggedInUser"].includes(FieldList.default_value)) {
                const UserOptions = {
                  optionid: userobj[0]?.optionide,
                  optionvalue: userobj[0]?.optionvalue,
                };
                setInputValues((prevState) => ({
                  ...prevState,
                  [FieldList.api_name + FieldList.id]: userobj[0]?.optionid,
                  [FieldList.api_name + FieldList.id + "_RefLabel"]:
                    userobj[0]?.optionvalue,
                  [FieldList.api_name + FieldList.id + "_value"]:
                    UserOptions || null,
                }));
              } else {
                const Options = {
                  optionid: FieldList.default_value,
                  optionvalue: FieldList.default_value_text,
                };
                setInputValues((prevValues) => ({
                  ...prevValues,
                  [FieldList.api_name + FieldList.id]:
                    FieldList.default_value || null,
                  [FieldList.api_name + FieldList.id + "_RefLabel"]:
                    FieldList.default_value_text || null,
                  [FieldList.api_name + FieldList.id + "_value"]:
                    Options || null,
                }));
              }
            }
          }
        })
      );
    });

    await Promise.all(promises);
    console.log("All async operations completed.");
  };
  useEffect(() => {
    // Trigger the function when the component mounts
    if (LeadFormAPI) {
      SetDefaultValues();
    }
  }, [LeadFormAPI, show, arcFormStateStatus]);
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

  const handleSaveButtonClick = () => {
    const isValid = validateFields();

    if (isValid) {
      // Perform save logic here

      console.log("Enter data:", inputValues);
      console.log("Post data:", PostLeadData);
      console.log("All Post data:", allInputValues);
      setButtonDisabled(true);

      // dispatch(AddTaskDataValidation(allInputValues));
      if (!isEqual(allInputValues, previousInputValues.current)) {
        // Dispatch action only if allInputValues has changed
        dispatch(AddTaskDataValidation(allInputValues));
      } else {
        console.log("allInputValues has not changed, skipping dispatch.");
        setButtonDisabled(false);
      }

      console.log("Updated addStatus:", addStatus);
    } else {
      setShowErrors(true);
      setShow(true);
      setButtonDisabled(false);
      // Filter out null values from validationErrors
    }
    previousInputValues.current = allInputValues;
  };
  const handleCancelButtonClick = () => {
    setButtonDisabled(false);
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

  // const PostValidTask = () =>{}
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
  useEffect(() => {
    if (taskresponseresult) {
      if (taskresponseresult?.response === "Task Not Exists.") {
        console.log(TaskValidationResponseStatus);
        console.log(TaskValidationStatus);
        const requestData = {
          entityid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userid: loggedUserId,
          data: allInputValues,
        };
        dispatch(AddTaskData(requestData));
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
  useEffect(() => {
    const formatted = allInputValues.reduce((acc, item) => {
      acc[item.apiname] = item.value;
      return acc;
    }, {});
    setFormattedData(formatted);
  }, [allInputValues]);
  return (
    <>
      <button
        className="add-contact-btn"
        onClick={() => {
          GetAddForm();
          handleShow();
        }}
      >
        {ScreenWidth > BreakpointSm ? (
          <>
            <FiPlus /> Add Task
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
            <Tab
              eventKey="all"
              title={
                <>
                  All {ErrorCount === 0 ? undefined : <span>{ErrorCount}</span>}
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
                  <Form className={key}>
                    <AllDetail
                      inputValues={inputValues}
                      setInputValues={setInputValues}
                      validationErrors={validationErrors}
                      setValidationErrors={setValidationErrors}
                      showErrors={showErrors}
                      setShowErrors={setShowErrors}
                      LeadFormAPI={LeadFormAPI}
                      allInputValues={allInputValues}
                      setAllInputValues={setAllInputValues}
                    />
                  </Form>
                  {/* <pre>{JSON.stringify(AttributeScreenFields, null, 2)}</pre> */}
                  {/* <button onClick={SetDefaultValues}>setDefault</button> */}
                  {/* <pre>{JSON.stringify(PostLeadData, null, 2)}</pre> */}
                  {/* <pre>{JSON.stringify(formattedData, null, 2)}</pre> */}
                  {/* <pre>{JSON.stringify(allInputValues, null, 2)}</pre> */}
                  {/* <pre>{JSON.stringify(inputValues, null, 2)}</pre> */}
                </div>
                <FooterContent
                  handleCancelButtonClick={handleCancelButtonClick}
                  handleSaveButtonClick={handleSaveButtonClick}
                  buttonDisabled={buttonDisabled}
                ></FooterContent>
              </div>
            </Tab>
            {LeadFormAPI?.groups
              ?.slice()
              .sort((a, b) => a.seqno - b.seqno)
              .map((sectionlist, index) => (
                <Tab
                  key={index}
                  eventKey={sectionlist.name}
                  title={<>{sectionlist.name}</>}
                >
                  <div className="add-contact-form add-lead-form">
                    <HeaderContent
                      GroupForm={GroupForm}
                      setGroupForm={setGroupForm}
                      handleCancelButtonClick={handleCancelButtonClick}
                      setKey={setKey}
                    ></HeaderContent>
                    <div className="main-content">
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
                                        selectedTitleItem={selectedTitleItem}
                                        setSelectedTitleItem={
                                          setSelectedTitleItem
                                        }
                                        // setTitleFieldValue={setTitleFieldValue}
                                        // titleFieldValue={titleFieldValue}
                                        Page={"Task"}
                                        setArcFilterPopupshow={
                                          setArcFilterPopupshow
                                        }
                                      />
                                    </React.Fragment>
                                  ))}
                              </>
                            </Accordion.Collapse>
                          </Form.Group>
                        </Accordion>
                      </Form>
                      {/* <pre>{JSON.stringify(allInputValues, null, 2)}</pre> */}
                    </div>
                    <FooterContent
                      handleCancelButtonClick={handleCancelButtonClick}
                      handleSaveButtonClick={handleSaveButtonClick}
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

const AllDetail = ({
  inputValues,
  setInputValues,
  validationErrors,
  setValidationErrors,
  showErrors,
  setShowErrors,
  LeadFormAPI,
  allInputValues,
  setAllInputValues,
}) => {
  return (
    <>
      {LeadFormAPI?.groups
        ?.slice()
        .sort((a, b) => a.seqno - b.seqno)
        .map((sectionlist, index) => (
          <React.Fragment key={index}>
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
                            setValidationErrors={setValidationErrors}
                            showErrors={showErrors}
                            setShowErrors={setShowErrors}
                            allInputValues={allInputValues}
                            setAllInputValues={setAllInputValues}
                            page={"AddTask"}
                          />
                        </React.Fragment>
                      ))}
                  </>
                </Accordion.Collapse>
              </Form.Group>
            </Accordion>
          </React.Fragment>
        ))}
    </>
  );
};

const isEqual = (a, b) => {
  // Implement your deep comparison logic here
  return JSON.stringify(a) === JSON.stringify(b);
};
