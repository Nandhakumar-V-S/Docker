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
import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate,
} from "@grapecity/wijmo.react.grid";
import { CollectionView } from "@grapecity/wijmo";
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
import { fetchAddMasterTaskFormFields } from "@/redux/Task/AddTask/addMasterTask";
import { AddTaskData } from "@/redux/AddTask/addTaskData";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { userobjInfo } from "@/redux/Task/selector";

import Bulkupdatenotes from "./Bulkupdatenotes.json";
import { useNavigate } from "react-router-dom";

// *******~ Import ~******** //
import { SelectedRowContext } from "@/context/SelectedRow/SelectedRowContext";

import { BulkUpdatenoteStatusdata } from "./BulkUpdatenoteStatusdata";
import { Bulknotesprojectstatusupdate } from "./Bulknotesprojectstatusupdate";
import {
  ArcError,
  ArcFaild,
} from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";
import { Modal, Button } from "react-bootstrap";
import { GetTaskListForNotes } from "./GetTaskListForNotes";
import { set_cptable } from "xlsx";
function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
}) {
  return (
    <div className="header-content">
      <h3 title="Bulk Update">Bulk Update</h3>
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
        style={{ cursor: "pointer" }}
        title="Cancel"
      >
        Cancel
      </button>
      <button
        onClick={handleSaveButtonClick}
        disabled={buttonDisabled}
        style={{ width: "auto", cursor: "pointer" }}
        title="Process"
      >
        Process
      </button>
    </div>
  );
}

