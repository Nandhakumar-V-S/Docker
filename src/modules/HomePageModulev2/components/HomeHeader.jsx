import React, { useState } from "react";
//Custom
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IoHome } from "react-icons/io5";
import LeadReorderWidget from "./reorder/leadreorder";
import CallReorderWidget from "./reorder/callReorder";
import MeetingsReorderWidget from "./reorder/Meetingsorder";
import OpportunityReorderWidget from "./reorder/Opportunity";
import Accordion from "react-bootstrap/Accordion";
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import ArcOffCanva from "@/components/arccomponents/ui-components/ArcOffCanva/ArcOffCanva";
import PageSetup from "@/context/GlobalContext/PageSetup.json";
import { BiCustomize } from "react-icons/bi";
import ArcRadioBtn from "@/components/arccomponents/ui-components/ArcRadioBtn/ArcRadioBtn";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
export default function HomeHeader() {
  const [ArcOffCanvaShowRight, setArcOffCanvaShowRight] = useState(false);
  const RadioBtnData = [
    {
      Title: "Just Me",
      Value: "Just Me",
    },
    {
      Title: "Everyone",
      Value: "Everyone",
    },
  ];
  const PageSetupHeader = PageSetup.Pages.DashboardPage.Header;
  return (
    <React.Fragment>
      <section className="list-header with-home-header">
        <Container fluid>
          <Row>
            <Col xxl={12}>
              <div className="list-header-inside">
                <div className="filter-dropdown">
                  <span className="icon">
                    <IoHome />
                  </span>
                  <div className="drop-down">
                    <p>Home</p>
                    <span>Journey Home</span>
                  </div>
                </div>
                <div className="header-actions">
                  {/* <ArcOffCanva
                    Title="Create Dashboard"
                    ArcOffCanvaShow={ArcOffCanvaShowRight}
                    setArcOffCanvaShow={setArcOffCanvaShowRight}
                    BtnClassName="arc-btn-type2 create-btn"
                    CanvaClassName="create-dashboard"
                    Place="end"
                    BtnText={PageSetupHeader.HeaderButton.CreateDashboard.title}
                    Icon={
                      <>
                        <BiCustomize />
                      </>
                    }
                  >
                    <div className="dashboard-input">
                      <ArcTextBox
                        Label="Dashboard Name"
                        ClassName=""
                        PlaceHolder="Enter Your Dashboard Name"
                        Name="name"
                        Required={true}
                        ReadOnly={false}
                      />
                      <ArcRadioBtn
                        Label="Share with"
                        Required={false}
                        Name="owner"
                        RadioBtnData={RadioBtnData}
                        ClassName=""
                      />
                    </div>
                    <div className="widget-list">
                  
                      <div className="arc-accordion-always-open dashboard-accord">
                        <Accordion
                          defaultActiveKey={["0", "1", "2", "3"]}
                          alwaysOpen
                        >
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              Prospect
                              <span>
                                <MdOutlineKeyboardArrowDown />
                              </span>
                            </Accordion.Header>
                            <Accordion.Body>
                              <LeadReorderWidget />
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>
                              Qualifying Journey
                              <span>
                                <MdOutlineKeyboardArrowDown />
                              </span>
                            </Accordion.Header>
                            <Accordion.Body>
                              <CallReorderWidget />
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="2">
                            <Accordion.Header>
                              Sales Journey
                              <span>
                                <MdOutlineKeyboardArrowDown />
                              </span>
                            </Accordion.Header>
                            <Accordion.Body>
                              <MeetingsReorderWidget />
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="3">
                            <Accordion.Header>
                              Cold Calling
                              <span>
                                <MdOutlineKeyboardArrowDown />
                              </span>
                            </Accordion.Header>
                            <Accordion.Body>
                              <OpportunityReorderWidget />
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    </div>
                  </ArcOffCanva> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
