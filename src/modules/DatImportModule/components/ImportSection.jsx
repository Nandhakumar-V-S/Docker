/* eslint-disable react/prop-types */
/* eslint-disable no-inner-declarations */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//? Assets
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//? Components
import Configure from "./Configure";
import Preview from "./Preview";
import Summary from "./Summary";
import MultiStepProgressBar from "./Progressbar/Progressbar";
import { API_TEST_URL } from "../../../config/serverApiConfig";
import { Importdatatotbl } from "@/redux/DataImport/Importdatatotbl";
import Importstartalert from "./Importstartalert";
import {
  ArcSuccess,
  ArcError,
} from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

const DataImportSection = ({
  sessionData,
  setSessionData,
  currentStep,
  setCurrentStep,
  selectedValue,
  setSelectedValue,
  file,
  setFile,
}) => {
  const dispatch = useDispatch();
  // const [sessionData, setSessionData] = useState(null);
  // const [currentStep, setCurrentStep] = useState(1);
  const [isnewimport, setisnewimport] = useState(true);
  const [ImportjsonData, setImportJsonData] = useState([]);
  const [showImportAlert, setShowImportAlert] = useState(false);
  const [storedData, setstoredData] = useState({});
  // const [selectedValue, setSelectedValue] = useState("cr1");
  // const [file, setFile] = useState(null);
  useEffect(() => {
    // Retrieve data from session storage
    const storedData = sessionStorage.getItem("dataimport");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setSessionData(parsedData);
      } catch (error) {
        console.error("Error parsing JSON from session storage:", error);
      }
    }
  }, [dispatch]);
  useEffect(() => {
    setstoredData(sessionStorage.getItem("dataimport"));
  }, []);

  useEffect(() => {
    if (sessionData) {
      setCurrentStep(sessionData.currentStep);
    }
  }, [sessionData]);

  useEffect(() => {
    // Update session storage whenever currentStep changes
    const key = "Created";
    if (sessionData) {
      const updatedData = { ...sessionData, currentStep, key };
      sessionStorage.setItem("dataimport", JSON.stringify(updatedData));
      setSessionData(updatedData);
    }
  }, [currentStep, dispatch]);
  console.log(sessionData);
  console.log(currentStep);
  const ImportFlow = {
    1: (
      <Configure
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        ImportjsonData={ImportjsonData}
        setImportJsonData={setImportJsonData}
        file={file}
        setFile={setFile}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        isnewimport={isnewimport}
        setisnewimport={setisnewimport}
      />
    ),
    2: (
      <Preview
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        ImportjsonData={ImportjsonData}
        setImportJsonData={setImportJsonData}
        sessionData={sessionData}
        setSessionData={setSessionData}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
    ),
    3: (
      <Summary
        currentStep={currentStep}
        sessionData={sessionData}
        setSessionData={setSessionData}
        showImportAlert={showImportAlert}
        setShowImportAlert={setShowImportAlert}
      />
    ),
  };

  const NextBtn = () => {
    setCurrentStep(currentStep + 1);
  };

  function getBaseUrl() {
    var baseUrl = location.href.substring(0, location.href.lastIndexOf("/"));
    return baseUrl;
  }

  const PostImportDataStateResponse = useSelector(
    (state) => state.PostImportDataState.response
  );
  const PreviewResponse = useSelector(
    (state) => state.GetImportDataByIdState.response
  );
  const CountLists = PreviewResponse?.result?.CountList[0] || [];
  const Importversionid = PostImportDataStateResponse?.importdataversionid;
  const Impotdataid = PostImportDataStateResponse?.importdataid;

  const handleimportdata = async () => {
    console.log(CountLists.CreatedCount);
    console.log(CountLists.UpdateCount);
    console.log(Importversionid);
    console.log(Impotdataid);
    console.log(getBaseUrl());
    console.log("Fromimportscreen--=>");
    sessionStorage.setItem("Fromimportscreen", JSON.stringify(0));
    if (CountLists.CreatedCount != 0 || CountLists.UpdateCount != 0) {
      console.log("ccc");
      const RequestData = {
        importversionid: Importversionid,
        importdataid: Impotdataid,
        baseurl: getBaseUrl(),
        globalvar: [
          {
            globalid: "",
            globalValues: "",
            loggeduserid: window.sessionStorage.getItem("Globalid"),
          },
        ],
      };

      try {
        console.log(API_TEST_URL);
        await dispatch(Importdatatotbl(RequestData));
        NextBtn();
        setShowImportAlert(true);
      } catch (error) {
        console.error("Error downloading template:", error);
      }
    } else {
      ArcError({
        Message: "No valid data to import",
        position: "top-right",
      });
    }
  };

  const PrevBtn = () => {
    setCurrentStep(currentStep - 1);
    setisnewimport(false);
  };

  const ResetBtn = () => {
    setCurrentStep(1);
  };

  return (
    <React.Fragment>
      <section className="dataimport-page-main">
        <Container fluid>
          <Row>
            <Col xxl={12} xl={12} md={12} lg={12}>
              <MultiStepProgressBar
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            </Col>
            <div className="current-step">{ImportFlow[currentStep]}</div>
            {currentStep === 1 ? null : (
              <Col xxl={12} xl={12} md={12} lg={12}>
                <div className="action-btn">
                  {currentStep === 3 ? null : (
                    <button
                      className="float-left"
                      disabled={currentStep === 1}
                      onClick={PrevBtn}
                    >
                      Previous
                    </button>
                  )}
                  <>
                    {currentStep === 2 ? (
                      <>
                        <button
                          className="float-right"
                          onClick={handleimportdata}
                        >
                          Import
                        </button>
                      </>
                    ) : null}
                  </>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default DataImportSection;