export default function BulkUpdate({ show, setShow }) {
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  //const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  // const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  const [inputValues, setInputValues] = useState({});
  const [allInputValues, setAllInputValues] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const { bulkupdatevalues, setBulkupdatevalues } =
    useContext(SelectedRowContext);
  const { selectedcheckboxValues, setcheckboxRowValues } =
    useContext(SelectedRowContext);
  console.log(selectedcheckboxValues, "1234");
  const [showErrors, setShowErrors] = useState(false);
  const [key, setKey] = useState([0]);
  console.log(bulkupdatevalues, "setSelectedRow");

  const [duplicateTasks, setDuplicateTasks] = useState([]);
  const [newTasks, setNewTasks] = useState([]);
  const [currentnewTasks, setCurrentNewTasks] = useState([]);
  //   const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [GroupForm, setGroupForm] = useState(true);
  const previousInputValues = useRef(allInputValues);
  const [selectedTagItem, setSelectedTagItem] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [UpdateTagItem, setUpdateTagItem] = useState([]);
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  const handleShow = () => {
    setShow(true);
    setKey("all");
  };

  // ! Update Tag Values
  useEffect(() => {
    const newTagItems = selectedTagItem.map((tag) => ({
      isnewtag: tag.isnewtag,
      tagid: tag.tagid,
      tagname: tag.optionvalue,
    }));
    setUpdateTagItem(newTagItems);
  }, [selectedTagItem]);
  // ! Update Tag Values
  // ! API Function
  // ? Get Form Details
  const dispatch = useDispatch();
  const GetAddForm = () => {
    // dispatch(fetchAddMasterTaskFormFields());
  };
  // Access the Redux state using useSelector
  const arcFormState = useSelector((state) => state.addMasterTask);
  const arcFormStateStatus = useSelector((state) => state.addMasterTask.status);
  const userobj = useSelector(userobjInfo);
  const [AttributeForm, setAttributeForm] = useState([]);
  const { setSelectedcheckboxValues, setSelectedcheckboxId } =
    useContext(SelectedRowContext);

  console.log(userobj);

  // Extract the relevant data from the state
  // const { screenFields } = arcFormState;
  const screenFields = Bulkupdatenotes;

  const LeadFormAPI = screenFields?.result;
  // const LeadFormAPI = updatedScreenFieldsResult;
  console.log(LeadFormAPI);

  const GetTaskListForNoteslists = useSelector(
    (state) => state.GetTaskListForNotesState.GetTaskListForNoteslist
  );
  const BulkInsertstatus = useSelector(
    (state) => state.BulkUpdatenoteProjectStatussState.Status
  );

  let ExistTasklists = [];
  if (GetTaskListForNoteslists && GetTaskListForNoteslists.length > 0) {
    console.log(GetTaskListForNoteslists);
    const ExistTasklist = JSON.parse(GetTaskListForNoteslists);
    console.log(ExistTasklist);
    ExistTasklists = ExistTasklist?.result?.data;
    console.log(ExistTasklists);
  }
  useEffect(() => {
    dispatch(GetTaskListForNotes());
  }, []);

  console.log(BulkInsertstatus);

  useEffect(() => {
    if (BulkInsertstatus == "successful") {
      dispatch(GetTaskListForNotes());
    }
  }, [BulkInsertstatus]);

  useEffect(() => {
    // console.log(LeadFormAPI);
    if (Object.keys(LeadFormAPI).length != 0) {
      setAttributeForm(LeadFormAPI);
    }
  }, [LeadFormAPI, show]);

  console.log(AttributeForm);

  const PostLeadData = Object.fromEntries(
    Object.entries(inputValues).filter(([key]) => !key.endsWith("_RefLabel"))
  );
  const addStatus = useSelector((state) => state.addTaskState.Addstatus);

  const validateFields = () => {
    let errors = {};
    LeadFormAPI?.groups.forEach((sectionlist) => {
      sectionlist.fields.forEach((FieldList) => {
        // if (
        //   inputValues["column4dfce3481-8212-4fd6-9824-54f2db90f961_RefLabel"] ==
        //     "Processed to project" &&
        //   !inputValues["column42dfce3481-8212-4fd6-9824-54f2db90f964"]
        // ) {
        //   FieldList + "." + "dfce3481-8212-4fd6-9824-54f2db90f964"
        //     ? (FieldList.required = true)
        //     : "";

        //   errors["column42dfce3481-8212-4fd6-9824-54f2db90f964"] =
        //     `Project is required`;
        // } else
        //{
        if (
          FieldList.required &&
          !inputValues[FieldList.api_name + FieldList.id]
        ) {
          errors[FieldList.api_name + FieldList.id] =
            `${FieldList.label_text} is required`;
        }
        //}
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
          //updateOrAddData(FieldList);
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
      setButtonDisabled(false);

      if (
        inputValues["column4dfce3481-8212-4fd6-9824-54f2db90f961_RefLabel"] ==
        "Processed to project"
      ) {
        if (inputValues["column42dfce3481-8212-4fd6-9824-54f2db90f964"]) {
          bulkUpdateTasks();
          console.log("Updated addStatus:", addStatus);
        } else {
          ArcError({
            Message: "Select Project",
            position: "top-right",
          });
          setShowErrors(true);
          setShow(true);
          setButtonDisabled(false);
        }
      }

      // {
      //   dispatch(
      //     Bulknotesprojectstatusupdate({ allInputValues, bulkupdatevalues })
      //   );
      // }
      else {
        dispatch(
          BulkUpdatenoteStatusdata({ allInputValues, bulkupdatevalues })
        );

        setShowErrors(false);
        setShow(false);
        setButtonDisabled(false);
        setdropdownVisible(false);
        setInputValues({});
        setErrorCount(0);
        setAllInputValues([]);
        setSelectedTagItem([]);
        console.log("Updated addStatus:", addStatus);
      }
    } else {
      setShowErrors(true);
      setShow(true);
      setButtonDisabled(false);
      setdropdownVisible(false);
      setInputValues({});
      setErrorCount(0);
      setAllInputValues([]);
      setSelectedTagItem([]);
      // Filter out null values from validationErrors
    }
    previousInputValues.current = allInputValues;
  };
  const handleCancelButtonClick = () => {
    setBulkupdatevalues([]);
    setSelectedcheckboxValues([]);
    setSelectedcheckboxId([]);
    setNewTasks([]);
    setDuplicateTasks([]);
    setcheckboxRowValues([]);
    setdropdownVisible(false);
    setCurrentNewTasks([]);
    setShowErrors(false);
    setButtonDisabled(false);
    setShow(false);
    setInputValues({});
    setErrorCount(0);
    setAllInputValues([]);
    setSelectedTagItem([]);
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
  const { setdropdownVisible } = useContext(SelectedRowContext);

  useEffect(() => {
    console.log("it runs");

    if (
      inputValues["column5dfce3481-8212-4fd6-9824-54f2db90f961_RefLabel"] ===
      "Processed to project"
    ) {
      console.log("it runs");
      const updatedAttributeForm = LeadFormAPI?.groups?.map(
        (section, index) => {
          if (index === 0) {
            // Only update the fields array in the first object
            const updatedFields = section.fields.map((field) => {
              // Case 1: If controltype_RefLabel is "dropdown" or "multiselect"
              if (field.name === "Project") {
                console.log("it runs");
                setdropdownVisible(true);
                // return { ...field, isVisible: true };
              }
              return field;
            });
            return { ...section, fields: updatedFields };
          }
          return section;
        }
      );
      console.log(updatedAttributeForm);
      // Update the state with the modified AttributeForm
      setAttributeForm(updatedAttributeForm);
    }

    // else if (

    //   inputValues["attributedatatype3c5e49e2-8d4c-4cdb-8ded-4537177baaa0_RefLabel"] !== "numeric"

    //    &&
    //    inputValues["attributedatatype3c5e49e2-8d4c-4cdb-8ded-4537177baaa0_RefLabel"]  !== "Uniqueidentifier"

    // ) {

    //   const updatedAttributeForm = AttributeForm?.groups?.map((section, index) => {
    //     {
    //       // Only update the fields array in the first object
    //       const updatedFields = section.fields.map((field) => {
    //         // Case 2: If controltype_RefLabel is "textbox"
    //         if (
    //           field.id ==="c4c3c504-ed12-43a1-b1c7-de606953b349"||
    //           field.id ==="552390e0-60c5-4aef-ab08-2fcbb6fe87dd"||
    //           field.id === "c7b1ae1d-1623-4a2d-be74-bea8e98493a4" ||
    //           field.id === "e23b968d-59b0-4f6b-b18a-ba7df7f600ee"
    //         ) {
    //           return { ...field, visible: false };
    //         }
    //         return field;
    //       });
    //       return { ...section, fields: updatedFields };
    //     }
    //     return section;
    //   });
    //   console.log(updatedAttributeForm);
    //   // Update the state with the modified AttributeForm
    //   setAttributeForm(updatedAttributeForm);
    // }
    //}
  }, [inputValues, AttributeForm]);

  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const bulkUpdateTasks = () => {
    console.log(selectedcheckboxValues);
    console.log(duplicateTasks);
    console.log(newTasks);
    let duplicates = [];
    let newTasksList = [];
    let currentlist = [];
    selectedcheckboxValues?.forEach((task) => {
      const taskName = task.item.utbl_notes_column16;
      let taskExists = false;

      ExistTasklists.forEach((item) => {
        if (
          item.utbl_notes_column16.toLowerCase() === taskName.toLowerCase() &&
          item.utbl_notes_column42.toLowerCase() ==
            allInputValues[1].value.toLowerCase()
        ) {
          taskExists = true;
          console.log(`Updating existing task: ${taskName}`);
          // Code to update the task
        }
      });

      if (!taskExists) {
        // If no existing task was found, prepare new tasks for confirmation
        newTasksList.push(task);
      } else {
        duplicates.push(task);
      }
    });

    // const frequencyMap = selectedcheckboxValues?.reduce((acc, item) => {
    //   const key = item.item.utbl_notes_column16;
    //   acc[key] = (acc[key] || 0) + 1;
    //   return acc;
    // }, {});

    // Filter to get only the items with duplicate utbl_notes_column16
    // const newList = selectedcheckboxValues?.filter(
    //   (item) => frequencyMap[item.item.utbl_notes_column16] > 1
    // );
    // const existingTaskNames = new Set(
    //   newList?.map((task) => task.item.utbl_notes_column16.toLowerCase())
    // );

    // // Iterate through each task in the selectedcheckboxValues
    // selectedcheckboxValues?.forEach((task) => {
    //   const taskName = task.item.utbl_notes_column16.toLowerCase();

    //   // Check if the current task already exists in the set
    //   if (existingTaskNames.has(taskName)) {
    //     console.log(`Updating existing task: ${taskName}`);

    //     currentlist.push(task);
    //   } else {
    //   }
    // });

    if (duplicates.length > 0) {
      setDuplicateTasks(duplicates);
      setShowModal(true);
    }
    if (newTasksList.length > 0) {
      setNewTasks(newTasksList);
      setShowModal(true);
    }

    if (currentlist.length > 0) {
      setCurrentNewTasks(currentlist);
      setShowModal(true);
    }
    console.log(newTasks);
    console.log(duplicates);
    console.log(currentlist);

    const handleConfirmNewTasks = () => {
      newTasks.forEach((task) => {
        console.log(`Creating new task: ${task.name}`);

        existingTasks.push(task.name);
      });
      setShowConfirmation(false);
    };
  };
  return (
    <>
      <ModalPopup
        showModal={showModal}
        setShowModal={setShowModal}
        duplicateTasks={duplicateTasks}
        newTasks={newTasks}
        currentnewTasks={currentnewTasks}
        allInputValues={allInputValues}
        formClose={handleCancelButtonClick}
        setNewTasks={setNewTasks}
        setDuplicateTasks={setDuplicateTasks}
      />
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
                                      />
                                    </React.Fragment>
                                  ))}
                              </>
                            </Accordion.Collapse>
                          </Form.Group>
                        </Accordion>
                      </Form>
                      {/* <pre>{JSON.stringify(UpdateTagItem, null, 2)}</pre> */}
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

export const ModalPopup = ({
  showModal,
  setShowModal,
  duplicateTasks,
  newTasks,
  currentnewTasks,
  allInputValues,
  formClose,
  setDuplicateTasks,
  setNewTasks,
}) => {
  const handleArcPopupClose = () => {
    setShowModal(false);
    setNewTasks([]);
    setDuplicateTasks([]);
    setBulkupdatevalues([]);
    setSelectedcheckboxValues([]);
    setSelectedcheckboxId([]);
    newTasks([]);
  };

  console.log(newTasks);
  const dispatch = useDispatch();
  const HandleProceed = () => {
    let newArray = [];
    newTasks.forEach((item) => {
      newArray.push(item.id);
    });
    console.log(allInputValues);
    console.log(newArray);
    if (newArray.length > 0) {
      dispatch(Bulknotesprojectstatusupdate({ allInputValues, newArray }));
      formClose();
      dispatch(GetTaskListForNotes());
      setShowModal(false);
      setBulkupdatevalues([]);
      setSelectedcheckboxValues([]);
      setSelectedcheckboxId([]);
    } else {
      ArcFaild({
        Message: "No New Notes Found",
        position: "top-center",
      });
    }
  };
  console.log(newTasks);
  console.log(duplicateTasks);

  const totalTasks = newTasks?.length + duplicateTasks?.length;

  const staticValue = "Notessssssssssssssssssssssssssssssssss.";
  const distinctTasks = Array.from(
    new Set(currentnewTasks.map((task) => task.item.utbl_notes_column16))
  );

  let newArray = [];

  newTasks?.forEach((item) => {
    let obj = {};
    obj.Name = item.item.utbl_notes_column16;
    obj.Description = "Successful";
    newArray.push(obj);
  });
  duplicateTasks?.forEach((item) => {
    let obj = {};
    obj.Name = item.item.utbl_notes_column16;
    obj.Description = "Already Exist";
    newArray.push(obj);
  });
  console.log(newArray);

  var lstheader = [];
  lstheader = ["Name", lstheader];
  return (
    <div>
      <Modal
        show={showModal}
        onHide={handleArcPopupClose}
        className={`arc-popup-default delete-dataset`}
        centered={false}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="popup-body-content">
            <div className="popup-header">
              <h3 title="Bulk Update">Bulk Update</h3>
              {/* <span className="close-btn" onClick={handleArcPopupClose}>
                <MdOutlineCancel />
              </span> */}
              <ArcToolTip
                HoverText="Close"
                BtnName={<MdOutlineCancel />}
                Placement="left"
                onClick={handleArcPopupClose}
                as="span"
                className="close-btn"
              />
            </div>
            <div className="popup-main">
              {console.log(newTasks)}
              {console.log(duplicateTasks)}
              {console.log(currentnewTasks)}

              <div className="bulkupdate-notes">
                <div className="datas">
                  <p> Total Process Tasks count </p>
                  <span> : {totalTasks}</span>
                </div>
                <div className="datas">
                  <p> Process for new Task count </p>
                  <span>: {newTasks?.length}</span>
                </div>
                {/* <div className="datas">
                  {console.log(currentnewTasks)}
                  {distinctTasks.map((taskName, index) => (
                    <span key={index}>
                      {taskName} - both notes have the same name and project.
                    </span>
                  ))}
                </div> */}

                <div className="datas">
                  <p> Task Name already existing count</p>
                  <span> : {duplicateTasks?.length}</span>
                </div>
              </div>

              <div>
                <FlexGrid
                  itemsSource={newArray || []}
                  className="list-data-table popup-style"
                  headersVisibility="Column"
                  allowResizing={false}
                  allowDragging={false}
                >
                  {newArray.map((column, index) => {
                    const binding =
                      column.Name?.toLowerCase() ||
                      column.Description?.toLowerCase();
                    return (
                      <>
                        <FlexGridColumn
                          key={`${column.id || column.Name}-name-${index}`}
                          binding={binding}
                          header="Name"
                          width={400}
                          minWidth={400}
                          visible={true}
                          title={binding}
                        >
                          <FlexGridCellTemplate
                            cellType="Cell"
                            template={(ctx) => (
                              <p
                                title={ctx.item[binding]}
                                // style={{ cursor: "auto" }}
                              >
                                {ctx.item[binding]?.length > 5
                                  ? ctx.item[binding] &&
                                    ctx.item[binding].slice(0, 2) + " ..."
                                  : ctx.item[binding] &&
                                    ctx.item[binding].slice(0, 2)}{" "}
                              </p>
                            )}
                          />
                        </FlexGridColumn>
                        <FlexGridColumn
                          key={`${
                            column.id || column.Description
                          }-description-${index}`}
                          binding={binding}
                          header="Description"
                          width={400}
                          minWidth={400}
                          visible={true}
                          title={binding}
                        >
                          <FlexGridCellTemplate
                            cellType="Cell"
                            template={(ctx) => (
                              <p
                                title={ctx.item[binding]}
                                // style={{ cursor: "auto" }}
                              >
                                {ctx.item[binding]?.length > 5
                                  ? ctx.item[binding] &&
                                    ctx.item[binding].slice(0, 2) + " ..."
                                  : ctx.item[binding] &&
                                    ctx.item[binding].slice(0, 2)}{" "}
                              </p>
                            )}
                          />
                        </FlexGridColumn>
                      </>
                    );
                  })}
                </FlexGrid>
              </div>
              {/* {data.datasetid} */}
              {/* <p>
                Are you sure you want to delete this dataset{" "}
                <strong>{data.title}</strong>.
              </p> */}
            </div>
            <div className="popup-footer">
              <button
                className="cancel"
                onClick={handleArcPopupClose}
                title="Cancel"
              >
                Cancel
              </button>
              {/* <button onClick={(e) => HandleProceed()}>Proceed</button> */}
              {newTasks.length > 0 ? (
                <button onClick={(e) => HandleProceed()} title="Proceed">
                  Proceed
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* <Button onClick={bulkUpdateTasks}>Update Tasks</Button> */}

      {/* <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm New Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The following new task names will be created:
          <ul>
            {newTasks.map((task, index) => (
              <li key={index}>{task.name}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmNewTasks}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};
