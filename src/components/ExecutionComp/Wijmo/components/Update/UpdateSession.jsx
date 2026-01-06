/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect, useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
//? Assets
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
import { BsInfoCircle } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import Table from "react-bootstrap/Table";

import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import UpdateSessionLocal_API from "./updatesession.json";
import DynamicInput from "@/components/arccomponents/DynamicInputs/DynamicInputs";

import { useDispatch, useSelector } from "react-redux";
// import { fetchAddTaskFormFields } from "@/redux/AddTask/AddTaskFormFields";
import { UpdateSessionData } from "@/redux/Execution/UpdateStatus/UpdateSession";
import { GetDefaultFormValues } from "@/redux/Execution/UpdateStatus/GetDefaultValues";
import { Link } from "react-router-dom";
import { TbLayoutBottombarExpand } from "react-icons/tb";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
// *******~ Import ~******** //

function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
}) {
  return (
    <div className="header-content">
      <h3>Update Session</h3>
      <div className="view-option">
        {/* <Link to={"/addlead"}>
          <TbLayoutBottombarExpand />
        </Link> */}
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

function FooterContent({ handleCancelButtonClick, handleSaveButtonClick }) {
  return (
    <div className="footer-content">
      <button className="cancel" onClick={handleCancelButtonClick}>
        Cancel
      </button>
      <button onClick={handleSaveButtonClick}>Update</button>
    </div>
  );
}

export default function UpdateSession({ show, setShow, SelectedRow }) {
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  const [allInputValues, setAllInputValues] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [key, setKey] = useState([0]);
  // const [show, setShow] = useState(false);
  const [GroupForm, setGroupForm] = useState(true);
  const handleShow = () => setShow(true);
  console.log("selectedrow", SelectedRow);
  // ! API Function
  // ? Get Form Details
  const dispatch = useDispatch();
  let TransactionId = SelectedRow?.id;

  //! Fetch Default values data when the component mounts
  // useEffect(() => {
  //   dispatch(GetDefaultFormValues(TransactionId));
  // }, [SelectedRow]);
  // Fetch data when the component mounts
  // useEffect(() => {
  //   dispatch(fetchAddTaskFormFields());
  // }, [dispatch]);

  // Access the Redux state using useSelector
  const SessionDefaultInputs = useSelector(
    (state) => state.GetDefaultValuesState.DefaultFormValues
  );

  // ! Merge data
  const [updatedSession, setUpdatedSession] = useState(UpdateSessionLocal_API);

  useEffect(() => {
    const updateDefaultValues = () => {
      const updatedData = { ...UpdateSessionLocal_API };

      SessionDefaultInputs?.result?.forEach((defaultValue) => {
        UpdateSessionLocal_API?.result.groups.forEach((group) => {
          group.fields.forEach((field) => {
            if (field.id === defaultValue.id) {
              field.default_value = defaultValue.value;
            }
          });
        });
      });

      setUpdatedSession(updatedData);
    };

    updateDefaultValues();
  }, [SessionDefaultInputs, show]);
  // ! Merge data
  // Access the Redux state using useSelector
  // const arcFormState = useSelector((state) => state.addTask);

  // Extract the relevant data from the state
  // const { screenFields, status, error } = arcFormState;

  // console.log(screenFields); // Access the fetched data here
  // const LeadFormAPI = screenFields?.result; // From API
  const LeadFormAPI = updatedSession?.result; // Local Json
  // !POST Form Details

  // const [inputValues, setInputValues] = useState({});
  const PostLeadData = Object.fromEntries(
    Object.entries(inputValues).filter(([key]) => !key.endsWith("_RefLabel"))
  );
  const UpdateSessionState = useSelector(
    (state) => state.UpdateSessionState.Addstatus
  );

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
    // const value =
    //   SelectedRow &&
    //   SelectedRow[
    //     (
    //       FieldList.table_name +
    //       "_" +
    //       FieldList.api_name +
    //       "_text"
    //     ).toLowerCase()
    //   ];
    return {
      id: FieldList.id,
      tablename: FieldList.table_name,
      apiname: FieldList.api_name,
      value: FieldList.default_value,
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
  // ! Data Binding End
  const SetDefaultValues = () => {
    LeadFormAPI?.groups.forEach((sectionlist) => {
      sectionlist.fields.forEach((FieldList) => {
        if (FieldList.controltype !== "label-title") {
          updateOrAddData(FieldList);
        }
      });
    });
  };

  useEffect(() => {
    // Trigger the function when the component mounts
    SetDefaultValues();
  }, [SessionDefaultInputs, LeadFormAPI, updatedSession]);
  // ! Set default values end

  const handleSaveButtonClick = () => {
    const isValid = validateFields();

    if (isValid) {
      // Perform save logic here
      console.log("Enter data:", inputValues);
      console.log("Post data:", PostLeadData);
      console.log("All Post data:", allInputValues, TransactionId);
      // dispatch(createLead(inputValues));
      // dispatch(createLead(PostLeadData));
      dispatch(
        UpdateSessionData({
          data: allInputValues,
          transactionid: TransactionId,
        })
      );

      console.log("Updated Session Status:", UpdateSessionState);
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

  return (
    <>
      {/* <button className="add-contact-btn" onClick={handleShow}>
        {ScreenWidth > BreakpointSm ? (
          <>
            <FiPlus /> Add Task
          </>
        ) : (
          <>
            <IoMdPersonAdd />
          </>
        )}
      </button> */}

      <Offcanvas
        show={show}
        onHide={handleCancelButtonClick}
        placement="end"
        backdrop="static"
        className={`${
          GroupForm ? "enable-group-tab" : null
        } add-contact-form-canva add-lead-form-canva new-lead-form update-status`}
      >
        <Offcanvas.Body>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            transition={false}
          >
            {/* <Tab
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
                  <pre>{JSON.stringify(AttributeScreenFields, null, 2)}</pre>
                  <pre>{JSON.stringify(PostLeadData, null, 2)}</pre>
                  <pre>{JSON.stringify(allInputValues, null, 2)}</pre>
                </div>
                <FooterContent
                  handleCancelButtonClick={handleCancelButtonClick}
                  handleSaveButtonClick={handleSaveButtonClick}
                ></FooterContent>
              </div>
            </Tab> */}
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
                                  .map((FieldList, index) =>
                                    FieldList.controltype === "label-title" ? (
                                      <>
                                        <div className="label-title">
                                          <span>Title</span>
                                          <p>
                                            {
                                              SelectedRow?.utbl_workitem_column16
                                            }
                                          </p>
                                        </div>
                                      </>
                                    ) : FieldList.controltype ===
                                      "custom_label" ? (
                                      <>
                                        <div className="label-title">
                                          {/* <span>Title</span> */}
                                          <p className="info">
                                            <BsInfoCircle /> Approval follow-up
                                            will be created for this task.
                                          </p>
                                        </div>
                                      </>
                                    ) : (
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
                                    )
                                  )}
                              </>
                            </Accordion.Collapse>
                          </Form.Group>
                        </Accordion>
                      </Form>
                      {/* <pre>{JSON.stringify(PostLeadData, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(updatedSession, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(SessionDefaultInputs, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(allInputValues, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(SelectedRow, null, 2)}</pre> */}
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
                      .map((FieldList, index) =>
                        FieldList.controltype === "label-title" ? (
                          <>
                            <div className="data">
                              <span>Title</span>
                              <p>SBO-Case Studies for deals com</p>
                            </div>
                          </>
                        ) : FieldList.controltype === "custom_label" ? (
                          <>
                            <div className="data">
                              {/* <span>Title</span> */}
                              <p className="info">
                                <BsInfoCircle /> Approval follow-up will be
                                created for this task.
                              </p>
                            </div>
                          </>
                        ) : (
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
                            />
                          </React.Fragment>
                        )
                      )}
                  </>
                </Accordion.Collapse>
              </Form.Group>
            </Accordion>
          </React.Fragment>
        ))}
    </>
  );
};
