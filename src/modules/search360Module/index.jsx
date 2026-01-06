import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ListPageLayout } from "@/layout";
import Search360Header from "./components/Search360Header";
import ContactDetails from "./components/ContactDetails";
import { AllDetails } from "./components/360Details";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";

import { Container, Row, Col } from "react-bootstrap";
import { getSearch360EntityInfo } from "@/redux/GlobalSearch/GetSearch360EntityInfo";

//json

export const Search360Context = createContext();
function Search360Module() {
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
    const TransactionID = sessionStorage.getItem("Current_EntityID");
    setcurrentLeadID(TransactionID);
    if (TransactionID) {
      dispatch(getSearch360EntityInfo({ TransactionID, previousPathName }));
    } else {
      navigate("/execution");
    }
  }, [dispatch]);

  console.log("Inside search360 Module");

  return (
    <>
      {currentLeadID ? (
        <>
          <ListPageLayout>
            {/* Header360v4 */}
            <Search360Header />
            <main className="page-360-v4">
              <section className="page-360-detail-v4">
                <Container fluid>
                  <Row>
                    <Col xxl={12} xl={12} md={12} lg={12}>
                      <div className="main-page-details">
                        <Search360Context.Provider value={{}}>
                          <ContactDetails />
                          <AllDetails />
                        </Search360Context.Provider>
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

export default Search360Module;
