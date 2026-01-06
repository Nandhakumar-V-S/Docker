//import { Tag, Row, Col } from 'antd';
import React, {
  createContext,
  useState,
  useRef,
  useContext,
  useEffect,
} from "react";
import useLanguage from "@/locale/useLanguage";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import { ListPageLayout } from "@/layout";
import { useLocation } from "react-router-dom";
import WijimoGrid from "../DashboardModule/components/Wijimo";
import WijmoLayout from "@/modules/JourneyModule/WijmoLayout/WijmoLayout";
import ListHeader from "./components/ListHeader";
import FilterHeaderLayout from "@/modules/JourneyModule/FilterHeaderLayout/FilterHeaderLayout";
import DataSetPopup from "./components/dataset";
import DATASET_API from "./components/datasetapi.json";
import { Container, Row, Col } from "react-bootstrap";
import Journey from "./WijmoLayout/DatasetJoureny";

export const ListContext = createContext();

export default function JourneyModule() {
  const { previousPathName, setPreviousPathName } = useContext(
    ArcGlobalContextProvider
  );
  // const [PreviousPath, setPreviousPath] = useState();
  const [LeadStageValues, setLeadStageValues] = useState([]);
  const [PageView, setPageView] = useState("list");
  const [DataSetPopupShow, setDataSetPopupShow] = useState(false);
  const DataSetButton = useRef(null);
  const [Tableloading, setTableLoading] = useState(false);

  let location = useLocation();
  const currentPathName = location.pathname;

  // const endsWithSpecificString = (str) => currentPathName.endsWith(str);

  useEffect(() => {
    setPreviousPathName(currentPathName);
    sessionStorage.setItem("PreviousPath", currentPathName);
  }, [currentPathName]);
  console.log("Inside ListPage Module");
  console.log("Current Location:", previousPathName);

  return (
    <ListContext.Provider value={{ LeadStageValues, setLeadStageValues }}>
      <ListPageLayout>
        <ListHeader
          DataSetPopupShow={DataSetPopupShow}
          setDataSetPopupShow={setDataSetPopupShow}
          DataSetButton={DataSetButton}
          DATASET_API={DATASET_API}
          PageView={PageView}
          setPageView={setPageView}
        />

        <section
          className={`list-page ${PageView === "grid" ? "with-journey" : ""}`}
        >
          <section className="list-table">
            <Container fluid>
              <Row>
                <Col xxl={12}>
                  {PageView === "grid" ? (
                    <>
                      <Journey />
                    </>
                  ) : (
                    <>
                      <div className="data-table">
                        <FilterHeaderLayout
                          Tableloading={Tableloading}
                          setTableLoading={setTableLoading}
                        />

                        <WijmoLayout />
                      </div>
                    </>
                  )}
                </Col>
              </Row>
            </Container>
          </section>
          <DataSetPopup
            DataSetPopupShow={DataSetPopupShow}
            setDataSetPopupShow={setDataSetPopupShow}
            DataSetButton={DataSetButton}
            DATASET_API={DATASET_API}
          />
        </section>
      </ListPageLayout>
    </ListContext.Provider>
  );
}
