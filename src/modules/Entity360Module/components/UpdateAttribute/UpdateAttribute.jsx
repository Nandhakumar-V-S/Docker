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
import DynamicInput from "@/components/arccomponents/DynamicInputs/EntityDynamicInputs";
import { ArcFaild } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateattributesScreenFields } from "@/redux/Entity360/UpdateAttribute360/UpdateEntityAttributesFields";
import{GetDefaultFormValues} from "@/redux/Entity360/UpdateAttribute360/GetDefaultValues";
import {subMasterDataInfo } from "@/redux/Execution/selector";
import { UpdateEntityAttributesData,Updateattributevalidation } from "@/redux/Entity360/UpdateAttribute360/UpdateEntityAttributesStatus";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import LeadForm from "@/components/arccomponents/DynamicInputs/AddTask/addtask";
import ArcRadioBtn from "@/components/arccomponents/ui-components/ArcRadioBtn/ArcRadioBtn";
// *******~ Import ~******** //

function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
}) {
  return (
    <div className="header-content">
      <h3>Update Attributes</h3>
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

export default function UpdateAttributes({ show, setShow, SelectedRow }) {
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  const [allInputValues, setAllInputValues] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [key, setKey] = useState([0]);
  //const [show, setShow] = useState(false);
  const [GroupForm, setGroupForm] = useState(true);
  const submasterData = useSelector(subMasterDataInfo);
  const[defaultstatus,setadddefaultstatus]=useState();
  const handleShow = () => setShow(true);
  
  console.log("selectedrow", SelectedRow);
  // ! API Function
  // ? Get Form Details
  const dispatch = useDispatch();
  let TransactionId = SelectedRow?.id;

  //! Fetch Default values data when the component mounts
  useEffect(() => {
    if(TransactionId != ''){
      dispatch(GetDefaultFormValues(TransactionId)).then((response)=>{console.log(response)})
    }
    
   }, [SelectedRow]);
  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchUpdateattributesScreenFields());
  }, [dispatch]);

  var adddefaultstatus = useSelector(
    (state) => state.GetDefaultValuesattributes.status
    );
  // Access the Redux state using useSelector
  // useEffect(() => {
   
  // }, [adddefaultstatus]);

  let attributesDefaultInputs = useSelector(
    (state) => state.GetDefaultValuesattributes.DefaultFormValues
  );

  

  //setadddefaultstatus(adddefaultstatus);
  console.log(adddefaultstatus);
  console.log(attributesDefaultInputs);
  const UpdateatrributeScreenFields = useSelector(
    (state) => state.UpdateAttributeState.screenFields
  );
  const attriValidation = useSelector(
    (state) => state.UpdateEntityAttributesStatus.validation
  );
console.log(attriValidation);

  // ! Merge data
  const [updatedSession, setUpdatedSession] = useState([]);
 

