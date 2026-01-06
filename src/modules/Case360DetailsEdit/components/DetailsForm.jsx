/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect, useContext, useRef } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//? Assets
import { format } from "date-fns";
import { FileUploader } from "react-drag-drop-files";
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
// import AddTaskLocal_API from "./AddTask_API.json";
import DynamicInput from "@/components/arccomponents/DynamicInputs/DynamicInputs";

import { useDispatch, useSelector } from "react-redux";
import { fetchAddTaskFormFields } from "@/redux/AddTask/AddTaskFormFields";
import { AddTaskData } from "@/redux/AddTask/addTaskData";
import {
  AddTaskDataValidation,
  resetValidationStatus,
} from "@/redux/AddTask/addTaskValidation";
import { IoDocumentAttachOutline } from "react-icons/io5";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { userobjInfo } from "@/redux/Execution/selector";
import { GrAttachment } from "react-icons/gr";
import ActivitiesTab from "./ActivitiesTab";
import ArcSingleSelect from "@/components/arccomponents/ui-components/ArcSingleSelect/ArcSingleSelect";
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";

// *******~ Import ~******** //

function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
  Title,
}) {
  return (
    <div className="header-content">
      <h3>{Title}</h3>
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

export default function DetailsForm({
  show,
  setShow,
  FormAPI,
  Title,
  BtnName,
}) {
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  const [allInputValues, setAllInputValues] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [formattedData, setFormattedData] = useState({});
  const [key, setKey] = useState(["all"]);
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  // const [show, setShow] = useState(false);
  const [GroupForm, setGroupForm] = useState(true);
  const previousInputValues = useRef(allInputValues);
  const handleShow = () => {
    //added by Venkatesh R
    setShowErrors(false);
    setInputValues({});
    setErrorCount(0);
    setAllInputValues([]);
    //added by Venkatesh R
    setShow(true);
  };
  // ! API Function
  // ? Get Form Details
  const dispatch = useDispatch();
  const GetAddForm = () => {
    // dispatch(fetchAddTaskFormFields());
  };
  // Fetch data when the component mounts
  // useEffect(() => {
  //   dispatch(fetchAddTaskFormFields());
  // }, [dispatch]);

  // Access the Redux state using useSelector
  const arcFormState = useSelector((state) => state.addTask);
  const arcFormStateStatus = useSelector((state) => state.addTask.status);
  const userobj = useSelector(userobjInfo);

  console.log(userobj);

  // Extract the relevant data from the state
  const { screenFields } = arcFormState;

  // const LeadFormAPI = screenFields?.result;
  const LeadFormAPI = FormAPI?.result;
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

  const handleSaveButtonClick = () => {
    const isValid = validateFields();

    if (isValid) {
      // Perform save logic here

      console.log("Enter data:", inputValues);
      console.log("Post data:", PostLeadData);
      console.log("All Post data:", allInputValues);
      setButtonDisabled(true);

      // dispatch(AddTaskDataValidation(allInputValues));
      if (!isEqual(allInputValues, previousInputValues.current)) {
        // Dispatch action only if allInputValues has changed
        dispatch(AddTaskDataValidation(allInputValues));
      } else {
        console.log("allInputValues has not changed, skipping dispatch.");
        setButtonDisabled(false);
      }

      console.log("Updated addStatus:", addStatus);
    } else {
      setShowErrors(true);
      setShow(true);
      setButtonDisabled(false);
      // Filter out null values from validationErrors
    }
    previousInputValues.current = allInputValues;
  };
  const handleCancelButtonClick = () => {
    setButtonDisabled(false);
    setShowErrors(false);
    setShow(false);
    setInputValues({});
    setErrorCount(0);
    setAllInputValues([]);
  };
  // ! Validation Status
  const TaskValidationStatus = useSelector(
    (state) => state.addTaskValidationState.status
  );
  const TaskValidationResponseStatus = useSelector(
    (state) => state.addTaskValidationState.response
  );
  const taskresponseresult = TaskValidationResponseStatus?.result;

  // const PostValidTask = () =>{}

  useEffect(() => {
    if (taskresponseresult) {
      if (taskresponseresult?.response === "Task Not Exists.") {
        console.log(TaskValidationResponseStatus);
        console.log(TaskValidationStatus);
        const requestData = {
          entityid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userid: loggedUserId,
          data: allInputValues,
        };
        dispatch(AddTaskData(requestData));
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
  useEffect(() => {
    const formatted = allInputValues.reduce((acc, item) => {
      acc[item.apiname] = item.value;
      return acc;
    }, {});
    setFormattedData(formatted);
  }, [allInputValues]);

  const CaseId = [
    "entitytyid-sub-contact",
    "entitytyid-sub-account",
    "entitytyid-sub-opportunity",
    "entitytyid-sub-tickets",
  ];
  return (
    <>
      <Tabs
        className="case-detail-form"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        transition={false}
      >
        <Tab
          eventKey="all"
          title={
            <>All {ErrorCount === 0 ? undefined : <span>{ErrorCount}</span>}</>
          }
        >
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
                CaseId={CaseId}
              />
              <Accordion defaultActiveKey="0">
                <Form.Group className="form-group">
                  <CustomToggle eventKey="0">
                    <h4>Activities</h4>
                    <span>
                      <IoIosArrowDown />
                    </span>
                  </CustomToggle>
                  <Accordion.Collapse eventKey="0">
                    <ActivitiesTab />
                  </Accordion.Collapse>
                </Form.Group>
              </Accordion>
            </Form>
            {/* <pre>{JSON.stringify(AttributeScreenFields, null, 2)}</pre> */}
            {/* <button onClick={SetDefaultValues}>setDefault</button> */}
            {/* <pre>{JSON.stringify(PostLeadData, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(formattedData, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(allInputValues, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(inputValues, null, 2)}</pre> */}
          </div>
        </Tab>
      </Tabs>
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

const options = [
  { value: "Internal", label: "Internal" },
  { value: "External", label: "External" },
  { value: "Automated", label: "Automated" },
];

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
  CaseId,
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
                  <Row>
                    <>
                      {sectionlist.name === "Attachements" &&
                      sectionlist.id === "Attachements" ? (
                        <>
                          <AttachFile />
                        </>
                      ) : (
                        sectionlist.fields
                          ?.slice()
                          .sort((a, b) => a.seqno - b.seqno)
                          .map((FieldList, index) =>
                            FieldList.controltype === "label-title" ? (
                              <>
                                {/* <Row> */}
                                <Col xxl={8} xl={8} md={8}>
                                  <ArcTextBox
                                    Label="Title"
                                    PlaceHolder="Enter Title"
                                    Required={true}
                                    DefaultValue="Laptop Performance Issue" // Set default value here
                                    ReadOnly={false}
                                  />
                                </Col>
                                <Col xxl={6} xl={6} md={6}>
                                  <ArcSingleSelect
                                    Label="Mode"
                                    PlaceHolder="Select Type"
                                    options={options}
                                    defaultValue={{
                                      value: "Internal",
                                      label: "Internal",
                                    }}
                                    Required="true"
                                  />
                                </Col>
                              </>
                            ) : CaseId.includes(FieldList.id) ? (
                              <>
                                <ConditionalRendering
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
                              </>
                            ) : (
                              <React.Fragment key={index}>
                                <Col
                                  md={
                                    FieldList.controltype === "Textarea"
                                      ? 12
                                      : 3
                                  }
                                  xl={
                                    FieldList.controltype === "Textarea"
                                      ? 12
                                      : [
                                            "Priority",
                                            "Urgency",
                                            "Status",
                                          ].includes(FieldList.label_text)
                                        ? 6
                                        : 6
                                  }
                                >
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
                                </Col>
                              </React.Fragment>
                            )
                          )
                      )}
                    </>
                  </Row>
                </Accordion.Collapse>
              </Form.Group>
            </Accordion>
          </React.Fragment>
        ))}
    </>
  );
};

const isEqual = (a, b) => {
  // Implement your deep comparison logic here
  return JSON.stringify(a) === JSON.stringify(b);
};

export function AttachFile({ ArcPopupshow, setArcPopupshow }) {
  const handleArcPopupShow = () => setArcPopupshow(true);
  const handleArcPopupClose = () => setArcPopupshow(false);

  //   ~ Upload File
  const [file, setFile] = useState(null);
  const [Error, setError] = useState();
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const fileTypes = ["XLSX", "XLS", "JPG", "PNG", "GIF", "PDF"];
  const acceptedFileTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
    "application/vnd.ms-excel", // XLS
    "image/jpeg", // JPG
    "image/png", // PNG
    "image/gif", // GIF
    "application/pdf", // PDF
  ];
  const ResetFiles = () => {
    setFile(null);
    setUploadDisabled(false);
  };
  const handleChange = (file) => {
    if (file && acceptedFileTypes.includes(file.type)) {
      setFile(file);
      setError(null); // Clear any previous errors
    } else {
      setError("Invalid file type. Please upload an XLSX or XLS file.");
      setFile(null);
    }
  };
  const handleTypeError = (err) => {
    console.log(err);
    setError(err);
  };
  const getTruncatedFileName = (name) => {
    const maxLength = 20;
    if (name.length <= maxLength) {
      return name;
    }
    const start = name.slice(0, 15);
    const end = name.slice(-8);
    return `${start}...${end}`;
  };
  //   ~ Upload File
  return (
    <>
      <div className="attached-file">
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          classes={`create-template-drop-label ${Error && "invalid-file"}`}
          onTypeError={handleTypeError}
          maxSize={10}
          disabled={uploadDisabled}
        >
          <div className="upload-box">
            {/* <img className="xls-img" src={XLSImg} alt="" /> */}
            <span className="upload-img-icon">
              <IoDocumentAttachOutline />
            </span>

            <div className="upload-btn-div">
              <button className={`upload-btn ${file && "is-file"}`}>
                {" "}
                {file ? getTruncatedFileName(file.name) : "Upload File"}{" "}
              </button>{" "}
              {file ? (
                <ArcToolTip
                  className="reset-btn"
                  HoverText="Clear"
                  BtnName={<MdOutlineCancel />}
                  Placement="right"
                  onClick={ResetFiles}
                  onMouseEnter={() => setUploadDisabled(true)}
                  onMouseLeave={() => setUploadDisabled(false)}
                  as="span"
                />
              ) : null}
            </div>

            <span className="drop-here">or drag and drop it here</span>
            <p className="formats">
              (Supported formats .csv, .xlsx, .jpg, .png, .gif, .pdf; max file
              size 10 MB)
            </p>
            {Error && <span className="error-format">{Error}</span>}
          </div>
        </FileUploader>
      </div>
    </>
  );
}

// const ConditionalRendering = ({
//   FieldList,
//   inputValues,
//   setInputValues,
//   validationErrors,
//   setValidationErrors,
//   showErrors,
//   setShowErrors,
//   allInputValues,
//   setAllInputValues,
// }) => {
//   const CaseFilteredData = ["Contact", "Account", "Opportunity", "Tickets"];
//   return (
//     <React.Fragment>
//       {/* {FieldList.name} */}
//       {inputValues["WebSiteUrlentitytyid_RefLabel"] === FieldList.name ? (
//         <DynamicInput
//           FieldList={FieldList}
//           inputValues={inputValues}
//           setInputValues={setInputValues}
//           validationErrors={validationErrors}
//           setValidationErrors={setValidationErrors}
//           showErrors={showErrors}
//           setShowErrors={setShowErrors}
//           allInputValues={allInputValues}
//           setAllInputValues={setAllInputValues}
//         />
//       ) : null}
//     </React.Fragment>
//   );
// };
