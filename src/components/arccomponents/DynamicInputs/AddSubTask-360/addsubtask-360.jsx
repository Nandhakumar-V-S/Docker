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
import { IoMdPersonAdd } from "react-icons/io";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import AddTaskLocal_API from "./AddSubTask-360_API.json";
import DynamicInput from "@/components/arccomponents/DynamicInputs/DynamicInputs";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddSubTaskFormFields } from "@/redux/360Details/AddSubTask-360/AddSubTaskFormFields";
import { AddSubTaskData } from "@/redux/360Details/AddSubTask-360/addSubTaskData";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { userobjInfo } from "@/redux/Execution/selector";
import { subMasterDataInfo } from "@/redux/Execution/selector";
import { ArcFaild } from "../../ui-components/ArcToastify/ArcToastify";
// *******~ Import ~******** //

function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
}) {
  return (
    <div className="header-content">
      <h3>Add Subtask</h3>
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

export default function AddSubTask360() {
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  const [allInputValues, setAllInputValues] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [key, setKey] = useState([0]);
  const [show, setShow] = useState(false);
  const [GroupForm, setGroupForm] = useState(true);
  const masterData = useSelector(subMasterDataInfo);
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  const handleShow = () => {
    setShow(true);
  };

  const masterUser = masterData?.filter(
    (user) => user.masterid === "E66E5177-DFD2-48A5-BBDE-C8891C37F943"
  );
  const mastervalues = masterUser[0]?.mastervalues;
  const loggedUser = mastervalues?.filter(
    (filter) => filter.optionid === loggedUserId
  );
  console.log(loggedUser);
  console.log(mastervalues);

  // Example selector to get entity details and status
  const selectEntityDetails = (state) => state.entity.entityDetails;
  // Use the selectors to access the Redux state
  const entityDetails = useSelector(selectEntityDetails);
  const entityResults = entityDetails?.result?.data;
  const entityResultsData = entityResults && entityResults[0];
  const TransactionId = entityResultsData?.id;
  console.log("entity data", entityResultsData);
  console.log("TransactionId", TransactionId);

  // ! API Function
  // ? Get Form Details
  const dispatch = useDispatch();

  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchAddSubTaskFormFields());
  }, [dispatch]);

  // Access the Redux state using useSelector
  const AddsubTaskFields = useSelector((state) => state.addSubTask);
  const userobj = useSelector(userobjInfo);

  console.log(userobj);

  // Extract the relevant data from the state
  const { screenFields } = AddsubTaskFields;

  const LeadFormAPI = screenFields?.result;
  // const LeadFormAPI = updatedScreenFieldsResult;
  console.log(LeadFormAPI);

  // updatedLeadFormAPI now contains the updated or unchanged LeadFormAPI

  const PostLeadData = Object.fromEntries(
    Object.entries(inputValues).filter(([key]) => !key.endsWith("_RefLabel"))
  );
  const AddSubtaskstatus = useSelector(
    (state) => state.addSubTaskState.AddSubtaskstatus
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
    console.log(errors);
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
          ? loggedUser && loggedUser[0]?.optionid
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
  //           FieldList.controltype === "date"
  //         ) {
  //           setInputValues((prevState) => ({
  //             ...prevState,
  //             [FieldList.api_name + FieldList.id]: new Date(),
  //           }));
  //         } else if (["LoggedInUser"].includes(FieldList.default_value)) {
  //           setInputValues((prevState) => ({
  //             ...prevState,
  //             [FieldList.api_name + FieldList.id]:
  //               loggedUser && loggedUser[0]?.optionid,
  //             [FieldList.api_name + FieldList.id + "_RefLabel"]:
  //               loggedUser && loggedUser[0]?.optionvalue,
  //           }));
  //         }
  //       }
  //     });
  //   });
  // };

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
          } else if (["LoggedInUser"].includes(FieldList.default_value)) {
            setInputValues((prevState) => ({
              ...prevState,
              [FieldList.api_name + FieldList.id]:
                loggedUser && loggedUser[0]?.optionid,
              [FieldList.api_name + FieldList.id + "_RefLabel"]:
                loggedUser && loggedUser[0]?.optionvalue,
            }));
          }
          // else if (
          //   [
          //     // "dropdown", "multiselect",
          //     "onclickloaddropdown",
          //   ].includes(FieldList.controltype)
          // ) {
          //   console.log(FieldList, "FieldList.controltype");

          //   if (FieldList.islookup) {
          //     const Options = {
          //       optionid:
          //         FieldList.default_value === "LoggedInUser" &&
          //         loggedUser?.length > 0
          //           ? loggedUser[0].optionid
          //           : FieldList.default_value,
          //       optionvalue:
          //         FieldList.default_value === "LoggedInUser" &&
          //         loggedUser?.length > 0
          //           ? loggedUser[0].optionvalue
          //           : FieldList.default_value_text,
          //     };

          //     setInputValues((prevValues) => ({
          //       ...prevValues,
          //       [FieldList.api_name + FieldList.id]:
          //         FieldList.default_value || null,
          //       [FieldList.api_name + FieldList.id + "_RefLabel"]:
          //         FieldList.default_value_text || null,
          //       [FieldList.api_name + FieldList.id + "_value"]: Options || null,
          //     }));
          //   } else if (["LoggedInUser"].includes(FieldList.default_value)) {
          //     setInputValues((prevState) => ({
          //       ...prevState,
          //       [FieldList.api_name + FieldList.id]: userobj[0]?.optionid,
          //       [FieldList.api_name + FieldList.id + "_RefLabel"]:
          //         userobj[0]?.optionvalue,
          //     }));
          //   } else {
          //     console.log(masterDataTaskPage, "masterDataTaskPage");

          //     const matchedData = masterDataTaskPage?.find(
          //       (item) => item.masterid === FieldList.masterid
          //     );

          //     // Get the master values array or an empty array if no match found
          //     const masterValues = matchedData ? matchedData.mastervalues : [];
          //     const Singleoptions = masterValues.map((item) => ({
          //       value: item.optionid,
          //       label: item.optionvalue,
          //     }));
          //     // Find the matched default value in Singleoptions
          //     console.log(Singleoptions, "Singleoptions");

          //     const defaultValue = Singleoptions.find(
          //       (item) => item.value === FieldList.default_value
          //     );
          //     console.log(defaultValue, "Singleoptions");

          //     setInputValues((prevState) => ({
          //       ...prevState,
          //       [FieldList.api_name + FieldList.id]:
          //         FieldList.default_value === "0"
          //           ? ""
          //           : FieldList.default_value,
          //       [FieldList.api_name + FieldList.id + "_RefLabel"]:
          //         defaultValue?.label,
          //     }));
          //   }
          // }
        }
      });
    });
  };

  useEffect(() => {
    // Trigger the function when the component mounts
    if (LeadFormAPI) {
      SetDefaultValues();
    }
  }, [LeadFormAPI, show]);
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
      // dispatch(createLead(inputValues));
      // dispatch(createLead(PostLeadData));
      const dispatchedValue = await dispatch(
        AddSubTaskData({
          data: allInputValues,
          transactionid: TransactionId,
          previousPathName: previousPathName,
        })
      );
      const resData = await dispatchedValue?.payload;
      await console.log(resData);
      if (resData?.result?.response.includes("Already exists")) {
        ArcFaild({
          Message: resData?.result?.response,
          position: "top-right",
        });
        await setShow(true);
      } else {
        console.log("Updated Subtask Status:", AddSubtaskstatus);
        setInputValues({});
        setAllInputValues([]);
        setShowErrors(false);
        setShow(false);
      }
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
      <button className="add-contact-btn" onClick={handleShow}>
        {ScreenWidth > BreakpointSm ? (
          <>
            <FiPlus /> Add Subtask
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
                                      />
                                    </React.Fragment>
                                  ))}
                              </>
                            </Accordion.Collapse>
                          </Form.Group>
                        </Accordion>
                      </Form>
                      {/* <pre>{JSON.stringify(inputValues, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(AttributeScreenFields, null, 2)}</pre> */}
                      {/* <button onClick={SetDefaultValues}>setDefault</button> */}
                      {/* <pre>{JSON.stringify(PostLeadData, null, 2)}</pre> */}
                      {/* <pre>{JSON.stringify(allInputValues, null, 2)}</pre> */}
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
                      .map((FieldList, index) => (
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
