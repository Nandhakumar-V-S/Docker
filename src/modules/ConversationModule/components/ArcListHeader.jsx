/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { BsGrid } from "react-icons/bs";
import CreateMailTemplate from "./CreateTemplate";
import SendNewMail from "./SendNewMail";
export default function ArcListHeader() {
  const [newEmailShow, setNewEmailSetShow] = useState(false);
  return (
    <React.Fragment>
      <section className="arc-list-header">
        <Container fluid>
          <Row>
            <Col xxl={12}>
              <div className="arc-list-header-inside">
                <div className="filter-dropdown">
                  <span className="icon">
                    <BsGrid />
                  </span>
                  <div className="drop-down">
                    <div className="select-div">
                      <p>Conversation</p>
                    </div>
                    <span>Back</span>
                  </div>
                </div>
                <div className="action-add">
                  <CreateMailTemplate />
                  <SendNewMail
                    ArcOffCanvaShow={newEmailShow}
                    setArcOffCanvaShow={setNewEmailSetShow}
                    buttonVisible={true}
                    footerBtnName={"Save and Apply"}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
