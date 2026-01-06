// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets
import { Container, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
//? Components
import {
  ArcDropDownDefault,
  ArcDropDownControled,
  ArcDropDownControledSearchIcon,
} from "@/components/arccomponents/ui-components/ArcDropDown/ArcDropDown";
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import ArcOffCanva from "@/components/arccomponents/ui-components/ArcOffCanva/ArcOffCanva";
import {
  ArcButtonPrimary,
  ArcButtonSecondary,
  ArcButtonWithIcon,
  ArcButtonWithIconType1,
  ArcButtonWithIconType2,
  ArcButtonWithIconType3,
} from "@/components/arccomponents/ui-components/ArcButtons/ArcButtons";
import ArcRadioBtn from "@/components/arccomponents/ui-components/ArcRadioBtn/ArcRadioBtn";
//? CSS

//? Images

//? JSON File
import PageSetup from "@/context/GlobalContext/PageSetup.json";
//? Icons

import { BiCustomize } from "react-icons/bi";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsGrid } from "react-icons/bs";
// import { IoBrowsersSharp } from "react-icons/io5";
// !Reorder
import LeadReorderWidget from "./reorder/leadreorder";
import CallReorderWidget from "./reorder/callReorder";
import MeetingsReorderWidget from "./reorder/callReorder";
import OpportunityReorderWidget from "./reorder/callReorder";
// *******~ Import ~******** //

const DashboardHeader = () => {
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

  const [ArcOffCanvaShowRight, setArcOffCanvaShowRight] = useState(false);
  const [CustomizeWidget, setCustomizeWidget] = useState(false);
  const PageSetupHeader = PageSetup.Pages.DashboardPage.Header;
  return (
    <>
      {PageSetupHeader.Visibility && (
        <section className="dashboard-header">
          <Container fluid>
            <Row>
              <Col>
                <div className="inside-header">
                  <div className="header-dropdown">
                    <span className="icon">
                      <BsGrid />
                    </span>
                    <h3>{PageSetupHeader.HeaderTitle}</h3>
                  </div>
                  <div className="header-actions">
                    {PageSetupHeader.HeaderButton.CreateDashboard
                      .Visibility && (
                      <ArcOffCanva
                        Title="Create Dashboard"
                        ArcOffCanvaShow={ArcOffCanvaShowRight}
                        setArcOffCanvaShow={setArcOffCanvaShowRight}
                        BtnClassName="arc-btn-type2 create-btn"
                        CanvaClassName="create-dashboard"
                        Place="end"
                        BtnText={
                          PageSetupHeader.HeaderButton.CreateDashboard.title
                        }
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
                          {/* <h3>Widget visible in Dashboard</h3> */}
                          <div className="arc-accordion-always-open dashboard-accord">
                            <Accordion
                              defaultActiveKey={["0", "1", "2", "3"]}
                              alwaysOpen
                            >
                              <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                  Leads
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
                                  Calls
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
                                  Meetings
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
                                  Meetings
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
                      </ArcOffCanva>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};
export default DashboardHeader;
