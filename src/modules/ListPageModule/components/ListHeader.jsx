import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLanguage from "@/locale/useLanguage";

//Custom
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Dropdown, DropdownButton } from "react-bootstrap";

import { BsGrid } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

// import { ListContext } from "@/modules/ListPageModule";
import { RiListSettingsFill } from "react-icons/ri";

import PageSetup from "@/context/GlobalContext/PageSetup.json";
//Custom End

import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { entitiesInfo, dataSetListInfo } from "@/redux/listpage/selector";
import { selectNewEntity } from "@/redux/listpage/actions";
import { ArcIconComponents } from "@/components/arccomponents/ArcIcon";
export default function ListHeader({
  DataSetPopupShow,
  setDataSetPopupShow,
  DataSetButton,
}) {
  const translate = useLanguage();
  const dispatch = useDispatch();
  console.log("Inside ListPage ListHeader");
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);

  const entities = useSelector(entitiesInfo);
  console.log(entities);
  const dataSetList = useSelector(dataSetListInfo);
  const ModuleHeader = PageSetup.Pages.ListPage.Header;

  const handleDropdownSelect = (entityid) => {
    console.log(entityid);
    dispatch(selectNewEntity(entityid));
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
                        <DropdownButton
                          id="dropdown-item-button"
                          title={
                            <>
                              {entities?.find((entity) => entity.isselected)
                                ?.displayname || "...loading"}
                              <span>
                                <IoIosArrowDown />
                              </span>
                            </>
                          }
                        >
                          <div className="item-div">
                            {entities?.map((data, index) => (
                              <Dropdown.Item
                                eventKey={data}
                                as="button"
                                key={index}
                                onClick={() =>
                                  handleDropdownSelect(data.entityid)
                                }
                              >
                                {/* {ArcIconComponents[data.Icon]} */}
                                {data.displayname}
                              </Dropdown.Item>
                            ))}
                          </div>
                        </DropdownButton>
                      </div>
                      {dataSetList?.map((data, index) => (
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

                    {/* <AddLeads /> */}
                    {/* {ModuleHeader.HeaderButton.AddLead.Visibility && (
                      <LeadForm />
                    )} */}
                    {/* <AttributeForm /> */}
                    {/* <Actionbutton1 /> */}
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
