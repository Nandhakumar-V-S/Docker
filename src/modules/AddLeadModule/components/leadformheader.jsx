// *******~ Import ~******** //
//? React
// import React from "react";
//? Assets
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import {
  ArcButtonPrimary,
  ArcButtonSecondary,
  ArcButtonWithIcon,
  ArcButtonWithIconType1,
  ArcButtonWithIconType2,
  ArcButtonWithIconType3,
} from "@/components/arccomponents/ui-components/ArcButtons/ArcButtons";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons

import { FaArrowLeft } from "react-icons/fa6";
// *******~ Import ~******** //

const LeadFormHeader = ({
  handleSaveButtonClick,
  handleCancelButtonClick,
  handleSaveNewButtonClick,
  addStatus,
}) => {
  return (
    <section className="leadform-header">
      <Container fluid="xxl">
        <Row>
          <Col xxl={12} xl={12} md={12}>
            <div className="lead-header-inside">
              <div className="page-title">
                <Link to="/listpage" className="icon">
                  <FaArrowLeft />
                </Link>
                <h5>Add Entity</h5>
              </div>
              <div className="action-btn-group">
                <ArcButtonSecondary
                  ClassName="cancel"
                  BtnText="Cancel"
                  OnClick={handleCancelButtonClick}
                />
                <ArcButtonPrimary
                  ClassName="save-new"
                  BtnText="Save and New"
                  OnClick={handleSaveNewButtonClick}
                />
                <ArcButtonPrimary
                  ClassName="save"
                  disabled={addStatus === "loading..."}
                  BtnText={addStatus === "loading..." ? addStatus : "Save"}
                  OnClick={handleSaveButtonClick}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default LeadFormHeader;
