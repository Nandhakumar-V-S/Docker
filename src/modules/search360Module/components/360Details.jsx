import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";

//json

import EntityData from "./entity.json";
import ProjectData from "./Project360.json";
import DataTable from "@/modules/TaskModule/WijmoLayout/DataTable";
import TaskDataTable from "@/modules/ProjectModule/TaskDataTable";
import { projectTask } from "@/redux/360Details/project360/projectTask360";
import CommonGridDataTable from "@/components/arccomponents/widget/Commongrid";
import WijmoPagination from "@/components/TaskComp/Wijmo/WijmoPagination";
import FilterHeaderLayout from "@/modules/TaskModule/FilterHeaderLayout/FilterHeaderLayout";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { setLoading } from "@/redux/Features/actions";
import WijmoFlexgrid from "@/components/FeaturesComp/Wijmo/WijmoFlexgrid";
import ArcDataNotFound from "@/components/arccomponents/ui-components/nodatafound/no-data-found";
import WijmoLayout from "@/modules/FeaturesModule/WijmoLayout/WijmoLayout";
import FeaturesApi from "@/request/API/FeaturesApi";

export const AllDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let loggedUserId = window.sessionStorage.getItem("Globalid");

  //   const AttributeaddStatus = useSelector(
  //     (state) => state.arcAddAttribute.Addstatus
  //   );
  const GridBinding = [
    // { header: "title", binding: "utbl_Workitem_column16", width: 200 },
    { header: "Resource", binding: "utbl_Workitem_column11_text", width: 130 },
    { header: "Project", binding: "utbl_Workitem_column41_text", width: 150 },
    { header: "Chunk", binding: "utbl_Workitem_column3_text", width: 130 },
    { header: "Priority", binding: "utbl_Workitem_column6_text", width: 120 },
    { header: "Due Date", binding: "column30", width: 110 },
    {
      header: "Task Status",
      binding: "utbl_Workitem_column9_text",
      width: 130,
    },
    {
      header: "Task Owner",
      binding: "utbl_Workitem_column10_text",
      width: 130,
    },
  ];
  const selectEntityDetails = (state) => state.searchEntity.entityDetails;
  const entityDetails = useSelector(selectEntityDetails);
  let featurerequestData = {};
  const entityResults = entityDetails?.result?.data;
  console.log(entityResults);
  const entityResultsData = entityResults && entityResults[0];
  const TransactionId = sessionStorage.getItem("Current_EntityID");
  console.log("TransactionId", TransactionId);
  const SelectedentityId =
    String(entityResultsData?.id) === "undefined" ? "" : entityResultsData?.id;
  const [Tableloading, setTableLoading] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const requestData = {
      entityid: "26B84156-CC30-416E-99D5-B37409B4D0BD",
      listid: "0C67EE8D-2E31-4E25-85B2-4AFA61197F3E",
      start: (currentPage - 1) * pageSize,
      skip: pageSize,
      orderby: "",
      orderbydir: "",
      loggeduserid: loggedUserId,
      sessionid: "",
      filterparams: [],
      transactionid: TransactionId,
    };
    dispatch(projectTask(requestData));
  }, [pageSize, currentPage]);
  const handletaskproject360 = () => {
    // alert("hi");
    featurerequestData = {
      entityid: "26B84156-CC30-416E-99D5-B37409B4D0BD",
      listid: "0C67EE8D-2E31-4E25-85B2-4AFA61197F3E",
      start: 0,
      skip: pageSize,
      orderby: "",
      orderbydir: "",
      loggeduserid: loggedUserId,
      sessionid: "",
      filterparams: [],
      transactionid: TransactionId,
    };
    // dispatch(projectTask(featurerequestData));
  };

  const [featureShow, setfeatureShow] = useState(false);

  const handlefeatureproject360 = () => {
    setfeatureShow(true);
    // navigate("/FeaturesApi");
    // alert("hi");
    const requestData = {
      entityid: "5c4c4fb1-8e96-473d-9e13-bd7372050d65",
      listid: "041164e0-e970-43d3-848f-13eac93db18f",
      start: 0,
      skip: pageSize,
      orderby: "",
      orderbydir: "",
      loggeduserid: loggedUserId,
      sessionid: "",
      filterparams: [],
      transactionid: TransactionId,
    };
    // dispatch(DefaultInsertUpdate(RequestData));
    // dispatch(setLoading(true));
  };
  //const TaskdataDetails = (state) => state.projectTaskState;
  const { response, loading, status } = useSelector(
    (state) => state.projectTaskState
  );

  const { data, totalRecords } = response.result || {};
  const paginationConfig = {
    pageSize,
    currentPage,
    totalLength: totalRecords || 0,
  };
  console.log(response);
  const [key, setKey] = useState("overview");
  console.log(entityResults);
  return (
    <>
      <div className="all-details-main">
        <div className="all-details">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className=""
          >
            <Tab eventKey="overview" title={<>Overview</>}>
              <Overview entityResults={entityResults} />
            </Tab>
            <Tab
              eventKey="Tasks"
              title={<span onClick={handletaskproject360}>Tasks</span>}
            >
              {response != {} && (
                <>
                  {/* <Outlet /> */}
                  {/* <section className="list-page">
                    <section className="list-table">
                      <Container fluid>
                        <Row>
                          <Col xxl={12}>
                            <div className="data-table">
                              <FilterHeaderLayout
                                Tableloading={Tableloading}
                                setTableLoading={setTableLoading}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </section>
                  </section>
                  */}
                  <CommonGridDataTable
                    GridBinding={GridBinding}
                    GridData={response?.result?.data}
                    Response={response}
                    LoadingState={loading}
                  ></CommonGridDataTable>
                  <WijmoPagination
                    loading={loading}
                    paginationConfig={paginationConfig}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                  />
                </>
              )}

              {/* <TaskDataTable></TaskDataTable> */}
            </Tab>

            <Tab
              eventKey="Feature"
              title={<span onClick={handlefeatureproject360}>Feature</span>}
            >
              {response != {} && (
                <>
                  {/* <WijmoFlexgrid
                    loading={loading}
                    tableData={dataSource}
                    sortedColumns={sortedColumn}
                  />
                  <WijmoPagination
                    loading={loading}
                    paginationConfig={paginationConfig}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                  /> */}

                  {featureShow && (
                    <FeaturesApi
                      page={"project360"}
                      featureproj360={featurerequestData}
                    />
                  )}
                  <WijmoLayout />
                  {/* {dataSource?.length === 0 && !loading ? (
                    <ArcDataNotFound />
                  ) : null} */}
                </>
              )}

              {/* <TaskDataTable></TaskDataTable> */}
            </Tab>
            {/* <Tab eventKey="attributes" title={<>Subtask</>}>
              <GridData gridData={tableData} SortedColumns={sortedColumn} />
              {tableData?.length === 0 ? <ArcDataNotFound /> : null}
            </Tab> */}
            {/* <Tab eventKey="plan" title={<>Plan</>}>
              <GridData
                gridData={plantableData}
                SortedColumns={plansortedColumn}
              />
              {plantableData?.length === 0 ? <ArcDataNotFound /> : null}
            </Tab> */}
            {/* <Tab
              eventKey="timeline"
              title={
                <>
                  <span onClick={GetTimeline}>Timeline</span>
                </>
              }
            >
              <TimeLine />
            </Tab> */}
          </Tabs>
        </div>
        {/* <DetailSidebar /> */}
      </div>
    </>
  );
};

