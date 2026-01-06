import React, { useState, useEffect, useContext } from "react";
//Custom
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GrNotes } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetStatus } from "@/redux/DataImport/PostImportData";
export default function DataImportHeader({
  sessionData,
  setCurrentStep,
  setSelectedValue,
  setFile,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const NavigateImport = () => {
    dispatch(resetStatus());
    const UpdatedState = {
      key: "",
      currentStep: 1,
      Importversionid: "",
      Impotdataid: "",
    };
    setCurrentStep(1);
    setSelectedValue("cr1");
    setFile(null);
    sessionStorage.setItem("dataimport", JSON.stringify(UpdatedState));
  };
  const [importdatafor, setimportdatafor] = useState("");
  useEffect(() => {
    //sessionStorage.setItem("Fromimportscreen", JSON.stringify(0));
    setimportdatafor(sessionStorage.getItem("dataimportfor"));
  }, []);
  const NavigateImporthistory = () => {
    navigate("/importhistory");
  };
  console.log("Inside Data Import Header");
  return (
    <React.Fragment>
      <section className="list-header with-dataimport-header">
        <Container fluid>
          <Row>
            <Col xxl={12}>
              <div className="list-header-inside">
                <div className="filter-dropdown">
                  <span className="icon data-import">
                    <GrNotes />
                  </span>
                  <div className="drop-down">
                    <p>Data Import - {importdatafor}</p>
                  </div>
                </div>
                <div className="action-add">
                  {sessionData?.currentStep > 1 && (
                    <button
                      className="add-contact-btn data-import"
                      onClick={NavigateImport}
                    >
                      <GrNotes /> New Import
                    </button>
                  )}

                  <button
                    className="add-contact-btn data-import"
                    onClick={NavigateImporthistory}
                  >
                    <GrNotes /> Import History
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
