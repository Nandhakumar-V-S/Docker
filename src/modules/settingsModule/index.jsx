// *******~ Import ~******** //
//? React
import React, { useState, useRef } from "react";
//? Assets
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Outlet } from "react-router-dom";
//? Components
import ArcListHeader from "./components/ArcListHeader";
import { Sidebar } from "./components/Sidebar";

//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //
// const MenuGroupsd = [];

export default function AdminsettingModule() {
  const [DataSetPopupShow, setDataSetPopupShow] = useState(false);
  const DataSetButton = useRef(null);

  console.log("Admin Setting Module");
  return (
    <React.Fragment>
      <main className="adminsetting-module">
        <ArcListHeader
          DataSetPopupShow={DataSetPopupShow}
          setDataSetPopupShow={setDataSetPopupShow}
          DataSetButton={DataSetButton}
        />
        <section className="adminsetting-page">
          <Container fluid>
            <Row>
              <Col xxl={12}>
                <div className="adminsetting-page-inside">
                  <aside className="menusection">
                    <Sidebar />
                  </aside>
                  <main className="setting-main">
                    <Outlet />
                  </main>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </React.Fragment>
  );
}
