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
import { userobjInfo } from "@/redux/Tag/selector";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import EditTaskOffline_API from "./addEntity.json";
import DynamicInput from "@/components/arccomponents/DynamicInputs/DynamicInputs";
import { useDispatch, useSelector } from "react-redux";
import { UpdateMasterTaskData } from "@/redux/Task/AddTask/UpdateMasterTask";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { masterDataInfo, subMasterDataInfo } from "@/redux/Execution/selector";
import { masterDataInfo as masterDataInfoTag } from "@/redux/Tag/selector";
import { masterDataInfo as masterDataInfoPlan } from "@/redux/Plan/selector";
import { masterDataInfofollowup } from "@/redux/Followup/selector";
import { useLocation } from "react-router-dom";
import ArcSingleSelect from "@/components/arccomponents/ui-components/ArcSingleSelect/ArcSingleSelect";
import ArcCustomMultiSelect, {
  ArcCustomMultiSelect1,
} from "@/components/arccomponents/ui-components/ArcCustomMultiSelect/ArcCustomMultiSelect";
import { AddTagtoGroupEntity } from "@/redux/Tag/AddTag/AddEntity";
import { setLoading } from "@/redux/Tag/actions";
import { ArcFaild } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";
// *******~ Import ~******** //

function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
}) {
  return (
    <div className="header-content">
      <h3>Tagged Entities</h3>
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
      <button onClick={handleSaveButtonClick}>Add</button>
    </div>
  );
}

export default function AddEntityField({ show, setShow, SelectedRow }) {
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  // const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  const [inputValues, setInputValues] = useState({});
  const [allInputValues, setAllInputValues] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [key, setKey] = useState([0]);
  const [errormsg, setErrormsg] = useState(false);
  // const [show, setShow] = useState(false);
  const [GroupForm, setGroupForm] = useState(true);
  //add entity
  const [entityId, setEntityIds] = useState([]);
  const handleShow = () => setShow(true);
  console.log("selectedrow", SelectedRow);
  // ! API Function
  // ? Get Form Details
  const dispatch = useDispatch();
  console.log(SelectedRow);
  let TransactionId = SelectedRow?.lbl_gen_id;
  const userobj = useSelector(userobjInfo);
  let loggedUserId = window.sessionStorage.getItem("Globalid");

  const { Entity } = useSelector((state) => state.GetAddEntityFields);

  const dropdownValues = Entity?.result;

  console.log(Entity);
  console.log(entityId);

  console.log(userobj);
  //! Fetch Default values data when the component mounts

  // ! Changed Master Data

  const masterDataTagPage = useSelector(masterDataInfoTag);

  // ! Changed Master Data

  // Access the Redux state using useSelector
  const TaskDefaultInputs = useSelector(
    (state) => state.GetDefaultTaskInputState.DefaultFormValues
  );
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

  useEffect(() => {
    const updateDefaultValues = () => {
      const updatedData = { ...EditTaskOffline_API };

      TaskDefaultInputs?.result?.forEach((defaultValue) => {
        EditTaskOffline_API?.result?.groups?.forEach((group) => {
          group.fields?.forEach((field) => {
            if (field.id.toLowerCase() === defaultValue.id.toLowerCase()) {
              field.default_value =
                defaultValue.columntype === "datetime"
                  ? (defaultValue.value && formatDate(defaultValue.value)) ||
                    format(new Date(), "MM/dd/yyyy")
                  : defaultValue.value;
            }
          });
        });
      });

      setUpdatedSession(updatedData);
    };

    updateDefaultValues();
  }, [TaskDefaultInputs, show]);
  // ! Merge data

  const LeadFormAPI = updatedSession?.result; // Local Json
  // !POST Form Details
  // const [inputValues, setInputValues] = useState({});

  const [ErrorCount, setErrorCount] = useState(0);

  const handleSaveButtonClick = async () => {
    if (entityId.length > 0) {
      console.log(entityId);
      setShow(false);
      await dispatch(setLoading(true));
      await dispatch(
        AddTagtoGroupEntity({
          entityIds: entityId,
          transactionId: TransactionId,
        })
      );
    } else {
      console.log("Error");
      setErrormsg(true);
      setShow(true);
      ArcFaild({
        Message: "Select Atleast One Entity",
        position: "top-right",
      });
    }
  };
  const handleCancelButtonClick = () => {
    setEntityIds([]);
    setShowErrors(false);
    setShow(false);
    setInputValues({});
    setErrorCount(0);
    setAllInputValues([]);
    setUpdatedSession();
  };

  // console.log(
  //   dropdownValues
  //     .sort((a, b) => a.toLowerCase() - b.toLowerCase())
  //     .map((val) => val.displayName)
  // );

  const Multioptions = dropdownValues?.map((item) => ({
    isSelected: item.isSelected,
    label: item.displayName,
    value: item.id,
  }));

  // const AlreadySelectedOption = Multioptions?.filter(
  //   (selected) => selected.isSelected === true
  // );
  // console.log(AlreadySelectedOption);
  // const selectedOption = AlreadySelectedOption;
  // const [optionSelected, setOptionSelected] = useState(selectedOption);

  // console.log(optionSelected);

  // console.log(entityId);

  // const [optionSelected, setOptionSelected] = useState(selectedOption);
  // const entityid = optionSelected.map((val) => val.value);
  // console.log(entityid);
  return (
    <>
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
                                {dropdownValues && Multioptions && (
                                  <ArcCustomMultiSelect
                                    PlaceHolder="Select Multiple Options"
                                    Label="Add Entity"
                                    options={Multioptions}
                                    setEntityIds={setEntityIds}
                                    // optionSelected={optionSelected}
                                    // setOptionSelected={setOptionSelected}
                                  />
                                )}
                                {/* {entityId.length == 0 && errormsg && (
                                  <span
                                    className="error-message"
                                    style={{ color: "red" }}
                                  >
                                    Atleast one Field is Required{" "}
                                  </span>
                                )} */}
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
