/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
//? Assets
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { parseISO, format } from "date-fns";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import { get360EntityInfo } from "@/redux/360Details/Get360EntityInfo";
//? Components
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import WijmoPagination from "@/components/PlanComp/Wijmo/WijmoPagination";
import ArcDataNotFound from "@/components/arccomponents/ui-components/nodatafound/no-data-found";
import OfflineGrid_API from "./OfflineGrid_Api.json";
import ListPageTableLoading from "@/modules/loading-skeleton/listpage-table-loading";
import { fetchPlanSummery } from "@/redux/Home/PlanSummery/PlanSummery";
import ArcWidget from "@/components/arccomponents/widget-v2/arcwidget";
import { WidgetHeader } from "@/components/arccomponents/widget-v2/widgetHeader";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { GetDefaultFormValues } from "@/redux/Execution/UpdateStatus/GetDefaultValues";

import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate,
} from "@grapecity/wijmo.react.grid";
import "@grapecity/wijmo.styles/wijmo.css";
import UpdateSatus from "@/components/ExecutionComp/Wijmo/components/Update/UpdateStatus";
import UpdateSession from "@/components/ExecutionComp/Wijmo/components/Update/UpdateSession";
import SubTaskGrid from "@/components/ExecutionComp/Wijmo/components/Update/SubTaskGrid";
import AddFollowup from "@/components/ExecutionComp/Wijmo/components/Update/AddFollowup";
import ExtendPlan from "@/components/ExecutionComp/Wijmo/components/Update/extend";
import { GetSubTask } from "@/redux/Execution/addSubTask/GetSubTask";
import { resetAddStatus } from "@/redux/Execution/UpdateStatus/UpdateStatus";
import { resetSessionStatus } from "@/redux/Execution/UpdateStatus/UpdateSession";
import { resetStatus } from "@/redux/Execution/extendTask/AddExtendPlan";
import UpdateFollow from "@/components/FollowupComp/Wijmo/UpdateFollowup/Updatefollowup";
import { changeEntityid } from "@/redux/Home/actions";
import { GetDefaultFormValues as GetDefaultFormValuesFollowup } from "@/redux/Followup/UpdateStatus/GetDefaultValues";
//? CSS

//? Images

//? JSON File

//? Icons
import { BiTask } from "react-icons/bi";
import { MdOutlineScreenShare } from "react-icons/md";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { HiOutlineDotsVertical } from "react-icons/hi";
// *******~ Import ~******** //

