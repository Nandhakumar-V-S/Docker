//import { Tag, Row, Col } from 'antd';
import useLanguage from "@/locale/useLanguage";

import { ListPageLayout } from "@/layout";

import WijimoGrid from "../DashboardModule/components/Wijimo";
import WijmoLayout from "@/modules/FollowupModule/WijmoLayout/WijmoLayout";
import ListHeader from "./components/ListHeader";

import FilterHeaderLayout from "@/modules/FollowupModule/FilterHeaderLayout/FilterHeaderLayout";
import DataSetPopup from "./components/dataset";
// import ListPageTableLoading from "../../../loading-skeleton/listpage-table-loading";
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

export default function FollowupModule() {
  const [LeadStageValues, setLeadStageValues] = useState([]);
  const [FilterDropdownShow, setFilterDropdownShow] = useState(true);
  const [DataSetPopupShow, setDataSetPopupShow] = useState(false);
  const DataSetButton = useRef(null);
  const [Tableloading, setTableLoading] = useState(false);
  const translate = useLanguage();

  console.log("Inside ListPage Module");

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
