import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLanguage from "@/locale/useLanguage";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Dropdown, DropdownButton } from "react-bootstrap";

import { BsGrid } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import AddTask from "./Addtask/Addtask";

import { RiListSettingsFill } from "react-icons/ri";

import PageSetup from "@/context/GlobalContext/PageSetup.json";

import { ContextWidthProvider } from "@/context/widthContext/widthContext";

import { entitiesInfo, dataSetListInfo } from "@/redux/AdminSetting/selector";

import { ArcIconComponents } from "@/components/arccomponents/ArcIcon";
import { GrNotes } from "react-icons/gr";
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

  const entities = useSelector(entitiesInfo);
  console.log(entities);
  const dataSetList = useSelector(dataSetListInfo);
  const ModuleHeader = PageSetup.Pages.ListPage.Header;

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
                        <p>Entities</p>
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

                    <AddTask />
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
