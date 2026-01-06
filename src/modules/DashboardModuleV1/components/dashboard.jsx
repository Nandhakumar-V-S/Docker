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
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
//? Components
import WidgetGroup from "./widget-group";
//? CSS

//? Images

//? JSON File

//? Icons

import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { BsPlus } from "react-icons/bs";
import { BsGrid } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsFillGrid1X2Fill } from "react-icons/bs";

// *******~ Import ~******** //

const DashboardSection = () => {
  const [key, setKey] = useState("Sales");
  return (
    <>
      <>
        <div className="dashboard-section-tab">
          <div className="dashboard-grouping-header">
            <Container fluid>
              <Row>
                <Col xxl={12}>
                  <ul>
                    <li>
                      <button>Activity</button>
                      <HeaderTabAction />
                    </li>
                    <li className="active">
                      <button>Sales</button>
                      <HeaderTabAction />
                    </li>
                    <li>
                      <button> Support</button>
                      <HeaderTabAction />
                    </li>
                    <li>
                      <button> Marketing</button>
                      <HeaderTabAction />
                    </li>
                    <div className="select-div">
                      <DropdownButton id="dropdown-item-button" title="+ Add">
                        <div className="item-div">
                          {["Activity", "Sales", "Marketing  ", "Support"].map(
                            (data, index) => (
                              <>
                                <Dropdown.Item
                                  eventKey={data}
                                  as="button"
                                  key={index}
                                >
                                  <BsPlus /> {data}{" "}
                                  <span>- Jhon {index + 1}</span>
                                </Dropdown.Item>
                              </>
                            )
                          )}
                        </div>
                      </DropdownButton>
                    </div>
                  </ul>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div className="dashboard-widget">
          <Container fluid>
            <Row>
              <Col xxl={12} xl={12}>
                <WidgetGroup />
              </Col>
            </Row>
          </Container>
        </div>
      </>
    </>
  );
};
export default DashboardSection;

function HeaderTabAction() {
  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        rootClose={true}
        overlay={
          <Popover className="header-tab-action">
            <Popover.Body>
              <div className="action-btn-group">
                <button>
                  <LuLayoutDashboard /> Customize
                </button>
                <button>
                  <MdDeleteOutline /> Remove
                </button>
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <i>
          <BsThreeDotsVertical />
        </i>
      </OverlayTrigger>
    </>
  );
}
