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
import WijmoLayout from "@/modules/TaskModule/WijmoLayout/WijmoLayout";
import ListHeader from "./components/ListHeader";

import FilterHeaderLayout from "@/modules/TaskModule/FilterHeaderLayout/FilterHeaderLayout";
import DataSetPopup from "./components/dataset";

import DATASET_API from "./components/datasetapi.json";
import { Container, Row, Col } from "react-bootstrap";

export const ListContext = createContext();

export default function TaskModule() {
  const { previousPathName, setPreviousPathName } = useContext(
    ArcGlobalContextProvider
  );
  // const [PreviousPath, setPreviousPath] = useState();
  const [LeadStageValues, setLeadStageValues] = useState([]);
  const [FilterDropdownShow, setFilterDropdownShow] = useState(true);
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
    <ListContext.Provider
      value={{
        LeadStageValues,
        setLeadStageValues,
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
