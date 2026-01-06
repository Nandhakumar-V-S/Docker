import React from "react";

import useLanguage from "@/locale/useLanguage";

//Custom
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Task from "./task";
import { Dropdown, DropdownButton } from "react-bootstrap";
//import ListTable from "./userdata";
//import Actionbutton1 from "./Actionbutton1";
//import UserData from "./json/userdata.json";

import { BsGrid } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineAddIcCall } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
//Custom End

export default function Header360() {
  const translate = useLanguage();
  console.log("Inside ListPage ListHeader");

  return (
    <section className="list-header">
      <Container fluid>
        <Row>
          <Col xxl={12}>
            <div className="list-header-inside">
              <div className="filter-dropdown">
                <span className="icon">
                  <BsGrid />
                </span>
                <div className="drop-down">
                  <p>Contact detail</p>
                  <span>
                    <span>
                      <IoIosArrowBack />
                    </span>
                    Back to contacts
                  </span>
                </div>
              </div>
              <div className="action-add">
                <button className="action-btn">
                  <span>
                    <MdOutlineAddIcCall />
                  </span>
                  Call
                </button>
                <button className="action-btn">
                  <span>
                    <IoCalendarClearOutline />
                  </span>
                  Meeting
                </button>
                <Task />

                <DropdownButton
                  align="end"
                  id="dropdown-item-button"
                  title={
                    <>
                      More Action
                      <span>
                        <IoIosArrowDown />
                      </span>
                    </>
                  }
                >
                  <div className="item-div">
                    {[
                      { title: "Asign to", Icon: <FaRegUser /> },
                      {
                        title: "Import Contact",
                        Icon: <IoDocumentTextOutline />,
                      },
                      { title: "Change Status", Icon: <LiaExchangeAltSolid /> },
                      { title: "Delete", Icon: <RiDeleteBinLine /> },
                    ].map((data, index) => (
                      <>
                        <Dropdown.Item eventKey={data} as="button" key={index}>
                          {data.Icon}
                          {data.title}
                        </Dropdown.Item>
                      </>
                    ))}
                  </div>
                </DropdownButton>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
