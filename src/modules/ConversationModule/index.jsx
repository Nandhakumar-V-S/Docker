// *******~ Import ~******** //
//? React
import React, { useState } from "react";
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

export default function ConversationMudule() {
  const [DataSetPopupShow, setDataSetPopupShow] = useState(false);
  console.log("Conversation Mudule");
  return (
    <React.Fragment>
      <main className="conversation-module">
        <ArcListHeader
          DataSetPopupShow={DataSetPopupShow}
          setDataSetPopupShow={setDataSetPopupShow}
        />
        <section className="conversation-page">
          <Container fluid>
            <Row>
              <Col xxl={12}>
                <div className="conversation-page-inside">
                  <aside className="menusection">
                    <Sidebar />
                  </aside>
                  <main className="conversation-view">
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
