// *******~ Import ~******** //
//? React
import React, { useContext, useState, useEffect } from "react";

//? Assets
import { useNavigate } from "react-router-dom";
// import useLanguage from "@/locale/useLanguage";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddTaskFormFields } from "@/redux/AddTask/AddTaskFormFields";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
//? Components
import {
  ArcSuccess,
  ArcError,
} from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";
import LeadFormData from "./components/leaddata.json";
import DynamicInput from "./components/DynamicInput";
import { Link as ScrollLink } from "react-scroll";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import LeadFormHeader from "./components/leadformheader";
import { AddTaskData, resetAddStatus } from "@/redux/AddTask/addTaskData";
import AddLeadFormLoading from "@/modules/loading-skeleton/addlead-form-loading";
import NavigationComponent from "@/components/arccomponents/ui-components/ArcNavigate/ArcNavigate";
//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

export default function AddLeadModule() {
  const {
    ScreenWidth,
    BreakpointXs,
    BreakpointSm,
    BreakpointMd,
    Breakpointlg,
    BreakpointXl,
    BreakpointXxl,
  } = useContext(ContextWidthProvider);
  const { inputValues, setInputValues } = useContext(ArcGlobalContextProvider);
  // ! API Function
  // ? Get Form Details
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchScreenFields());
  }, [dispatch]);

  // Access the Redux state using useSelector
  const arcFormState = useSelector((state) => state.arcForm);

  // Extract the relevant data from the state
  const { screenFields, status, error } = arcFormState;

  // console.log(screenFields); // Access the fetched data here
  const LeadFormAPI = screenFields?.result; // From API
  // const LeadFormAPI = LeadFormData; // Local Json
  // !POST Form Details
  // const [inputValues, setInputValues] = useState({});

  const PostLeadData = Object.fromEntries(
    Object.entries(inputValues).filter(([key]) => !key.endsWith("_RefLabel"))
  );
  const addStatus = useSelector((state) => state.arcAddForm.Addstatus);
  const [NewButton, setNewButton] = useState(null);
  useEffect(() => {
    if (addStatus === "successful" && !NewButton) {
      // Perform navigation here
      console.log("Navigation success!");
      navigate("/listpage");
      dispatch(resetAddStatus());
      console.log(addStatus);
    }
  }, [addStatus, dispatch]);
  // console.log(PostLeadData);
  // ! API Function

  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const validateFields = () => {
    let errors = {};
    LeadFormAPI?.groups.forEach((sectionlist) => {
      sectionlist.fields.forEach((FieldList) => {
        if (FieldList.required && !inputValues[FieldList.api_name]) {
          errors[FieldList.api_name] = `${FieldList.label_text} is required`;
        }
      });
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveButtonClick = () => {
    const isValid = validateFields();
    setNewButton(false);
    if (isValid) {
      // Perform save logic here
      console.log("Enter data:", inputValues);
      console.log("Post data:", PostLeadData);
      // dispatch(createLead(inputValues));
      dispatch(createLead(PostLeadData));
      // Check the updated addStatus after dispatch
      console.log("Updated addStatus:", addStatus);
      setInputValues({});
      setShowErrors(false);
      // dispatch(resetAddStatus());
    } else {
      setShowErrors(true);
      console.log(validationErrors);
    }
  };
  const handleSaveNewButtonClick = () => {
    handleSaveButtonClick();
    setNewButton(true);
  };
  const handleCancelButtonClick = () => {
    setShowErrors(false);
    setInputValues({});
  };
  // console.log(addStatus);

  return (
    <section className="addlead-page">
      <LeadFormHeader
        handleCancelButtonClick={handleCancelButtonClick}
        handleSaveButtonClick={handleSaveButtonClick}
        handleSaveNewButtonClick={handleSaveNewButtonClick}
        addStatus={addStatus}
      />

      {status === "loading" ? (
        <>
          <AddLeadFormLoading />
        </>
      ) : (
        <Container fluid="xxl">
          <Row>
            <Col xxl={3} xl={3} md={4}>
              <aside className="sidebar-div">
                <ul className="lead-titles">
                  {/* <pre>{JSON.stringify(addStatus, null, 2)}</pre> */}
                  {/* <p>{addStatus}</p> */}
                  {LeadFormAPI?.groups
                    ?.slice()
                    .sort((a, b) => a.seqno - b.seqno)
                    .map((sectionlist, index) => (
                      <li key={index}>
                        <ScrollLink
                          key={index}
                          activeClass="active"
                          to={sectionlist.id}
                          spy={true}
                          offset={-112}
                          smooth={true}
                          delay={0}
                          duration={0}
                        >
                          {sectionlist.name}
                        </ScrollLink>
                      </li>
                    ))}
                  {/* <pre>{JSON.stringify(inputValues, null, 2)}</pre> */}
                  {/* <pre>{JSON.stringify(PostLeadData, null, 2)}</pre> */}
                </ul>
              </aside>
            </Col>
            <Col xxl={9} xl={9} md={8}>
              <div className="lead-form-div">
                {LeadFormAPI?.groups
                  ?.slice()
                  .sort((a, b) => a.seqno - b.seqno)
                  .map((sectionlist, index) => (
                    <div
                      className="form-section"
                      name={sectionlist.id}
                      key={index}
                    >
                      <Row>
                        <Col xxl={12} xl={12} md={12}>
                          <h4 className="section-title">{sectionlist.name}</h4>
                        </Col>
                      </Row>
                      <Row>
                        <>
                          {sectionlist.fields && (
                            <>
                              {sectionlist.fields.map((FieldList, index) => (
                                <React.Fragment key={index}>
                                  {FieldList.controltype === null ? null : (
                                    <>
                                      <Col xxl={6} xl={6} md={6}>
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
                                        />
                                      </Col>
                                    </>
                                  )}
                                </React.Fragment>
                              ))}
                            </>
                          )}
                        </>
                      </Row>
                    </div>
                  ))}
                <div className="empty-section"></div>
              </div>
            </Col>
          </Row>
        </Container>
      )}
      <Helmet>
        <style type="text/css">{`
  body {
      overflow: auto;
  }

  
`}</style>
      </Helmet>
    </section>
  );
}
