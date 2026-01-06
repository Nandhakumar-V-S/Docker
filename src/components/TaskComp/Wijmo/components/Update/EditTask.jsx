/* eslint-disable react-hooks/exhaustive-deps */
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
import { MdOutlineCancel } from "react-icons/md";
import { ImTree } from "react-icons/im";
import "react-datepicker/dist/react-datepicker.css";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { IoIosArrowDown } from "react-icons/io";
import AccordionContext from "react-bootstrap/AccordionContext";
import { BsInfoCircle } from "react-icons/bs";
import { userobjInfo } from "@/redux/Task/selector";

import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import EditTaskOffline_API from "./editTask.json";
import DynamicInput from "@/components/arccomponents/DynamicInputs/DynamicInputs";
import { useDispatch, useSelector } from "react-redux";
import { UpdateMasterTaskData } from "@/redux/Task/AddTask/UpdateMasterTask";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { masterDataInfo, subMasterDataInfo } from "@/redux/Execution/selector";
import { masterDataInfo as masterDataInfoTask } from "@/redux/Task/selector";
import { masterDataInfo as masterDataInfoPlan } from "@/redux/Plan/selector";
import { masterDataInfofollowup } from "@/redux/Followup/selector";
import { useLocation } from "react-router-dom";
import { resetstatus } from "@/redux/getlookupdetails/getUpdateLookupDetails";
import { SelectedRowContext } from "@/context/SelectedRow/SelectedRowContext";
import { ArcFaild } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

import {
  updatetaskvalidation,
  resetValidationStatus,
} from "@/redux/AddTask/updatetaskvalidation";
import { getMasterDataSuccess } from "@/redux/Task/actions";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { request } from "@/request/API/globalrequest";
// *******~ Import ~******** //

