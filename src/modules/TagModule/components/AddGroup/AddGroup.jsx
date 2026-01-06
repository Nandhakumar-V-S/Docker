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
import Offline_AddGroup from "./AddGroup.json";

import { IoMdPersonAdd } from "react-icons/io";
import {
  AddTaskDataValidation,
  resetValidationStatus,
} from "@/redux/AddTask/addTaskValidation";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
// import AddTaskLocal_API from "./AddTask_API.json";
import DynamicInput from "@/components/arccomponents/DynamicInputs/DynamicInputs";
import { useDispatch, useSelector } from "react-redux";
import { AddTaskData } from "@/redux/AddTask/addTaskData";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { userobjInfo } from "@/redux/Task/selector";
import { CreateTagForm } from "@/components/TagComp/Wijmo/components/Update/AddTag";
// import { fetchAddMasterTaskFormFields } from "@/redux/Task/AddTask/addMasterTask";
// import { fetchAddGroupFormFields } from "@/redux/Tag/NewTagGroup/AddGroupFormFields";
import ArcCustomMultiSelect from "@/components/arccomponents/ui-components/ArcCustomMultiSelect/ArcCustomMultiSelect";
import { ArcFaild } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";
import { GetAddEntityFields } from "@/redux/Tag/AddTag/getAddEntityFields";
import { setLoading } from "@/redux/Tag/actions";
import { CreateTagGroup } from "@/redux/Tag/NewTagGroup/InsertNewTagGroup";
// *******~ Import ~******** //

