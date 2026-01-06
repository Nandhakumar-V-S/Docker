import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLanguage from "@/locale/useLanguage";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Dropdown, DropdownButton } from "react-bootstrap";

import { BsGrid } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import AddTask from "@/components/arccomponents/DynamicInputs/AddTask/addtask";

import { RiListSettingsFill } from "react-icons/ri";

import PageSetup from "@/context/GlobalContext/PageSetup.json";

import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { IoIosArrowBack } from "react-icons/io";
import { entitiesInfo, dataSetListInfo } from "@/redux/Report/selector";

import { ArcIconComponents } from "@/components/arccomponents/ArcIcon";
import { GrNotes } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
export default function ListHeader({
  DataSetPopupShow,
  setDataSetPopupShow,
  DataSetButton,
  DATASET_API,
}) {
  const translate = useLanguage();
  const dispatch = useDispatch();
  console.log("Inside ListPage ListHeader");
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  const [AddTaskShow, setAddTaskShow] = useState(false);
  const entities = useSelector(entitiesInfo);
  console.log(entities);
  const dataSetList = useSelector(dataSetListInfo);
  const ModuleHeader = PageSetup.Pages.ListPage.Header;
  const PageSetupHeader = PageSetup.Pages.ListPage.Header;
  const navigate = useNavigate();
  const NavigateImport = () => {
    navigate("/import");
  };
  return (
    <React.Fragment>
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
                        className={`icon data-import ${
                          DataSetPopupShow ? "true" : "false"
                        }`}
                        onClick={() =>
                          setDataSetPopupShow(
                            (prevDataSetPopupShow) => !prevDataSetPopupShow
                          )
                        }
                      >
                        <GrNotes />
                      </span>
                    )}

                    <div className="drop-down">
                      <div className="select-div">
                        <p>Import History</p>
                      </div>
                      <span className="navigate-back" onClick={NavigateImport}>
                        <span className="back-icon">
                          <IoIosArrowBack />
                        </span>
                        {PageSetupHeader.BackButton.BackToLabel}
                      </span>
                    </div>
                  </div>
                  <div className="action-add">
                    <button
                      className="add-contact-btn data-import"
                      onClick={NavigateImport}
                    >
                      <GrNotes /> Data Import
                    </button>
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
