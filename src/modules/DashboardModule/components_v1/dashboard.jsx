// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

//? Components
import WidgetGroup from "./widget-group";
//? CSS

//? Images

//? JSON File

//? Icons

import { BsThreeDotsVertical } from "react-icons/bs";
import { BsPlus } from "react-icons/bs";

// *******~ Import ~******** //

const DashboardSection = () => {
  const TabLists = [
    {
      TabKey: "Activity",
      TabTitle: (
        <>
          <>
            Activity
            <i>
              <BsThreeDotsVertical />
            </i>
          </>
        </>
      ),
      TabContent: <></>,
    },
    {
      TabKey: "Sales",
      TabTitle: (
        <>
          <>
            Sales
            <i>
              <BsThreeDotsVertical />
            </i>
          </>
        </>
      ),
      TabContent: (
        <>
          <WidgetGroup />
        </>
      ),
    },
    {
      TabKey: "Support",
      TabTitle: (
        <>
          <>
            Support
            <i>
              <BsThreeDotsVertical />
            </i>
          </>
        </>
      ),
      TabContent: <></>,
    },
    {
      TabKey: "Marketing",
      TabTitle: (
        <>
          <>
            Marketing
            <i>
              <BsThreeDotsVertical />
            </i>
          </>
        </>
      ),
      TabContent: <></>,
    },
  ];
  const [key, setKey] = useState("Sales");
  return (
    <>
      <>
        <div className="dashboard-section">
          <Container fluid>
            <Row>
              <Col className="dashboard-col" xxl={12} xl={12} md={12}>
                <div className="arc-tab-content dashboard-tab">
                  <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="dashboard-tab-main"
                    transition={false}
                  >
                    {TabLists.map((data, index) => (
                      <Tab
                        eventKey={data.TabKey}
                        key={index}
                        title={data.TabTitle}
                        className="dashboard-tab-main"
                      >
                        <>
                          <div className="tab-main-content">
                            {data.TabContent}
                          </div>
                        </>
                      </Tab>
                    ))}
                    <Tab
                      title={
                        <>
                          <div className="select-div">
                            <DropdownButton
                              id="dropdown-item-button"
                              title="+ Add"
                            >
                              <div className="item-div">
                                {[
                                  { Title: "Activity", CreatedBy: "Jhon" },
                                  { Title: "Sales", CreatedBy: "Jhon" },
                                  { Title: "Marketing", CreatedBy: "Jhon" },
                                  { Title: "Support", CreatedBy: "Jhon" },
                                ].map((data, index) => (
                                  <>
                                    <Dropdown.Item
                                      //   eventKey={data}
                                      as="button"
                                      key={index}
                                    >
                                      <p>
                                        <BsPlus /> {data.Title}
                                      </p>
                                      <span className="create-by">
                                        -{data.CreatedBy}
                                      </span>
                                    </Dropdown.Item>
                                  </>
                                ))}
                              </div>
                            </DropdownButton>
                          </div>
                        </>
                      }
                    ></Tab>
                  </Tabs>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
      {/* <div className="dashboard-grouping-header">
        <Container fluid>
          <Row>
            <Col xxl={12}>
              <ul>
                <li>
                  Activity
                  <i>
                    <BsThreeDotsVertical />
                  </i>
                </li>
                <li>
                  Sales
                  <i>
                    <BsThreeDotsVertical />
                  </i>
                </li>
                <li>
                  Support
                  <i>
                    <BsThreeDotsVertical />
                  </i>
                </li>
                <li>
                  Marketing
                  <i>
                    <BsThreeDotsVertical />
                  </i>
                </li>
                  <div className="select-div">
                            <DropdownButton
                              id="dropdown-item-button"
                              title="+ Add"
                            >
                              <div className="item-div">
                                {[
                                  "Activity",
                                  "Sales",
                                  "Marketing  ",
                                  "Support",
                                ].map((data, index) => (
                                  <>
                                    <Dropdown.Item
                                        eventKey={data}
                                      as="button"
                                      key={index}
                                    >
                                      <BsPlus /> {data}
                                    </Dropdown.Item>
                                  </>
                                ))}
                              </div>
                            </DropdownButton>
                          </div>
              </ul>
            </Col>
          </Row>
        </Container>
      </div> */}
    </>
  );
};
export default DashboardSection;
