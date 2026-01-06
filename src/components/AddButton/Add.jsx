import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

//~
import Offcanvas from "react-bootstrap/Offcanvas";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import AccordionContext from "react-bootstrap/AccordionContext";

//~ icons
import { MdOutlineCancel } from "react-icons/md";
import { ImTree } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";

//~ components
import DynamicInput from "@/components/arccomponents/DynamicInputs/DynamicInputs";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";

//~ states
import { userobjInfo } from "@/redux/Task/selector";
import {
  resetFormFields,
  GetFormFields,
} from "@/redux/GetFormFields/GetFormFields";
import { DefaultInsertUpdate } from "@/redux/DefaultInsertUpdate/DefaultInsertUpdate";
import { useLocation, useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
// import { DefaultInsertUpdate } from "@/redux/360Details/360Details_CRM/Notes/DefaultInsertUpdate";

//~  JSON
// import LOCAL_FORM from "./AddLocal.json";

function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
  headerName,
}) {
  return (
    <div className="header-content">
      <h3>{headerName}</h3>
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

function Add({ popupDatas }) {
  //destructure datas
  const {
    formId,
    endpoint,
    btnName,
    headerName,
    show,
    setShow,
    entityId,
    instanceId,
    isFormattedValue,
    istag,
    masterData,
    pageDetails,
  } = popupDatas;
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  //   const [show, setShow] = useState(false);
  const [key, setKey] = useState([0]);
  const [GroupForm, setGroupForm] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [allInputValues, setAllInputValues] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [ErrorCount, setErrorCount] = useState(0);
  const previousInputValues = useRef(allInputValues);
  const [selectedTagItem, setSelectedTagItem] = useState([]);
  const [UpdateTagItem, setUpdateTagItem] = useState([]);
  const [formattedData, setFormattedData] = useState({});
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  const selectEntityDetails = (state) => state.searchEntity.entityDetails;
  const entityDetails = useSelector(selectEntityDetails);
  const userobj = useSelector(userobjInfo);

  const { state } = useLocation();

  console.log(pageDetails);
  console.log(state);
  let showAddTask = state?.showAddTask || false;
  let renderCount = state?.renderCount || 0;

  useEffect(() => {
    if (showAddTask && renderCount === 1) {
      setShow(showAddTask);
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

  const handleOpen = () => {
    setShow(true);
    GetAddForm();
  };

  const dispatch = useDispatch();

  // useEffect(() => {
  //   SetDefaultValues();
  // }, [pageDetails?.name]);

  const GetAddForm = async () => {
    await dispatch(resetFormFields());
    formId && (await dispatch(GetFormFields(formId)));
  };
  const arcFormState = useSelector((state) => state.FormFields);
  const arcFormStateStatus = useSelector((state) => state.FormFields.status);
  console.log(userobj);

  // Extract the relevant data from the state
  const { screenFields } = arcFormState;
  //   const screenFields = LOCAL_FORM

  const LeadFormAPI = screenFields?.result;
  // const LeadFormAPI = updatedScreenFieldsResult;
  console.log(LeadFormAPI);

  // updatedLeadFormAPI now contains the updated or unchanged LeadFormAPI

  const PostLeadData = Object.fromEntries(
    Object.entries(inputValues).filter(([key]) => !key.endsWith("_RefLabel"))
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
          ? userobj[0]?.optionid
          : FieldList.api_name === "column41"
            ? pageDetails.instanceId
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
          console.log(FieldList);
        }
        if (FieldList.default_value == "" && FieldList.api_name == "column41") {
          updateOrAddData(FieldList);
          console.log(pageDetails);
          setInputValues((prevState) => ({
            ...prevState,
            [FieldList.api_name + FieldList.id]: pageDetails?.instanceId,
            [FieldList.api_name + FieldList.id + "_RefLabel"]:
              pageDetails?.name,
          }));
        }
      });
    });
  };

  useEffect(() => {
    // Trigger the function when the component mounts
    if (LeadFormAPI) {
      SetDefaultValues();
    }
  }, [LeadFormAPI, show, arcFormStateStatus, entityDetails]);

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
    const formatted = allInputValues.reduce((acc, item) => {
      acc[item.apiname] = item.value;
      return acc;
    }, {});
    setFormattedData(formatted);
  }, [allInputValues]);

  const handleCancelButtonClick = () => {
    setShowErrors(false);
    setButtonDisabled(false);
    setShow(false);
    setInputValues({});
    setErrorCount(0);
    setAllInputValues([]);
    setSelectedTagItem([]);
  };

  const handleSaveButtonClick = () => {
    const isValid = validateFields();

    if (isValid) {
      let RequestData;
      RequestData = {
        endPoint: endpoint,
        postData: {
          entityId: entityId,
          ...(instanceId && { instanceId: instanceId }),
          data: isFormattedValue ? formattedData : allInputValues,
          ...(istag && { tag: UpdateTagItem }),
        },
      };
      dispatch(DefaultInsertUpdate(RequestData));
      // setLoading(true);
      // Perform save logic here
      //   const requestData = {
      //     entityid: "26B84156-CC30-416E-99D5-B37409B4D0BD",
      //     userid: loggedUserId,
      //     data: allInputValues,
      //     tag: UpdateTagItem,
      //   };
      console.log("Enter data:", inputValues);
      console.log("Post data:", PostLeadData);
      console.log("All Post data:", allInputValues);
      //   setButtonDisabled(true);
      //   dispatch(AddTaskData(requestData));
      setSelectedTagItem([]);
      setUpdateTagItem([]);
      // dispatch(resetValidationStatus());
      setShow(false);
      setInputValues({});
      setAllInputValues([]);
      setShowErrors(false);

      // dispatch(AddTaskDataValidation(allInputValues));
      //   if (!isEqual(allInputValues, previousInputValues.current)) {
      //     // Dispatch action only if allInputValues has changed
      //     dispatch(AddTaskDataValidation(allInputValues));
      //   } else {
      //     console.log("allInputValues has not changed, skipping dispatch.");
      //   }
      //   console.log("Updated addStatus:", addStatus);
    } else {
      setShowErrors(true);
      setShow(true);
      setButtonDisabled(false);
      // Filter out null values from validationErrors
    }
    previousInputValues.current = allInputValues;
  };

  return (
    <>
      <button className="add-contact-btn" onClick={handleOpen}>
        {ScreenWidth > BreakpointSm ? (
          <>
            {/* <FiPlus />  */}
            {btnName}
          </>
        ) : (
          <>
            {" "}
            <FiPlus />{" "}
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
                      headerName={headerName}
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
                                        masterDataforPopup={masterData}
                                        disabled={
                                          pageDetails?.disabled || false
                                        }
                                      />
                                    </React.Fragment>
                                  ))}
                              </>
                            </Accordion.Collapse>
                          </Form.Group>
                        </Accordion>
                      </Form>
                      {/* <pre>{JSON.stringify(allInputValues, null, 2)}</pre>
                      <pre>{JSON.stringify(inputValues, null, 2)}</pre> */}
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

export default Add;

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