const GridWidget = ({ PlanSummeryKPIState, Title, divWidth }) => {
  const dispatch = useDispatch();
  const DefaultURL = "gettodaytask";
  const DefaultpageSize = "15";
  const DefaultcurrentPage = "1";
  const PlanSummeryState = useSelector(
    (state) => state.PlanSummeryState.response
  );
  const [LoadingState, setLoadingState] = useState(false);
  const GridData = PlanSummeryState?.result?.data;
  const PaginationResults = PlanSummeryState?.result;
  // const GridData = OfflineGrid_API?.result?.data;
  const [CurrentURL, setCurrentURL] = useState("gettodaytask");
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const paginationConfig = {
    pageSize,
    currentPage,
    totalLength: PaginationResults?.totalCount || 0,
  };
  useEffect(() => {
    if (PlanSummeryState?.length === 0) {
      // dispatch(
      //   fetchPlanSummery({
      //     URL: CurrentURL,
      //     DefaultpageSize: DefaultpageSize,
      //     DefaultcurrentPage: DefaultcurrentPage,
      //   })
      // );
    }
  }, [dispatch]);

  const handleFetch = (url) => {
    setCurrentURL(url);
    setPageSize(15);
    setCurrentPage(1);
    // dispatch(
    //   fetchPlanSummery({
    //     URL: url,
    //     DefaultpageSize: DefaultpageSize,
    //     DefaultcurrentPage: DefaultcurrentPage,
    //   })
    // );
  };

  useEffect(() => {
    // dispatch(
    //   fetchPlanSummery({
    //     URL: CurrentURL,
    //     DefaultpageSize: pageSize,
    //     DefaultcurrentPage: currentPage,
    //   })
    // );
  }, [currentPage, pageSize]);

  const [key, setKey] = useState("gettodaytask");
  const {
    todaytask: TodayTaskCount,
    followups: FollowupsCount,
    approvals: ApprovalsCount,
  } = PlanSummeryKPIState?.result || {};
  const PlanSummeryStateStatus = useSelector(
    (state) => state.PlanSummeryState.status
  );
  useEffect(() => {
    let timer;

    if (PlanSummeryStateStatus === "loading") {
      setLoadingState(true);
    } else {
      timer = setTimeout(() => {
        setLoadingState(false);
      }, 500); // 1 second delay
    }

    // Clear the timeout if the component is unmounted or if dependencies change
    return () => clearTimeout(timer);
  }, [PlanSummeryStateStatus]);
  // let LoadingState = PlanSummeryStateStatus === "loading";
  // console.log(PlanSummeryKPIState);

  const newentityid = (id) => {
    dispatch(changeEntityid(id));
  };
  const ConvertUtcToLocal = (utcDate) => {
    // Parse the ISO string to a Date object
    const parsedDate = parseISO(utcDate);

    // Format the date to the local time zone
    const formattedDate = format(parsedDate, "PPpp");

    return formattedDate;
  };
  const utcTime = "2023-06-17T12:00:00Z"; // Example UTC time string
  return (
    <React.Fragment>
      <ArcWidget className={`grid-widget div-${divWidth}`}>
        <div className="widget-header">
          <h4>
            {Title}
            {/* {ConvertUtcToLocal(utcTime)} */}
          </h4>
          <div className="actions" style={{ visibility: "hidden" }}>
            <button>Submit</button>
          </div>
        </div>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="inside-widget-tab"
          transition={false}
        >
          <Tab
            eventKey="gettodaytask"
            title={
              <>
                <span
                  className="title-span"
                  onClick={() => {
                    handleFetch(DefaultURL);
                    setCurrentURL(DefaultURL);
                    newentityid("F48EF545-9995-4F8F-857D-DDDA2BC063CC");
                  }}
                >
                  TODAY TASK
                  <span className="count">{"10"}</span>
                </span>
              </>
            }
          >
            <>
              <div className="table-div">
                {/* <PageComponent GridData={GridData} /> */}
                <GridDataTableTodayTask
                  GridData={GridData}
                  LoadingState={LoadingState}
                />
                <div
                  className={`home-table-pagination ${
                    LoadingState && "loading"
                  }`}
                >
                  <WijmoPagination
                    loading={LoadingState}
                    paginationConfig={paginationConfig}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                  />
                </div>
              </div>
            </>
          </Tab>
          <Tab
            eventKey="getfollowuplst"
            title={
              <>
                <span
                  className="title-span"
                  onClick={() => {
                    handleFetch("getfollowuplst");
                    newentityid("C65FE730-5FDC-418E-BDC5-98F2FC405750");
                  }}
                >
                  FOLLOWUPS <span className="count">{"8"}</span>
                </span>
              </>
            }
          >
            <>
              <div className="table-div">
                <GridDataTableFollowups
                  GridData={GridData}
                  LoadingState={LoadingState}
                />
                <div
                  className={`home-table-pagination ${
                    LoadingState && "loading"
                  }`}
                >
                  <WijmoPagination
                    loading={LoadingState}
                    paginationConfig={paginationConfig}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                  />
                </div>
              </div>
            </>
          </Tab>
          <Tab
            eventKey="getapprovalslst"
            title={
              <>
                <span
                  className="title-span"
                  onClick={() => {
                    handleFetch("getapprovalslst");
                    newentityid("C65FE730-5FDC-418E-BDC5-98F2FC405750");
                  }}
                >
                  APPROVALS <span className="count">{"13"}</span>
                </span>
              </>
            }
          >
            <>
              <div className="table-div">
                <GridDataTableApproval
                  GridData={GridData}
                  LoadingState={LoadingState}
                />
                <div
                  className={`home-table-pagination ${
                    LoadingState && "loading"
                  }`}
                >
                  <WijmoPagination
                    loading={LoadingState}
                    paginationConfig={paginationConfig}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                  />
                </div>
              </div>
            </>
          </Tab>
        </Tabs>
      </ArcWidget>
      {/* <pre>{JSON.stringify(PlanSummeryState, null, 2)}</pre> */}
    </React.Fragment>
  );
};
export default GridWidget;

