import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLanguage from "@/locale/useLanguage";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Dropdown, DropdownButton } from "react-bootstrap";

import { BsGrid } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import AddProject from "./Addproject/Addproject";

import { RiDeleteBinLine, RiListSettingsFill } from "react-icons/ri";

import PageSetup from "@/context/GlobalContext/PageSetup.json";

import { ContextWidthProvider } from "@/context/widthContext/widthContext";

import {
  entitiesInfo,
  dataSetListInfo,
  postDataInfo,
  usereamilInfo,
} from "@/redux/Activitylog/selector";

import { ArcIconComponents } from "@/components/arccomponents/ArcIcon";
import { GrNotes } from "react-icons/gr";
import { FiPlus } from "react-icons/fi";
import { ArcDropDownDefault } from "@/components/arccomponents/ui-components/ArcDropDown/ArcDropDown";
import { FaRegUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LiaExchangeAltSolid } from "react-icons/lia";
import Exporttypepopup from "@/components/arccomponents/ui-components/ArcAlertPopup/Exporttypepopup";
import { PiExportBold } from "react-icons/pi";
import { RecurrencePopup } from "@/components/arccomponents/ui-components/ArcAlertPopup/RecurrencePopup";
import { TbFileInvoice } from "react-icons/tb";
export default function ListHeader({
  DataSetPopupShow,
  setDataSetPopupShow,
  DataSetButton,
  DATASET_API,
}) {
  const translate = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("Inside ListPage ListHeader");
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  const postdata = useSelector(postDataInfo);
  const entities = useSelector(entitiesInfo);
  console.log(entities);
  const dataSetList = useSelector(dataSetListInfo);
  const ModuleHeader = PageSetup.Pages.ListPage.Header;
  const NavigateImport = () => {
    navigate("/import");
  };

  const DropdownItemsWithURL = [
    { Title: "Asign to", Icon: <FaRegUser />, Url: "/" },
    {
      Title: "Import Contact",
      Icon: <IoDocumentTextOutline />,
      Url: "/",
    },
    { Title: "Change Status", Icon: <LiaExchangeAltSolid />, Url: "/" },
    { Title: "Delete", Icon: <RiDeleteBinLine />, Url: "/" },
  ];
  const [showRecurrencePopup, setShowRecurrencePopup] = useState(false);


  return (
    <React.Fragment>
        <RecurrencePopup
  ArcOffCanvaShow={showRecurrencePopup}
  setArcOffCanvaShow={setShowRecurrencePopup}
/>
      {ModuleHeader.Visibility && (
        <section className="list-header">
          <Container fluid>
            <Row>
              <Col xxl={12}>
                <div className="list-header-inside">
                  <div className="filter-dropdown">
                    {ModuleHeader.DataSetIcon && (
                      <span
                        ref={DataSetButton}
                        className={`icon ${
                          DataSetPopupShow ? "true" : "false"
                        }`}
                        onClick={() =>
                          setDataSetPopupShow(
                            (prevDataSetPopupShow) => !prevDataSetPopupShow
                          )
                        }
                      >
                        <BsGrid />
                      </span>
                    )}

                    <div className="drop-down">
                      <div className="select-div">
                        <p>Tickets</p>
                      </div>
                      {dataSetList.map((data, index) => (
                        <span key={index}>{data.isselected && data.title}</span>
                      ))}
                    </div>
                  </div>
                  <div className="action-add">
                    {ModuleHeader.HeaderButton.MoreAction.Visibility && (
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
                    <button 
                    className="add-contact-btn"
                    onClick={() => setShowRecurrencePopup(true)}>
                     <TbFileInvoice />  Recurrence 
                    </button>
                    <ArcDropDownDefault
                      Title="More Action"
                      DropdownItems={DropdownItemsWithURL}
                    />
                    <button
                      className="add-contact-btn"
                      onClick={() => {
                        navigate("/createTicket");
                      }}
                    >
                      <FiPlus /> New Ticket
                    </button>

                    {/* <AddProject /> */}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </React.Fragment>
  );
}
