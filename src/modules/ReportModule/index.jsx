//import { Tag, Row, Col } from 'antd';
import useLanguage from "@/locale/useLanguage";

import { ListPageLayout } from "@/layout";

import WijimoGrid from "../DashboardModule/components/Wijimo";
import WijmoLayout from "@/modules/ReportModule/WijmoLayout/WijmoLayout";
import ListHeader from "./components/ListHeader";

import FilterHeaderLayout from "@/modules/ReportModule/FilterHeaderLayout/FilterHeaderLayout";
import DataSetPopup from "./components/dataset";

import ListPageTableLoading, {
  ListHeaderLoading,
} from "@/modules/loading-skeleton/listpage-table-loading";
import DATASET_API from "./components/datasetapi.json";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Dropdown,
  DropdownButton,
  Form,
} from "react-bootstrap";

import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
// import { ArcTabType1 } from "@/components/arccomponents/ArcTab/ArcTabType1";

export const ListContext = createContext();

export default function ReportModule() {
  const [LeadStageValues, setLeadStageValues] = useState([]);

  const [FilterDropdownShow, setFilterDropdownShow] = useState(true);
  const { previousPathName, setPreviousPathName } = useContext(
    ArcGlobalContextProvider
  );
  let location = useLocation();
  const currentPathName = location.pathname;
  useEffect(() => {
    setPreviousPathName(currentPathName);
  }, [currentPathName]);
  console.log("Inside ListPage Module");
  console.log("Current Location:", previousPathName);

  const [DataSetPopupShow, setDataSetPopupShow] = useState(false);
  const DataSetButton = useRef(null);
  const [Tableloading, setTableLoading] = useState(false);

  const translate = useLanguage();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const currentKey = location.pathname?.split("/")[1];
  // console.log(currentKey);

  // console.log("Inside ListPage Module");

  // const [key, setKey] = useState("report");

  // // useEffect(() => {
  // //   // const activekey = sessionStorage.getItem("reportKey");
  // //   setKey(currentKey);
  // // }, []);

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
                  {/* <ArcTabType1
                    // navigate={handleNavigation}
                    crntkey={"report"}
                    // setKey={setKey}
                  /> */}
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