function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
}) {
  return (
    <div className="header-content">
      <h3>EDIT TASK</h3>
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

export default function EditTask({
  show,
  // setEditTaskShow,
  SelectedRow,
  UpdateselectedTagItem,
  setUpdateselectedTagItem,
  istagedited,
  setistagedited,
}) {
  // const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  const [inputValues, setInputValues] = useState({});
  const [allInputValues, setAllInputValues] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [key, setKey] = useState([0]);
  // const [show, setEditTaskShow] = useState(false);
  const [GroupForm, setGroupForm] = useState(true);
  // const [UpdateselectedTagItem, setUpdateselectedTagItem] = useState([]);
  const [UpdateTagItem, setUpdateTagItem] = useState([]);
  // const [istagedited, setistagedited] = useState(false);
  const handleShow = () => setEditTaskShow(true);
  console.log("selectedrow", SelectedRow);
  const { EditTaskShow, setEditTaskShow, selectedRow1 } =
    useContext(SelectedRowContext);
  const TaskupdateValidationResponseStatus = useSelector(
    (state) => state.updateTaskValidationState.response
  );
  const taskresponseresult = TaskupdateValidationResponseStatus?.result;
  const previousInputValues = useRef(allInputValues);

  // ! Update Tag Values
  useEffect(() => {
    const newTagItems = UpdateselectedTagItem.map((tag) => ({
      isnewtag: tag.isnewtag || false,
      tagid: tag.tagid || tag.optionid,
      tagname: tag.optionvalue,
    }));
    setUpdateTagItem(newTagItems);
  }, [UpdateselectedTagItem]);
  // ! Update Tag Values
  // ! API Function
  // ? Get Form Details
  const dispatch = useDispatch();
  const arcFormState = useSelector((state) => state.FormFields);
  // Extract the relevant data from the state
  const { screenFields } = arcFormState;
  console.log(screenFields);
  console.log(selectedRow1[0]?.optionid);
  console.log(SelectedRow?.id);

  let TransactionId =
    SelectedRow?.id || selectedRow1[0]?.optionid || selectedRow1?.optionid;
  const userobj = useSelector(userobjInfo);
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  console.log(userobj);
  //! Fetch Default values data when the component mounts

  // ! Changed Master Data

  const masterDataTaskPage = useSelector(masterDataInfoTask);
  console.log(masterDataTaskPage);

  async function getlookupdetails() {
    const postData = {
      entityId: "26B84156-CC30-416E-99D5-B37409B4D0BD",
    };
    const response = await request.post(
      API_TEST_URL,
      "arcconfiguration/getlookupdatabyid",
      postData
    );
    dispatch(getMasterDataSuccess(response));
  }

  useEffect(() => {
    if (EditTaskShow && masterDataTaskPage.length === 0) {
      getlookupdetails();
    }
  }, [EditTaskShow]);
  // ! Changed Master Data

  // Access the Redux state using useSelector
  const TaskDefaultInputs = useSelector(
    (state) => state.GetDefaultTaskInputState.DefaultFormValues
  );
  console.log(TaskDefaultInputs);
  const format_Time = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);
    return `${hours}h ${remainingMinutes}m`;
  };
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
  // ! Format Date
  // ! Merge data
  const [updatedSession, setUpdatedSession] = useState();
  const [updatedscreenFields, setUpdatedscreenFields] = useState({});
  useEffect(() => {
    setUpdatedscreenFields(screenFields);
  }, [screenFields]);

  console.log(updatedscreenFields);
  console.log(TaskDefaultInputs);

  useEffect(() => {
    const updateDefaultValues = () => {
      console.log("test log");
      // Create a deep copy of the screenFields data
      const updatedData = JSON.parse(JSON.stringify(updatedscreenFields));

      TaskDefaultInputs?.result?.forEach((defaultValue) => {
        updatedData?.result?.groups?.forEach((group) => {
          group.fields?.forEach((field) => {
            if (field.id.toLowerCase() === defaultValue.id.toLowerCase()) {
              if (
                ["onclickloaddropdown"].includes(field.controltype) &&
                field.islookup
              ) {
                (field.default_value =
                  defaultValue.value === "0" ? null : defaultValue.value),
                  (field.default_value_text = defaultValue.displayname);
              } else if (["autocomplete"].includes(field.controltype)) {
                (field.default_value = defaultValue.value),
                  (field.default_value_text = defaultValue.value);
                field.controltype = "textbox";
              } else if (field.controltype === "groupdropdown") {
                (field.default_value = defaultValue.value),
                  (field.controltype = "arctaglistedit");
              } else {
                field.default_value =
                  defaultValue.columntype === "datetime"
                    ? (defaultValue.value && formatDate(defaultValue.value)) ||
                      format(new Date(), "MM/dd/yyyy")
                    : defaultValue.value;
              }
            }
          });
        });
      });

      setUpdatedSession(updatedData);
    };

    updateDefaultValues();
  }, [TaskDefaultInputs, EditTaskShow, updatedscreenFields]);
  // ! Merge data
  console.log(updatedSession);
  const LeadFormAPI = updatedSession?.result; // Local Json
  // !POST Form Details
  // const [inputValues, setInputValues] = useState({});
  const PostLeadData = Object.fromEntries(
    Object.entries(inputValues).filter(([key]) => !key.endsWith("_RefLabel"))
  );
  const UpdateMasterTaskState = useSelector(
    (state) => state.UpdateMasterTaskState.Status
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
    return {
      id: FieldList.id,
      tablename: FieldList.table_name,
      apiname: FieldList.api_name,
      value:
        FieldList.default_value === null || FieldList.default_value.length === 0
          ? FieldList.attributedatatype === "Uniqueidentifier"
            ? null
            : FieldList.attributedatatype === "text"
              ? ""
              : FieldList.attributedatatype === "numeric"
                ? "0"
                : FieldList.default_value
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
  // ! Data Binding End
  const SetDefaultValues = () => {
    LeadFormAPI?.groups.forEach((sectionlist) => {
      sectionlist.fields.forEach((FieldList) => {
        if (
          FieldList.default_value &&
          FieldList.default_value !== null &&
          FieldList.controltype !== "label-title" &&
          FieldList.controltype !== "custom_label"
        ) {
          // updateOrAddData(FieldList);
          if (
            FieldList.default_value === "Today" &&
            FieldList.controltype === "date"
          ) {
            setInputValues((prevState) => ({
              ...prevState,
              [FieldList.api_name + FieldList.id]: new Date(),
            }));
          } else if (["autocomplete"].includes(FieldList.controltype)) {
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
              [FieldList.api_name + FieldList.id + "_value"]: Options || null,
            }));
          } else if (
            ["dropdown", "multiselect", "onclickloaddropdown"].includes(
              FieldList.controltype
            )
          ) {
            if (FieldList.islookup) {
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
                [FieldList.api_name + FieldList.id + "_value"]: Options || null,
              }));
            } else if (["LoggedInUser"].includes(FieldList.default_value)) {
              setInputValues((prevState) => ({
                ...prevState,
                [FieldList.api_name + FieldList.id]: userobj[0]?.optionid,
                [FieldList.api_name + FieldList.id + "_RefLabel"]:
                  userobj[0]?.optionvalue,
              }));
            } else {
              const matchedData = masterDataTaskPage?.find(
                (item) => item.masterid === FieldList.masterid
              );

              // Get the master values array or an empty array if no match found
              const masterValues = matchedData ? matchedData.mastervalues : [];
              const Singleoptions = masterValues.map((item) => ({
                value: item.optionid,
                label: item.optionvalue,
              }));
              // Find the matched default value in Singleoptions
              const defaultValue = Singleoptions.find(
                (item) => item.value === FieldList.default_value
              );
              setInputValues((prevState) => ({
                ...prevState,
                [FieldList.api_name + FieldList.id]:
                  FieldList.default_value === "0"
                    ? ""
                    : FieldList.default_value,
                [FieldList.api_name + FieldList.id + "_RefLabel"]:
                  defaultValue?.label,
              }));
            }
          } else if (["date"].includes(FieldList.controltype)) {
            setInputValues((prevState) => ({
              ...prevState,
              [FieldList.api_name + FieldList.id]:
                (FieldList.default_value &&
                  new Date(FieldList.default_value)) ||
                new Date(),
            }));
          } else if (["Textbox_time"].includes(FieldList.controltype)) {
            setInputValues((prevState) => ({
              ...prevState,
              [FieldList.api_name + FieldList.id]:
                //format_Time(FieldList.default_value)
                (FieldList.default_value / 60).toFixed(2) + "h",
            }));
          } else {
            setInputValues((prevState) => ({
              ...prevState,
              [FieldList.api_name + FieldList.id]:
                FieldList.default_value || "",
            }));
          }
        }
      });
    });
  };

  useEffect(() => {
    // Trigger the function when the component mounts
    SetDefaultValues();
  }, [
    TaskDefaultInputs,
    LeadFormAPI,
    EditTaskShow,
    updatedSession,
    masterDataTaskPage,
  ]);
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

      // dispatch(AddTaskDataValidation(allInputValues));
      if (!isEqual(allInputValues, previousInputValues.current)) {
        // Dispatch action only if allInputValues has changed
        dispatch(updatetaskvalidation(allInputValues));
        // setEditTaskShow(false);
      } else {
        setEditTaskShow(true);
        ArcFaild({
          Title: "Warning",
          Message: "Please Change Any fields to Update",
          position: "top-right",
        });
      }

      // console.log("Updated Master Task Status:", UpdateMasterTaskState);
      // setInputValues({});
      // setAllInputValues([]);
      // setShowErrors(false);

      // setUpdatedSession(EditTaskOffline_API);
      // setUpdateselectedTagItem([]);
      // setUpdateTagItem([]);
    } else {
      setShowErrors(true);
      setEditTaskShow(true);
      // Filter out null values from validationErrors
    }
  };
  useEffect(() => {
    if (taskresponseresult) {
      if (taskresponseresult?.response === "Task Not Exists.") {
        console.log(TaskupdateValidationResponseStatus);
        console.log(allInputValues);
        if (allInputValues.length > 0) {
          const requestData = {
            entityid: "26B84156-CC30-416E-99D5-B37409B4D0BD",
            transactionid: TransactionId,
            userid: loggedUserId,
            data: allInputValues,
            tag: UpdateTagItem,
            istagedited: istagedited,
          };
          dispatch(UpdateMasterTaskData(requestData));
          setInputValues({});
          setAllInputValues([]);
          setShowErrors(false);
          setEditTaskShow(false);
          setUpdatedSession(EditTaskOffline_API);
          setUpdateselectedTagItem([]);
          setUpdateTagItem([]);
        }
      } else if (taskresponseresult?.response === "Task Already Exists.") {
        // ArcFaild({
        //   Title: "Failed",
        //   Message: taskresponseresult?.response,
        //   position: "top-right",
        // });
        console.log(TaskupdateValidationResponseStatus?.result?.response);
        dispatch(resetValidationStatus());
        setShowErrors(true);
        setEditTaskShow(true);
      }
    }
  }, [TaskupdateValidationResponseStatus]);

  const handleCancelButtonClick = () => {
    setShowErrors(false);
    setEditTaskShow(false);
    setInputValues({});
    setErrorCount(0);
    setAllInputValues([]);
    setUpdatedSession();
    setUpdateTagItem([]);
    setUpdateselectedTagItem([]);
    dispatch(resetstatus());
  };
  console.log(UpdateselectedTagItem);

  return (
    <>
      <Offcanvas
        show={EditTaskShow}
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
                                          UpdateselectedTagItem={
                                            UpdateselectedTagItem
                                          }
                                          setUpdateselectedTagItem={
                                            setUpdateselectedTagItem
                                          }
                                          TransactionId={TransactionId}
                                          setistagedited={setistagedited}
                                          taskInfoPage={true}
                                          masterDataforPopup={
                                            masterDataTaskPage
                                          }
                                        />
                                      </React.Fragment>
                                    )
                                  )}
                              </>
                            </Accordion.Collapse>
                          </Form.Group>
                        </Accordion>
                      </Form>
                      {/* {istagedited ? "true" : "false"} */}
                      {/* <pre>{JSON.stringify(PostLeadData, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(updatedSession, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(SessionDefaultInputs, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(inputValues, null, 2)}</pre>
                      <pre>{JSON.stringify(allInputValues, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(SelectedRow, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(SelectedRow, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(TaskDefaultInputs, null, 2)}</pre> */}
                      {/* <pre>
                        {JSON.stringify(UpdateselectedTagItem, null, 2)}
                      </pre> */}
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

const isEqual = (a, b) => {
  // Implement your deep comparison logic here
  return JSON.stringify(a) === JSON.stringify(b);
};
