/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect, useContext } from "react";
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

import { IoMdPersonAdd } from "react-icons/io";
import {
  createprojectvalidation,
  resetAddStatus,
} from "@/redux/AddProject/AddProject";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
// import AddTaskLocal_API from "./AddTask_API.json";
import DynamicInput from "@/components/arccomponents/DynamicInputs/DynamicInputs";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectFormFields } from "@/redux/AddProject/AddProjectFormInfo";
import { createProject } from "@/redux/AddProject/AddProject";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { userobjInfo } from "@/redux/Project/selector";
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
      <h3>Add Project</h3>
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
        title="Cancel"
        className="cancel"
        onClick={handleCancelButtonClick}
      >
        Cancel
      </button>
      <button
        title="Add"
        onClick={handleSaveButtonClick}
        disabled={buttonDisabled}
      >
        {" "}
        Add
      </button>
    </div>
  );
}

export default function LeadForm() {
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  const [allInputValues, setAllInputValues] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [key, setKey] = useState([0]);
  const [show, setShow] = useState(false);
  const [buttonDisabled, setButonDisabled] = useState(false);
  const [GroupForm, setGroupForm] = useState(true);

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
    setShow(true);
  };
  // ! API Function
  // ? Get Form Details
  const dispatch = useDispatch();
  const GetAddForm = () => {
    dispatch(fetchProjectFormFields());
  };
  // Access the Redux state using useSelector
  const arcFormState = useSelector((state) => state.arcProjectFields);
  const arcFormStateStatus = useSelector(
    (state) => state.arcProjectFields.status
  );
  const userobj = useSelector(userobjInfo);

  console.log(userobj);

  // Extract the relevant data from the state
  //const { screenFields } = arcFormState?.AttributeScreenFields || [];

  const LeadFormAPI = arcFormState?.AttributeScreenFields?.result;
  // const LeadFormAPI = updatedScreenFieldsResult;
  console.log(LeadFormAPI);

  // updatedLeadFormAPI now contains the updated or unchanged LeadFormAPI

  const PostLeadData = Object.fromEntries(
    Object.entries(inputValues).filter(([key]) => !key.endsWith("_RefLabel"))
  );
  const addStatus = useSelector((state) => state.arcAddProject.Addstatus);

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
          ? userobj[0]?.optionid
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
  const SetDefaultValues = () => {
    LeadFormAPI?.groups?.forEach((sectionlist) => {
      sectionlist.fields.forEach((FieldList) => {
        if (FieldList.default_value && FieldList.default_value !== null) {
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
      setButonDisabled(true);
      dispatch(createprojectvalidation(allInputValues));
      console.log("Updated addStatus:", addStatus);
      // setInputValues({});
      // setAllInputValues([]);
      // setShowErrors(false);
      // setShow(false);
    } else {
      setShowErrors(true);
      setShow(true);
      setButonDisabled(false);
      // Filter out null values from validationErrors
    }
  };

  const handleCancelButtonClick = () => {
    setButonDisabled(false);
    setShowErrors(false);
    setShow(false);
    setInputValues({});
    setErrorCount(0);
    setAllInputValues([]);
  };
  // ! Validation Status
  const ProjectValidationStatus = useSelector(
    (state) => state.arcAddProject.validation
  );
  const ProjectValidationResponseStatus = useSelector(
    (state) => state.arcAddProject.Validationstatus
  );
  const projectresponseresult = ProjectValidationStatus?.result;

  useEffect(() => {
    if (projectresponseresult && allInputValues.length > 0) {
      if (projectresponseresult?.response === "valid") {
        console.log(ProjectValidationResponseStatus);
        // console.log(TaskValidationStatus);
        dispatch(createProject(allInputValues));
        setButonDisabled(true);
        dispatch(resetAddStatus());
        setShow(false);
        setInputValues({});
        setAllInputValues([]);
        setShowErrors(false);
      } else if (
        projectresponseresult?.response === "Project name already exists." ||
        projectresponseresult?.response ===
          "Project name exceeds 50 characters."
      ) {
        console.log(ProjectValidationResponseStatus);
        dispatch(resetAddStatus());
        setButonDisabled(false);

        // dispatch(resetValidationStatus());
      }
    }
  }, [projectresponseresult]);
  // ! Validation Status

  return (
    <>
      <button
        className="add-contact-btn"
        onClick={() => {
          GetAddForm();
          handleShow();
          setButonDisabled(false);
        }}
      >
        {ScreenWidth > BreakpointSm ? (
          <>
            <FiPlus /> Add Project
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
                                      />
                                    </React.Fragment>
                                  ))}
                              </>
                            </Accordion.Collapse>
                          </Form.Group>
                        </Accordion>
                      </Form>
                      {/* <pre>{JSON.stringify(inputValues, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(AttributeScreenFields, null, 2)}</pre> */}
                      {/* <button onClick={SetDefaultValues}>setDefault</button> */}
                      {/* <pre>{JSON.stringify(PostLeadData, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(allInputValues, null, 2)}</pre> */}
                    </div>
                    <FooterContent
                      handleCancelButtonClick={handleCancelButtonClick}
                      handleSaveButtonClick={handleSaveButtonClick}
                      buttonDisabled={buttonDisabled}
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
