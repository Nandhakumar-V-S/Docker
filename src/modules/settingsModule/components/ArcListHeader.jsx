/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { BsGrid } from "react-icons/bs";
// import AddTask from "./Addtask/Addtask";
import { dataSetListInfo } from "@/redux/AdminSetting/selector";

export default function ArcListHeader({
  DataSetPopupShow,
  setDataSetPopupShow,
  DataSetButton,
}) {
  const dataSetList = useSelector(dataSetListInfo);

  return (
    <React.Fragment>
      <section className="arc-list-header">
        <Container fluid>
          <Row>
            <Col xxl={12}>
              <div className="arc-list-header-inside">
                <div className="filter-dropdown">
                  <span
                    ref={DataSetButton}
                    className={`icon ${DataSetPopupShow ? "true" : "false"}`}
                    onClick={() =>
                      setDataSetPopupShow(
                        (prevDataSetPopupShow) => !prevDataSetPopupShow
                      )
                    }
                  >
                    <BsGrid />
                  </span>
                  <div className="drop-down">
                    <div className="select-div">
                      <p>Settings</p>
                    </div>
                    {/* {dataSetList.map((data, index) => (
                      <span key={index}>{data.isselected && data.title}</span>
                    ))} */}
                    <span>Back</span>
                  </div>
                </div>
                <div className="action-add">{/* <AddTask /> */}</div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
