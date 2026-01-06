// *******~ Import ~******** //
//? React
import React, { useContext } from "react";
//? Assets
import useLanguage from "@/locale/useLanguage";
import { ListPageLayout } from "@/layout";
import { Container, Row, Col } from "react-bootstrap";
//? Components
import Header360 from "./components/360header";
import ContactDetails from "./components/contact-details";
import AllDetails from "./components/all-details";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

export default function Detail360PageModule() {
  const {
    ScreenWidth,
    BreakpointXs,
    BreakpointSm,
    BreakpointMd,
    Breakpointlg,
    BreakpointXl,
    BreakpointXxl,
  } = useContext(ContextWidthProvider);
  //   const translate = useLanguage();
  console.log("Inside 360page Module");
  return (
    <ListPageLayout>
      <Header360 />
      <main className="page-360">
        <section className="page-360-detail">
          <Container fluid>
            <Row>
              <Col xxl={3} xl={3} md={4} lg={3}>
                <ContactDetails />
              </Col>
              <Col className="details-row" xxl={9} xl={9} md={8} lg={9}>
                <AllDetails />
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </ListPageLayout>
  );
}
