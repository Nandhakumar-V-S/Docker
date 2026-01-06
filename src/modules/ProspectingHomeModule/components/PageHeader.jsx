import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsGrid } from "react-icons/bs";

export default function PageHeader({ DataType, setDataType }) {
  // const [DataType, setDataType] = useState("Mine");
  return (
    <React.Fragment>
      <section className="list-header prospect-home-header border-header">
        <Container fluid>
          <Row>
            <Col xxl={12}>
              <div className="list-header-inside">
                <div className="filter-dropdown">
                  <span className="icon  false">
                    <BsGrid />
                  </span>

                  <div className="drop-down">
                    <div className="select-div">
                      <p>Prospecting Home</p>
                    </div>
                    <span></span>
                  </div>
                </div>
                <div className="action-add">
                  <div className="toggle-btn">
                    {["Mine", "Team"].map((data, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setDataType(data);
                        }}
                        className={DataType === data && "active"}
                      >
                        {data}
                      </button>
                    ))}
                  </div>
                  {/* <button className="add-contact-btn">Save</button> */}
                  {/* <button className="add-contact-btn">Save and Start</button> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
