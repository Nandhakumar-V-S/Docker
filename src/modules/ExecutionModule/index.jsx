import { useLocation } from "react-router-dom";
import { ListPageLayout } from "@/layout";
import WijmoLayout from "@/modules/ExecutionModule/WijmoLayout/WijmoLayout";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import ListHeader from "./components/ListHeader";
import FilterHeaderLayout from "@/modules/ExecutionModule/FilterHeaderLayout/FilterHeaderLayout";
import DataSetPopup from "./components/dataset";
import DATASET_API from "./components/datasetapi.json";
import { Container, Row, Col } from "react-bootstrap";
import { createContext, useState, useRef, useContext, useEffect } from "react";
import WijimoGrid from "../DashboardModule/components/Wijimo";
export const ListContext = createContext();

export default function ExecutionModule() {
  const { previousPathName, setPreviousPathName } = useContext(
    ArcGlobalContextProvider
  );
  const [LeadStageValues, setLeadStageValues] = useState([]);
  const [DataSetPopupShow, setDataSetPopupShow] = useState(false);
  const [AddTaskShow, setAddTaskShow] = useState(false);
  const DataSetButton = useRef(null);
  const [Tableloading, setTableLoading] = useState(false);
  const [FilterDropdownShow, setFilterDropdownShow] = useState(true);
  console.log("Inside ListPage Module");
  let location = useLocation();
  const currentPathName = location.pathname;

  // const endsWithSpecificString = (str) => currentPathName.endsWith(str);

  useEffect(() => {
    setPreviousPathName(currentPathName);
    sessionStorage.setItem("PreviousPath", currentPathName);
  }, [currentPathName]);

  return (
    <ListContext.Provider
      value={{
        LeadStageValues,
        setLeadStageValues,
        AddTaskShow,
        setAddTaskShow,
        FilterDropdownShow,
        setFilterDropdownShow,
      }}
    >
      <ListPageLayout>
        <ListHeader
          DataSetPopupShow={DataSetPopupShow}
          setDataSetPopupShow={setDataSetPopupShow}
          DataSetButton={DataSetButton}
          DATASET_API={DATASET_API}
        />

        <section className="list-page">
          <section className="list-table">
            <Container fluid>
              <Row>
                <Col xxl={12}>
                  <div className="data-table">
                    <FilterHeaderLayout
                      Tableloading={Tableloading}
                      setTableLoading={setTableLoading}
                    />
                    <WijmoLayout />
                  </div>
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