export const GridDataTableTodayTask = ({ LoadingState }) => {
  const GridData = [
    {
      id: "b6d3cf60-5400-4924-a72c-0c57b037898f",
      title: "Task_Planner1 Approval",
      chunk: "SPAC",
      project: "US BU",
      duedate: "2024-06-15T10:27:00.507",
      priority: "B",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "345a8575-1a0f-427d-97b9-1427a0f4eb9c",
      title: "Task_SK_June17 Approval",
      chunk: "SPAC",
      project: "US BU",
      duedate: "2024-06-18T05:33:14.51",
      priority: "A",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "2c1549ab-b3fe-4353-90c8-22b68c12bd69",
      title: "Release Notes for July Deployments Approval",
      chunk: "Release",
      project: "GS BU",
      duedate: "2024-06-14T08:45:04.353",
      priority: "B",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "53a31246-866d-42cb-8096-37b30b375ff2",
      title: "Task_SK_June18-new_Approval",
      chunk: "SPAC",
      project: "US BU",
      duedate: "2024-06-21T07:36:15.887",
      priority: "A",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "8eed3d15-1705-4b0e-9220-3a96ba60872b",
      title: "Task_SK_June18-new Approval",
      chunk: "SPAC",
      project: "US BU",
      duedate: "2024-06-18T10:58:08.307",
      priority: "A",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "8b57bfb6-363d-4085-876a-7083e46da681",
      title: "Task_planner2 Approval",
      chunk: "Practice Management",
      project: "GS BU",
      duedate: "2024-06-15T11:02:25.583",
      priority: "A",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "32e80de5-ac67-4f98-8a28-729b355cdc67",
      title: "Task_Planner1 Approval",
      chunk: "SPAC",
      project: "US BU",
      duedate: "2024-06-17T02:45:23.777",
      priority: "B",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "9ec69e91-4e72-486d-be4a-8048426065fc",
      title: "Task_Planner1 Approval",
      chunk: "SPAC",
      project: "US BU",
      duedate: "2024-06-17T05:34:30.123",
      priority: "B",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "d8ffb03d-bef6-4df6-9162-8f6a328d5cef",
      title: "plan screen followup 001",
      chunk: "-",
      project: "US BU",
      duedate: "2024-05-30T00:00:00",
      priority: "B",
      session: null,
      status: "Complete",
      flu: 613,
    },
    {
      id: "ff0cc863-000b-46b6-b007-a514b07c2f12",
      title: "Timeline Feature_Approval",
      chunk: "SPAC",
      project: "Dropdown",
      duedate: "2024-06-19T13:34:21.04",
      priority: "B",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "bdfc1c57-b409-4cbb-8beb-dd33ce38195f",
      title: "Dev Task 01 Approval",
      chunk: "-",
      project: "Regroup",
      duedate: "2024-06-13T00:00:00",
      priority: "B",
      session: null,
      status: "Redo",
      flu: 613,
    },
    {
      id: "f22d688f-2d7d-46b1-988b-dde6a56b5f5f",
      title: "Task 2024 01 Approval",
      chunk: "-",
      project: "GS BU",
      duedate: "2024-06-14T05:34:31.613",
      priority: "B",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  // * Popup State
  const [SelectedRow, setSelectedRow] = useState();
  const [UpdateStatusshow, setUpdateStatusShow] = useState(false);
  const [UpdateSessionshow, setUpdateSessionShow] = useState(false);
  const [AddSubtaskShow, setAddSubtaskShow] = useState(false);
  const [AddFollowShow, setAddFollowShow] = useState(false);
  const [ExtendPlanShow, setExtendPlanShow] = useState(false);
  // * Popup State
  const UpdateRowData = (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("RowData:", TransactionID);
    // Update the selected row state
    setSelectedRow(RowData);

    // dispatch(
    //   GetDefaultFormValues({
    //     TransactionId: TransactionID,
    //     previousPathName: "/exec",
    //   })
    // );
  };
  const GetSubTaskData = (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("RowData:", TransactionID);
    // Update the selected row state
    setSelectedRow(RowData);

    // dispatch(GetSubTask(TransactionID));
  };
  // ! Actions
  const PlanSummeryStateStatus = useSelector(
    (state) => state.PlanSummeryState.status
  );

  const HandlePostLeadID = (TransactionID) => {
    console.log("Current EntityID: " + TransactionID);

    // Store leadID in sessionStorage
    sessionStorage.setItem("Current_EntityID", TransactionID);

    // Dispatch the Redux thunk with the leadID
    dispatch(get360EntityInfo({ TransactionID, previousPathName }));
    // dispatch(getTransactionID(TransactionID));

    // Navigate to the desired route
    navigate("/360detail_v4");
  };
  useEffect(() => {
    removeWijimoLicense();
  }, []);

  function removeWijimoLicense() {
    const removeEvaluationText = () => {
      const bodyElements = document.body.children;
      for (let i = bodyElements.length - 1; i >= 0; i--) {
        const body = bodyElements[i];
        if (
          body.innerText.includes("Wijmo Evaluation") ||
          body.innerText.includes("Wijmo license")
        ) {
          body.remove();
        }
      }
    };
    removeEvaluationText();
  }

  const GridBinding = [
    // { header: "title", binding: "utbl_Workitem_column16", width: "200" },

    { header: "Project", binding: "project", width: 150 },
    { header: "Due Date", binding: "duedate", width: 120 },
    { header: "Priority", binding: "priority", width: 120 },
    { header: "Task status", binding: "status", width: 120 },
    { header: "Task Progress %", binding: "taskProgress", width: 120 },
    { header: "Session", binding: "session", width: 120 },
    { header: "Chunk", binding: "chunk", width: 150 },
  ];
  const DataMenuBtn = ({ RowData, TransactionID }) => {
    return (
      <>
        <OverlayTrigger
          trigger="click"
          placement="auto-end"
          rootClose={true}
          overlay={
            <Popover className="data-menu-option">
              <Popover.Body>
                <div className="option-div">
                  <button
                    onClick={() => {
                      setAddFollowShow(true);
                      UpdateRowData(RowData, TransactionID);
                    }}
                  >
                    <MdOutlineScreenShare /> Add Followup
                  </button>
                  <button
                    onClick={() => {
                      setExtendPlanShow(true);
                      UpdateRowData(RowData, TransactionID);
                    }}
                  >
                    <FaExternalLinkSquareAlt />
                    Extend
                  </button>
                </div>
              </Popover.Body>
            </Popover>
          }
        >
          <span>
            <HiOutlineDotsVertical />
          </span>
        </OverlayTrigger>
      </>
    );
  };
  console.log(GridData);
  return (
    <React.Fragment>
      <UpdateSatus
        show={UpdateStatusshow}
        setShow={setUpdateStatusShow}
        SelectedRow={SelectedRow}
      />
      <UpdateSession
        show={UpdateSessionshow}
        setShow={setUpdateSessionShow}
        SelectedRow={SelectedRow}
      />
      <SubTaskGrid
        show={AddSubtaskShow}
        setShow={setAddSubtaskShow}
        SelectedRow={SelectedRow}
      />
      {/* <AddFollowup
        show={AddFollowShow}
        setShow={setAddFollowShow}
        SelectedRow={SelectedRow}
      /> */}
      <ExtendPlan
        show={ExtendPlanShow}
        setShow={setExtendPlanShow}
        SelectedRow={SelectedRow}
      />
      {/* <pre>{JSON.stringify(GridData, null, 2)}</pre> */}
      {GridData?.length === 0 && PlanSummeryStateStatus !== "loading" ? (
        <ArcDataNotFound Title={"Data not found"} />
      ) : null}
      {LoadingState ? (
        <ListPageTableLoading />
      ) : (
        <FlexGrid
          autoRowHeights={true}
          deferResizing={true}
          frozenColumns={1}
          itemsSource={GridData}
          allowSorting={true}
          className="list-data-table with-360-page"
          headersVisibility="Column"
          selectionMode="None"
        >
          <FlexGridColumn
            allowDragging={false}
            allowResizing={true}
            binding="title"
            header="Task Name"
            minWidth={350}
            isReadOnly={true}
            fixed
          >
            <FlexGridCellTemplate
              on
              cellType="Cell"
              template={(ctx) => {
                const fullName = ctx.item.title;
                const RowData = ctx.item;
                const TransactionID = ctx.item.id;
                const words = fullName && fullName.split(" ");
                const startWithLetter = words ? words[0].charAt(0) : "";
                const endWithLetter =
                  words && words.length > 1
                    ? words[words.length - 1].charAt(0)
                    : "";
                return (
                  <>
                    <div className="name-td new-name-td with-action-4">
                      <a
                        style={{ textDecoration: "none" }}
                        onClick={() => HandlePostLeadID(TransactionID)}
                      >
                        <div className="name-detail">
                          <span>
                            {startWithLetter}
                            {endWithLetter}
                          </span>
                          <p title={ctx.item.title}>{ctx.item.title}</p>
                        </div>
                      </a>
                      <div className="action new-name-td with-action-4">
                        <span
                          title="Update Status"
                          onClick={() => {
                            setUpdateStatusShow(true);
                            UpdateRowData(RowData, TransactionID);
                            GetSubTaskData(RowData, TransactionID);
                          }}
                        >
                          <MdOutlineSystemUpdateAlt />
                        </span>
                        <span
                          title="Add Sub Task"
                          onClick={() => {
                            setAddSubtaskShow(true);
                            UpdateRowData(RowData, TransactionID);
                            GetSubTaskData(RowData, TransactionID);
                          }}
                        >
                          <BiTask />
                        </span>
                        <span
                          title="Update Session"
                          onClick={() => {
                            setUpdateSessionShow(true);
                            UpdateRowData(RowData, TransactionID);
                          }}
                        >
                          <LiaBusinessTimeSolid />
                        </span>
                        <DataMenuBtn
                          RowData={RowData}
                          TransactionID={TransactionID}
                        />
                      </div>
                    </div>
                  </>
                );
              }}
            />
          </FlexGridColumn>

          {GridBinding.map((data, index) => (
            <FlexGridColumn
              key={index}
              binding={data.binding}
              header={data.header}
              minWidth={data.width}
              width={data.width}
              allowResizing={true}
              allowSorting={true}
              fixed
              isReadOnly={true}
            >
              <FlexGridCellTemplate
                on
                cellType="Cell"
                template={(ctx) => {
                  const GridValue = ctx.item.duedate;
                  const ActualValue = ctx?.item[data.binding];
                  // console.log(GridValue);
                  const formattedDate = ["", null].includes(GridValue)
                    ? "-"
                    : format(parseISO(GridValue), "MM/dd/yyyy");
                  return (
                    <>
                      <div className="name-td new-name-td-default without-cell-edit">
                        <span
                          className="default-value"
                          title={
                            data.binding === "duedate"
                              ? formattedDate
                              : ActualValue || "-"
                          }
                        >
                          {data.binding === "duedate"
                            ? formattedDate
                            : ActualValue || "-"}
                        </span>
                      </div>
                    </>
                  );
                }}
              />
            </FlexGridColumn>
          ))}
        </FlexGrid>
      )}
    </React.Fragment>
  );
};

const GridDataTableFollowups = ({ LoadingState }) => {
  const GridData = [
    {
      id: "b04515b9-6c78-4e19-88b3-40ae78791a05",
      taskname: "Review of test cases",
      project: "Regroup",
      duedate: "2024-06-04T00:00:00",
      followuptype: "Review",
      workday: "D3",
      workweek: "W23",
      status: "Complete",
      assignedby: "Annamalai",
      assignedto: "Annamalai",
    },
    {
      id: "c23d64a9-9479-4206-a6f5-50e4025ec7e0",
      taskname: "Release Note",
      project: "GS BU",
      duedate: "2024-06-13T00:00:00",
      followuptype: "Review",
      workday: "D5",
      workweek: "W24",
      status: "Complete",
      assignedby: "Annamalai",
      assignedto: "Annamalai",
    },
    {
      id: "f333b412-1034-4fc9-81be-816244c3f44d",
      taskname: "Followup Review Test",
      project: "US BU",
      duedate: "2024-06-18T00:00:00",
      followuptype: "Review",
      workday: "D3",
      workweek: "W25",
      status: "-",
      assignedby: "Annamalai",
      assignedto: "Annamalai",
    },
    {
      id: "c09281e5-f1cf-433d-8aeb-8de23dcb6948",
      taskname: "Followup Planner 3",
      project: "GS BU",
      duedate: "2024-06-15T00:00:00",
      followuptype: "Review",
      workday: "D7",
      workweek: "W24",
      status: "Redo",
      assignedby: "Annamalai",
      assignedto: "Annamalai",
    },
    {
      id: "a1822b04-bcc9-4cca-be78-c4a5e37b7a8d",
      taskname: "New followup",
      project: "Regroup",
      duedate: "2024-05-30T00:00:00",
      followuptype: "Review",
      workday: "D5",
      workweek: "W22",
      status: "-",
      assignedby: "Annamalai",
      assignedto: "Annamalai",
    },
  ];
  const dispatch = useDispatch();
  const [UpdateStatusshow, setUpdateStatusShow] = useState(false);
  const [SelectedRow, setSelectedRow] = useState(false);
  const UpdateRowData = (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("RowData:", TransactionID);
    // Update the selected row state
    setSelectedRow(RowData);

    dispatch(GetDefaultFormValuesFollowup(TransactionID));
  };
  const PlanSummeryStateStatus = useSelector(
    (state) => state.PlanSummeryState.status
  );

  useEffect(() => {
    removeWijimoLicense();
  }, []);

  function removeWijimoLicense() {
    const removeEvaluationText = () => {
      const bodyElements = document.body.children;
      for (let i = bodyElements.length - 1; i >= 0; i--) {
        const body = bodyElements[i];
        if (
          body.innerText.includes("Wijmo Evaluation") ||
          body.innerText.includes("Wijmo license")
        ) {
          body.remove();
        }
      }
    };
    removeEvaluationText();
  }

  const GridBinding = [
    // { header: "title", binding: "utbl_Workitem_column16", width: "200" },
    { header: "Project", binding: "project", width: 150 },
    { header: "Due Date", binding: "duedate", width: 110 },
    { header: "Followup Type", binding: "followuptype", width: 120 },
    { header: "Work Day", binding: "workday", width: 100 },
    { header: "Work Week", binding: "workweek", width: 100 },
    { header: "Status", binding: "status", width: 110 },
    { header: "Assigned By", binding: "assignedby", width: 130 },
    { header: "Assigned To", binding: "assignedto", width: 130 },
  ];
  console.log(GridData);
  return (
    <React.Fragment>
      <UpdateFollow
        show={UpdateStatusshow}
        setShow={setUpdateStatusShow}
        SelectedRow={SelectedRow}
      />
      {/* <pre>{JSON.stringify(GridData, null, 2)}</pre> */}
      {GridData?.length === 0 && PlanSummeryStateStatus !== "loading" ? (
        <ArcDataNotFound Title={"Data not found"} />
      ) : null}
      {LoadingState ? (
        <ListPageTableLoading />
      ) : (
        <FlexGrid
          autoRowHeights={true}
          deferResizing={true}
          frozenColumns={1}
          itemsSource={GridData}
          allowSorting={true}
          className="list-data-table with-360-page"
          headersVisibility="Column"
          selectionMode="None"
        >
          <FlexGridColumn
            allowDragging={false}
            allowResizing={true}
            binding="taskname"
            header="Task Name"
            minWidth={350}
            isReadOnly={true}
            fixed
          >
            <FlexGridCellTemplate
              on
              cellType="Cell"
              template={(ctx) => {
                const fullName = ctx.item.taskname;
                const RowData = ctx.item;
                const TransactionID = ctx.item.id;
                const words = fullName && fullName.split(" ");
                const startWithLetter = words ? words[0].charAt(0) : "";
                const endWithLetter =
                  words && words.length > 1
                    ? words[words.length - 1].charAt(0)
                    : "";
                return (
                  <>
                    <div className="name-td new-name-td with-action-1">
                      <a style={{ textDecoration: "none" }}>
                        <div className="name-detail">
                          <span>
                            {startWithLetter}
                            {endWithLetter}
                          </span>
                          <p title={fullName}>{fullName}</p>
                        </div>
                      </a>
                      <div className="action with-action-1">
                        <span
                          title="Update Status"
                          onClick={() => {
                            setUpdateStatusShow(true);
                            UpdateRowData(RowData, TransactionID);
                          }}
                        >
                          <MdOutlineSystemUpdateAlt />
                        </span>
                      </div>
                    </div>
                  </>
                );
              }}
            />
          </FlexGridColumn>

          {GridBinding.map((data, index) => (
            <FlexGridColumn
              key={index}
              binding={data.binding}
              header={data.header}
              minWidth={data.width}
              width={data.width}
              allowResizing={true}
              allowSorting={true}
              fixed
              isReadOnly={true}
            >
              <FlexGridCellTemplate
                on
                cellType="Cell"
                template={(ctx) => {
                  const GridValue = ctx.item.duedate;
                  const ActualValue = ctx?.item[data.binding];
                  // console.log(GridValue);
                  const formattedDate = ["", null].includes(GridValue)
                    ? "-"
                    : format(parseISO(GridValue), "MM/dd/yyyy");
                  return (
                    <>
                      <div className="name-td new-name-td-default without-cell-edit">
                        <span
                          className="default-value"
                          title={
                            data.binding === "duedate"
                              ? formattedDate
                              : ActualValue || "-"
                          }
                        >
                          {data.binding === "duedate"
                            ? formattedDate
                            : ActualValue || "-"}
                        </span>
                      </div>
                    </>
                  );
                }}
              />
            </FlexGridColumn>
          ))}
        </FlexGrid>
      )}
    </React.Fragment>
  );
};

const GridDataTableApproval = ({ LoadingState }) => {
  const GridData = [
    {
      id: "b6d3cf60-5400-4924-a72c-0c57b037898f",
      title: "Task_Planner1 Approval",
      chunk: "SPAC",
      project: "US BU",
      duedate: "2024-06-15T10:27:00.507",
      priority: "B",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "345a8575-1a0f-427d-97b9-1427a0f4eb9c",
      title: "Task_SK_June17 Approval",
      chunk: "SPAC",
      project: "US BU",
      duedate: "2024-06-18T05:33:14.51",
      priority: "A",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "2c1549ab-b3fe-4353-90c8-22b68c12bd69",
      title: "Release Notes for July Deployments Approval",
      chunk: "Release",
      project: "GS BU",
      duedate: "2024-06-14T08:45:04.353",
      priority: "B",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "53a31246-866d-42cb-8096-37b30b375ff2",
      title: "Task_SK_June18-new_Approval",
      chunk: "SPAC",
      project: "US BU",
      duedate: "2024-06-21T07:36:15.887",
      priority: "A",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "8eed3d15-1705-4b0e-9220-3a96ba60872b",
      title: "Task_SK_June18-new Approval",
      chunk: "SPAC",
      project: "US BU",
      duedate: "2024-06-18T10:58:08.307",
      priority: "A",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "8b57bfb6-363d-4085-876a-7083e46da681",
      title: "Task_planner2 Approval",
      chunk: "Practice Management",
      project: "GS BU",
      duedate: "2024-06-15T11:02:25.583",
      priority: "A",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "32e80de5-ac67-4f98-8a28-729b355cdc67",
      title: "Task_Planner1 Approval",
      chunk: "SPAC",
      project: "US BU",
      duedate: "2024-06-17T02:45:23.777",
      priority: "B",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "9ec69e91-4e72-486d-be4a-8048426065fc",
      title: "Task_Planner1 Approval",
      chunk: "SPAC",
      project: "US BU",
      duedate: "2024-06-17T05:34:30.123",
      priority: "B",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "d8ffb03d-bef6-4df6-9162-8f6a328d5cef",
      title: "plan screen followup 001",
      chunk: "-",
      project: "US BU",
      duedate: "2024-05-30T00:00:00",
      priority: "B",
      session: null,
      status: "Complete",
      flu: 613,
    },
    {
      id: "ff0cc863-000b-46b6-b007-a514b07c2f12",
      title: "Timeline Feature_Approval",
      chunk: "SPAC",
      project: "Dropdown",
      duedate: "2024-06-19T13:34:21.04",
      priority: "B",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
    {
      id: "bdfc1c57-b409-4cbb-8beb-dd33ce38195f",
      title: "Dev Task 01 Approval",
      chunk: "-",
      project: "Regroup",
      duedate: "2024-06-13T00:00:00",
      priority: "B",
      session: null,
      status: "Redo",
      flu: 613,
    },
    {
      id: "f22d688f-2d7d-46b1-988b-dde6a56b5f5f",
      title: "Task 2024 01 Approval",
      chunk: "-",
      project: "GS BU",
      duedate: "2024-06-14T05:34:31.613",
      priority: "B",
      session: null,
      status: "Yet to start",
      flu: 613,
    },
  ];
  const dispatch = useDispatch();
  const [UpdateStatusshow, setUpdateStatusShow] = useState(false);
  const [SelectedRow, setSelectedRow] = useState(false);
  const UpdateRowData = (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("RowData:", TransactionID);
    // Update the selected row state
    setSelectedRow(RowData);

    dispatch(GetDefaultFormValuesFollowup(TransactionID));
  };
  const PlanSummeryStateStatus = useSelector(
    (state) => state.PlanSummeryState.status
  );
  useEffect(() => {
    removeWijimoLicense();
  }, []);

  function removeWijimoLicense() {
    const removeEvaluationText = () => {
      const bodyElements = document.body.children;
      for (let i = bodyElements.length - 1; i >= 0; i--) {
        const body = bodyElements[i];
        if (
          body.innerText.includes("Wijmo Evaluation") ||
          body.innerText.includes("Wijmo license")
        ) {
          body.remove();
        }
      }
    };
    removeEvaluationText();
  }
  const GridBinding = [
    // { header: "title", binding: "utbl_Workitem_column16", width: "200" },
    { header: "Chunk", binding: "chunk", width: 150 },
    { header: "Project", binding: "project", width: 150 },
    { header: "Due Date", binding: "duedate", width: 120 },
    { header: "Priority", binding: "priority", width: 120 },
    { header: "Status", binding: "status", width: 120 },
  ];
  console.log(GridData);
  return (
    <React.Fragment>
      <UpdateFollow
        show={UpdateStatusshow}
        setShow={setUpdateStatusShow}
        SelectedRow={SelectedRow}
      />
      {/* <pre>{JSON.stringify(GridData, null, 2)}</pre> */}
      {GridData?.length === 0 && PlanSummeryStateStatus !== "loading" ? (
        <ArcDataNotFound Title={"Data not found"} />
      ) : null}
      {LoadingState ? (
        <ListPageTableLoading />
      ) : (
        <FlexGrid
          autoRowHeights={true}
          deferResizing={true}
          frozenColumns={1}
          itemsSource={GridData}
          allowSorting={true}
          className="list-data-table with-360-page"
          headersVisibility="Column"
          selectionMode="None"
        >
          <FlexGridColumn
            allowDragging={false}
            allowResizing={true}
            binding="title"
            header="Task Name"
            minWidth={350}
            isReadOnly={true}
            fixed
          >
            <FlexGridCellTemplate
              on
              cellType="Cell"
              template={(ctx) => {
                const fullName = ctx.item.title;
                const RowData = ctx.item;
                const TransactionID = ctx.item.id;
                const words = fullName && fullName.split(" ");
                const startWithLetter = words ? words[0].charAt(0) : "";
                const endWithLetter =
                  words && words.length > 1
                    ? words[words.length - 1].charAt(0)
                    : "";
                return (
                  <>
                    <div className="name-td new-name-td with-action-1">
                      <a style={{ textDecoration: "none" }}>
                        <div className="name-detail">
                          <span>
                            {startWithLetter}
                            {endWithLetter}
                          </span>
                          <p title={ctx.item.title}>{ctx.item.title}</p>
                        </div>
                      </a>
                      <div className="action with-action-1">
                        <span
                          title="Update Status"
                          onClick={() => {
                            setUpdateStatusShow(true);
                            UpdateRowData(RowData, TransactionID);
                          }}
                        >
                          <MdOutlineSystemUpdateAlt />
                        </span>
                      </div>
                    </div>
                  </>
                );
              }}
            />
          </FlexGridColumn>
          {GridBinding.map((data, index) => (
            <FlexGridColumn
              key={index}
              binding={data.binding}
              header={data.header}
              minWidth={data.width}
              width={data.width}
              allowResizing={true}
              allowSorting={true}
              fixed
              isReadOnly={true}
            >
              <FlexGridCellTemplate
                on
                cellType="Cell"
                template={(ctx) => {
                  const GridValue = ctx.item.duedate;
                  const ActualValue = ctx?.item[data.binding];
                  // console.log(GridValue);
                  const formattedDate = ["", null].includes(GridValue)
                    ? "-"
                    : format(parseISO(GridValue), "MM/dd/yyyy");
                  return (
                    <>
                      <div className="name-td new-name-td-default without-cell-edit">
                        <span
                          className="default-value"
                          title={
                            data.binding === "duedate"
                              ? formattedDate
                              : ActualValue || "-"
                          }
                        >
                          {data.binding === "duedate"
                            ? formattedDate
                            : ActualValue || "-"}
                        </span>
                      </div>
                    </>
                  );
                }}
              />
            </FlexGridColumn>
          ))}
        </FlexGrid>
      )}
    </React.Fragment>
  );
};
export function GridWidgetv2({ Title, TableData }) {
  //! ArcDropDownControledData State
  const ArcDropDownControledData = [
    { id: 1, value: "this Week" },
    { id: 2, value: "this Month" },
    { id: 3, value: "this Year" },
  ];
  return (
    <React.Fragment>
      <ArcWidget className={"grid-widget"}>
        <WidgetHeader
          Title={Title}
          ArcDropDownControledData={ArcDropDownControledData}
        />
        <div className="arc-table-div">
          <Table bordered>
            <thead>
              <tr>
                {TableData.ColumnData.map((data, index) => (
                  <th key={index}>{data}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TableData.RowData.map((rowData, index) => (
                <tr key={index}>
                  {Object.keys(rowData).map((key, innerIndex) => (
                    <td key={innerIndex}>{rowData[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </ArcWidget>
    </React.Fragment>
  );
}