function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
}) {
  return (
    <div className="header-content">
      <h3>Add Tag Group</h3>
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
      <button className="cancel" onClick={handleCancelButtonClick}>
        Cancel
      </button>
      <button onClick={handleSaveButtonClick} disabled={buttonDisabled}>
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
  const [GroupForm, setGroupForm] = useState(true);
  const previousInputValues = useRef(allInputValues);
  let globalId = sessionStorage.getItem("Globalid");
  const [entityId, setEntityIds] = useState([]);
  const [tag, setTag] = useState([]);
  const [buttonDisabled, setButtonDisbled] = useState(false);
  const [formData, setFormData] = useState({
    column16: "",
    column1: 1,
  });

  const tabRef = useRef(null);

  const GetAddForm = () => {
    dispatch(GetAddEntityFields());
  };

  const { Entity } = useSelector((state) => state.GetAddEntityFields);

  const dropdownValues = Entity?.result;

  const Multioptions = dropdownValues?.map((item) => ({
    isSelected: false,
    label: item.displayName,
    value: item.id,
  }));

  // const Multioptions = [
  //   {
  //     isSelected: false,
  //     label: "test",
  //     value: "test",
  //   },
  //   {
  //     isSelected: false,
  //     label: "test1",
  //     value: "test1",
  //   },
  //   {
  //     isSelected: false,
  //     label: "test2",
  //     value: "test2",
  //   },
  //   {
  //     isSelected: false,
  //     label: "test3",
  //     value: "test3",
  //   },
  // ];
  // ! API Function
  // ? Get Form Details

  const dispatch = useDispatch();

  const handleShow = () => {
    setShow(true);
  };
  // Access the Redux state using useSelector
  // const arcFormState = useSelector((state) => state.addGroup);
  const arcFormStateStatus = useSelector((state) => state.addGroup.status);
  const userobj = useSelector(userobjInfo);

  console.log(userobj);

  // Extract the relevant data from the state
  // const { screenFields } = arcFormState;
  const screenFields = Offline_AddGroup;

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

  useEffect(() => {
    setButtonDisbled(false);
    setTag([]);
  }, []);

  const handleSaveButtonClick = async () => {
    const isValid = validateFields();
    console.log(tag);
    if (isValid) {
      console.log(entityId);
      // if (tag.length === 0) {
      //   console.log("error");
      //   ArcFaild({
      //     Message: "At least One Tag Required",
      //     position: "top-right",
      //   });
      // } else if (entityId.length === 0) {
      //   ArcFaild({
      //     Message: "At least One Entity Required",
      //     position: "top-right",
      //   });
      //  }
      //  else {
      console.log("Enter data:", inputValues);
      console.log("Post data:", PostLeadData);
      console.log("All Post data:", {
        taggroupdata: allInputValues,
        entitydata: entityId,
        tagdata: tag,
      });
      // setShow(false);
      setButtonDisbled(true);
      const dispatchedValue = await dispatch(
        CreateTagGroup({
          taggroupdata: allInputValues,
          entitydata: entityId,
          tagdata: tag,
        })
      );
      console.log(dispatchedValue);

      if (dispatchedValue?.payload === "Tag groupname Already Exists.") {
        // Keep the popover open
        // setShow(true);
        console.log("Tag groupname already exists.");
        setButtonDisbled(false);
        // Optionally show a notification here
      } else {
        // Close the popover for any other response
        setKey([0]);
        setButtonDisbled(false);
        setShow(false);
        setInputValues({});
        setAllInputValues([]);
        dispatch(setLoading(true));
        setShowErrors(false);
        setEntityIds([]);
        setTag([]);
        setFormData({
          column16: "",
        });
        setErrorCount(0);
       
      }
      console.log(dispatchedValue);
    }
    // }
    else {
      setShowErrors(true);
      setShow(true);
      setKey([0]);
    }
    previousInputValues.current = allInputValues;
  };

  const handleCancelButtonClick = () => {
    setKey([0]);
    setShow(false);
    setInputValues({});
    setAllInputValues([]);
    setShowErrors(false);
    setEntityIds([]);
    setTag([]);
    setFormData({
      column16: "",
    });
    setErrorCount(0);
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
    if (taskresponseresult) {
      if (taskresponseresult?.response === "Task Not Exists.") {
        console.log(TaskValidationResponseStatus);
        console.log(TaskValidationStatus);
        console.log({
          taggroupdata: allInputValues,
          entitydata: entityId,
          tagdata: tag,
        });
        // dispatch(AddTaskData([allInputValues]));
        dispatch(resetValidationStatus());
        setShow(false);
        setInputValues({});
        setAllInputValues([]);
        setShowErrors(false);
      } else if (taskresponseresult?.response === "Task Already Exists.") {
        console.log(TaskValidationResponseStatus?.result?.response);
        dispatch(resetValidationStatus());
        // dispatch(resetValidationStatus());
      }
    }
  }, [TaskValidationResponseStatus]);
  // ! Validation Status

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
            <FiPlus /> Add Tag Group
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
            ref={tabRef}
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
                      {/* <pre> */}
                      {/* {JSON.stringify(buttonDisabled, null, 2)} */}
                      {/* {JSON.stringify(tag, null, 2)} */}
                      {/* {JSON.stringify(allInputValues, null, 2)} */}
                      {/* {console.log(allInputValues)} */}
                      {/* </pre> */}
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
            <Tab eventKey={1} title={<>TAG</>}>
              <div className="add-contact-form add-lead-form">
                <HeaderContent
                  GroupForm={GroupForm}
                  setGroupForm={setGroupForm}
                  handleCancelButtonClick={handleCancelButtonClick}
                  setKey={setKey}
                  keyData={key}
                ></HeaderContent>
                <div className="main-content">
                  <div className="add-sub-task">
                    <CreateTagForm
                      subTasks={tag}
                      setSubTasks={setTag}
                      formData={formData}
                      setFormData={setFormData}
                      globalId={globalId}
                      SubTaskLists={""}
                      TransactionId={""}
                      isNew={true}
                    />
                  </div>
                </div>
                <FooterContent
                  handleCancelButtonClick={handleCancelButtonClick}
                  handleSaveButtonClick={handleSaveButtonClick}
                  buttonDisabled={buttonDisabled}
                  subTasks={tag}
                ></FooterContent>
              </div>
            </Tab>
            <Tab eventKey={2} title={<>ENTITY</>}>
              <div className="add-contact-form add-lead-form">
                <HeaderContent
                  GroupForm={GroupForm}
                  setGroupForm={setGroupForm}
                  handleCancelButtonClick={handleCancelButtonClick}
                  setKey={setKey}
                  keyData={key}
                ></HeaderContent>
                <div className="main-content">
                  <div className="add-sub-task">
                    {dropdownValues && Multioptions && (
                      <ArcCustomMultiSelect
                        PlaceHolder="Select Multiple Options"
                        Label="Add Entity"
                        options={Multioptions}
                        setEntityIds={setEntityIds}
                      />
                    )}
                    {/* {entityId.length == 0 && (
                      <span
                        className="error-message"
                        style={{ color: "red", fontSize: "13px" }}
                      >
                        Entity Field is Required{" "}
                      </span>
                    )} */}
                  </div>
                  {/* <pre>{JSON.stringify(entityId, null, 2)}</pre> */}
                </div>
                <FooterContent
                  handleCancelButtonClick={handleCancelButtonClick}
                  handleSaveButtonClick={handleSaveButtonClick}
                  buttonDisabled={buttonDisabled}
                  subTasks={tag}
                ></FooterContent>
              </div>
            </Tab>
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
