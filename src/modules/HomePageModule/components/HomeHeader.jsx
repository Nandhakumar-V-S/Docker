import React, { useState, useContext } from "react";
//Custom
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { RiListSettingsFill } from "react-icons/ri";
import Accordion from "react-bootstrap/Accordion";
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import ArcOffCanva from "@/components/arccomponents/ui-components/ArcOffCanva/ArcOffCanva";
import ArcRadioBtn from "@/components/arccomponents/ui-components/ArcRadioBtn/ArcRadioBtn";
import { BsGrid } from "react-icons/bs";
import PageSetup from "@/context/GlobalContext/PageSetup.json";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BiCustomize } from "react-icons/bi";
import LeadReorderWidget from "./reorder/leadreorder";
import CallReorderWidget from "./reorder/callReorder";
import MeetingsReorderWidget from "./reorder/callReorder";
import OpportunityReorderWidget from "./reorder/callReorder";
import { IoHome } from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { MdUploadFile } from "react-icons/md";
import AddTask from "@/components/arccomponents/DynamicInputs/AddTask/addtask";
//Custom End
import { ArcIconComponents } from "@/components/arccomponents/ArcIcon";
import { ArcDropDownControled } from "@/components/arccomponents/ui-components/ArcDropDown/ArcDropDown";
import { Link } from "react-router-dom";
// import PageSetup from "@/context/GlobalContext/PageSetup.json";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
export default function HomeHeader() {
  const navigate = useNavigate();
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  const [AddTaskShow, setAddTaskShow] = useState(false);
  console.log("Inside Home Page Header");
  //! ArcDropDownControledData State
  const ArcDropDownControledData = [
    { id: 1, value: "Sales", Icon: "" },
    { id: 2, value: "Marketing", Icon: "" },
    { id: 3, value: "Default Dashboard", Icon: "" },
  ];
  const ModuleHeader = PageSetup.Pages.ListPage.Header;
  const [SelectedValue, setSelectedValue] = useState(
    ArcDropDownControledData[1].value
  );
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
  const handleUploadBill = () => {
    navigate("/uploadbill");
  };
  const handleCreateBill = () => {
    navigate("/addlead");
  };
  const [ArcOffCanvaShowRight, setArcOffCanvaShowRight] = useState(false);
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
                  </div>
                </div>

                <div className="action-add">
                  {/* {ModuleHeader.HeaderButton.MoreAction.Visibility && (
                    <DropdownButton
                      align="end"
                      id="dropdown-item-button"
                      title={
                        ScreenWidth > BreakpointSm ? (
                          <>
                            {ModuleHeader.HeaderButton.MoreAction.Label}
                            <span>
                              <IoIosArrowDown />
                            </span>
                          </>
                        ) : (
                          <span>
                            <RiListSettingsFill />
                          </span>
                        )
                      }
                    >
                      <div className="item-div">
                        {ModuleHeader.HeaderButton.MoreAction.DropdownOptions.map(
                          (data, index) => (
                            <>
                              <Dropdown.Item
                                eventKey={data}
                                as="button"
                                key={index}
                              >
                                {ArcIconComponents[data.Icon]}
                                {data.Label}
                              </Dropdown.Item>
                            </>
                          )
                        )}
                      </div>
                    </DropdownButton>
                  )} */}
                  {/* <AddTask show={AddTaskShow} setShow={setAddTaskShow} /> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
