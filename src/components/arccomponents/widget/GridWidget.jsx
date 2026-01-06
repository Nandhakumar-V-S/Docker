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
import ArcWidget from "@/components/arccomponents/widget/arcwidget";
import { WidgetHeader } from "@/components/arccomponents/widget/widgetHeader";
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

const GridWidget = ({ PlanSummeryKPIState, Title }) => {
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
      dispatch(
        fetchPlanSummery({
          URL: CurrentURL,
          DefaultpageSize: DefaultpageSize,
          DefaultcurrentPage: DefaultcurrentPage,
        })
      );
    }
  }, [dispatch]);

  const handleFetch = (url) => {
    setCurrentURL(url);
    setPageSize(15);
    setCurrentPage(1);
    dispatch(
      fetchPlanSummery({
        URL: url,
        DefaultpageSize: DefaultpageSize,
        DefaultcurrentPage: DefaultcurrentPage,
      })
    );
  };

  useEffect(() => {
    dispatch(
      fetchPlanSummery({
        URL: CurrentURL,
        DefaultpageSize: pageSize,
        DefaultcurrentPage: currentPage,
      })
    );
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
      <ArcWidget className={"grid-widget"}>
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
                  <span className="count">{TodayTaskCount || "0"}</span>
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
                  FOLLOWUPS{" "}
                  <span className="count">{FollowupsCount || "0"}</span>
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
                  APPROVALS{" "}
                  <span className="count">{ApprovalsCount || "0"}</span>
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

export const GridDataTableTodayTask = ({ GridData, LoadingState }) => {
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

    dispatch(
      GetDefaultFormValues({
        TransactionId: TransactionID,
        previousPathName: "/exec",
      })
    );
  };
  const GetSubTaskData = (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("RowData:", TransactionID);
    // Update the selected row state
    setSelectedRow(RowData);

    dispatch(GetSubTask(TransactionID));
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
      <AddFollowup
        show={AddFollowShow}
        setShow={setAddFollowShow}
        SelectedRow={SelectedRow}
      />
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

const GridDataTableFollowups = ({ GridData, LoadingState }) => {
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

const GridDataTableApproval = ({ GridData, LoadingState }) => {
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
