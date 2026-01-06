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

//? Icons

import { BiCustomize } from "react-icons/bi";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import ReorderWidget from "./reorder/reorder";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoBrowsersSharp } from "react-icons/io5";
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

  return (
    <section className="dashboard-header">
      <Container fluid>
        <Row>
          <Col>
            <div className="inside-header">
              <div className="header-dropdown">
                <h3>Dashboard</h3>
              </div>
              <div className="header-actions">
                <ArcOffCanva
                  Title="Create Dashboard"
                  ArcOffCanvaShow={ArcOffCanvaShowRight}
                  setArcOffCanvaShow={setArcOffCanvaShowRight}
                  BtnClassName="arc-btn-type2 create-btn"
                  CanvaClassName="create-dashboard"
                  Place="end"
                  BtnText="Create Dashboard"
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
                      <Accordion defaultActiveKey={"0"}>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            Dashboard Widget Group 01
                            <span>
                              <MdOutlineKeyboardArrowDown />
                            </span>
                          </Accordion.Header>
                          <Accordion.Body>
                            <ReorderWidget />
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>
                            Dashboard Widget Group 02
                            <span>
                              <MdOutlineKeyboardArrowDown />
                            </span>
                          </Accordion.Header>
                          <Accordion.Body>
                            <ReorderWidget />
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  </div>
                </ArcOffCanva>

                <ArcOffCanva
                  Title="Customize Widget"
                  ArcOffCanvaShow={CustomizeWidget}
                  setArcOffCanvaShow={setCustomizeWidget}
                  BtnClassName="arc-btn-primary arc-btn-secondary customize-btn"
                  CanvaClassName="customize-widget"
                  Place="end"
                  BtnText="Customize"
                  Icon={
                    <>
                      <BsFillGrid1X2Fill />
                    </>
                  }
                >
                  {/* <ReorderWidget /> */}
                  <div className="widget-list">
                    {/* <h3>Widget visible in Dashboard</h3> */}
                    <div className="arc-accordion-always-open dashboard-accord">
                      <Accordion defaultActiveKey={"0"}>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            Dashboard Widget Group 01
                            <span>
                              <MdOutlineKeyboardArrowDown />
                            </span>
                          </Accordion.Header>
                          <Accordion.Body>
                            <ReorderWidget />
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>
                            Dashboard Widget Group 02
                            <span>
                              <MdOutlineKeyboardArrowDown />
                            </span>
                          </Accordion.Header>
                          <Accordion.Body>
                            {/* <ReorderWidget initialItems={MyLeads} /> */}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  </div>
                </ArcOffCanva>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default DashboardHeader;