useEffect(() => {
  if(adddefaultstatus=='successful'){
 if(attributesDefaultInputs.result?.length > 0 ){
    const updateDefaultValues = () => {
      // Create a deep copy of the existing data to avoid direct mutation
      const updatedData = JSON.parse(JSON.stringify(UpdateatrributeScreenFields));
  
      // Sort the fields within each group based on seqno property
      console.log(updatedData);
      updatedData?.result?.groups?.forEach(group => {
        if (group.fields) {
          group.fields.sort((a, b) => a.seqno - b.seqno);
        }
      });
  
      // Update the fields with the default values
      attributesDefaultInputs?.result?.forEach((defaultValue) => {
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

 
}, [attributesDefaultInputs]);




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
  
  const LeadFormAPI = UpdateatrributeScreenFields?.result; // From API
  
  const PostLeadData = Object.fromEntries(
    Object.entries(inputValues).filter(([key]) => !key.endsWith("_RefLabel"))
  );


  const validateFields = () => {
    let errors = {};
    updatedSession?.result?.groups?.forEach((sectionlist) => {
      sectionlist?.fields?.forEach((FieldList) => {
        if (
          FieldList.required &&
          !inputValues[FieldList.api_name + FieldList.id] && FieldList.api_name !="attributedatatype" && FieldList.api_name !="controltype"
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
    console.log(FieldList);
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
console.log(existingIndex);
    if (existingIndex !== -1) {
      // If ID exists, update the data
      setAllInputValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[existingIndex] = createCommonObject(FieldList);
        console.log(updatedValues);
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
    updatedSession?.groups?.forEach((sectionlist) => {
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
              const matchedData = submasterData?.find(
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
          } 
          else if (["Textbox_time"].includes(FieldList.controltype)) {
            setInputValues((prevState) => ({
              ...prevState,
              [FieldList.api_name + FieldList.id]:
                FieldList.default_value / 60 + "h",
            }));
          } 
          else if (["checkbox"].includes(FieldList.controltype)) {
            setInputValues((prevState) => ({
              ...prevState,
              [FieldList.api_name + FieldList.id]:
              FieldList.default_value === "True"? true : false ,
            }));
          } 
          else {
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
  }, [attributesDefaultInputs, LeadFormAPI, show, updatedSession]);
  // // ! Set default values end
 
  const handleSaveButtonClick = () => {
    const isValid = validateFields();
    if (isValid) {
      console.log("Enter data:", inputValues);
      console.log("Post data:", PostLeadData);
      dispatch(Updateattributevalidation({ data: allInputValues, transactionid: TransactionId }));
    } else {
      setShowErrors(true);
      setShow(true);
    }
   
  };


  useEffect(() => {
    console.log(attriValidation);
    if (attriValidation?.result?.response.length > 0) {
      attriValidation.result.response.forEach((item) => {
        ArcFaild({
          Title: "Validation",
          Message: item.validationsmsg,
          position: "top-center",
        });
      });

      setShowErrors(true);
      setShow(true);
    } else if (attriValidation?.result?.response.length === 0) {
      console.log("it runs");
      dispatch(UpdateEntityAttributesData({ data: allInputValues, transactionid: TransactionId }));
     // canceleventupdate();
      setInputValues({});
      setShowErrors(false);
      setShow(false);
    }
  }, [attriValidation]);
 
  const handleCancelButtonClick = () => {
    setShowErrors(false);
    setShow(false);
    setInputValues({});
    setErrorCount(0);
    setAllInputValues([]);
    adddefaultstatus="failed";
    setUpdatedSession([]);
  };
  const canceleventupdate=()=>{
      console.log("it runs")    
          const updatedAttributeForm = AttributeForm.map((section, index) => {
            if (index === 0) {
              // Only update the fields array in the first object
              const updatedFields = section.fields.map((field) => {
                // Case 1: If controltype_RefLabel is "dropdown" or "multiselect"
                if (
                  field.id === "552390e0-60c5-4aef-ab08-2fcbb6fe87dd" ||
                  field.id === "c4c3c504-ed12-43a1-b1c7-de606953b349" ||
                  field.id === "c7b1ae1d-1623-4a2d-be74-bea8e98493a4" ||
                  field.id === "e23b968d-59b0-4f6b-b18a-ba7df7f600ee" 
                ) {
                  console.log("it runs")
                  return { ...field, visible: false };
                }
                return field;
              });
              return { ...section, fields: updatedFields };
            }
            return section;
          });
          console.log(updatedAttributeForm);
          // Update the state with the modified AttributeForm
          setAttributeForm(updatedAttributeForm);
       
    }
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
                        LeadFormAPI={updatedSession?.result}
                        // handleRadioBtnClick={handleRadioBtnClick}
                 allInputValues={allInputValues}
                        setAllInputValues={setAllInputValues}
                      />
                    </Form>
                    
                  </div>
                  <FooterContent
                    handleCancelButtonClick={handleCancelButtonClick}
                    handleSaveButtonClick={handleSaveButtonClick}
                  ></FooterContent>
                </div>
              </Tab> */}
            
            {updatedSession?.result?.groups
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
                      {/* <pre>{JSON.stringify(inputValues, null, 2)}</pre>
                      <pre>{JSON.stringify(updatedSession, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(UpdateatrributeScreenFields, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(attributesDefaultInputs, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(attributesDefaultInputs, null, 2)}</pre> */}
                     {/* <pre>{JSON.stringify(allInputValues, null, 2)}</pre>  */}
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
                  {sectionlist.fields.map((FieldList, index) => (
                          <React.Fragment key={index}>
                            {[
                              "5e1f197e-24bc-4f3c-a548-3ee66dc9d52e",
                              "4ee37d99-96fc-4c0b-8fcb-f8ed68f9d833",
                            ].includes(FieldList.id) && FieldList.visible? (
                              <>
                                {console.log(FieldList)}
                                <ArcRadioBtn
                                  RadioBtnData={[
                                    {
                                      Title: FieldList.label_text,
                                      Value: FieldList.label_text,
                                    },
                                  ]}
                                  // onChange={handleToggleChange}
                                  // onChange={(id) =>
                                  // //  handleRadioBtnClick(FieldList.id)
                                  // }
                                  Name={FieldList.radiogrpname}
                                  Label={FieldList.label_text}
                                  Required={FieldList.required}
                                  ClassName=""
                                />
                                {/* <p>template</p> */}
                              </>
                            ) : (
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
                            )}
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
