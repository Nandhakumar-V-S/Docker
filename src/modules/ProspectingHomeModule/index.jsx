// *******~ Import ~******** //
//? React
import React, { createContext, useState } from "react";
//? Assets
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//? Components
import PageHeader from "./components/PageHeader";
import ProspectingWidget from "./components/ProspectingWidget";
//? CSS

//? Images

//? JSON File

//? Icons
// *******~ Import ~******** //
export const ProspectingContext = createContext();
const ProspectingModule = () => {
  const [first, setfirst] = useState(false);
  const [FilteredData, setFilteredData] = useState("Daily");
  const [DataType, setDataType] = useState("Mine");
  return (
    <React.Fragment>
      <ProspectingContext.Provider value={{ first, setfirst }}>
        <PageHeader DataType={DataType} setDataType={setDataType} />
        <section className="prospecting-page prospecting-page-home">
          {/* <div className="prospecting-toggle">
            {["Daily", "Weekly"].map((data, index) => (
              <button
                key={index}
                onClick={() => {
                  setFilteredData(data);
                }}
                className={FilteredData === data && "active"}
              >
                {data}
              </button>
            ))}
          </div> */}
          <Container fluid>
            <Row>
              <ProspectingWidget DataType={DataType} />
            </Row>
          </Container>
        </section>
      </ProspectingContext.Provider>
    </React.Fragment>
  );
};
export default ProspectingModule;
