//import { Tag, Row, Col } from 'antd';
import useLanguage from "@/locale/useLanguage";

import { ListPageLayout } from "@/layout";

import WijimoGrid from "../DashboardModule/components/Wijimo";
import WijmoLayout from "@/modules/ListPageModule/WijmoLayout/WijmoLayout";
import ListHeader from "@/modules/ListPageModule/components/ListHeader";

import FilterHeaderLayout from "./FilterHeaderLayout/FilterHeaderLayout";
import DataSetPopup from "./components/dataset";

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

export default function ListPageModule() {
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
          />
        </section>
      </ListPageLayout>
    </ListContext.Provider>
  );
}
