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
// import AddTask from "./Addtask/Addtask";

import { RiListSettingsFill } from "react-icons/ri";

import PageSetup from "@/context/GlobalContext/PageSetup.json";

import { ContextWidthProvider } from "@/context/widthContext/widthContext";

import {
  entitiesInfo,
  dataSetListInfo,
  entityidInfo,
} from "@/redux/Features/selector";

import { ArcIconComponents } from "@/components/arccomponents/ArcIcon";

import AddGroup from "./AddGroup/AddGroup";

import { GrNotes } from "react-icons/gr";
import Add from "@/components/AddButton/Add";
import { setLoading } from "@/redux/Features/actions";
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
  const entityId = useSelector(entityidInfo);

  const entities = useSelector(entitiesInfo);
  console.log(entities);
  const dataSetList = useSelector(dataSetListInfo);
  const ModuleHeader = PageSetup.Pages.ListPage.Header;
  const NavigateImport = () => {
    const UpdatedState = {
      key: "Created",
      currentStep: 1,
      Importversionid: "",
      Impotdataid: "",
      summarykey: "Created",
    };
    sessionStorage.setItem("dataimport", JSON.stringify(UpdatedState));
    navigate("/import");
  };

  const [featuresShow, setFeaturesShow] = useState(false);
  // const setLoader = (isloading) => {
  //   dispatch(setLoading(isloading));
  // };

  const addFeaturesPopup = {
    formId: "88B47387-09F4-4DAC-8938-DDDD03DEFC86",
    endpoint: "/arcform/transactioninsert",
    btnName: "Add Features",
    headerName: "Add Features",
    show: featuresShow,
    setShow: setFeaturesShow,
    entityId: entityId,
    instanceId: "",
    isFormattedValue: false,
    istag: false,
    // setLoading: setLoader,
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
                        <p>Features</p>
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
                    {/* <AddGroup /> */}
                    <Add popupDatas={addFeaturesPopup} />
                    {/* <button
                      className="add-contact-btn data-import"
                      onClick={NavigateImport}
                    >
                      <GrNotes /> Data Import
                    </button> */}
                    {/* <AddTask /> */}
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
