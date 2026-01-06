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
import { ArcFaild } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";
import { IoMdPersonAdd } from "react-icons/io";

import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import ArcRadioBtn from "@/components/arccomponents/ui-components/ArcRadioBtn/ArcRadioBtn";
// import AddTaskLocal_API from "./AddTask_API.json";
import DynamicInput from "@/components/arccomponents/DynamicInputs/EntityDynamicInputs";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddAttributeFormFields } from "@/redux/Entity360/AddAttribute360/AddAttributeFormFields";

import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { userobjInfo } from "@/redux/AdminSetting/selector";
import {
  createAttriute,
  createattributevalidation,
}  from "@/redux/Entity360/AddAttribute360/AddAttributeData"
// *******~ Import ~******** //

function HeaderContent({
    GroupForm,
    setGroupForm,
    setKey,
    handleCancelButtonClick,
  }) {
    return (
      <div className="header-content">
        <h3>Add Attribute</h3>
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
        <button onClick={handleSaveButtonClick}>Add</button>
      </div>
    );
  }
  
  export default function AttributeForm() {
    const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
    const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
    const [validationErrors, setValidationErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [key, setKey] = useState("all");
    const [show, setShow] = useState(false);
    const [GroupForm, setGroupForm] = useState(true);
    const handleShow = () => setShow(true);
    const [AttributeForm, setAttributeForm] = useState();
    const TransactionID = sessionStorage.getItem("Current_EntityID");
     const [allInputValues, setAllInputValues] = useState([]);
     const[visible, setVisible]=useState();
     const [formattedData, setFormattedData] = useState({});
     const [selectedValue, setSelectedValue] = useState('');
    // ! API Function
    // ? Get Form Details
    const dispatch = useDispatch();
  
    // Fetch data when the component mounts
   
   const GetAddForm = () => {
    dispatch(fetchAddAttributeFormFields());
  };
  
    // Access the Redux state using useSelector
    const arcAttributeFormState = useSelector(
      (state) => state.addAttribute.screenFields
    );
    console.log(arcAttributeFormState);
    // Extract the relevant data from the state
   // const { AttributeScreenFields } = arcAttributeFormState.screenFields;
  
    // console.log(screenFields); // Access the fetched data here
    const AttributeFormAPI = arcAttributeFormState?.result?.groups; 
    // From API
    console.log(AttributeFormAPI);
    useEffect(() => {
      if (AttributeFormAPI?.length > 0) {
        setAttributeForm(AttributeFormAPI);
      }
    }, [AttributeFormAPI]);
    console.log(AttributeFormAPI);
    console.log(AttributeForm);
    // !POST Form Details
  
    // const [inputValues, setInputValues] = useState({});
    console.log(inputValues);
    let PostLeadData = Object.fromEntries(
      Object.entries(inputValues).filter(([key]) => !key.endsWith("_RefLabel"))
    );
    // Push SelectedentityId into PostLeadData
    // PostLeadData.entityid = TransactionID;
    const addStatus = useSelector((state) => state.addAttribute.status);
  const createCommonObject = (FieldList) => ({
      id: FieldList.id,
      tablename: FieldList.table_name,
      apiname: FieldList.api_name,
      value:
        ["Today"].includes(FieldList.default_value) &&
        ["date"].includes(FieldList.controltype)
          ? format(new Date(), "MM/dd/yyyy")
          : ["LoggedInUser"].includes(FieldList.default_value) &&
              [
                "53737e0b-4eb2-4943-bedd-8bd635ff2a59",
                "43c1a77f-2599-41e3-9541-ea1bdc71f59d",
              ].includes(FieldList.id)
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
  
  
  
  
  
    const AttributeaddStatus = useSelector(
      (state) => state.entityArcAddAttribute.Addstatus
    );
  
    const attriValidation = useSelector(
      (state) => state.entityArcAddAttribute.validation
    );
    console.log(attriValidation);
  
    const validateFields = () => {
      let errors = {};
      AttributeForm?.forEach((sectionlist) => {
        sectionlist.fields?.forEach((FieldList) => {
          if (FieldList.required && !formattedData[FieldList.api_name ]) {
            errors[FieldList.api_name ] = `${FieldList.label_text} is required`;
          }
        });
      });
      console.log(errors);
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
  
    // const handleSaveButtonClick = () => {
    //   const isValid = validateFields();
    //   console.log(isValid);
    //   if (isValid) {
    //     // Perform save logic here
    //     console.log("Enter data:", inputValues);
    //     console.log("Post data:", PostLeadData);
    //     // dispatch(createLead(inputValues));
  
    //     dispatch(createattributevalidation(PostLeadData));
    //     //  dispatch(createAttriute(PostLeadData));
    //     console.log("Updated addStatus:", addStatus);
    //     console.log("Updated addStatus:", AttributeaddStatus);
    //     setInputValues({});
    //     setShowErrors(false);
    //     setShow(false);
    //   } else {
    //     setShowErrors(true);
    //     setShow(true);
    //     // Filter out null values from validationErrors
    //   }
    // };
  
    const handleSaveButtonClick = () => {
      const isValid = validateFields();
      console.log(isValid);
      if (isValid) {
        console.log("Enter data:", inputValues);
        console.log("Post data:", PostLeadData);
        dispatch(createattributevalidation(formattedData));
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
        dispatch(createAttriute(formattedData));
        canceleventupdate();
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
     
  
      canceleventupdate();
  
    };
  
   
    console.log("Updated addStatus:", AttributeaddStatus);
  
    
    useEffect(() => {
      console.log("it runs")
     
        if (
          inputValues["attributedatatype3c5e49e2-8d4c-4cdb-8ded-4537177baaa0_RefLabel"] === "numeric" 
        ||
         inputValues["attributedatatype_RefLabel"]  === "multiselect"
  
         ||
         inputValues["attributedatatype3c5e49e2-8d4c-4cdb-8ded-4537177baaa0_RefLabel"]  === "Uniqueidentifier"
        ) {
          console.log("it runs")
          const updatedAttributeForm = AttributeForm.map((section, index) => {
            if (index === 0) {
              // Only update the fields array in the first object
              const updatedFields = section.fields.map((field) => {
                // Case 1: If controltype_RefLabel is "dropdown" or "multiselect"
                if (
                  
                  field.id === "3c5e49e2-8d4c-4cdb-8ded-4537177baaa0" ||
                  field.id === "c7b1ae1d-1623-4a2d-be74-bea8e98493a4" ||
                  field.id === "e23b968d-59b0-4f6b-b18a-ba7df7f600ee" 
                ) {
                  console.log("it runs")
                  return { ...field, visible: true };
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
        else if (inputValues?.['controltype5a410bc7-cb5b-4fce-a046-35c10ff2991e_RefLabel'] === "textbox") {
          const updatedAttributeForm = AttributeForm.map((section, index) => {
            if (index === 0) {
              // Only update the fields array in the first object
              const updatedFields = section.fields.map((field) => {
                // Case 2: If controltype_RefLabel is "textbox"
                if (
              
                  field.id === "e23b968d-59b0-4f6b-b18a-ba7df7f600ee" ||
                  field.id === "c7b1ae1d-1623-4a2d-be74-bea8e98493a4" ||
                  field.id === "c4c3c504-ed12-43a1-b1c7-de606953b349" ||
                  field.id === "552390e0-60c5-4aef-ab08-2fcbb6fe87dd"
                ) 
                
                {
                  return { ...field, visible: false };
                  // setVisible(false);
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
        else if (
          
  
          inputValues["attributedatatype3c5e49e2-8d4c-4cdb-8ded-4537177baaa0_RefLabel"] !== "numeric" 
              
           &&
           inputValues["attributedatatype3c5e49e2-8d4c-4cdb-8ded-4537177baaa0_RefLabel"]  !== "Uniqueidentifier"
  
        ) {
  
          const updatedAttributeForm = AttributeForm?.map((section, index) => {
            {
              // Only update the fields array in the first object
              const updatedFields = section.fields.map((field) => {
                // Case 2: If controltype_RefLabel is "textbox"
                if (
                  field.id ==="c4c3c504-ed12-43a1-b1c7-de606953b349"||
                  field.id ==="552390e0-60c5-4aef-ab08-2fcbb6fe87dd"||
                  field.id === "c7b1ae1d-1623-4a2d-be74-bea8e98493a4" ||
                  field.id === "e23b968d-59b0-4f6b-b18a-ba7df7f600ee"
                ) {
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
      //}
    }, [inputValues]);
  
    const handleRadioBtnClick = (id,value) => {
      console.log(id);
      setSelectedValue(value);
      const updatedAttributeForm = AttributeForm.map((section, index) => {
        if (index === 0) {
          // Only update the fields array in the first object
          const updatedFields = section.fields.map((field) => {
            if (id === "c7b1ae1d-1623-4a2d-be74-bea8e98493a4") {
              // Case 1: If the clicked radio button is 'isoption'
              if (field.id === "c4c3c504-ed12-43a1-b1c7-de606953b349") {
                // Find the Option Set field and set visible to true
                return { ...field, visible: true };
              } else if (field.id === "552390e0-60c5-4aef-ab08-2fcbb6fe87dd") {
                // Find the Lookup field and set visible to false
                return { ...field, visible: false };
              }
            } else if (id === "e23b968d-59b0-4f6b-b18a-ba7df7f600ee") {
              // Case 2: If the clicked radio button is 'isLookup'
              if (field.id === "552390e0-60c5-4aef-ab08-2fcbb6fe87dd") {
                // Find the Lookup field and set visible to true
                return { ...field, visible: true };
              } else if (field.id === "c4c3c504-ed12-43a1-b1c7-de606953b349") {
                // Find the Option Set field and set visible to false
                return { ...field, visible: false };
              }
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
    useEffect(() => {
      const formatted = allInputValues.reduce((acc, item) => {
        acc[item.apiname] = item.value;
        return acc;
      }, {});
      setFormattedData(formatted);
    }, [allInputValues]);
    return (
      <>
        <button className="add-contact-btn"  onClick={() => {
          GetAddForm();
          handleShow();
        }}>
          {ScreenWidth > BreakpointSm ? (
            <>
              <FiPlus /> Add Attribute
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
                        AttributeFormAPI={AttributeForm}
                        handleRadioBtnClick={handleRadioBtnClick}
                 allInputValues={allInputValues}
                        setAllInputValues={setAllInputValues}
                        selectedValue={selectedValue} 
                      />
                    </Form>
                    {/* <pre>{JSON.stringify(AttributeForm, null, 2)}</pre> */}
                    {/* <pre>{JSON.stringify(PostLeadData, null, 2)}</pre>
                    <pre>{JSON.stringify(inputValues, null, 2)}</pre>
                  <pre>{JSON.stringify(AttributeFormAPI, null, 2)}</pre> */}
                  </div>
                  <FooterContent
                    handleCancelButtonClick={handleCancelButtonClick}
                    handleSaveButtonClick={handleSaveButtonClick}
                  ></FooterContent>
                </div>
              </Tab>
              {AttributeForm?.slice()
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
                                  {sectionlist.fields ?.slice()
                                  .sort((a, b) => a.seqno - b.seqno).map((FieldList, index) => (  
                                    
                                      <React.Fragment key={index}>
                                        {[
                                          "c7b1ae1d-1623-4a2d-be74-bea8e98493a4",
                                          "e23b968d-59b0-4f6b-b18a-ba7df7f600ee",
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
                                             onChange={(event) => handleRadioBtnClick(FieldList.id,event.target.value )}
                                              // onChange={(id,value) =>
                                              //   handleRadioBtnClick(FieldList.id,FieldList.label_text)
                                                
                                              // }
                                              Name={FieldList.radiogrpname}
                                              Label={FieldList.label_text}
                                              Required={FieldList.required}
                                              ClassName=""
                                              selectedValue={selectedValue}                                              
                                            />
                                            {/* <p>template</p> */}
                                          </>
                                        ) : (
                                          <>
                                             {/* <pre>{JSON.stringify(FieldList, null, 2)}</pre>    */}
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
                                          </>
                                        )}
                                      </React.Fragment>
                                    ))}
                                </>
                              </Accordion.Collapse>
                            </Form.Group>
                          </Accordion>
                        </Form>
                         {/* <pre>{JSON.stringify(inputValues, null, 2)}</pre> */}
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
  
  const  AllDetail = ({
    inputValues,
    setInputValues,
    validationErrors,
    setValidationErrors,
    showErrors,
    setShowErrors,
    AttributeFormAPI,
    handleRadioBtnClick,
    allInputValues,
    setAllInputValues,
    selectedValue
  }) => {
    return (
      <>
        {AttributeFormAPI?.map((sectionlist, index) => (
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
                      {sectionlist.fields ?.slice()
                                  .sort((a, b) => a.seqno - b.seqno)
                                  .map((FieldList, index) => (
                          <React.Fragment key={index}>
                            {[
                              "c7b1ae1d-1623-4a2d-be74-bea8e98493a4",
                              "e23b968d-59b0-4f6b-b18a-ba7df7f600ee",
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
                                  onChange={(id) =>
                                    handleRadioBtnClick(FieldList.id,FieldList.label_text)
                                  }
                                  Name={FieldList.radiogrpname}
                                  Label={FieldList.label_text}
                                  Required={FieldList.required}
                                  ClassName=""
                                  selectedValue={selectedValue} 
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
  