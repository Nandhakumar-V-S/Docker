/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect, useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
//? Assets
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
import { BsInfoCircle } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import Table from "react-bootstrap/Table";
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import UpdateStatusLocal_API from "./updatestatus.json";
import DynamicInput from "@/components/arccomponents/DynamicInputs/DynamicInputs";
import ArcHourInput from "@/components/arccomponents/ui-components/ArcHourInput/ArcHourInput";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAddTaskFormFields } from "@/redux/AddTask/AddTaskFormFields";
import { UpdateStatusData } from "@/redux/Execution/UpdateStatus/UpdateStatus";
// import { masterDataInfo as masterDataInfoHome } from "@/redux/Home/selector";
import { Link,useLocation } from "react-router-dom";
import { TbLayoutBottombarExpand } from "react-icons/tb";
import { MdOutlinePostAdd } from "react-icons/md";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { CreateSubTaskForm } from "./SubTaskGrid";
import { masterDataInfo  as masterDataInfoExecution} from "@/redux/Execution/selector";
import { masterDataInfo as masterDataInfoHome } from "@/redux/Home/selector";
import { userobjInfo } from "@/redux/Execution/selector";
// import MarkasCompleted from "../MarkasComplete";
// *******~ Import ~******** //

function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
  HeaderTitle,
  SelectedRow,
  taskname,
}) {
  return (
    <div className={`header-content ${taskname && "with-subtask-grid"}`}>
      <h3>
        {HeaderTitle}{" "}
        {taskname && (
          <span>
            {SelectedRow?.utbl_workitem_column16 || SelectedRow?.title}
          </span>
        )}
      </h3>
      <div className="view-option">
        {/* <Link to={"/addlead"}>
          <TbLayoutBottombarExpand />
        </Link> */}
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
const format_Time = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.floor(minutes % 60);
  return `${hours}h ${remainingMinutes}m`;
};
export default function UpdateStatus({ show, setShow, SelectedRow }) {
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  const [allInputValues, setAllInputValues] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [key, setKey] = useState([0]);
  const [ApprovalNotifi, setApprovalNotifi] = useState(false);
  // const [ArcCompletedshow, setArcCompletedshow] = useState(false);
  // const [show, setShow] = useState(false);
  const [GroupForm, setGroupForm] = useState(true);
  const handleShow = () => setShow(true);
  console.log("selectedrow", SelectedRow);
  ///console.log(allInputValues);
  // const [ArcCompletedshow, setArcCompletedshow] = useState(false);
  // useEffect(() => {
  //   setArcCompletedshow(
  //     inputValues["column9" + "b905141b-b5ad-4780-ad53-784141965fe3"] === "2529"
  //   );
  // }, [inputValues]);

  // ! Add Sub Task Start
  let globalId = sessionStorage.getItem("Globalid");
  const [subTasks, setSubTasks] = useState([]);
  const [formData, setFormData] = useState({
    column16: "",
    column2: "",
    column4: globalId,
    column3: "2527",
  });
  useEffect(() => {
    setFormData({
      ...formData,
      column4: globalId,
    });
  }, [show]);
  // ! Add Sub Task End
  // ! API Function
  // ? Get Form Details
  const dispatch = useDispatch();
  let TransactionId = SelectedRow?.id;

  //! Fetch Default values data when the component mounts
  // useEffect(() => {
  //   dispatch(GetDefaultFormValues(TransactionId));
  // }, [SelectedRow]);
  // Fetch data when the component mounts
  // useEffect(() => {
  //   dispatch(fetchAddTaskFormFields());
  // }, [dispatch]);

  // Access the Redux state using useSelector
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
  // masterDataTaskPage
  const userobj = useSelector(userobjInfo);
  console.log(userobj);
  const SessionDefaultInputs = useSelector(
    (state) => state.GetDefaultValuesState.DefaultFormValues
  );
  const SubTaskLists = useSelector(
    (state) => state.GetSubTaskState.SubTaskLists
  );
  // ! Merge data
  const [updatedSession, setUpdatedSession] = useState(UpdateStatusLocal_API);

  useEffect(() => {
    const updateDefaultValues = () => {
      const updatedData = { ...UpdateStatusLocal_API };

      SessionDefaultInputs?.result?.forEach((defaultValue) => {
        UpdateStatusLocal_API?.result.groups.forEach((group) => {
          group.fields.forEach((field) => {
            if (field.id === defaultValue.id) {
              field.default_value = defaultValue.value;
            }
          });
        });
      });

      setUpdatedSession(updatedData);
    };

    updateDefaultValues();
  }, [SessionDefaultInputs, UpdateStatusLocal_API]);
  // ! Merge data
  // Access the Redux state using useSelector
  // const arcFormState = useSelector((state) => state.addTask);

  // Extract the relevant data from the state
  // const { screenFields, status, error } = arcFormState;

  // console.log(screenFields); // Access the fetched data here
  // const LeadFormAPI = screenFields?.result; // From API
  const LeadFormAPI = updatedSession?.result; // Local Json
  console.log(LeadFormAPI)
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
    return {
      id: FieldList.id,
      tablename: FieldList.table_name,
      apiname: FieldList.api_name,
      value:
        FieldList.attributedatatype === "numeric"
          ? FieldList.default_value?.length === 0
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
          } 
          else if (["Textbox_time"].includes(FieldList.controltype)) {
            setInputValues((prevState) => ({
              ...prevState,
              [FieldList.api_name + FieldList.id]:
              //format_Time(FieldList.default_value)
            (FieldList.default_value / 60).toFixed(2) + "h",
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
  }, [SessionDefaultInputs, LeadFormAPI, show,masterDataTaskPage]);
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
        UpdateStatusData({
          data: allInputValues,
          transactionid: TransactionId,
          Subworkitemdata: subTasks,
        })
      );

      console.log("Updated addStatus:", addStatus);
      setInputValues({});
      setAllInputValues([]);
      setShowErrors(false);
      setShow(false);
      setUpdatedSession(UpdateStatusLocal_API);
      setSubTasks([]);
      setFormData({
        column16: "",
        column2: "",
        column4: globalId,
        column3: "2527",
      });
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
    setSubTasks([]);
    setFormData({
      column16: "",
      column2: "",
      column4: globalId,
      column3: "2527",
    });
  };
  const TaskStatus =
    inputValues["column9b905141b-b5ad-4780-ad53-784141965fe3_RefLabel"] ===
    "Complete";
  console.log(TaskStatus);
  useEffect(() => {
    // Ensure SessionDefaultInputs is defined and has a result property

    if (SessionDefaultInputs && Array.isArray(SessionDefaultInputs?.result)) {
      // Find the task owner and resource items
      const filtereTaskOwner = SessionDefaultInputs?.result.find(
        (item) => item.id === "daabeaa3-bd6d-414d-8b8e-772c53dcacd7"
      );
      const filtereResource = SessionDefaultInputs?.result.find(
        (item) => item.id === "53737e0b-4eb2-4943-bedd-8bd635ff2a59"
      );

      // Check if both items are found and have a value property
      if (
        filtereTaskOwner &&
        filtereResource &&
        "value" in filtereTaskOwner &&
        "value" in filtereResource
      ) {
        // Compare the values
        if (filtereTaskOwner.value === filtereResource.value) {
          console.log("value is matched");
          setApprovalNotifi(false);
        } else {
          console.log("value not is matched");
          setApprovalNotifi(true);
        }
      } else {
        console.error(
          "Task owner or resource not found, or missing value property"
        );
      }
    }
  }, [inputValues, SessionDefaultInputs]);

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleCancelButtonClick}
        placement="end"
        backdrop="static"
        className={`${
          GroupForm ? "enable-group-tab" : null
        } add-contact-form-canva add-lead-form-canva new-lead-form update-status subtask-grid`}
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
                      HeaderTitle="Update Status"
                      SelectedRow={SelectedRow}
                      taskname={false}
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
                                            {SelectedRow?.utbl_workitem_column16 ||
                                              SelectedRow?.title}
                                          </p>
                                        </div>
                                      </>
                                    ) : FieldList.controltype ===
                                      "custom_label" ? (
                                      <>
                                        {ApprovalNotifi && TaskStatus && (
                                          <div className="label-title">
                                            <p className="info">
                                              <BsInfoCircle /> Approval
                                              follow-up will be created for this
                                              task.
                                            </p>
                                          </div>
                                        )}
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
                                {/* <MarkasCompleted
                                  Title="title"
                                  ArcPopupshow={ArcCompletedshow}
                                  setArcPopupshow={setArcCompletedshow}
                                /> */}
                              </>
                            </Accordion.Collapse>
                          </Form.Group>
                        </Accordion>
                      </Form>
                      {/* <pre>{JSON.stringify(PostLeadData, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(SessionDefaultInputs, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(updatedSession, null, 2)}</pre> */}
                      <pre>{JSON.stringify(inputValues, null, 2)}</pre>
                      <pre>{JSON.stringify(allInputValues, null, 2)}</pre>
                      {/* <pre>{JSON.stringify(SelectedRow, null, 2)}</pre> */}
                    </div>
                    <FooterContent
                      handleCancelButtonClick={handleCancelButtonClick}
                      handleSaveButtonClick={handleSaveButtonClick}
                    ></FooterContent>
                  </div>
                </Tab>
              ))}
            <Tab
              eventKey={1}
              title={
                <>
                  SUB TASK
                  {/* {ErrorCount === 0 ? undefined : <span>{ErrorCount}</span>} */}
                </>
              }
            >
              <div className="add-contact-form add-lead-form">
                <HeaderContent
                  GroupForm={GroupForm}
                  setGroupForm={setGroupForm}
                  handleCancelButtonClick={handleCancelButtonClick}
                  setKey={setKey}
                  keyData={key}
                  HeaderTitle="Add Sub Task"
                  SelectedRow={SelectedRow}
                  taskname={false}
                ></HeaderContent>
                <div className="main-content">
                  <div className="add-sub-task">
                    {/* <div className="label-title">
                      <span>Task Name</span>
                      <p>
                        {SelectedRow?.utbl_workitem_column16 ||
                          SelectedRow?.title}
                      </p>
                    </div> */}
                    <CreateSubTaskForm
                      subTasks={subTasks}
                      setSubTasks={setSubTasks}
                      formData={formData}
                      setFormData={setFormData}
                      globalId={globalId}
                      SubTaskLists={SubTaskLists}
                    />
                  </div>
                </div>
                <FooterContent
                  handleCancelButtonClick={handleCancelButtonClick}
                  handleSaveButtonClick={handleSaveButtonClick}
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
