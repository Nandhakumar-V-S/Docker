/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect, useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
//? Assets
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
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import UpdateFollowupOffline_API from "./updatefollowup.json";
import DynamicInput from "@/components/arccomponents/DynamicInputs/DynamicInputs";
// import { masterDataInfo as masterDataInfoHome } from "@/redux/Home/selector";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateFollowupScreenFields } from "@/redux/Followup/UpdateStatus/UpdateFollowupFormFields";
import { UpdateStatusData } from "@/redux/Followup/UpdateStatus/UpdateStatus";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { masterDataInfofollowup  as masterDataInfoExecution} from "@/redux/Followup/selector";
import { masterDataInfo as masterDataInfoHome } from "@/redux/Home/selector";
// import { masterDataInfofollowup } from "@/redux/Followup/selector";
import { Link,useLocation } from "react-router-dom";
// *******~ Import ~******** //

function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
}) {
  return (
    <div className="header-content">
      <h3 title="Update Followup">Update Followup</h3>
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
      <button
        className="cancel"
        title="Cancel"
        onClick={handleCancelButtonClick}
      >
        Cancel
      </button>
      <button title="Update" onClick={handleSaveButtonClick}>
        Update
      </button>
    </div>
  );
}

export default function UpdateFollow({ show, setShow, SelectedRow }) {
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  const [allInputValues, setAllInputValues] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [key, setKey] = useState([0]);
  // const [show, setShow] = useState(false);
  const [GroupForm, setGroupForm] = useState(true);

  const masterDataexecPage = useSelector(masterDataInfoExecution);
  const masterDataHomePage = useSelector(masterDataInfoHome);
  const [masterDataTaskPage,setMasterDataTaskPage] = useState([])

  const location = useLocation()
  const currentLocation = location.pathname
  console.log(currentLocation)

  useEffect(()=>{
    console.log(location.pathname)
    if(currentLocation==="/home"){
      setMasterDataTaskPage(masterDataHomePage)
    }else if(currentLocation==="/followup"){
setMasterDataTaskPage(masterDataexecPage)
    }

  },[currentLocation,masterDataexecPage,masterDataHomePage])


  // const masterDataTaskPage = useSelector(masterDataInfoHome);
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
  useEffect(() => {
    dispatch(fetchUpdateFollowupScreenFields());
  }, [dispatch]);

  // Access the Redux state using useSelector
  const SessionDefaultInputs = useSelector(
    (state) => state.GetDefaultValuesFollowup.DefaultFormValues
  );
  const UpdateFollowupScreenFields = useSelector(
    (state) => state.UpdateFollowupState.screenFields
  );
  console.log(UpdateFollowupScreenFields);
  // ! Merge data
  const [updatedSession, setUpdatedSession] = useState(
    UpdateFollowupScreenFields
  );

  // useEffect(() => {
  //   const updateDefaultValues = () => {
  //     const updatedData = { ...UpdateFollowupScreenFields };

  //     SessionDefaultInputs?.result?.forEach((defaultValue) => {
  //       UpdateFollowupScreenFields?.result.groups.forEach((group) => {
  //         group.fields.forEach((field) => {
  //           if (field.id === defaultValue.id) {
  //             field.default_value = defaultValue.value;
  //           }
  //         });
  //       });
  //     });

  //     setUpdatedSession(updatedData);
  //   };

  //   updateDefaultValues();
  // }, [SessionDefaultInputs, show]);

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
  useEffect(() => {
    const updateDefaultValues = () => {
      // Create a deep copy of the existing data to avoid direct mutation
      const updatedData = JSON.parse(
        JSON.stringify(UpdateFollowupScreenFields)
      );

      // Sort the fields within each group based on seqno property
      console.log(updatedData);
      updatedData?.result?.groups?.forEach((group) => {
        if (group.fields) {
          group.fields.sort((a, b) => a.seqno - b.seqno);
        }
      });

      // Update the fields with the default values
      SessionDefaultInputs?.result?.forEach((defaultValue) => {
        updatedData?.result?.groups?.forEach((group) => {
          group.fields?.forEach((field) => {
            if (field.id.toLowerCase() === defaultValue.id.toLowerCase()) {
              field.default_value =
                defaultValue.columntype === "datetime"
                  ? formatDate(defaultValue.value)
                  : defaultValue.value;
            }
          });
        });
      });
      console.log(updatedData);
      // Set the updated data to state
      setUpdatedSession(updatedData);
    };

    updateDefaultValues();
  }, [SessionDefaultInputs, show, UpdateFollowupScreenFields]);

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
  const addStatus = useSelector((state) => state.UpdateStatusState.Addstatus);

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
  // const SetDefaultValues = () => {
  //   LeadFormAPI?.groups?.forEach((sectionlist) => {
  //     sectionlist?.fields?.forEach((FieldList) => {
  //       if (
  //         FieldList.controltype !== "label-title" &&
  //         FieldList.controltype !== "custom_label"
  //       ) {
  //          updateOrAddData(FieldList);
  //       }
  //     });
  //   });
  // };
  const SetDefaultValues = () => {
    LeadFormAPI?.groups.forEach((sectionlist) => {
      sectionlist.fields.forEach((FieldList) => {
        if (
          FieldList.default_value &&
          FieldList.default_value !== null &&
          FieldList.controltype !== "label-title" &&
          FieldList.controltype !== "custom_label"
        ) {
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
          // else if (["autocomplete"].includes(FieldList.controltype)) {
          //   const Options = {
          //     optionid: FieldList.default_value,
          //     optionvalue: FieldList.default_value_text,
          //   };
          //   setInputValues((prevValues) => ({
          //     ...prevValues,
          //     [FieldList.api_name + FieldList.id]:
          //       FieldList.default_value || null,
          //     [FieldList.api_name + FieldList.id + "_RefLabel"]:
          //       FieldList.default_value_text || null,
          //     [FieldList.api_name + FieldList.id + "_value"]: Options || null,
          //   }));
          // }
          else if (
            ["dropdown", "multiselect", "onclickloaddropdown"].includes(
              FieldList.controltype
            )
          ) {
            // if (FieldList.islookup) {
            //   const Options = {
            //     optionid: FieldList.default_value,
            //     optionvalue: FieldList.default_value_text,
            //   };
            //   setInputValues((prevValues) => ({
            //     ...prevValues,
            //     [FieldList.api_name + FieldList.id]:
            //       FieldList.default_value || null,
            //     [FieldList.api_name + FieldList.id + "_RefLabel"]:
            //       FieldList.default_value_text || null,
            //     [FieldList.api_name + FieldList.id + "_value"]: Options || null,
            //   }));
            // } else if (["LoggedInUser"].includes(FieldList.default_value)) {
            //   setInputValues((prevState) => ({
            //     ...prevState,
            //     [FieldList.api_name + FieldList.id]: userobj[0]?.optionid,
            //     [FieldList.api_name + FieldList.id + "_RefLabel"]:
            //       userobj[0]?.optionvalue,
            //   }));
            // } else
            // {
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
                FieldList.default_value === "0" ? "" : FieldList.default_value,
              [FieldList.api_name + FieldList.id + "_RefLabel"]:
                defaultValue?.label,
            }));
            // }
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
    SessionDefaultInputs,
    LeadFormAPI,
    show,
    updatedSession,
    UpdateFollowupScreenFields,
    masterDataTaskPage
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
      dispatch(
        UpdateStatusData({ data: allInputValues, transactionid: TransactionId })
      );

      console.log("Updated addStatus:", addStatus);
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
                      {/* <pre>{JSON.stringify(updatedSession, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(UpdateFollowupScreenFields, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(SessionDefaultInputs, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(inputValues, null, 2)}</pre>
                      <pre>{JSON.stringify(allInputValues, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(updatedSession, null, 2)}</pre> */}
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
