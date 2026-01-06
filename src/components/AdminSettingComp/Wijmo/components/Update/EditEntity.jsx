/* eslint-disable react-hooks/exhaustive-deps */
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
import { MdOutlineCancel } from "react-icons/md";
import { ImTree } from "react-icons/im";
import "react-datepicker/dist/react-datepicker.css";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { IoIosArrowDown } from "react-icons/io";
import AccordionContext from "react-bootstrap/AccordionContext";
import { BsInfoCircle } from "react-icons/bs";
import { userobjInfo } from "@/redux/AdminSetting/selector";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import EditTaskOffline_API from "./editTask.json";
import DynamicInput from "@/components/arccomponents/DynamicInputs/EntityDynamicInputs";
import { useDispatch, useSelector } from "react-redux";
import { UpdateEntityData } from "@/redux/AdminSetting/AddEntity/updateEntityData";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { masterDataInfo, subMasterDataInfo } from "@/redux/Execution/selector";
import { masterDataInfo as masterDataInfoTask } from "@/redux/AdminSetting/selector";
import { masterDataInfo as masterDataInfoPlan } from "@/redux/Plan/selector";
import { masterDataInfofollowup } from "@/redux/Followup/selector";
import{GetDefaultEntityInputs} from "@/redux/AdminSetting/AddEntity/GetDefaultEntityInputs"
import { useLocation } from "react-router-dom";
import { fetchAddAttributeFormFields } from "@/redux/Entity360/AddAttribute360/AddAttributeFormFields";

// *******~ Import ~******** //

function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
}) {
  return (
    <div className="header-content">
      <h3>EDIT ENTITY</h3>
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

export default function EditTask({ show, setShow, SelectedRow }) {
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  // const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  const [inputValues, setInputValues] = useState({});
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
  //const userobj = useSelector(userobjInfo);
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  console.log(masterDataInfoTask);
  //! Fetch Default values data when the component mounts

  // ! Changed Master Data

   const masterDataTaskPage = useSelector(masterDataInfoTask);

  // ! Changed Master Data
  useEffect(() => {
    if(TransactionId != ''){
      dispatch(GetDefaultEntityInputs(TransactionId));
    }
    
  }, [SelectedRow]);
 
  const GetAddForm = () => {
    dispatch(fetchAddAttributeFormFields());
  };
  
  // Access the Redux state using useSelector
  
  const EntityDefaultInputs = useSelector(
    (state) => state.GetDefaultEntityInputState.DefaultFormValues
  );
  var entitydefaultstatus = useSelector(
    (state) => state.GetDefaultEntityInputState.status
    );
    const UpdateentityScreenFields =EditTaskOffline_API;
    const [updatedSession, setUpdatedSession] = useState(UpdateentityScreenFields);
 
    useEffect(() => {
      if(entitydefaultstatus=='successful'){
     if(EntityDefaultInputs.result?.length > 0 ){
        const updateDefaultValues = () => {
          // Create a deep copy of the existing data to avoid direct mutation
          const updatedData = JSON.parse(JSON.stringify(UpdateentityScreenFields));
      
          // Sort the fields within each group based on seqno property
          console.log(updatedData);
          updatedData?.result?.groups?.forEach(group => {
            if (group.fields) {
              group.fields.sort((a, b) => a.seqno - b.seqno);
            }
          });
      
          // Update the fields with the default values
          EntityDefaultInputs?.result?.forEach((defaultValue) => {
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
      }
      }
    
     
    }, [EntityDefaultInputs, show]);
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
  //const [updatedSession, setUpdatedSession] = useState();


  // ! Merge data

  const LeadFormAPI = updatedSession; // Local Json
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
    LeadFormAPI?.result.groups.forEach((sectionlist) => {
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
    LeadFormAPI?.result?.groups.forEach((sectionlist) => {
      sectionlist.fields.forEach((FieldList) => {
        if (
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
          } else if (
            ["dropdown", "multiselect"].includes(FieldList.controltype)
          ) {
            if (["LoggedInUser"].includes(FieldList.default_value)) {
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
                FieldList.default_value / 60 + "h",
            }));
          } else {
            setInputValues((prevState) => ({
              ...prevState,
              [FieldList.api_name + FieldList.id]: FieldList.default_value,
            }));
          }
        }
      });
    });
  };

  useEffect(() => {
    // Trigger the function when the component mounts
    SetDefaultValues();
  }, [EntityDefaultInputs, LeadFormAPI, show, updatedSession]);
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
        UpdateEntityData({
          data: allInputValues,
          transactionid: TransactionId,
        })
      );

      console.log("Updated Master Task Status:", UpdateMasterTaskState);
      setInputValues({});
      setAllInputValues([]);
      setShowErrors(false);
      setShow(false);
      setUpdatedSession(EditTaskOffline_API);
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
    setUpdatedSession();
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleCancelButtonClick}
        placement="end"
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
            {LeadFormAPI?.result?.groups
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
                      {/* <pre>{JSON.stringify(inputValues, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(allInputValues, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(SelectedRow, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(SelectedRow, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(TaskDefaultInputs, null, 2)}</pre> */}
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