const formatValue = (value, apiName) => {
  if (!value || value.length === 0) {
    return "-";
  }

  if (apiName === "utbl_Workitem_column30") {
    return moment(value, "MM/DD/YYYY h:mm:ss A").format("DD/MM/YYYY");
  }

  if (apiName === "utbl_Workitem_column18") {
    return value + "%";
  }

  return value;
};

export const Overview = ({ entityResults }) => {
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  const entityResult =
    entityResults && entityResults.length > 0 ? entityResults[0] : null;
  return (
    <>
      <div className="tab-main-content overview">
        <div className="info-box">
          <div className="info-header">
            <h4>Project Information</h4>
            {/* <button>
                <RiEdit2Line /> Edit
              </button> */}
          </div>
          {/* <pre>{JSON.stringify(leadDetails, null, 2)}</pre> */}
          <ul>
            {(previousPathName === "/project"
              ? ProjectData
              : EntityData
            )?.Generalinfo?.map((lead, index) => (
              <React.Fragment key={index}>
                <li key={index}>
                  <div className="data">
                    <span>{lead.labeltext}</span>
                    <p
                      title={
                        entityResult
                          ? formatValue(
                              entityResult[lead.api_name],
                              lead.api_name
                            )
                          : "-"
                      }
                    >
                      {entityResult
                        ? formatValue(
                            entityResult[lead.api_name],
                            lead.api_name
                          )
                        : "-"}
                    </p>
                  </div>
                </li>
              </React.Fragment>
            ))}
          </ul>
          {/* <pre>{JSON.stringify(leadDetails, null, 2)}</pre> */}
        </div>
      </div>
    </>
  );
};
