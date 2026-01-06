import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLanguage from "@/locale/useLanguage";

//Custom
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Dropdown, DropdownButton } from "react-bootstrap";

import { BsGrid } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
// import AddTask from "@/components/arccomponents/DynamicInputs/AddTask/addtask";

import { RiListSettingsFill } from "react-icons/ri";

import PageSetup from "@/context/GlobalContext/PageSetup.json";

import { ContextWidthProvider } from "@/context/widthContext/widthContext";

import { entitiesInfo, dataSetListInfo } from "@/redux/Followup/selector";

import { ArcIconComponents } from "@/components/arccomponents/ArcIcon";
// import AddFollowUps from "../../../components/FollowupComp/Wijmo/AddFollowUps/AddFollowUps";
//import AddFollowUps from "@/modules/FollowupModule/components/AddFollowUps/AddFollowUps";
import AddFollowups from "@/modules/FollowupModule/components/AddFollowUps/AddFollowUps";

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
  const [show, setShow] = useState(false);
  const entities = useSelector(entitiesInfo);
  console.log(entities);
  const dataSetList = useSelector(dataSetListInfo);
  const ModuleHeader = PageSetup.Pages.ListPage.Header;

  const [followUp, setFollowUp] = useState(false);
  const addFollowup = {
    // formId: "88B47387-09F4-4DAC-8938-DDDD03DEFC86",
    endpoint: "",
    btnName: "Add followUp",
    headerName: "Add followUp",
    show: followUp,
    setShow: setFollowUp,
    entityId: "",
    // instanceId: "",
    // isFormattedValue: false,
    // istag: false,
    // masterData: masterData,
    // pageDetails: {
    //   name: bindingName,
    //   instanceId: instanceId,
    //   disabled: true,
    // },
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
                        <p>Followup</p>
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
                    {/* <AddTask show={AddTaskShow} setShow={setAddTaskShow} /> */}
                    {/* <AddFollowUps
                      // setArcFilterPopupshow={setArcFilterPopupshow}
                      show={AddTaskShow}
                      setShow={setAddTaskShow}
                      title="Add Follow Up"
                      // setTitleFieldValue={setTitleFieldValue}
                      // titleFieldValue={titleFieldValue}
                    /> */}
                    <AddFollowups show={show} setShow={setShow} />
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
