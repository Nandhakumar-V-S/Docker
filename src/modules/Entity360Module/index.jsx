// *******~ Import ~******** //
//? React
import React, { useContext, createContext, useState, useEffect } from "react";

//? Assets
// import useLanguage from "@/locale/useLanguage";
import { ListPageLayout } from "@/layout";
import { Container, Row, Col } from "react-bootstrap";
//? Components
import { useNavigate } from "react-router-dom";
import { get360EntityInfo } from "@/redux/Entity360/GetEntity360Info";
import { useDispatch, useSelector } from "react-redux";
import Header360V4 from "@/modules/Entity360Module/components/360headerv4";
import ContactDetails from "@/modules/Entity360Module/components/ContactDetails";
import Details360V4 from "@/modules/Entity360Module/components/360detailsv4";
// import Details360V2 from "./components/360details";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
//? CSS

//? Images

//? JSON File

//? Icons
import PageLoader from "@/components/PageLoader";
// *******~ Import ~******** //
export const Detail360Context = createContext();
export default function Detail360PageModuleV4() {
  const {
    ScreenWidth,
    BreakpointXs,
    BreakpointSm,
    BreakpointMd,
    Breakpointlg,
    BreakpointXl,
    BreakpointXxl,
  } = useContext(ContextWidthProvider);
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentLeadID, setcurrentLeadID] = useState();
 
  useEffect(() => {
    // Fetch lead details when the component mounts
    const TransactionID = sessionStorage.getItem("Current_EntityID");
    setcurrentLeadID(TransactionID);

    if (TransactionID) {
      dispatch(get360EntityInfo(TransactionID));
    } else {
      navigate("/listpage");
    }
  }, [dispatch]);

  console.log("Inside 360page V4 Module");

  return (
    <>
      {currentLeadID ? (
        <>
          <ListPageLayout>
            <Header360V4 />
            <main className="page-360-v4">
              <section className="page-360-detail-v4">
                <Container fluid>
                  <Row>
                    <Col xxl={12} xl={12} md={12} lg={12}>
                      <div className="main-page-details">
                        {/* <p>{Details?.StageName}</p> */}
                        <Detail360Context.Provider value={{}}>
                          <ContactDetails />
                          <Details360V4 />
                        </Detail360Context.Provider>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
            </main>
          </ListPageLayout>
        </>
      ) : (
        navigate("/listpage")
      )}
    </>
  );
}
