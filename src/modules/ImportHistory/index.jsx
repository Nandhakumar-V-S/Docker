//import { Tag, Row, Col } from 'antd';
import useLanguage from "@/locale/useLanguage";

import { ListPageLayout } from "@/layout";

import WijimoGrid from "../DashboardModule/components/Wijimo";
import WijmoLayout from "@/modules/ImportHistory/WijmoLayout/WijmoLayout";
import ListHeader from "./components/ListHeader";

import FilterHeaderLayout from "@/modules/ImportHistory/FilterHeaderLayout/FilterHeaderLayout";
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

import React, { createContext, useState, useRef } from "react";

export const ListContext = createContext();

export default function DataImportHistoryModule() {
  const [LeadStageValues, setLeadStageValues] = useState([]);

  const [DataSetPopupShow, setDataSetPopupShow] = useState(false);
  const DataSetButton = useRef(null);
  const [Tableloading, setTableLoading] = useState(false);
  const translate = useLanguage();

  console.log("Inside ListPage Module");

  return (
    <ListContext.Provider value={{ LeadStageValues, setLeadStageValues }}>
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
