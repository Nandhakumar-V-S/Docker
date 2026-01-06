// import React from "react";

// import useLanguage from "@/locale/useLanguage";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
//Custom
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Dropdown, DropdownButton } from "react-bootstrap";
//import ListTable from "./userdata";
//import Actionbutton1 from "./Actionbutton1";
//import UserData from "./json/userdata.json";
import PageSetup from "@/context/GlobalContext/PageSetup.json";
import AddAttribute from "./AddAttribute/AddAttribute";
import { BsGrid } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineAddIcCall } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import { ArcIconComponents } from "@/components/arccomponents/ArcIcon";
//Custom End
const PageSetupHeader = PageSetup.Pages.Page360.Header;
export default function Header360V4() {
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  // const translate = useLanguage();
  const navigate = useNavigate();
  const NavigateToListPage = () => {
    navigate(previousPathName);
  };
  return (
    <>
      {PageSetupHeader.Visibility && (
        <section className="list-header details360-header">
          <Container fluid>
            <Row>
              <Col xxl={12}>
                <div className="list-header-inside">
                  <div className="filter-dropdown">
                    <span className="icon">
                      <BsGrid />
                    </span>
                    <div className="drop-down">
                      <p>{PageSetupHeader.Attribute360Title}</p>
                      <span
                        onClick={() => {
                          NavigateToListPage('adminsetting');
                        }}
                      >
                        <span className="back-icon">
                          <IoIosArrowBack />
                        </span>
                        Back to{" "}
                        {"Entity"}
                      </span>
                    </div>
                  </div>
                  <div className="action-add">
                    {/* {PageSetupHeader.HeaderButton.Call.Visibility && (
                      <button className="action-btn">
                        <span>
                          <MdOutlineAddIcCall />
                        </span>
                        Call
                      </button>
                    )}
                    {PageSetupHeader.HeaderButton.Meeting.Visibility && (
                      <button className="action-btn">
                        <span>
                          <IoCalendarClearOutline />
                        </span>
                        Meeting
                      </button>
                    )} */}
                    {PageSetupHeader.HeaderButton.MoreAction.Visibility && (
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
                          {PageSetupHeader.HeaderButton.MoreAction.DropdownOptions.map(
                            (data, index) => (
                              <Dropdown.Item
                                eventKey={data}
                                as="button"
                                key={index}
                              >
                                {ArcIconComponents[data.Icon]}
                                {data.Label}
                              </Dropdown.Item>
                            )
                          )}
                        </div>
                      </DropdownButton>
                    )}
                    <AddAttribute />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
}
