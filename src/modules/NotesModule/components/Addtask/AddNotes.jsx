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
import { AddNotesData } from "./AddNotes";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { loginUserIDobjInfo, userobjInfo } from "@/redux/Notes/selector";
import { loggedinuserinfo } from "@/redux/Notes/selector";
import ArcFilterPopup from "@/components/arccomponents/ui-components/ArcTaskAutocompletesearch/ArcFilterPopup";
import { SelectedRowContext } from "@/context/SelectedRow/SelectedRowContext";
import { useLocation, useNavigate } from "react-router-dom";

import AddNotes from "../Addtask/AddNotes.json";
// *******~ Import ~******** //

function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
}) {
  var openautosearch = function () {
    setArcFilterPopupshow(true);
  };
  return (
    <div className="header-content">
      {/* <button onclick={openautosearch}>AutocompleteSearch</button> */}

      <h3>Add Notes</h3>
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

export default function LeadForm({ setArcFilterPopupshow, show, setShow }) {
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  // const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  const [inputValues, setInputValues] = useState({});
  const [allInputValues, setAllInputValues] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [key, setKey] = useState([0]);
  // const [show, setShow] = useState(false);
  const [GroupForm, setGroupForm] = useState(true);
  const previousInputValues = useRef(allInputValues);
  const [selectedTagItem, setSelectedTagItem] = useState([]);
  const [selectedTitleItem, setSelectedTitleItem] = useState([]);

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
  // useEffect(() => {
  //   if (allInputValues) {
  //     const filteredobj = allInputValues.filter(
  //       (x) => x.apiname === "column16"
  //     );

  //     // const obj = [
  //     //   {
  //     //     filterid: filteredobj.id,
  //     //     apiname: filteredobj.apiname,
  //     //     filtervalue: filteredobj.value,
  //     //     controltype: "textbox",
  //     //     condition: "OR",
  //     //   },
  //     // ];
  //     setTitleFieldValue(
  //       [
  //         {
  //           filterid:  filteredobj.id,
  //           apiname: filteredobj.apiname,
  //           filtervalue: filteredobj.value,
  //           controltype: "textbox",
  //           condition: "OR",
  //         },
  //       ] || {}
  //     );
  //   }
  // }, [allInputValues]);
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
  // ! Update Tag Values
  // ! API Function
  // ? Get Form Details
  const dispatch = useDispatch();
  // const GetAddForm = () => {
  //   dispatch(fetchAddMasterTaskFormFields());
  // };
  // Access the Redux state using useSelector
  const arcFormState = useSelector((state) => state.addMasterTask);

  // const screenFieldsState = useSelector(
  //   (state) => state.addMasterTask.screenFields
  // );

  // console.log(screenFieldsState, "screenFieldsState");

  const arcFormStateStatus = useSelector((state) => state.addMasterTask.status);
  const userobj = useSelector(userobjInfo);
  const loginUserIDobj = useSelector(loginUserIDobjInfo);

  console.log(userobj, "loginUserIDobj", loginUserIDobj);

  // Extract the relevant data from the state
  const { screenFields } = arcFormState;

  const LeadFormAPI = AddNotes?.result;
  // const LeadFormAPI = updatedScreenFieldsResult;
  console.log(LeadFormAPI);

  // updatedLeadFormAPI now contains the updated or unchanged LeadFormAPI

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
  // ! Data Binding
  const createCommonObject = (FieldList) => ({
    id: FieldList.id,
    tablename: FieldList.table_name,
    apiname: FieldList.api_name,
    value:
      ["Today"].includes(FieldList.default_value) &&
      ["date", "datepicker"].includes(FieldList.controltype)
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
  // const SetDefaultValues = () => {
  //   LeadFormAPI?.groups?.forEach((sectionlist) => {
  //     sectionlist.fields.forEach((FieldList) => {
  //       if (FieldList.default_value && FieldList.default_value !== null) {
  //         console.log(FieldList);
  //         updateOrAddData(FieldList);
  //         if (
  //           FieldList.default_value === "Today" &&
  //           ["date", "datepicker"].includes(FieldList.controltype)
  //         ) {
  //           setInputValues((prevState) => ({
  //             ...prevState,
  //             [FieldList.api_name + FieldList.id]: new Date(),
  //           }));
  //         }
  //         if (
  //           ["dropdown"].includes(FieldList.controltype) &&
  //           FieldList.islookup
  //         ) {
  //           const RequestData = {
  //             selectedValue:
  //               FieldList.default_value === "LoggedInUser"
  //                 ? loggedUserId
  //                 : FieldList.default_value,
  //             lookupId: FieldList.masterid,
  //             limit: "50",
  //             page: "1",
  //             q: "",
  //             isDefaultValueNeeded: true,
  //           };
  //           dispatch(updateLookupDetail(RequestData));
  //         }
  //       }
  //     });
  //   });
  // };
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
              console.log(FieldList.default_value);

              if (["LoggedInUser"].includes(FieldList.default_value)) {
                if (loginUserIDobj.length > 0) {
                  const UserOptions = {
                    optionid: Globalid,
                    optionvalue: fullName,
                  };
                  console.log(userobj, "SetDefaultValues", loginUserIDobj);
                  setInputValues((prevState) => ({
                    ...prevState,
                    [FieldList.api_name + FieldList.id]: Globalid,
                    [FieldList.api_name + FieldList.id + "_RefLabel"]: fullName,
                    [FieldList.api_name + FieldList.id + "_value"]:
                      UserOptions || null,
                  }));
                } else if (loginUserIDobj.length == 0) {
                  const UserOptions = {
                    optionid: userobj[0]?.optionid,
                    optionvalue: userobj[0]?.optionvalue,
                  };
                  console.log(userobj, "SetDefaultValues", loginUserIDobj);
                  setInputValues((prevState) => ({
                    ...prevState,
                    [FieldList.api_name + FieldList.id]: userobj[0]?.optionid,
                    [FieldList.api_name + FieldList.id + "_RefLabel"]:
                      userobj[0]?.optionvalue,
                    [FieldList.api_name + FieldList.id + "_value"]:
                      UserOptions || null,
                  }));
                }

                // const UserOptions = {
                //   optionid: loginUserIDobj[0]?.optionid,
                //   optionvalue: loginUserIDobj[0]?.optionvalue,
                // };
                // console.log(userobj,"SetDefaultValues",loginUserIDobj);
                // setInputValues((prevState) => ({
                //   ...prevState,
                //   [FieldList.api_name + FieldList.id]: loginUserIDobj[0]?.optionid,
                //   [FieldList.api_name + FieldList.id + "_RefLabel"]:
                //   loginUserIDobj[0]?.optionvalue,
                //   [FieldList.api_name + FieldList.id + "_value"]:
                //     UserOptions || null,
                // }));
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

  const handleSaveButtonClick = async () => {
    const isValid = validateFields();

    if (isValid) {
      // Perform save logic here
      console.log("Enter data:", inputValues);
      console.log("Post data:", PostLeadData);
      console.log("All Post data:", allInputValues);

      // Disable the button before starting the service call
      setButtonDisabled(true);

      try {
        // Replace this comment with your service call, e.g.:
        // await yourServiceCall(allInputValues);

        console.log("allInputValues");

        dispatch(AddNotesData(allInputValues)); // Assuming this is async

        console.log("Updated addStatus:", addStatus);
      } catch (error) {
        console.error("Service call failed:", error);
        // Handle the error as necessary
        setShowErrors(true);
        setShow(true);
      } finally {
        // Re-enable the button after the service call completes or fails
        setButtonDisabled(false);
      }

      // Update previousInputValues after the service call
      previousInputValues.current = allInputValues;
    } else {
      setShowErrors(true);
      setShow(true);
      setButtonDisabled(false);
      // Filter out null values from validationErrors if necessary
    }
  };

  // const handleSaveButtonClick = () => {
  //   const isValid = validateFields();

  //   if (isValid) {
  //     // Perform save logic here

  //     console.log("Enter data:", inputValues);
  //     console.log("Post data:", PostLeadData);
  //     console.log("All Post data:", allInputValues);
  //     setButtonDisabled(true);

  //     // dispatch(AddTaskDataValidation(allInputValues));
  //     if (!isEqual(allInputValues, previousInputValues.current)) {
  //       // Dispatch action only if allInputValues has changed
  //       dispatch(AddTaskDataValidation(allInputValues));
  //     } else {
  //       console.log("allInputValues has not changed, skipping dispatch.");
  //     }
  //     console.log("Updated addStatus:", addStatus);
  //   } else {
  //     setShowErrors(true);
  //     setShow(true);
  //     setButtonDisabled(false);
  //     // Filter out null values from validationErrors
  //   }
  //   previousInputValues.current = allInputValues;
  // };
  const handleCancelButtonClick = () => {
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
      >
        {ScreenWidth > BreakpointSm ? (
          <>
            <FiPlus /> Add Notes
          </>
        ) : (
          <>
            <IoMdPersonAdd />
          </>
        )}
      </button>

      <Offcanvas
        show={addTaskShow}
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
                                        Page={"AddTask"}
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
                      <pre>{JSON.stringify(allInputValues, null, 2)}</pre>
                      {/* <pre>{JSON.stringify(inputValues, null, 2)}</pre>
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
